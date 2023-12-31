// Append Polyfill
// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty("append")) {
      return;
    }
    Object.defineProperty(item, "append", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(
            isNode ? argItem : document.createTextNode(String(argItem))
          );
        });

        this.appendChild(docFrag);
      },
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

//Array find polyfill
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, "find", {
    value: function (predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true,
  });
}

//Event IE11 poly
(function () {
  if (typeof window.CustomEvent === "function") return false; //If not IE

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.Event = CustomEvent;
})();

function slugify(string) {
  return string
    .toLowerCase()
    .replace(".", "")
    .replace(",", "")
    .replace(/\s/g, "-");
}

var Site = {
  $body: $("body"),
  $header: $("#Header"),
  $navToggle: $("#HeaderMenuToggle"),
  $search: $("#HeaderSearch"),
  headerHeight: $("#Header").outerHeight(),
  ww: $(window).width(),
  wh: $(window).height(),
  hasTouch: false,
  winScrollTop: 0,

  init: function () {
    Site.touchDetection();
    Site.search();
    Site.scrollTo();
    Site.subNav();
    Site.toggleNav();
    Site.sectionNav.init();
    Site.ourWork();
    Site.footer.init();
    Site.squaresInit();
    HighlightShare();
    Site.loadLazySvg();
    Site.images.fadein();
  },

  initConditionals: function () {
    /*
        if($('.homepage-banner').length) {
            Site.homepage.init();
        }
*/
    //remove background-attachment fixed on ios
    var deviceAgent = navigator.userAgent.toLowerCase();
    if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
      $(".i-parallax").removeClass("parallax");
    }

    if ($(".filter").length) {
      Site.modules.filter.init();
    }

    if ($(".share").length) {
      Site.share.init();
    }

    // $(window).on('load', function() { // new...
    if (
      $(".no-touch .fixed-share").length &&
      ($(".fixed-share").closest(".module-intro__content").length ||
        $(".fixed-share").closest(".module-text__inner").length)
    ) {
      // TODO: check this?
      Site.share.fixedPosScroll();
    }
    // });

    if ($(".module-carousel").length) {
      Site.carousel.init();
    }

    if ($(".quote-carousel").length) {
      Site.carousel.quote();
    }

    if ($(".featured-stream-modules").length) {
      Site.carousel.featuredModules();
    }

    if ($(".post-sidebar__series").length) {
      Site.carousel.sidebar();
    }

    if ($(".scroll-to").length) {
      Site.clickScroll.init();
    }

    if ($(".dropdown-outer").length) {
      Site.fakeDropdown();
    }

    if ($(".trigger-modal").length) {
      Site.modal.init();
    }

    if ($(".module-columns-3up").length) {
      Site.sameHeight.init(".module-columns-3up .col > a");
      Site.sameHeight.init(".module-columns-3up .col > .text-outer");

      /*
            for(var i = 1; i <= 10; i++) {
                Site.sameHeight.init('.module-columns-3up .col li:nth-child(' + i + ')');
            }
*/
    }

    // animate touch-device infographics (not scroll to animate)
    if ($(".touch .infographic").length) {
      Site.infographics.init($(".infographic"));
    }

    if ($(".touch .bar-ltr").length) {
      Site.infographics.barGraph($(".bar-ltr"));
    }

    if ($(".inline-audio-player").length) {
      Site.audio.init();
    }

    if ($(".module-body").length) {
      Site.init404.init();
    }

    if ($("#PopupEmailSignup").length) {
      if (!Site.signup.checkEmailCookie()) {
        Site.signup.init($("#PopupSubscribe"));
        var $neveragain = $("#PopupEmailSignup").find(".never-show-signup");
        $neveragain.on("click", function () {
          Site.signup.setEmailCookie("never");
          Site.signup.closeModal();
        });
        Site.signup.setEmailCookie();
        Site.signup.emailSignup();
      }

      // Site.signup.ajaxEmailSignup();
    }

    if ($("#SidebarSubscribe").length) {
      // Site.homepage.ajaxMailChimpForm($("#SidebarSubscribe"), $("#sidebar-result"));
      Site.signup.init($("#SidebarSubscribe"));
    }

    if ($(".fadein").length) {
      Site.images.fadein();
    }

    if ($(".image-attribution").length) {
      Site.images.resizeAttributions();
      window.addEventListener("resize", function () {
        if (Site.resizeTimer) {
          clearTimeout(Site.resizeTimer);
        }
        Site.resizeTimer = setTimeout(function () {
          Site.images.resizeAttributions();
        }, 100);
      });
    }

    $("img").imagesLoaded(function () {
      Site.images.resizeAttributions();
    });

    if ($(".resource__see-more").length) {
      Site.resourcesToggle.init();
    }

    // if($('.resource-grid').length) {
    //     Site.sameHeight.init('.resource-grid li');
    // }

    Site.initTableNotes();

    new Site.slideout();

    Site.donateModal.init();
  },

  loadLazySvg: function () {
    $("[data-lazy-svg]").each(function () {
      var $this = $(this);
      const classString = this.getAttribute("class");
      $.get($this.attr("data-lazy-svg")).done(function (response) {
        var contents = response.documentElement || response;
        var $svg = $(contents);
        $svg.attr("class", classString);
        $this.after($svg);
        $this.remove();
      });
    });
  },

  audio: {
    /*
        init: function() {
            var $audio = $('#AudioFile'),
                $audioFile = $audio[0],
                $playButton = $('.btn-play'),
                $pauseButton = $('.btn-pause'),
                $elapsed = $('.audio__start'),
                $totalTime = $('.audio__end'),
                $loadingIndicator = $('.audio-loading'),
                $audioMarker = $('.audio__marker'),
                manualSeek = false;

            if(!!document.createElement('audio').canPlayType) {
                if (($audioFile.buffered != undefined) && ($audioFile.buffered.length != 0)) {
                    // $(audio).bind('progress', function() {
                    //     var loaded = parseInt(((audio.buffered.end(0) / audio.duration) * 100), 10);
                    //     loadingIndicator.css({width: loaded + '%'});
                    // });
                }
                else {
                    $loadingIndicator.remove();
                }

                $playButton.on('click', function() {
                    $(this).addClass('hidden');
                    $pauseButton.removeClass('hidden');

                    $audioFile.play();

                    $loadingIndicator.remove(); // not sure bout this

                    $('#AudioPlayer').removeClass('hidden');

                    // jquery ui hack:
                    $('#AudioTrackouter').slider({ value: 0 });

                    $('#AudioTrackOuter').slider({
                        value: 0,
                        step: 0.01,
                        orientation: "horizontal",
                        range: "min",
                        max: $audioFile.duration,
                        animate: true,
                        slide: function() {
                            manualSeek = true;
                        },
                        stop: function(e, ui) {
                            manualSeek = false;
                            $audioFile.currentTime = ui.value;
                        }
                    });

                    var duration = parseInt($audioFile.duration, 10),
                        durationMins = Math.floor(duration/60,10),
                        durationSecs = duration - durationMins*60;

                    $totalTime.text(durationMins + ':' + (durationSecs > 9 ? durationSecs : '0' + durationSecs));
                });

                $pauseButton.on('click', function() {
                    $(this).addClass('hidden');
                    $playButton.removeClass('hidden');
                    $audioFile.pause();
                });

                $audio.bind('timeupdate', function() {
                    var pos = ($audioFile.currentTime / $audioFile.duration) * 100,
                        elapsed = parseInt($audioFile.currentTime, 10),
                        elapsedMins = Math.floor(elapsed/60,10),
                        elapsedSecs = elapsed - elapsedMins*60;

                    $elapsed.text(elapsedMins + ':' + (elapsedSecs > 9 ? elapsedSecs : '0' + elapsedSecs));

                    // new for manual seek (ui slider)
                    if (!manualSeek) {
                        $audioMarker.css({left: pos + '%'});
                        $('.ui-slider-range-min').css('width', pos + '%');
                    }
                });
            }
        },
		*/

    init: function () {
      var $players = $(".inline-audio-player");

      $players.each(function () {
        var $audio = $(this).find(".audio_player"),
          $audioFile = $(this).find(".audio-player"),
          $playButton = $(this).find(".btn-play"),
          $pauseButton = $(this).find(".btn-pause"),
          $elapsed = $(this).find(".audio__start"),
          $totalTime = $(this).find(".audio__end"),
          $loadingIndicator = $(this).find(".audio-loading"),
          $audioMarker = $(this).find(".audio__marker"),
          $trackOuter = $(this).find(".audio__track-outer"),
          manualSeek = false;

        if (!!document.createElement("audio").canPlayType) {
          if (
            $audioFile.buffered != undefined &&
            $audioFile.buffered.length != 0
          ) {
            // $(audio).bind('progress', function() {
            //     var loaded = parseInt(((audio.buffered.end(0) / audio.duration) * 100), 10);
            //     loadingIndicator.css({width: loaded + '%'});
            // });
          } else {
            $loadingIndicator.remove();
          }

          $playButton.on("click", function () {
            $(this).addClass("hidden");
            $pauseButton.removeClass("hidden");
            $audio[0].play();

            $loadingIndicator.remove(); // not sure bout this

            $audioFile.removeClass("hidden");

            // jquery ui hack:
            $trackOuter.slider({ value: 0 });

            $trackOuter.slider({
              value: $audio[0].currentTime,
              step: 0.01,
              orientation: "horizontal",
              range: "min",
              max: $audio[0].duration,
              animate: true,
              slide: function () {
                manualSeek = true;
              },
              stop: function (e, ui) {
                manualSeek = false;
                $audio[0].currentTime = ui.value;
              },
            });

            var duration = parseInt($audio[0].duration, 10),
              durationMins = Math.floor(duration / 60, 10),
              durationSecs = duration - durationMins * 60;

            $totalTime.text(
              durationMins +
                ":" +
                (durationSecs > 9 ? durationSecs : "0" + durationSecs)
            );
          });

          $pauseButton.on("click", function () {
            $(this).addClass("hidden");
            $playButton.removeClass("hidden");
            $audio[0].pause();
          });

          $audio.bind("timeupdate", function () {
            var pos = ($audio[0].currentTime / $audio[0].duration) * 100,
              elapsed = parseInt($audio[0].currentTime, 10),
              elapsedMins = Math.floor(elapsed / 60, 10),
              elapsedSecs = elapsed - elapsedMins * 60;

            $elapsed.text(
              elapsedMins +
                ":" +
                (elapsedSecs > 9 ? elapsedSecs : "0" + elapsedSecs)
            );

            // new for manual seek (ui slider)
            if (!manualSeek) {
              $audioMarker.css({ left: pos + "%" });
              $(".ui-slider-range-min").css("width", pos + "%");
            }
          });
        }
      });
    },
  },

  carousel: {
    init: function () {
      $(".module-carousel").each(function () {
        var $this = $(this),
          timeoutResize;

        var options = {
          adaptiveHeight: true,
        };

        var transition = this.dataset.transition;
        if (transition === "fade") {
          options.fade = true;
        }
        var autoplay = this.dataset.autoplay == "true";
        if (autoplay) {
          options.autoplay = true;
        }
        var arrows = this.dataset.arrows == "true";
        options.arrows = arrows;

        $this.slick(options);
      });
    },

    featuredModules: function () {
      $(".featured-stream-modules .col-outer").slick({
        dots: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 700,
            settings: "unslick",
          },
        ],
      });
    },

    quote: function () {
      var carouselResize = function () {
        $(".module-quote-carousel, .slide").height("auto");
        $(".slide").height($(".module-quote-carousel").outerHeight());
      };

      $(".quote-carousel")
        .on("init", function () {
          if (
            !$(".module-quote-carousel").hasClass(
              "module-quote-carousel--facts"
            )
          ) {
            carouselResize();
          }
        })
        .slick();

      if (
        !$(".module-quote-carousel").hasClass("module-quote-carousel--facts")
      ) {
        $(window).on("resize", carouselResize);
      }
    },

    sidebar: function () {
      $(".post-sidebar__series ul").slick({
        dots: false,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 768,
            settings: "unslick",
          },
        ],
      });
    },
  },

  clickScroll: {
    init: function () {
      $(".scroll-to").on("click", function (e) {
        e.preventDefault();

        var $scrollTarget = $("#" + $(this).attr("data-scroll-to"));

        $("html, body").animate(
          {
            scrollTop: $scrollTarget.offset().top - Site.$header.outerHeight(),
          },
          500
        );
      });
    },
  },

  fakeDropdown: function () {
    $(".dropdown-active").on("click", function (e) {
      e.preventDefault();

      if ($(this).closest(".dropdown-outer").length) {
        $(this).closest(".dropdown-outer").toggleClass("open");
      }
    });

    // subnav close event...
    $(".no-touch").on("click", function (e) {
      var clickTarget = $(e.target);
      if (
        clickTarget &&
        !clickTarget.closest(".open").length &&
        !clickTarget.hasClass("open") &&
        !clickTarget.closest(".open").length &&
        !clickTarget.hasClass("open")
      ) {
        $(".dropdown-outer").removeClass("open");
      }
    });
  },

  footer: {
    init: function () {
      //Site.homepage.ajaxMailChimpForm($("#FooterSubscribe"), $("#footer-result"));
      Site.signup.init($("#FooterSubscribe"));
    },
  },

  signup: {
    init: function ($form) {
      var inputs = {};
      inputs.email = $form.find(".email_input")[0];
      inputs.fname = $form.find(".fname_input")[0];
      inputs.lname = $form.find(".lname_input")[0];

      var submit = $form.find(".newsletter_submit");

      _.forEach(inputs, function (value, key) {
        $(value).on("keyup", function (e) {
          var execute = false;
          if (typeof e.key !== "undefined") {
            if (["Enter"].includes(e.key)) {
              execute = true;
            }
          } else if (typeof e.keyIdentifier !== "undefined") {
            if (["Enter"].includes(e.keyIdentifier)) {
              execute = true;
            }
          } else if (typeof e.keyCode !== "undefined") {
            if (["13"].includes(e.keyCode)) {
              execute = true;
            }
          }

          if (execute) {
            submit.click();
          }

          if ($(this).val()) {
            $(this).addClass("filled");
          } else {
            $(this).removeClass("filled");
          }
        });
      });

      submit.on("click", function (e) {
        e.preventDefault();
        Site.signup.validate.all(inputs, $form);
      });
    },

    validate: {
      all: function (inputs, $form) {
        var results = [];

        results.push(Site.signup.validate.email(inputs.email));
        results.push(Site.signup.validate.text(inputs.fname));
        results.push(Site.signup.validate.text(inputs.lname));
        if (results.every(isTrue)) {
          Site.signup.ajaxSubmit($form);
        }

        function isTrue(e, i, a) {
          return e === true;
        }
      },

      email: function (input) {
        var email_re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var result = email_re.test(input.value);
        if (!result) {
          this.error(input);
        }
        return result;
      },

      text: function (input) {
        var result = input.value && input.value != "";
        if (!result) {
          this.error(input);
        }
        return result;
      },

      error: function (input) {
        input.classList.add("error");
        $(input).one("keydown", function (e) {
          $(this).removeClass("error");
        });
      },
    },

    ajaxSubmit: function ($form) {
      $form.addClass("loading");

      var $resultElement = $form.find(".newsletter_subscribe_result");

      var request = $.ajax({
        type: "GET",
        url: $form.attr("action"),
        data: $form.serialize(),
        cache: false,
        dataType: "jsonp",
        jsonp: "c", // trigger MailChimp to return a JSONP response
        contentType: "application/json; charset=utf-8",

        error: function (error) {
          console.log(error);
          // According to jquery docs, this is never called for cross-domain JSONP requests
          $form.removeClass("loading");
        },

        success: function (data) {
          $form.parent().find(".js-remove").hide();
          Site.signup.setEmailCookie("never");

          var message;

          if (data.result != "success") {
            message =
              data.msg ||
              "<p>Sorry. Unable to subscribe. Please try again later.<p>";

            if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
              message = "<p>Looks like you're already subscribed.</p>";
            }
            $resultElement.html(message + VERA.popupEmailThankYou);
          } else {
            ga("send", "event", "form", "submit", "email subscribe");
            $resultElement.html(
              VERA.popupEmailThankYou ||
                "Thank you! Please check your email for a confirmation soon."
            );
          }

          $form.removeClass("loading");

          // setTimeout(function() {
          //   Site.signup.closeModal();
          // }, 4000);
        },
      });
    },

    checkEmailCookie: function () {
      var dc = document.cookie;
      var prefix = "vera_subscribe=";
      var begin = dc.indexOf("; " + prefix);
      if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
      } else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
          end = dc.length;
        }
      }

      Site.signup.setEmailCookie();

      return unescape(dc.substring(begin + prefix.length, end));
    },

    setEmailCookie: function (expires) {
      if (expires == null) {
        expires = 30;
      } else if (expires == "never") {
        expires = 10000;
      }
      var expDate = new Date();
      expDate.setTime(expDate.getTime() + days(expires));
      document.cookie =
        "vera_subscribe=true; path=/; expires=" + expDate.toGMTString() + ";";

      //Site.signup.emailSignup();

      function days(days) {
        return 24 * 60 * 60 * 1000 * days;
      }
    },

    popup: $("#PopupEmailSignup"),

    emailSignup: function () {
      var $popup = Site.signup.popup;
      setTimeout(function () {
        if (!$popup.hasClass("triggered")) {
          $popup.css("display", "block");
          $popup.addClass("triggered");
          $popup.attr("aria-hidden", false);
        }
      }, 2000);

      // close by clicking on X
      $popup.find(".popup-close").on("click", function (e) {
        e.preventDefault();
        $popup.removeClass("visible").hide();
      });

      // close by clicking on overlay
      $(".popup-overlay").on("click", function (e) {
        var clickTarget = $(e.target);
        if (
          clickTarget &&
          !clickTarget.closest(".popup-outer").length &&
          !clickTarget.closest(".popup-outer").length
        ) {
          e.preventDefault();
          $popup.removeClass("visible").hide();
        }
      });
    },

    closeModal: function () {
      Site.signup.popup
        .fadeOut()
        .attr("aria-hidden", true)
        .removeClass("visible");
    },
  },

  homepage: {
    $homepageBanner: $(".homepage-banner"),
    $homepageArrow: $(".scroll-indicator"),
    init: function () {
      var homepageBannerHt = Site.homepage.$homepageBanner.outerHeight();

      if (homepageBannerHt > Site.wh) {
        Site.homepage.$homepageArrow.addClass("visible");
        // $(window).on('scroll', function() {
        //     setTimeout(function() {
        //         Site.homepage.arrowFade();
        //     }, 250);
        // });
      }

      Site.homepage.$homepageArrow.on("click", function () {
        $("body, html").animate({ scrollTop: homepageBannerHt - 66 }, 500);
        Site.homepage.arrowFade();
      });
    },

    ajaxEmailSignup: function () {
      //Site.homepage.ajaxMailChimpForm($("#HomepageSubscribe"), $("#subscribe-result"));
    },

    ajaxMailChimpForm: function ($form, $resultElement) {
      // Hijack the submission. We'll submit the form manually.
      $form.on("submit", function (e) {
        if (!isValidEmail($form)) {
          var error = "A valid email address must be provided.";
          $resultElement.html(error);
        } else {
          $resultElement.html("Please wait...");
          submitSubscribeForm($form, $resultElement);
        }
      });

      // Validate the email address in the form
      function isValidEmail($form) {
        // If email is empty, show error message.
        // contains just one @
        var email = $form.find("input[type='email']").val();
        if (!email || !email.length) {
          return false;
        } else if (email.indexOf("@") == -1) {
          return false;
        }

        return true;
      }

      function submitSubscribeForm($form, $resultElement) {
        $.ajax({
          type: "GET",
          url: $form.attr("action"),
          data: $form.serialize(),
          cache: false,
          dataType: "jsonp",
          jsonp: "c", // trigger MailChimp to return a JSONP response
          contentType: "application/json; charset=utf-8",

          error: function (error) {
            // According to jquery docs, this is never called for cross-domain JSONP requests
          },

          success: function (data) {
            if (data.result != "success") {
              var message =
                data.msg ||
                "Sorry. Unable to subscribe. Please try again later.";

              if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                message = "You're already subscribed. Thank you!";
              }

              $resultElement.html(message);
            } else {
              $resultElement.html(
                "Thank you! Please check your email for a confirmation soon."
              );

              setTimeout(function () {
                $resultElement.fadeOut(500, function () {
                  $resultElement.html("").show();

                  $form.find("input[type=email]").val("");
                });
              }, 4000);
            }
          },
        });
      }
    },

    arrowFade: function () {
      Site.homepage.$homepageArrow.fadeOut(500);
      $(window).off("scroll", Site.homepage.arrowFade);
    },
  },

  images: {
    fadein: function () {
      var $images = $(".fadein:not(.loaded),.fade-in:not(.loaded)");

      $images
        .imagesLoaded({ background: true })
        .progress(function (instance, image) {
          $(image.element).addClass("loaded");
        });

      var $images = $("img.fade-in:not(.loaded)");
      $images.imagesLoaded().progress(function (instance, image) {
        $(image.img).addClass("loaded");
      });
    },

    resizeAttributions: function () {
      $(".image-attribution").each(function () {
        $(this).css("width", $(this).parent().outerHeight());
      });
    },
  },

  infographics: {
    init: function (el) {
      //console.log('out');
      /*
            if(el.children('.pies-inner').length) {
                $('.pie__slice').each(function() {
                    var rotatedAmt = ($(this).attr('data-value')/100)*360;
                    $(this).find('.rotated').css('transform', 'rotate(' + rotatedAmt + 'deg)');
                });
            }
*/

      if (el.children(".bars-outer").length) {
        $(".bar__bar").each(function () {
          var barHt = $(this).attr("data-value");
          $(this).css("height", barHt + "%");
        });
        $(".pie__slice").each(function () {
          var rotatedAmt = ($(this).attr("data-value") / 100) * 360;
          $(this)
            .find(".rotated")
            .css("transform", "rotate(" + rotatedAmt + "deg)");
        });
      }
    },

    barGraph: function (el) {
      if (el.find(".bar-ltr__row").length) {
        $(".bar-ltr__row").each(function () {
          var barWidth = $(this).attr("data-value");

          $(this).css("width", barWidth + "%");
        });
      }
    },
  },

  init404: {
    init: function () {
      Site.init404.resize();

      $(window).on("resize", function () {
        Site.init404.resize();
      });
    },

    resize: function () {
      $(".module-body").css(
        "min-height",
        Site.wh - Site.$header.outerHeight() - $(".footer").outerHeight()
      );
    },
  },

  modal: {
    init: function () {
      $(".trigger-modal").on("click", function (e) {
        e.preventDefault();
        var $modal = $("#" + $(this).attr("data-modal"));
        $modal.addClass("visible");
      });

      $(".modal-outer").on("click", function (e) {
        var clickTarget = $(e.target);
        if (
          clickTarget &&
          !clickTarget.closest("a").length &&
          !clickTarget.closest(".share").length &&
          !clickTarget.closest(".module-intro").length &&
          !clickTarget.closest(".donate-intro").length &&
          !clickTarget.closest(".popup-outer").length &&
          !clickTarget.closest(".popup-outer").length
        ) {
          e.preventDefault();
          Site.modal.close();
        }
      });
    },

    close: function () {
      $(".modal-outer").removeClass("visible");
    },
  },

  modules: {
    filter: {
      init: function () {
        $(".filter--viewtype a").on("click", function (e) {
          e.preventDefault();

          if ($(this).hasClass("active")) {
            return;
          }

          var query = window.location.search;
          var newquery;

          if ($(this).attr("data-viewtype") == "list") {
            if (query === "") {
              newquery = query + "?list=true";
            } else {
              newquery = query + "&list=true";
            }
          } else {
            if (query === "?list=true") {
              newquery = "";
            } else {
              newquery = query.replace("&list=true", "");
            }
          }

          var newurl =
            window.location.origin + window.location.pathname + newquery;
          var stateObj = { query: newurl };
          history.replaceState(stateObj, "", newurl);

          $(".filter--viewtype").find(".active").removeClass("active");
          $(this).addClass("active");

          $(this)
            .closest(".stream-module-outer")
            .attr("data-view", $(this).attr("data-viewtype"));

          Site.scrollTo();
        });

        $(".filter__clear").on("click", function (e) {
          e.preventDefault();
          $(this)
            .closest(".filter__dropdown-inner")
            .find("input[type=checkbox]")
            .each(function () {
              $(this).prop("checked", false);
            });
          $(this)
            .closest(".filter__dropdown-inner")
            .find("input[type=text]")
            .val("");
          $("#date-slider").slider("values", [
            Stream.content.daterange.start,
            Stream.content.daterange.end,
          ]);
          $("#date-slider .ui-slider-handle:first-of-type").attr(
            "data-year",
            Stream.content.daterange.start
          );
          $("#date-slider .ui-slider-handle:nth-of-type(2)").attr(
            "data-year",
            Stream.content.daterange.end
          );
          $(Stream.filter.from).val(Stream.content.daterange.start);
          $(Stream.filter.to).val(Stream.content.daterange.end);
        });

        $(".filter__dropdown-inner .btn, .filter__dropdown-outer").on(
          "click",
          this.toggle
        );

        $(".filter__dropdown-child-outer").on("click", this.childToggle);
      },
      // this is for knowledgebank filters
      // that are inside of an accordion
      childToggle: function () {
        var $list = $(this).next();
        $list.toggleClass("dropped");
        $(this).toggleClass("open");
      },
      toggle: function () {
        Site.modules.filter.isOpen = !Site.modules.filter.isOpen;

        if (Site.modules.filter.isOpen) {
          $(window).on("keydown", Site.modules.filter.keyListen);
        } else {
          $(window).off("keydown", Site.modules.filter.keyListen);
        }
        $(".filter__dropdown-outer").toggleClass("open");
        $(".filter__dropdown-outer")
          .closest(".filter-outer")
          .find(".filter__dropdown")
          .toggleClass("dropped");
      },
      isOpen: false,
      keyListen: function (e) {
        var close = false;
        if (typeof e.key !== "undefined") {
          if (["Enter", "Escape"].includes(e.key)) {
            close = true;
          }
        } else if (typeof e.keyIdentifier !== "undefined") {
          if (["Enter", "U+001B"].includes(e.keyIdentifier)) {
            close = true;
          }
        } else if (typeof e.keyCode !== "undefined") {
          if (["13", "27"].includes(e.keyCode)) {
            close = true;
          }
        }

        if (close) {
          e.preventDefault();
          Site.modules.filter.toggle();
        }
      },
    },

    firstLetter: function () {
      var $firstEl = $(
          ".post-module .module-image-right__text > *:first-child"
        ),
        firstContent = $firstEl.html().trim(),
        firstLetter = firstContent.charAt(0),
        letterWrapped = '<span class="first-letter">' + firstLetter + "</span>";

      firstContent = firstContent.slice(1);
      firstContent = letterWrapped + firstContent;

      $firstEl.html(firstContent);
    },
  },

  newsPopup: {
    checkEmailCookie: function () {
      var dc = document.cookie;
      var prefix = "veraBlog=";
      var begin = dc.indexOf("; " + prefix);
      if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
      } else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
          end = dc.length;
        }
      }

      Site.newsPopup.setEmailCookie();

      return unescape(dc.substring(begin + prefix.length, end));
    },

    setEmailCookie: function () {
      var expDate = new Date();
      expDate.setTime(expDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
      document.cookie =
        "veraBlog=true; expires=" + expDate.toGMTString() + "; path=/";

      Site.newsPopup.emailSignup();
    },

    emailSignup: function () {
      var $modal = $("#PopupEmailSignup"),
        body = document.body,
        html = document.documentElement;

      var triggeredPoint =
        Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        ) / 2;

      // just a note: the event to trigger this popup is different than the homepage popup!

      $(window).on("scroll", function () {
        if (!$modal.hasClass("triggered")) {
          if ($(window).scrollTop() > triggeredPoint) {
            $modal.addClass("triggered").fadeIn(500, function () {
              $(this).addClass("visible");
            });
          }
        }
      });

      // close by clicking on X
      $modal.find(".popup-close").on("click", function (e) {
        e.preventDefault();
        $modal.removeClass("visible").hide();
      });

      // close by clicking on overlay
      $(".popup-overlay").on("click", function (e) {
        var clickTarget = $(e.target);
        if (
          clickTarget &&
          !clickTarget.closest(".popup-outer").length &&
          !clickTarget.closest(".popup-outer").length
        ) {
          e.preventDefault();
          $modal.removeClass("visible").hide();
        }
      });
    },
  },

  ourWork: function () {
    $(".mobile-toggle").on("click", function (e) {
      e.preventDefault();

      $(this)
        .toggleClass("mobile-open")
        .next(".action-areas")
        .toggleClass("mobile-visible");
    });
  },

  recalc: function () {
    Site.ww = $(window).width();
    Site.wh = $(window).height();
    Site.headerHeight = Site.$header.outerHeight();
  },

  resourcesToggle: {
    init: function () {
      $(".resource__see-more").on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("open");
        $(".resources--toggled").toggleClass("open");

        if ($(this).text() == "See More") {
          $(this).text("See Less");
        } else {
          $(this).text("See More");
        }
      });
    },
  },

  sameHeight: {
    init: function (selectr) {
      $(window).on("load resize", function () {
        Site.sameHeight.resize(selectr);
      });
    },

    resize: function (selectr) {
      var maxHt = 0;

      $(selectr).height("auto");

      $(selectr).each(function () {
        if ($(this).outerHeight() > maxHt) {
          maxHt = $(this).outerHeight();
        }
      });

      $(selectr).height(maxHt);
    },
  },

  scrollTo: function () {
    var els =
        ".stream-module, .post-module, .infographic, .lazy-load, .mobile-dropdown, .bar-ltr, .fadeup",
      $el = $(".no-touch").find(els);
    function onScroll() {
      $el.each(function () {
        var el = $(this);

        if (window.pageYOffset + window.innerHeight > el.offset().top) {
          el.addClass("triggered");

          if (el.hasClass("infographic")) {
            Site.infographics.init(el);
          }

          if (el.hasClass("bar-ltr")) {
            Site.infographics.barGraph(el);
          }
        }
      });
    }

    if (!Site.hasTouch && $el.length) {
      onScroll();
      $(window).on("load scroll resize", onScroll);
      $("#article").on("scroll", onScroll);
    } else {
      $(".fadeup").removeClass("fadeup");
    }
  },

  search: function () {
    $(".header__search__container.container .header__search__input").on(
      "keydown",
      function () {
        event.stopPropagation();
      }
    );

    $(".toggle-search").on("click", function (e) {
      e.preventDefault();

      Site.$search.toggleClass("search-open");

      if (Site.$search.hasClass("search-open")) {
        setTimeout(function () {
          Site.$search.find(".header__search__input").focus();
        }, 100);
      }
    });
  },

  sectionNav: {
    $sectionNav: $(".mobile-dropdown"),
    $sectionNavSpacer: $(".mobile-dropdown + .mobile-dropdown-spacer"),
    currentPage: { url: null },
    init: function () {
      // Little hacky.  This was triggering on all pages fighting other popstate events
      if (!$(".mobile-dropdown").length) {
        return;
      }
      // nav mobile
      $(".mobile-dropdown__mobile-active").on("click", function (e) {
        e.preventDefault();

        $(this).closest(".mobile-dropdown").toggleClass("open");
      });

      // nav fixed postion
      if (Site.sectionNav.$sectionNav.length) {
        Site.sectionNav.fixedPosScroll();
      }
      console.log("init")

      // nav ajax links
      var $ajaxContainer = $("#SectionContent"),
        $ajaxLoadingContainer = $(".ajax-outer"),
        $mobileNavActive = $(".mobile-dropdown__mobile-active"),
        $loader = $(".streamloader"),
        currentRequest = null;

      sizeSpacer();
      window.addEventListener("resize", sizeSpacer);

      function sizeSpacer() {
        var sectionHeight = Site.sectionNav.$sectionNav.height() + "px";
        Site.sectionNav.$sectionNavSpacer.css("height", sectionHeight);
      }

      // change state
      function sectionChange(state) {
        //Stop tab load if we're already there
        if (
          !(
            state == null ||
            state.url === Site.sectionNav.currentPage.url ||
            state.url === window.location.href
          )
        ) {
          Site.sectionNav.currentPage = state;

          var $this = $(".mobile-dropdown li:first-child > a");

          // show loader
          $loader.removeClass("hidden");

          // change active link
          Site.sectionNav.$sectionNav.find(".active").removeClass("active");

          $(".mobile-dropdown li").each(function () {
            if (state.url == $(this).find("a").attr("href")) {
              // TODO: this is probably bad
              $this = $(this).find("a");
            }
          });

          $this.addClass("active");

          Site.sectionNav.$sectionNav.removeClass("open");
          $mobileNavActive.text($this.text());

          // fade out!
          $ajaxLoadingContainer.addClass("loading");

          console.log("STATE URL - :" + state.url);

          currentRequest = $.ajax({
            type: "GET",
            url: state.url,
            beforeSend: function () {
              if (currentRequest != null) {
                currentRequest.abort();
              }
            },
            success: function (data) {
              $ajaxContainer.empty();
              $ajaxContainer.append(data);
              // relevant to about section

              console.log($ajaxContainer.find("script"));

              Site.scrollTo();
              Site.initConditionals();

              $loader.addClass("hidden");

              // fade back in!
              $ajaxLoadingContainer.removeClass("loading");

              initVideos();

              // scroll to bottom of banner
              if ($(".text-banner").length) {
                $("body, html").animate(
                  { scrollTop: $(".text-banner").outerHeight() },
                  500
                );
              }
            },
            error: function (e) {
              // Error
            },
          });
        }
      }

      // push this page as a state?

      try {
        history.replaceState(
          { url: window.location.href },
          null,
          window.location.href
        );
      } catch (e) {
        console.log(e);
      }

      $(window).on("popstate", function (e) {
        sectionChange(e.originalEvent.state);
      });

      $(".mobile-dropdown a:not(.link-out)").on("click", function (e) {
        e.preventDefault();
        var $this = $(this),
          thisUrl = $(this).attr("href");

        // ajax
        sectionChange({ url: thisUrl });

        // push new state
        try {
          history.replaceState({ url: thisUrl }, null, thisUrl);
        } catch (e) {
          console.warn(e);
        }
      });
    },

    fixedPosScroll: function () {
      // scroll vars etc
      var $fixedBar = Site.sectionNav.$sectionNav,
        fixedNavOffsetTop = $fixedBar.offset().top,
        scrollTriggered = false,
        winScrollTop = 0;
      function navScroll() {
        scrollTriggered = false;

        if (winScrollTop + Site.headerHeight > fixedNavOffsetTop) {
          $fixedBar.addClass("fixed");
        } else {
          $fixedBar.removeClass("fixed");
        }
      }

      function onScroll() {
        triggerAction();
      }

      function triggerAction() {
        if (!scrollTriggered) {
          winScrollTop = $(window).scrollTop();
          requestAnimationFrame(navScroll);
        }

        scrollTriggered = true;
      }

      onScroll();

      $(window).on("scroll", onScroll);

      $(window).on("load resize", function () {
        fixedNavOffsetTop = $fixedBar.offset().top;
        onScroll();
      });
    },
  },

  share: {
    init: function () {
      // click event handler
      // $('.share a').on('click', function(e) {
      //     e.preventDefault();
      //     if($(this).attr('target') === '_blank') {
      //         var w = 500,
      //             h = 300,
      //             left = (Site.ww/2) - (w/2),
      //             top = (Site.wh/2) - (h/2);
      //         window.open(this.href, "socialWindow", "width=" + w + ",height=" + h + ",top=" + top + ",left= " + left);
      //     }
      // });
    },

    fixedPosScroll: function () {
      // scroll vars etc
      var $shareButtons = $(".fixed-share"),
        shareOffsetTop = $shareButtons.offset().top,
        shareHeight = $shareButtons.children("ul").outerHeight(),
        $shareContainer = $shareButtons.closest(".module-intro"),
        shareContainerOffsetTop = $shareContainer.offset().top,
        shareContainerHeight = $shareContainer.outerHeight() - 40,
        topHeight = $(".mobile-dropdown").length
          ? Site.headerHeight * 2
          : Site.headerHeight, // TODO: ???
        scrollTriggered = false,
        winScrollTop = 0;

      function removeDupes() {
        $(".fixed-share").each(function (idx) {
          if (idx > 0) {
            $(this).remove();
          }
        });
      }

      function calcScroll() {
        shareOffsetTop = $shareButtons.offset().top;
        shareHeight = $shareButtons.children("ul").outerHeight();
        shareContainerOffsetTop = $shareContainer.offset().top;
        shareContainerHeight = $shareContainer.outerHeight() - 40;
      }

      function shareScroll() {
        scrollTriggered = false;

        if (winScrollTop + topHeight > shareOffsetTop) {
          if (
            winScrollTop >
            shareContainerOffsetTop +
              shareContainerHeight -
              shareHeight -
              topHeight
          ) {
            $shareButtons.addClass("past");
          } else {
            $shareButtons.removeClass("past").addClass("fixed");
          }
        } else {
          $shareButtons.removeClass("fixed");
        }
      }

      function onScroll() {
        winScrollTop = $(window).scrollTop();
        triggerAction();
      }

      function triggerAction() {
        if (!scrollTriggered) {
          requestAnimationFrame(shareScroll);
        }

        scrollTriggered = true;
      }

      calcScroll();
      removeDupes(); // because there should only be one set of fixed-position scroll share buttons. right?

      if (Site.ww >= 768) {
        requestAnimationFrame(shareScroll);

        $(window).on("scroll", onScroll);
      } else {
        $(window).off("scroll", onScroll); // remove event handler to improve DOM performance?
      }

      $(window).on("resize", function () {
        calcScroll();

        if (Site.ww >= 768) {
          requestAnimationFrame(shareScroll);

          $(window).on("scroll", onScroll);
        } else {
          $(window).off("scroll", onScroll); // remove event handler to improve DOM performance?
        }
      });
    },
  },

  subNav: function () {
    // subnav click event
    $(".main-nav-outer a").each(function () {
      $(this).on("click", function (e) {
        var subnav = $(this).attr("data-subnav");

        if (subnav) {
          e.preventDefault();
          if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(".subnav-open").removeClass("subnav-open").css("max-height", 0);

            if (Site.ww >= 1024) {
              Site.$header.removeClass("mainnav-open");
            }
          } else {
            if ($(".subnav-open").length) {
              $(".main-nav-outer .active").removeClass("active");
              $(".subnav-open").removeClass("subnav-open").css("max-height", 0);
            }

            $(this).addClass("active");
            Site.$header.addClass("mainnav-open");
            $("#" + subnav + "Subnav")
              .addClass("subnav-open")
              .css({
                "max-height":
                  window.innerHeight -
                  (Site.$header.outerHeight() + $(".main-nav").outerHeight()),
              });
            $(".main-nav-outer").addClass("subnav-open");
          }
        }
      });
    });

    // subnav close event...
    $(".no-touch").on("click", function (e) {
      if (Site.$header.hasClass("mainnav-open")) {
        var clickTarget = $(e.target);
        if (
          clickTarget &&
          !clickTarget.closest(".subnav-open").length &&
          !clickTarget.hasClass("subnav-open") &&
          !clickTarget.closest(".mainnav-open").length &&
          !clickTarget.hasClass("mainnav-open") &&
          Site.$header.hasClass("mainnav-open")
        ) {
          $(".main-nav .active").removeClass("active");
          Site.$header.removeClass("mainnav-open");
          $(".subnav-open").removeClass("subnav-open").css("max-height", 0);
        }
      }
    });

    //subnav second-word line break thing
    $(".main-subnav--resource li").each(function () {
      var textOuter = $(this).find(".text-outer").text(),
        textArr = textOuter.split(" "),
        newTextString = "";

      if (textArr[1]) {
        textArr[1] = textArr[1] + "<br/>";
      }

      for (var i = 0; i < textArr.length; i++) {
        newTextString += textArr[i] + " ";
      }

      $(this).find(".text-outer").html(newTextString);
    });
  },

  toggleNav: function () {
    Site.$navToggle.on("click", function (e) {
      e.preventDefault();
      Site.$header.toggleClass("mainnav-open");
      if (!Site.$header.hasClass("mainnav-open")) {
        $(".subnav-open").removeClass("subnav-open").css("max-height", 0);
        $(".search-open").removeClass("search-open");
        $(".main-nav-outer .active").removeClass("active");
      }
    });
  },

  touchDetection: function () {
    var isTouchDevice = "ontouchstart" in document.documentElement;

    if (isTouchDevice) {
      Site.$body.removeClass("no-touch").addClass("touch");
      Site.hasTouch = true;
    }
  },
};

Site.squaresInit = function () {
  var $squares = $(".rotated-square-cta");

  $(window).on("resize", function () {
    resize();
  });

  resize();

  function resize() {
    $squares.each(function () {
      $(this).height($(this).width());
    });
  }
};

Site.donateModal = {
  init: function () {
    $(".donate-cta-outer").each(function () {
      var $outer = $(this);
      var $cta = $outer.find(".donate-cta");

      var cookie = Site.checkCookie("vera_donate_" + $cta.attr("data-cta-id"));

      if (cookie) {
        abort();
        return true;
      }

      var ctaStates = $cta
        .attr("data-states")
        .split(",")
        .filter((i) => i !== "");
      if (ctaStates && ctaStates.length) {
        $.getJSON("/dist/map/states.json", null, function (stateData) {
          VERA.getIpLocation().then(function (location) {
            var userFips = stateData.find((d) => d.abbrev === location.state)
              .fips;
            var showCta = ctaStates.includes(userFips);
            showCta ? show() : abort();
          });
        });
      } else {
        show();
      }

      function abort() {
        $(this).remove();
      }

      function show() {
        var cookieId =
          "vera_donate_" + $outer.find(".donate-cta").attr("data-cta-id");
        var closeModal = function () {
          $outer.fadeOut(function () {
            $outer.remove();
          });
          Site.donateModal.setDonateCookie(cookieId);
        };

        $outer.find(".popup-close").on("click", closeModal);
        $outer.on("click", closeModal);
        $outer.find(".donate-cta").on("click", function (e) {
          e.stopPropagation();
        });
        $outer.find(".donate-cta-button").on("click", function () {
          Site.donateModal.setDonateCookie(cookieId, "never");
          if (typeof ga !== "undefined") {
            ga(
              "send",
              "event",
              "Donate Popup",
              "Click",
              $cta.attr("data-cta-title")
            );
          }
        });

        $outer.css({ display: "flex" }).fadeIn();
      }
    });
  },

  setDonateCookie: function (id, expires) {
    if (expires == null) {
      expires = 1;
    } else if (expires == "never") {
      expires = 10000;
    }
    var expDate = new Date();
    expDate.setTime(expDate.getTime() + days(expires));
    document.cookie =
      id + "=true; path=/; expires=" + expDate.toGMTString() + ";";

    function days(days) {
      return 24 * 60 * 60 * 1000 * days;
    }
  },
};

Site.slideout = function () {
  "use strict";

  Site.slider =
    Site.slider ||
    new Slider({
      afterLoad: function () {
        var $close = $(".Slider--inner").find(".slideout_close");
        $close.on("click", function () {
          Site.slider.close();
        });

        initFootnotes($(".Slider--inner"));
        initVideos();
      },
      afterClose: function () {
        // safari fixed repaint hack
        var $close = $(".Slider--inner").find(".slideout_close");
        $close.hide();
        setTimeout(function () {
          $close.show();
        }, 100);
      },
    });

  $(".slideoutcta:not(.slideoutcta-initialized)").each(function () {
    var $this = $(this);

    $this.addClass("slideoutcta-initialized");
    $this.find(".cta_wrap").on("click", function () {
      openCta($this.attr("data-url"), $this.attr("data-class"));
    });
  });

  function openCta(url, sliderClass) {
    Site.slider.open(url, sliderClass);
  }
};

Site.checkCookie = function (cookie) {
  var dc = document.cookie;
  var prefix = cookie + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
  return unescape(dc.substring(begin + prefix.length, end));
};

Site.initTableNotes = function () {
  "use-strict";

  $(".table__notes__toggle:not(.table-notes-initialized)").each(function () {
    var $this = $(this);
    var $notes = $this.siblings(".table__notes").first();

    $this.on("click", function () {
      this.blur();
      $this.toggleClass("open");
      $notes.slideToggle();
    });

    $this.addClass("table-notes-initialized");
  });
};

Site.afterAjaxPageLoad = function () {
  Site.initConditionals();
};

$(document).ready(function () {
  var VERA = window.VERA || {};
  VERA.isMobile = screen.width <= 1024;
  $("html").removeClass("no-js").addClass("js");
  Site.init();
  Site.initConditionals();
});

$(window).on("resize", function () {
  Site.recalc();
});
