(function(window) {
  "use strict";

  var VERA = window.VERA || {};

  window.VERA = VERA;

  VERA.initPercentagePeopleData = function() {
    $('.percentage-people-visualization:not(.percentage-people-visualization-initialized)').each(function(i,elem) {
      initPercentagePeople(elem)
    });
  }

  function initPercentagePeople(elem) {
    var
      INTERVAL = 3000,
      shifts = JSON.parse(elem.dataset.percentagePeopleShifts),
      pathString,
      pWidth,
      pHeight,
      data,
      shiftIndex=0,
      currentShift=shifts[shiftIndex],
      ran=false

    elem.classList.add('percentage-people-visualization-initialized')

    var pointType = elem.dataset.pointType
    switch (pointType) {
      case 'person':
          pathString = "M18 26V11c0-1.2-1-2.2-2.2-2.2h-4.7l.8-5.1c.1-.2.1-.4.1-.6V3c0-1.6-1.4-3-3-3-1.7 0-3 1.3-3 3v.1c0 .2 0 .4.1.6l.8 5.1H2.2C1 8.8 0 9.8 0 11v16.5c0 1.8.8 2.9 2.3 3.1v-.9C.8 29.5.9 27.5.9 27.5h1.4V12.6h.9v35.6c-.9.3-1.9.8-1.9 1.7h7.3v-19h.9V50h7.3c0-.9-1-1.5-1.9-1.7V12.7h.9v14.8h1.4s.1 2-1.4 2.2v.9c1.5-.2 2.3-1.3 2.3-3.1L18 26z",
          pWidth = 18,
          pHeight = 50
        break;
      default:
    }

    var cols = 20,
      rows = 100/cols,
      xPad = 4,
      yPad = 4,
      pointWidth = pWidth + xPad*2,
      pointHeight = pHeight + yPad*2

    var
      width = cols*pointWidth,
      height = rows*pointHeight

    var svg = d3.select(elem).select('.data-viz-fact-visualization').append('svg')
      .attr("width",width).attr("height",height)
      .attr("viewBox","0 0 "+width+" "+height)

    var captions = elem.querySelectorAll('.data-viz-fact-caption');

    var win = $(window);
    var viewport = {
      top : win.scrollTop(),
      left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    d3.select(elem).selectAll('.data-viz-fact-caption').attr("style", "transition-duration: " + INTERVAL/1000 + 's')

    update(data,shifts[shiftIndex])

    window.addEventListener('scroll', _.throttle(setIntervals, 500))

    function setIntervals() {
      var parent = $(elem).parent()
      var elementTop = parent.offset().top;
      var elementBottom = elementTop + parent.outerHeight();

      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && (elementTop - 250) < viewportBottom) {
        if (elem.classList.contains('is-animating')) return;
        elem.classList.add('is-animating')
        elem.intervalSet = setInterval(update, INTERVAL)
      } else {
        if (!elem.classList.contains('is-animating')) return;
        elem.classList.remove('is-animating')
        clearInterval(elem.intervalSet)
      }
    }

    function update() {
      d3.select(captions[shiftIndex]).classed('is-active', false)
      shiftIndex++
      if (shiftIndex >= shifts.length) {
        shiftIndex = 0
      }
      d3.select(captions[shiftIndex]).classed('is-active', true)
      var reverse = currentShift.percentageHighlighted < shifts[shiftIndex].percentageHighlighted

      currentShift = shifts[shiftIndex]
      data = []
      for (let i=0; i<100; i++) {
        data.push({
          highlight: i>=(100 - currentShift.percentageHighlighted)
        })
      }

      var points = svg
        .selectAll(".point")
        .data(data)

      var enter = points.enter()
        .append('path')
        .attr('d', pathString)
        .attr('class', 'point receives-fill-color')
        .attr('transform', function(d,i) {
          var
            row = i%rows,
            col = Math.floor(i/rows)

          return 'translate(' + (col*(pointWidth) + xPad) + ',' + (row*pointHeight + yPad) + ')'
        })

      points.merge(enter)
        .transition()
        .delay(function(d,i,n) {
          return reverse ? (n.length*20 - i*20) : i*20
        })
        .attr('class', function(d,i) {
          return 'point receives-fill-color' + (d.highlight ? ' will-highlight receives-fill-highlight' : '')
        })

      points.exit().remove()
    }
  }
})(window);
