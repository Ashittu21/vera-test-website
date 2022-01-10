//RP Bars animation
(function() {
  var
    CANVAS_ID = "ReimaginingPrisonsBars",
    FACE_ID = "RPFace",
    BAR_SPACING = 100,
    BAR_TIME = .7,
    MOBILE_BREAK = 600,
    headingSize,
    strokeWidth,
    faceX,
    faceY

  $(function() {
    var width, height, playTween

    var
      container = d3.select('#' + CANVAS_ID),
      svg = container.append('svg'),
      barG = svg.append('g'),
      textG = svg.append('g'),
      head = d3.select('#' + FACE_ID),
      headPath = head.select('path')

      headPath.attr('visibility', 'hidden')
      headPath.attr('stroke-width', strokeWidth).attr('stroke', 'white')

    resize()
    var resizeTimer = null
    window.addEventListener("resize", function() {
      resizeTimer = setTimeout(function() {
        if (resizeTimer) clearTimeout(resizeTimer)
        resize()
      }, 100)
    })

    var VERA = window.VERA || {};
    VERA.sm = VERA.sm || new ScrollMagic.Controller();
    window.VERA = VERA;

    new ScrollMagic.Scene({
      triggerElement: container.node(),
      duration: '100%'
    })
    .addTo(VERA.sm)
    .on('enter', function() {
      playTween.play(0)

    })

    function resize() {
      width = window.innerWidth,
      height = window.innerHeight,
      headingSize = width > MOBILE_BREAK ? BAR_SPACING*.7 : BAR_SPACING*.4,
      faceX = width > MOBILE_BREAK ? .7 : .25,
      faceY = width > MOBILE_BREAK ? 1.3 :  1.5,
      textY = width > MOBILE_BREAK ? 1.2 :  2.3,
      strokeWidth =  width > MOBILE_BREAK ? 10 : 6,

      svg.attr('viewBox', '0 0 ' + width + ' ' + height)

      playTween = draw();
    }

    function draw() {
      var numBars = Math.floor((height - BAR_SPACING)/BAR_SPACING)
      var data = []
      for (var i=0; i<=numBars; i++) {
        data.push({
          y: i*BAR_SPACING
        })
      }

      var reimagineIndex = Math.round(data.length/2) - 1,
        prisonIndex = reimagineIndex + 1,
        subtitleIndex = prisonIndex + 1

      var leftoverY = (height - numBars*BAR_SPACING)/2;

      var bars = barG
        .selectAll('.rp-bar')
        .data(data)

      var enter = bars
        .enter()
        .append('path')
        .attr('class', 'rp-bar')

      var updateBars = bars.merge(enter)
        .transition()
        .attr('d', (d) => 'M0 ' + 0 + 'L' + width + ' ' + 0)
        .attr('stroke-width', strokeWidth)
        .attr('stroke', 'white')
        .attr('fill', 'none')
        .attr('transform', (d) => `translate(0 ${(leftoverY + d.y)})`)

      bars.exit().remove()

      textG.selectAll('*').remove()
      var
        textX = width > MOBILE_BREAK ? width/2 : 10,
        textAnchor = width > MOBILE_BREAK ? 'middle' : 'start'

      textG
        .append('text')
        .text('Reimagining')
        .attr('fill', 'white')
        .attr('class', 'title ff-sans--bold uppercase')
        .attr('font-size', headingSize)
        .attr('text-anchor', textAnchor)
        .attr('dominant-baseline', 'middle')
        .attr('transform', (d) => `translate(${textX} ${(leftoverY + data[reimagineIndex].y - (textY*headingSize/2))})`)

      textG
        .append('text')
        .text('Prison')
        .attr('fill', 'white')
        .attr('class', 'title ff-sans--bold uppercase')
        .attr('font-size', headingSize)
        .attr('text-anchor', textAnchor)
        .attr('dominant-baseline', 'middle')
        .attr('transform', (d) => `translate(${textX} ${(leftoverY + data[prisonIndex].y - (textY*headingSize/2))})`)

      // textG
      //   .append('text')
      //   .text('An aspiration and blueprint for reform ')
      //   .attr('fill', 'white')
      //   .attr('class', 'subtitle ff-walsheim h3')
      //   .attr('font-size', headingSize)
      //   .attr('text-anchor', textAnchor)
      //   .attr('dominant-baseline', 'middle')
      //   .attr('transform', (d) => `translate(${textX} ${(leftoverY + data[subtitleIndex].y - (textY*1.1*headingSize/2))})`)

      TweenMax.set(bars.nodes(), { clearProps: 'all' })

      if (playTween) {
        playTween.kill()
      }
      return createAnimation(updateBars.nodes())
    }

    function createAnimation(bars) {
      var
        timeline = new TimelineLite({ paused: true, onComplete: function() {
          container.select('.next-slide-wrap').classed('is-hidden', false)
        } }),
        mid = Math.round(bars.length/2),
        faceTime = BAR_TIME*.33*(bars.length - 1)/2


      bars.forEach(function(bar,i) {
        //timeline.to(bar, BAR_TIME, { x: i%2 ? '-100%' : '100%' }, '-=' + BAR_TIME*.66)
        if (i !== mid) {
          timeline.to(bar, BAR_TIME, { x: i%2 ? '-100%' : '100%', strokeWidth: 1 }, '-=' + BAR_TIME*.66)
        }
      })
      if (width <= MOBILE_BREAK) {

        timeline.to(textG.select('text:nth-child(2)').node(), BAR_TIME, { y: '-=' + headingSize*1.3 }, faceTime)
        timeline.to(textG.select('text:nth-child(3)').node(), BAR_TIME, { y: '-=' + headingSize*2.6 }, faceTime)
      }
      timeline.to(bars[mid], BAR_TIME*2, { morphSVG: "#Face", scale: 1, x: width > MOBILE_BREAK ? width*faceX : width - 190, y: faceY*(height - headPath.attr('height'))/2 }, faceTime)

      //timeline.to(headPath.node(), BAR_TIME*bars.length, { drawSVG: "100% 0" }, .5)

      return timeline
    }
  })

})()
