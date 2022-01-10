(function (window) {
  "use strict";

  var VERA = window.VERA || {};

  window.VERA = VERA;

  $(function () {
    VERA.sm = VERA.sm || new ScrollMagic.Controller();
    VERA.article = new Article();
  });

  var Article = function () {
    var self = this;
    this.headers = $('.featured-banner.editorial:not(.show-on-print)');

    // console.log(this, 'this?')

    if (this.headers.length) {
      this.headers.each(function () {
        var scroll = $(this).filter('.editorialIntroduction').length ? true : false;
        header(this, scroll);
      });
    }

    var $dropdown = $('.dropdown');
    var $dropdownOuter = $('.dropdown-outer');
    var $dropdownCurrent = $dropdownOuter.find('.dropdown-active');
    var $radialNav = $('.header__menu-radial');
    var $headerTiles = $('.header-tiles')

    intialSetRadialNavChapter()

    //TODO I think we don't need this because scrollmagic initializes (DV 7/18/18)
    if (window.location.hash) {
      $dropdown.find('.anchor-link.active').removeClass('active');
      var $currentAnchor = $('.anchor-link[href="' + window.location.hash + '"]');
      $currentAnchor.addClass('active');
      $dropdownCurrent.text($currentAnchor.data('chapter'));
    }

    if ($('.article p img').length) {
      if ($('.article p img').css('float') === 'left') {
        $('.article p img').addClass('c-figure--left')
      }

      if ($('.article p img').css('float') === 'right') {
        $('.article p img').addClass('c-figure--right')
      }
    }

    $('.anchor-link').on("click", function (e) {

      e.preventDefault();

      var $this = $(this);

      changeChapter($this, true);

      $dropdownOuter.removeClass('open');
      $headerTiles.removeClass('mainnav-open');

    });

    $('.share-overlay .icon-print').on("click", function (event) {
      event.preventDefault();
      window.print();
    });


    if (!$('.campaignSlide').length || $('.touch').length) {

      // don't use scroll magic for campaign
      $('.anchor--chapter').each(function () {

        var $this = $(this);
        var $link = $('.anchor-link[href="#' + $this.attr('id') + '"]');
        var $prev = $('.anchor-link[href="#' + $this.prevAll('.anchor--chapter').first().attr('id') + '"]');

        var scene = new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: .5
        })
          .on('enter', function () {
            changeChapter($link);
          })
          .on('leave', function () {
            changeChapter($prev);
          })
          .addTo(VERA.sm)
          ;


      });

      // Update radial nav
      window.addEventListener('scroll', _.throttle(animateRadialNav, 500))
    }

    function intialSetRadialNavChapter() {
      if (!$radialNav.length) return;

      var $articles = $('article[data-anchor-link]');
      $articles.each(function (i, el) {
        if ($(el).hasClass('active')) {
          if ($(el).hasClass('js-hide-radial-nav')) {
            $radialNav.addClass('is-intro')
          } else {
            $radialNav.removeClass('is-intro')
          }
          updateRadialNavChapter(i)
        }
      })
    }

    function animateRadialNav() {
      if (!$radialNav.length) return;

      var $articles = $('article[data-anchor-link]');
      var $introArticle = $articles.filter('.js-hide-radial-nav');
      var currentEl = $articles.first();
      var index = 1;
      if ($introArticle.length) {
        var scrollPerc = window.pageYOffset - $introArticle.outerHeight() + $('header').outerHeight() + $('footer').outerHeight();
      } else {
        var scrollPerc = window.pageYOffset + $('header').outerHeight() + $('footer').outerHeight();
      }
      $radialNav.removeClass('is-intro');

      $articles.each(function (i, el) {
        var elementTop = $(el).offset().top;
        var elementBottom = elementTop + $(el).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        // get element currently in viewport
        if (elementBottom > viewportTop && elementTop < viewportBottom) {
          if ($articles.hasClass('js-hide-radial-nav')) {
            index = i;
          } else { index = i + 1; }
          currentEl = el;

          if ($(currentEl).hasClass('js-hide-radial-nav')) {
            $radialNav.addClass('is-intro')
          } else {
            $radialNav.removeClass('is-intro')
          }
        }
      })

      var $articlesArray = $articles.not('.js-hide-radial-nav');
      // TODO: refactor and use for loop instead of if / else below
      // for (var c = 1; c < $articles.length; c++) {
      // 	if (index > 1) {
      // 		scrollPerc = scrollPerc - $($articlesArray[index - 1]).prevAll('article[data-anchor-link]').outerHeight();
      // 		// $articlesArray.each(function(i, el){
      // 		// 	scrollPerc = scrollPerc - el
      // 		// })
      // 		// scrollPerc = scrollPerc - ($($articles[index - 1]).outerHeight())
      // 	}
      // }

      if (index === 2) {
        scrollPerc = scrollPerc - $($articlesArray[0]).outerHeight();
      } else if (index === 3) {
        scrollPerc = scrollPerc - $($articlesArray[0]).outerHeight() - $($articlesArray[1]).outerHeight();
      } else if (index === 4) {
        scrollPerc = scrollPerc - $($articlesArray[0]).outerHeight() - $($articlesArray[1]).outerHeight() - $($articlesArray[2]).outerHeight();
      } else if (index === 5) {
        scrollPerc = scrollPerc - $($articlesArray[0]).outerHeight() - $($articlesArray[1]).outerHeight() - $($articlesArray[2]).outerHeight() - $($articlesArray[3]).outerHeight();
      }

      // mobile styles
      if (window.innerWidth < 700) {
        if ($(currentEl).prev().attr('id') == 'introduction') {
          $radialNav.addClass('is-intro')
        } else {
          $radialNav.removeClass('is-intro')
        }

        if ($articles.hasClass('special-reports-chapter')) {
          index -= 1
        }
      }

      updateRadialNavChapter(index)

      var $circle = $('.circle');
      if (percentScrolled(currentEl, scrollPerc) > 0)
        $circle.attr('stroke-dasharray', percentScrolled(currentEl, scrollPerc) + ', 100')
    }

    function updateRadialNavChapter(index) {
      var currentChapter = $radialNav.find('.current-chapter')
      if (index < 1) index = 1
      currentChapter.html(index)
    }

    function percentScrolled(article, scrollDistance) {
      var $articleHeight = $(article).height();
      var percentScrolled = scrollDistance / $articleHeight;

      return Math.floor(percentScrolled * 100);
    }

    function changeChapter($anchorLink, scroll) {

      scroll = scroll || false;

      if ($dropdown) {
        $dropdown.find('.anchor-link.active').removeClass('active');
        $anchorLink.addClass('active');
        $dropdownCurrent.text($anchorLink.data('chapter'));
      }

      var hash = $anchorLink.attr('href');
      if (hash !== undefined) {
        var id = hash.replace('#', '');
      }

      try {
        if (history.pushState) {
          //history.pushState(null, null, hash);
        } else {
          location.hash = hash;
        }
      } catch (e) {
        console.log(e)
      }

      if (!$('.campaignSlide').length || $('.touch').length) { }

      if (scroll && (!$('.campaignSlide').length || $('.touch').length)) {
        $('html,body').animate({
          scrollTop: $('#' + id).offset().top
        });
      }

    }
  };

  function header(header, scroll) {

    scroll = scroll || false;

    var $header = $(header);
    var $line = $header.find('.line');
    var $title = $header.find('.title');
    var $subtitle = $header.find('.subtitle');
    var $overview = $header.find('.overview');
    var $screen = $header.find('.screen');

    var scene, timer;

    var titleProps = {
      opacity: 1,
      webkitFilter: "blur(0px)",
      filter: "blur(0px)",
      x: 0
    }

    var intro = new TimelineMax({ paused: scroll })
      .to($title, 1, titleProps)
      .to($subtitle, 1, titleProps, 0)

    if (scroll) {

      if ($(window).scrollTop() > 0) {
        intro.time(1);
      } else {
        intro.play();
      }

    } else {

      var scene = new ScrollMagic.Scene({
        triggerElement: header,
        triggerHook: 0.5
      })
        .setTween(intro)
        .addTo(VERA.sm)

    }


    if (scroll) {

      createScene();

      window.addEventListener("resize", function () {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          scene.destroy(true);
          createScene();
        }, 100);
      });

    }

    $header.find('video').on("canplaythrough", function () {
      this.play();
    });


    function createScene() {

      $line.css({ height: "" });

      if (scroll) {
        var timeline = new TimelineMax()
          .to($title, 1, { opacity: 0, webkitFilter: "blur(5px)", filter: "blur(5px)", delay: 1 })
          .to($subtitle, 1, { opacity: 0, webkitFilter: "blur(5px)", filter: "blur(5px)", delay: 1 }, 0)
          .to($line, .5, { height: 0 })
          .to($line, .2, { opacity: 0, delay: .3 })
          .to($screen, .25, { opacity: .5 })
          .to($overview, .25, { opacity: 1, delay: .5 })

      }

      scene = new ScrollMagic.Scene({
        triggerElement: header,
        offset: getHeaderHeight(),
        triggerHook: 0,
        duration: '100%'
      })
        .setPin(header)
        .setTween(timeline)
        .addTo(VERA.sm)

      $header.find('video').each(function () {
        this.play();
      });

      function getHeaderHeight() {

        return -$('.header').height();

      }

    }
  }

})(window);
