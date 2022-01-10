(function (window) {
  "use strict";

  var VERA = window.VERA || {};
  VERA.initCarousel = setupCarousel;
  window.VERA = VERA;

  function setupCarousel(options) {
    options = options || {};
    var $carousel = $(".js-carousel");
    var $title = $(".js-fade-out");
    var $flk = $carousel.flickity({
      cellAlign: options.cellAlign || "center",
      imagesLoaded: true,
    });

    // fade out title on scroll
    $carousel.on("scroll.flickity", function (event, progress) {
      if (!$title || window.innerWidth < 1025) return;

      var currentIndex = $carousel.data("flickity").selectedIndex;
      if (currentIndex > 0) {
        $title.fadeOut();
      } else {
        $title.fadeIn();
      }
    });

    $carousel.on(
      "staticClick.flickity",
      function (event, pointer, cellElement, cellIndex) {
        // dismiss if cell was not clicked
        if (!cellElement) return;

        // select cell on click
        $carousel.find(".is-selected").removeClass("is-selected");
        $(cellElement).addClass("is-selected");
        $flk.flickity("select", cellIndex);
      }
    );
  }

  document.fonts.ready.then(function () {
    $(".flickity-enabled").flickity("resize");
  });
})(window);
