$(function() {
  var TIME = .75
  var time = TIME
  var ease = Power3.easeInOut
  var headerHeight = $('header').height()
  var $enterBar = $('.cover .enter-bar')
  const tiles = $('.cover .tile');
  const ztop = 3;
  const zbottom = 2;
  var line = $('.cover .line')[0]

  function makeCoverTween() {
    var isMobile = window.innerWidth < 1024;
    var coverTween = new TimelineMax({ paused: true })
    var enterBarWidth = isMobile ? 0 : $enterBar.width();
    var lineTo = {
      ease: ease
    }

    var lineFrom = {}

    if (isMobile) {
      lineFrom.width = 0;
      lineFrom.height = "1px"
      lineTo.width = "100%"
    } else {
      lineFrom.height = 0;
      lineFrom.width = "1px"
      lineTo.height = "100%"
    }


    coverTween.to('.cover .loader', time/2, { ease: ease, autoAlpha: 0 }, 0)
    coverTween.fromTo( line, time/2, lineFrom, lineTo, 0)

    tiles.each(function(i,elem) {
      time = i === 0 ? 0 : TIME

      var tileTo = getTileTo(isMobile)
      tileTo.onComplete = function() {
        TweenLite.set( elem, { zIndex: i + ztop + 2 })
      }
      coverTween.set( elem, { visibility: 'visible', zIndex: i + ztop })
      coverTween.fromTo( elem, time, getTileFrom(i,isMobile), tileTo );
    })

    coverTween
      .add("revealText")
      .staggerTo('.state-of-2018-heading > div,.state-of-2019-heading > div', time, { autoAlpha: 1, y: 0, x: 0 }, time/4)
      .to( '.tile-intro', time, { width: window.innerWidth -  enterBarWidth}, "revealText")
      .to( $enterBar[0], time, { x: 0 }, "revealText +=" + time )
      .to( line, time, { x: !isMobile ? -enterBarWidth/2 : 0  }, "revealText")
      .set( '.tile-intro', { width: "calc(100vw - " + enterBarWidth + "px)" })
      .to( 'header', time, { autoAlpha: 1 })

    return coverTween
  }

  function getTileFrom(count,isMobile) {
    var props = {
      transformOrigin: 'center'
    }
    if (isMobile) {
      props.y = count%2 === 1 ? "-100%" : "100%"
    } else {
      props.x = count%2 === 1 ? "100%" : "-100%"
    }

    return props
  }

  function getTileTo(isMobile) {
    var props = tileTo = {
      ease: ease
    }

    if (isMobile) {
      props.y = "0%"
    } else {
      props.x = "0%"
    }

    return props
  }

  window.coverTween = makeCoverTween();

  window.addEventListener("resize", function() {
    window.coverTween = makeCoverTween()
    window.coverTween.pause(coverTween.duration())
  })

  {% if landing.id == entry.id %}
  tiles.imagesLoaded({ background: true }, function() {
    window.coverTween.play();
  })
  {% else %}
  coverTween.seek(coverTween.duration());
  {% endif %}
})