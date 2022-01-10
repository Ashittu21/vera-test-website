(function() {
//closure

window.addEventListener("load", function() {
  init()
})

const init = function() {
  var containers = document.querySelectorAll('.scrolling-slideshow');
  [].forEach.call(containers, (container) => {
    new initSlideshow(container);
  })
}

const initSlideshow = function(container) {

  var slides = container.querySelectorAll('.scrolling-slideshow-item'),
    slideCount = slides.length

  let
    currentSlideIndex,
    currentSlide

  if (!slideCount) {
    console.log("No slides");
    return
  }

  const initSlides = (slides) => {
    const sm = new ScrollMagic.Controller();

    console.log(container)

    new ScrollMagic.Scene({
      triggerElement: container,
      triggerHook: 0,
      offset: $('.header').height()/2
    })
      .addTo(sm)
      .setClassToggle(container, 'active')
      ;

    //init videos
    [].filter.call(slides, function(slide) {
      const media = slide.querySelector('.scrolling-slideshow-item-media')
      const video = media.querySelector('video');
      if (video) {
        video.setAttribute('autoplay', true);
        video.setAttribute('loop', true);
      }
      new ScrollMagic.Scene({
        triggerElement: slide,
        duration: window.innerHeight
      })
        .on("enter", function() {
          media.classList.add("active")
          if (video) {
            video.play()
          }
        })
        .on("leave", function() {
          media.classList.remove("active")
          if (video) {
            video.pause()
          }
        })
        .addTo(sm)
    })
  }

  initSlides(slides)
}
//closure
})();
