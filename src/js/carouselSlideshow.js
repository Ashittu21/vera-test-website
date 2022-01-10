(function() {
//closure

  window.addEventListener("load", function() {
    init()
  })

  const init = function() {
    $('.carousel-slideshow').flickity({
      wrapAround: true,
      pageDots: false,
      prevNextButtons: false,
      imagesLoaded: true
    })
  }
//closure
})();
