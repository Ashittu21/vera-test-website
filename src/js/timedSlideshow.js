(function() {
//closure

window.addEventListener("load", function() {
  init()
})

const
  DEFAULT_SLIDE_TIME = 4000,
  LONG_SLIDE_TIME = 5500

let
  slideTime = DEFAULT_SLIDE_TIME

const init = function() {
  var containers = document.querySelectorAll('.timed-slideshow');
  [].forEach.call(containers, (container) => {
    new initSlideshow(container);
  })
}

const initSlideshow = function(container) {

  let fadeTl;

  let
    scrollDownOnComplete = false,
    resetOnScrollTo = true

  var
    $scroller = $('html,body'),
    slides = container.querySelectorAll('.timed-slideshow-item'),
    slideCount = slides.length,
    options = JSON.parse(container.dataset.options)

  let
    currentSlideIndex,
    currentSlide

  let slideTimer

  if (!slideCount) {
    console.log("No slides");
    return
  }

  if (options.asHero) {
    scrollDownOnComplete = true,
    resetOnScrollTo = true
  }

  if (resetOnScrollTo) {
    const sm = new ScrollMagic.Controller()

    new ScrollMagic.Scene({
      triggerElement: container,
      triggerHook: 0.5,
      duration: container.getBoundingClientRect().height
    })
    .on('enter', (event) => {
      startOver()
    })
    .addTo(sm)
  }

  let continueShow = true
  const nextSlide = function() {
    currentSlideIndex++;
    if (currentSlideIndex >= slideCount) {
      currentSlideIndex = 0;

      if (scrollDownOnComplete) {
        const rect = container.getBoundingClientRect(),
          scrollTo = +rect.height + $(container).offset().top

        if ($scroller.scrollTop() < rect.height) {
          $scroller.animate({
            scrollTop: scrollTo
          })
        }
        continueShow = false;
      }
    }
    if (continueShow) {
      currentSlide = changeSlide(currentSlide, slides[currentSlideIndex])
    }
  }

  const startOver = () => {
    if (slideTimer) { clearTimeout(slideTimer)}
    if (fadeTl) {
      fadeTl.pause().clear()
    }
    currentSlideIndex = -1
    currentSlide = null
    continueShow = true
    TweenLite.set(slides, { autoAlpha: 0 })

    const videos = container.querySelectorAll('video');
    [].forEach.call(videos, (video) => {
      video.pause()
    })

    nextSlide()
  }

  const initSlides = (slides) => {
    //init videos
    [].filter.call(slides, function(slide) {
      var video = slide.querySelector('video')
      if (video) {
        var onEnd = function() {
          video.pause()
          nextSlide()
        }
        video.addEventListener('ended', onEnd)
      }
    })
  }

  const changeSlide = (prev,next) => {

    var video = next.querySelector('video');
    var copy = next.querySelector('.heading');

    if (copy !== null) {
      let copyLength = copy.innerHTML.length
      if (copyLength > 150) {
        slideTime = LONG_SLIDE_TIME
      }
    }

    fadeTl = new TimelineLite({
      paused: true,
      onComplete: video === null ? function() {
        slideTimer = setTimeout(function() {
          nextSlide()
        }, slideTime)
      } : null
    });

    if (prev) {
      fadeTl.to( prev, 1, { autoAlpha: 0 })
    }
    fadeTl.to( next, 1, { autoAlpha: 1 })

    if (video) {
      video.currentTime = 0;
      video.play()
    }

    fadeTl.play()

    return next
  }

  initSlides(slides)
  startOver()
}
//closure
})();
