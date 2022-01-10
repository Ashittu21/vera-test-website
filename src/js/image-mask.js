(function() {

  var VERA = window.VERA || {};
  VERA.sm = VERA.sm || new ScrollMagic.Controller();
  window.VERA = VERA;

  VERA.imageMask = function(id) {
    const
      barHeight = 10,
      barRatio = 5

    let
      width,
      height

    const
      container = d3.select('#' + id),
      barsvg = d3.select('#' + id + '-bars'),
      bars = d3.select('#' + id + '-bar-clip')

    const tween = new TimelineLite()
      //.from(container.node(), 1, { autoAlpha: 0})
      .to(barsvg.node(), 1, { y: 0, ease: Linear.easeNone }, 0)

    // new ScrollMagic.Scene({
    //   triggerElement: container.node(),
    //   triggerHook: 0,
    //   duration: '100%'
    // })
    // .addTo(VERA.sm)
    //.setPin(container.select('.pin-container').node())

    new ScrollMagic.Scene({
      triggerElement: container.node(),
      triggerHook: 0,
      duration: '100%'
    })
    .addTo(VERA.sm)
    //.addIndicators({ name: 'pin' })
    .setTween(tween)
    .setPin(container.select('.pin-child-target').node())

    resized()
    window.addEventListener("resize", resized)

    function resized() {
      width = window.innerWidth
      height = window.innerHeight

      var data = []
      var barCount = height/(barHeight*barRatio)
      for (var i=0; i<barCount; i++) {
        data.push({
          y: i*barHeight*barRatio
        })
      }

      var rects = bars
        .selectAll('rect')
        .data(data)

      var enter = rects
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('height', barHeight)

      var update = rects.merge(enter)
        .attr('y', function(d) {
          return d.y
        })
        .attr('width', width)

      rects.exit().remove()
    }
  }
})();