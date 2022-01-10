$(function() {
  "use strict";

  var VERA = window.VERA || {};

  VERA.sm = VERA.sm || new ScrollMagic.Controller();

  scrollAnimations();

  function scrollAnimations() {
    const
      $el = $('.js-wrapper'),
      $box = $('.wire-box-content'),
      $layer1 = $('#layer-planes'),
      $layer2 = $('#layer-wireframe'),
      $layer3 = $('#layer-dots'),
      $subwayNav = $('.subway-nav-wrap')

    const contentAnimation = new TimelineMax()
      .to($el, 0.6, { autoAlpha: 1, webkitFilter: 'blur(0px)', filter:'blur(0px)' })

    const boxAnimation = new TimelineMax()
      .to($layer2, 0.6, { autoAlpha: 1 })
      .to($layer3, 0.6, { autoAlpha: 1 })
      .to($layer1, 0.6, { autoAlpha: 0 })
      .to($subwayNav, 0.6, { autoAlpha: 1 })

    const scene = new ScrollMagic.Scene({
      triggerElement: $box[0],
      triggerHook: 0,
      duration: '100%'
    })
    // .addIndicators()
    .setTween(boxAnimation)
    .setPin('.js-wrapper', { pushFollowers: true })
    .addTo(VERA.sm)

    const scene2 = new ScrollMagic.Scene({
      triggerElement: $box[0],
      triggerHook: 0,
      duration: 0,
      offset: -$('#Header').outerHeight()
    })
    // .addIndicators()
    .setTween(contentAnimation)
    .addTo(VERA.sm)
  }

  window.VERA = VERA;

});
