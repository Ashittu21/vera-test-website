var $body;
window.addEventListener("load", function() {
	videoOnLoad()
});

function videoOnLoad()
{
	var
		ytSrc = "https://www.youtube.com/iframe_api",
		vimSrc = "https://player.vimeo.com/api/player.js"

	$body = $('body')

	loadScript(ytSrc);
	loadScript(vimSrc, function() {
		onVimeoApiReady();
	});
}

function loadScript(src,callback)
{
	callback = typeof callback === "function" ? callback : function() {return null};
	var tag = document.createElement('script');
	tag.src = src;
	tag.onload = function() {
		callback();
	}
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function initVideos() {
	onVimeoApiReady()
	onYouTubeIframeAPIReady()
}

const PLAY_ON_SCROLL_TRIGGER_HOOK = 1
function onVimeoApiReady() {

	//var $vimeos = $('.video-player.vimeo');

	//$vimeos.on("click", playVimeo);

	//$('.video-outer').addClass('loaded');

	$('.video-player.vimeo:not(.video-initialized)').each(function() {

		var $player = $(this);
		var player;
		var playOnScroll = $player.attr('data-play-on-scroll') == 'true';
		var $media = setupVideoPlayerIframe($player);

		if (playOnScroll) {

			$media.addClass('iframe_target')
			$media.addClass('play-on-scroll')

			$body.append($media);

			player = new Vimeo.Player($media[0]);

			TweenLite.set( $media[0], { autoAlpha: 0 } );

			var fade = TweenLite.to( $media[0], 0.1, { autoAlpha: 1, paused: true } );

			var sentAnalyticsEvent = false;

			var scene = new ScrollMagic.Scene({
				triggerElement: $player[0],
				triggerHook: PLAY_ON_SCROLL_TRIGGER_HOOK
			})
			.addTo(VERA.sm)
			.setClassToggle($player[0], 'pinned')
			.on('enter', function() {
				if (player.play) {
					player.play();
				}
				fade.play();

				if (!sentAnalyticsEvent) {
					sentAnalyticsEvent = true;
					gaEvent("Video","Play","Play-On-Scroll");
				}
			})
			.on('leave', function() {
				if (player.pause) {
					player.pause();
				}
				fade.reverse();
			})

			scene.duration(determineDuration($player));

			window.addEventListener('resize', function() {
				scene.duration(determineDuration($player));
			});

		} else {

			$player.one("click", function() {

				$player.find('.video-player-cover').remove();

				player = new Vimeo.Player($media[0]);
				player.play();

				$player.data('player', player);

				var scene = new ScrollMagic.Scene({
					triggerElement: $player[0],
				})
				.addTo(VERA.sm)
		/*
				.on('enter', function() {
					player.playVideo();
				})
		*/
				.on('leave', function() {
					player.pause();
				})

				scene.duration(determineDuration($player));

			});

			$player.find('.video-outer').addClass('loaded');

		}

	});

}

function setupVideoPlayerIframe($player) {
	var $iframe = $player.find('.iframe_target');
	$iframe.html($iframe.attr('data-embed'));
	$iframe = $iframe.find('iframe');
	$iframe.attr('allow',"autoplay");
	return $iframe;
}

function onYouTubeIframeAPIReady() {
	//inline videos
	$('.video-player.youtube:not(.video-initialized)').each(function() {

		var $this = $(this).find('.video-player-cover'), $player = $(this);

		$this.addClass('video-initialized');

		var playOnScroll = $player.attr('data-play-on-scroll') == 'true';

		var player;

		if (VERA.isMobile) {

			player = playYoutube($this[0],0);

		} else {

			if (playOnScroll) {

				var sentAnalyticsEvent = false;

				player = playYoutube($this[0], 0);
				if (!player) {
					console.warn('video player missing')
					return
				}

				var $next = $this.parents(':not(:last-child)').next(),
					$media = $player.find('iframe');

				$body.append($media);
				$media.addClass('play-on-scroll');

				TweenLite.set( $media[0], { autoAlpha: 0 } )
				var fade = TweenLite.to( $media[0], 0.1, { autoAlpha: 1, paused: true } );

				var firstBuff = true;
				player.addEventListener('onStateChange', function(event) {
					switch (event.data) {
						case 0:
							if ($next.length) {
								fade.pause(0);
								TweenLite.to( window, 1, { scrollTo: $next.offset().top - window.innerHeight/2 } );
							}
							break;
						case 3:
							if (firstBuff) {
								player.pauseVideo();
							}
							firstBuff = false;

						default:
					}
				})

				player.addEventListener('onReady', function() {
					player.playVideo();
				})

				var scene = new ScrollMagic.Scene({
					triggerElement: $player[0],
					triggerHook: PLAY_ON_SCROLL_TRIGGER_HOOK
				})
				//.addIndicators({ name: 'video' })
				.addTo(VERA.sm)
				.setClassToggle($player[0], 'pinned')
				.on('enter', function() {
					if (player.playVideo) {
						player.playVideo();
					}
					fade.pause(1);
					if (!sentAnalyticsEvent) {
						sentAnalyticsEvent = true;
						gaEvent("Video","Play","Play-On-Scroll");
					}
				})
				.on('leave', function() {
					if (player.pauseVideo) {
						player.pauseVideo();
					}

					fade.pause(0)
				})

				scene.duration(determineDuration($player));

				window.addEventListener('resize', function() {
					scene.duration(determineDuration($player));
				});

			} else {

				$this.one("click", function() {

					player = playYoutube(this,1);

					var scene = new ScrollMagic.Scene({
						triggerElement: $player[0],
					})
					.addTo(VERA.sm)
/*
					.on('enter', function() {
						player.playVideo();
					})
*/
					.on('leave', function() {
						player.pauseVideo();
					})

					scene.duration(determineDuration($player));

					window.addEventListener('resize', function() {
						scene.duration(determineDuration($player));
					});

				});
			}
		}

		$this.addClass('loaded');

	});

	//sidebar videos
	$('.video-play-trigger.youtube:not(.video-initialized)').each(function() {

		var $this = $(this), $media = $('#' + $this.attr('data-media-id'));

		$this.addClass('video-initialized');

		$this.one("click", function() {

			$media.find('.video-player-cover').remove();
			var $player = $media.find('.iframe_target');

			var v = new YT.Player($player[0], {
				height: '390',
				width: '640',
				host: 'https://www.youtube.com',
				origin: window.location.origin,
				videoId: $player.parent().attr('data-videoid'),
				playerVars: {
          showInfo: false,
					host: 'https://www.youtube.com',
					modestbranding: true,
					origin: window.location.origin,
					rel: 0,
					autoplay: 1,
					enablejsapi: 1
				}
			});

			$this.data('player', v);

		});
	});
}

/*

function onPlayerStateChange(event) {
	console.log("statechange", event);
	var $player = $(event.target.getIframe()).closest('.video-player');

	switch (event.data) {
		//playing
		case 1:
			$player.addClass('is-playing');
			break;

		default:
			$player.removeClass('is-playing');
	}
}
*/

function playYoutube(cover,autoplay) {
  var autoplay = typeof autoplay !== undefined ? autoplay : 1;
	var $player = $(cover).parent();
	var $landing = $player.closest('.video-container').siblings('.special-reports-landing')
	var playerId = $player.find('.iframe_target').attr('id');
	var vidPlayer;

	$(cover).fadeOut();

	if ($landing.length) {
		$landing.css({transform: "translateY(0)", "margin-bottom": "60px"});
	}

	if (playerId) {
		vidPlayer = new YT.Player(playerId, {
			height: '390',
			width: '640',
			host: 'https://www.youtube.com',
			videoId: $player.attr('data-videoid'),
			playerVars: {
	      showinfo: 0,
				modestbranding: 1,
				rel: 0,
				autoplay: autoplay,
				origin: window.location.origin,
				enablejsapi: 1
			}
		});

		return vidPlayer

	} else {
		console.warn($player,'missing')
	}
}

// function onPlayerReady(event) {
// 	console.log(event)
//   event.target.mute();
//   event.target.playVideo();
// }

function determineDuration($elem)
{
	return $elem.outerHeight(true);
}


/*
function playVimeo(cover) {

	$(cover).fadeOut();
	$player = $(cover).parent();
	$('.special-reports-landing').css({transform: "translateY(0)", "margin-bottom": "60px"});

	var player = $player.find('.iframe_target');

	player.html(player.attr('data-embed'));

}
*/
