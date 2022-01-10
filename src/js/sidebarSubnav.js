(function(window){
  "use-strict";

  var VERA = window.VERA || {};
  VERA.initSidebar = initSidebar;
  window.VERA = VERA;

  var els = {};

  function initSidebar() {
    els.$article = $('.js-subnav-anchor');
    els.$link = $('.js-subnav-link');
    els.$container = $('.js-has-subnav');
    els.$nav = $('.sidebar-subnav')
    els.$header = $('header.header')

    els.$link.on('click', goToSection)

    setActive();

    window.addEventListener('scroll', _.throttle(setActive, 50))
  }

  function goToSection(e) {
    var current = e.currentTarget;
    var href = current.dataset.target;

    $('html, body').animate({
      scrollTop: $('#' + href).offset().top - els.$header.height()
    });
  }

  function setActive() {
    var pageOffset = window.pageYOffset;
    var elOffset = els.$container.offset().top

    if ((pageOffset >= elOffset) && (pageOffset <= elOffset + els.$container.height())) {
      els.$nav.addClass('is-fixed')
    } else {
      els.$nav.removeClass('is-fixed')
    }

    els.$link.each(function(i, el){
      var reference = el.dataset.target;
      var parentEl = el.parentElement;
      var section = document.getElementById(reference);

      if(pageOffset >= $(section).offset().top - 200) {
        parentEl.classList.add('is-active')
      } else {
        parentEl.classList.remove('is-active')
      }
    })
  }

})(window);
