(function() {
  var VERA = window.VERA || {};
  VERA.sm = VERA.sm || new ScrollMagic.Controller();
  window.VERA = VERA

  $(function() {
    $('.ByTheNumbers-row:not(.ByTheNumbers-row-initialized)').each(function(i,n) {
      $(n).addClass('ByTheNumbers-row-initialized');
      var $e = $(n).find('[data-count-number]');
      var $spacer = $e.find('.ByTheNumbers-figure-spacer');
      var $target = $e.find('.ByTheNumbers-figure-target');
      var data = JSON.parse($e.attr('data-count-number'))
      var format = d3.format(data.format)
      var counter = {
        count: 0
      }

      $spacer.text(format(data.number))

      var tween = new TimelineLite({ paused: true})
      tween.to(n, 1, { autoAlpha: 1 })
      tween.to(counter, 1, {
        count: data.number,
        onUpdate: function() {
          $target.text(format(counter.count));
        }
      }, 0)

      new ScrollMagic.Scene({
        triggerElement: $e[0],
        triggerHook: .75
      })
      .on('start', function(e) {
          e.scrollDirection === "FORWARD" || e.scrollDirection === "PAUSED" ? tween.play(0) : tween.reverse(0)
      })
      .addTo(VERA.sm)
    })
  })
})()