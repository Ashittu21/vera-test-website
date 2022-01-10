/*
	TEST WITH:
	/reimagining-prison-webumentary
	/unlocking-the-black-box-of-prosecution
*/

(function() {
	"use strict"

	var VERA = window.VERA || {};
	VERA.sm = VERA.sm || new ScrollMagic.Controller();
	VERA.initBackgroundScroll = init;
	window.VERA = VERA;

	var
		$body = $('body'),
		$bgContainer,
		$bgImages,
		$bgScreen,
		screenTween,
		screenTweenDuration,
		colorComboClassTest = /color-combo--(\S+)/g

	function init($container)
	{
		$bgContainer = $('.background-scroll-container').first(),
		$bgImages = $bgContainer.find('.background-scroll-images'),
		$bgScreen = $bgContainer.find('.background-scroll-screen')

		onload($container)

		var $bgs = $container.find('[data-background-scroll]')

		screenTween = new TimelineLite( { paused: true, ease: Linear.easeNone } )
			.to( $bgScreen[0], 0.5, { autoAlpha: .85 }, 0 )

		screenTweenDuration = screenTween.duration()

		$bgs.each(initOne)
	}

	function onload(el) {
		if (colorComboClassTest.test($body.attr('class'))) return;
		var currentCombo = el.attr('data-color-combo');
		var $article = el.closest('article.article');
		var theme = $article.attr('data-article-theme');
		var defaultCombo = themeSwitch(theme);
	}

	function themeSwitch(theme) {
		switch (theme) {
			case 'black':
				return 'black-white'
				break;
			case 'gray':
				return 'gray-black'
				break;
			default:
				return 'white-black'
		}
	}

	function initOne(i,el)
	{
		var $trigger = $(el),
			$content = $trigger.next(),
			$scrollWrap = $trigger.closest('.scroll-section')

		var screenDuration = getScreenDuration(),
			imageDuration = getImageDuration(),
			$img

		const $article = $trigger.closest('article.article');

		var theme = $article.attr('data-article-theme'),
			defaultCombo;

		defaultCombo = themeSwitch(theme);

		$trigger.closest('.bg-container').addClass('bg-color' + ' color-combo--' + this.getAttribute("data-color-combo"));

		if ($trigger.hasClass('background-scroll-trigger-image')) {

			if (!Modernizr.objectfit) {

				var bgSrc = this.getAttribute("data-bg-src");
				$img = $('<div>');
				$img.addClass('bg-image').css({ backgroundImage: "url(" + bgSrc + ")" })

			} else {
				var src = this.getAttribute("data-src"),
					srcset = this.getAttribute("data-srcset")

				$img = $('<img>');
				$img.attr('src', src).attr('srcset', srcset)

			}

		} else {
			//TODO cleanup and test with RP and Empire
			$img = $('<div>')
		}

		$bgImages.append($img);

		var imageFade = TweenLite.to($img[0], 0.25, { autoAlpha: 1, paused: true, ease: Linear.easeNone });
		var imageScene = new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 1,
			offset: 1
		})
		.addTo(VERA.sm)
		//.addIndicators({ name: "image " + i })
		.on("enter", function(event) {
			imageFade.play(0)
			var currentCombo = $trigger.attr('data-color-combo');
			if (currentCombo === 'inherit') {
				currentCombo = defaultCombo
			}
			$body.removeClass(function(index, className) {
				return (className.match (/(^|\s)(color-combo--)\S+/g) || []).join(' ');
			})
			$body.addClass("color-combo--" + currentCombo);

			console.log(currentCombo,'imagescene ' + i);
		})
		.on("leave", function() {
			var currentCombo = $trigger.attr('data-color-combo');
			imageFade.pause(0);
		})

		var screenScene = new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 1,
			//offset: 100
		})
		.addTo(VERA.sm)
		//.addIndicators({name: "screenfade", indent: 15})
		.on('start', function(event) {
			event.scrollDirection === "REVERSE" ? screenTween.play() : screenTween.reverse()
		})
		.on('end', function(event) {
			event.scrollDirection === "REVERSE" ? screenTween.reverse() : screenTween.play()
		})

		windowResized()
		window.addEventListener("resize", windowResized)

		function getImageDuration()
		{
			return Math.max($scrollWrap.height(), 0)
		}

		function getScreenDuration()
		{
			return $trigger.height()
		}

		function windowResized() {
			imageScene.duration(getImageDuration())
			screenScene.duration(getScreenDuration())
		}
	}
})();
