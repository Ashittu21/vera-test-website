(function() {
  "use strict"

  var VERA = window.VERA || {};
  VERA.sm = VERA.sm || new ScrollMagic.Controller();
  VERA.textSlideshow = init;
  window.VERA = VERA;

  var $body = $('body'),
    $container,
    $slide,
    slideTween

  function init(callback) {
    $container = $('.article-text-slideshow')
    $slide = $container.find('.article-text-slide')

    $slide.each(function(i, el) {
      var $animatableEl = $(el).find('.article-text-slide__wrapper')

      const
        startProps = {
          autoAlpha: 0,
          y: 10,
          webkitFilter: 'blur(10px)',
          filter:'blur(10px)'
        },
        endProps = {
          autoAlpha: 1,
          y: 0,
          webkitFilter: 'blur(0px)',
          filter:'blur(0px)'
        }

      TweenLite.set($animatableEl, startProps)

      var animation = new TimelineLite()
        .to($animatableEl, 1, endProps)
        .to($animatableEl, 1, startProps, "+=1")


      var scene = new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 0.5,
        duration: '100%'
      })
      .setTween(animation)
      .addTo(VERA.sm)
     //.addIndicators()
    });
  }

  window.addEventListener("resize", function() {})

  function getScreenDuration() {
    return $slide.height()*0.85
  }

})();
