
var VERA = window.VERA || {};

VERA.sm = VERA.sm || new ScrollMagic.Controller();
VERA.videoTiles = videoTiles;
window.VERA = VERA;

function videoTiles($article) {
  $article
    .find(".article-video-tile:not(.modal-initialized)")
    .each(function () {
      var $this = $(this),
        $media = $this.find(".media"),
        isVimeo;

      $("body").append($media);

      function play(player) {
        isVimeo ? player.play() : player.playVideo();
        /* else Youtube */
      }

      function pause(player) {
        isVimeo ? player.pause() : player.pauseVideo();
        /* else Youtube */
      }

      $media.on("click", function () {
        handleClick();
      });

      $this.on("click", function () {
        handleClick();
      });

      $this.addClass("modal-initialized");

      function handleClick() {
        $this.toggleClass("media-open");

        $media.toggleClass("open");

        var isOpen = $media.hasClass("open");

        if ($this.data("player")) {
          isVimeo = typeof $this.data("player").getPaused !== "undefined";
          if (isOpen) {
            play($this.data("player"));
          } else {
            pause($this.data("player"));
          }
        }
      }
    });
}

$(function () {
  "use-strict";

  var $body = $("body");
  var articleClassTest = /article-theme--(\S+)/g;
  var colorComboClassTest = /color-combo--(\S+)/g;

  var animationTime = 1,
    isMobile = VERA.isMobile;

  var $articles = $("article.article");

  $articles.each(function () {
    initArticle($(this));
  });

  function initArticle($article) {
    var optionsJson = $article.attr("data-article-options");
    var options = optionsJson === undefined ? {} : JSON.parse(optionsJson);
    videoTiles($article);
    if (options.slideFade) {
      fadeSlide($article);
    }
    fixedHeros($article);
    fullscreen($article);
    explainers($article);
    fadeGalleryImages($article);
    Site.slideout();
  }

  // const scenes = [];
  // $('article[data-anchor-link]').each(function() {

  // 		var scene = new ScrollMagic.Scene({
  // 			triggerElement: this,
  // 		})
  // 		.addTo(VERA.sm)
  // 		.on("enter", scrolledToPage)

  // 		updateSceneHeight(scene);

  // 		scene.duration(function() {
  // 			return scene.eHeight;
  // 		});

  // 		scenes.push(scene);

  // });
  // window.addEventListener("resize", function() {
  // 	scenes.forEach(updateSceneHeight);
  // });

  // function updateSceneHeight(scene)
  // {
  // 	scene.eHeight = $(scene.triggerElement()).outerHeight(true);
  // }

  // function scrolledToPage(event)
  // {
  // 	//var $e = $(event.target.triggerElement());
  // 	//updateColors($e.attr('data-article-theme'));
  // }

  // function updateColors(articleTheme)
  // {
  // 	var newClass = 'article-theme--' + articleTheme;
  // 	if (!articleClassTest.test($body.attr('class'))) {
  // 		$body.addClass(newClass);
  // 	} else {
  // 		$body.attr('class', function(i,c) {
  // 			return c.replace( articleClassTest, newClass );
  // 		});
  // 	}
  // }

  function fadeGalleryImages($article) {
    if (!isMobile) {
      //All elements fade in and slide up
      var $elements = $article.find(
        ".article-image-gallery .article-photo-tile:not(.no-transform):not(.fade-in-animation-initialized)"
      );

      $elements.each(function () {
        TweenMax.set(this, { autoAlpha: 0, y: 100 });
        new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: 0.85,
        })
          .setTween(this, animationTime, { autoAlpha: 1, y: 0 })
          .addTo(VERA.sm);
      });

      $elements.addClass("fade-in-animation-initialized");
    }
  }

  function fadeSlide($article) {
    if (!isMobile) {
      //All elements fade in and slide up
      var $elements = $article.find(
        ".scroll-section > *:not(.no-transform):not(.fade-in-animation-initialized)"
      );

      $elements.each(function () {
        TweenMax.set(this, { autoAlpha: 0, y: 100 });
        new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: 0.85,
        })
          .setTween(this, animationTime, { autoAlpha: 1, y: 0 })
          .addTo(VERA.sm);
      });

      $elements.addClass("fade-in-animation-initialized");
    }
  }

  //Fixed heros
  function fixedHeros($article) {
    var $heroSpacers = $article.find(".banner-spacer");

    $heroSpacers.each(function () {
      var $spacer = $(this);
      var $hero = $spacer.siblings(".article-hero");
      var $bg = $hero.css("background-image");

      if (!$hero.find(".scaler").length) {
        $hero.append(
          '<div class="scaler" style="background-image:' +
            encodeURI($bg).replace(/%22/g, "'") +
            '"></div>'
        );
      }

      $hero.addClass("scaler-container");

      var $scaler = $hero.find(".scaler"),
        $titleWrap = $hero.find(".title_wrap"),
        $screen = $hero.find(".screen");

      $hero.find(".next-slide").on("click", function () {
        var nextSiblingOffset = $hero.next(":not(.show-on-print)").offset();
        TweenLite.set(window, { scrollTo: nextSiblingOffset.top });
      });

      var fade = new TimelineLite({ paused: true })
        .to($hero[0], animationTime, { autoAlpha: 1 })
        .to($screen, animationTime, { autoAlpha: 0.5 }, 0)
        .to($titleWrap, animationTime, { y: 0, autoAlpha: 1 }, 0)
        .to($scaler, animationTime, { scale: 1.3 }, 0);

      var heroScene = new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 0.5,
        duration: determineHeroDuration(),
      })
        .addTo(VERA.sm)
        .on("enter", function () {
          fade.play();
        })
        .on("leave", function () {
          fade.reverse();
        });

      window.addEventListener("resize", function () {
        heroScene.duration(determineHeroDuration());
      });

      function determineHeroDuration() {
        return $spacer.outerHeight(true);
      }
    });
  }

  function fullscreen($article) {
    var $blocks = $article.find(".article-block-wrapper.fullscreen");
    $blocks.each(function () {
      var $block = $(this),
        $content = $block.find(".fullscreen-inner"),
        tween = new TimelineLite({ ease: SlowMo.ease.config(0.7, 0.7, false) })
          .to($content[0], 1, { autoAlpha: 1 })
          .to($content[0], 1, { autoAlpha: 0 }, "+=3");

      var duration = getDuration();
      var scene = new ScrollMagic.Scene({
        triggerElement: this,
        duration: duration,
        triggerHook: 1,
      })
        .addTo(VERA.sm)
        .setTween(tween);
      //.addIndicators({ name: "fixed", indent: 1 })

      TweenLite.set($content[0], { autoAlpha: 0 });

      window.addEventListener("resize", function () {
        scene.duration(getDuration());
      });

      function getDuration() {
        return $block.height();
      }
    });
  }

  function explainers($article) {
    var $explainers = $article.find(
      ".article-section-explainer:not(.slide-in-initialized)"
    );

    $explainers.each(function () {
      //Should really do this with CSS
      if (!isMobile) {
        var timeline = new TimelineLite();
        timeline.to($(this).find(".bar"), animationTime / 2, { scaleY: 1 });
        timeline.to($(this).find(".bar-wrap"), animationTime, {
          x: 0,
          ease: Expo.easeInOut,
        });
        timeline.to(
          $(this).find(".text"),
          animationTime,
          { x: 0, ease: Expo.easeInOut },
          "-=1"
        );

        new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: 0.75,
        })
          .setTween(timeline)
          .addTo(VERA.sm);
      } else {
        TweenLite.set($(this).find(".bar"), { scaleY: 1 });
        TweenLite.set($(this).find(".bar-wrap"), {
          x: 0,
          ease: Expo.easeInOut,
        });
        TweenLite.set(
          $(this).find(".text"),
          { x: 0, ease: Expo.easeInOut },
          "-=1"
        );
      }
    });
  }

  /*
	//Pullquotes
	var $pullquotes = $('article.article .article-pullquote:not(.slide-in-initialized)');

	$pullquotes.each(function() {
		var timeline = new TimelineLite();
		timeline.to($(this).find('.quote'), animationTime, { x: 0, scale: 1, y: 0, ease: Power4.easeInOut });
		timeline.to($(this).find('.text'), animationTime, { x: 0, ease: Power4.easeInOut }, 0);

		new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: .75
		})
		.setTween(timeline)
		.addTo(VERA.sm)
		;
	})
*/
});
