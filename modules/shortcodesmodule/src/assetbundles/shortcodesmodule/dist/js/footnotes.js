$(function () {
  "use-strict";

  var letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "aa",
    "bb",
    "cc",
    "dd",
    "ee",
    "ff",
    "gg",
    "hh",
    "ii",
    "jj",
    "kk",
    "ll",
    "mm",
    "nn",
    "oo",
    "pp",
    "qq",
    "rr",
    "ss",
    "tt",
    "uu",
    "vv",
    "ww",
    "xx",
    "yy",
    "zz",
  ];

  $(function () {
    init();
  });
  window.initFootnotes = init;

  function init($elem) {
    initFootnotes($elem);
    initTerms($elem);
    initMore($elem);
  }

  function initFootnotes($elem) {
    $elem = $elem || $("body");

    /* Footnotes */

    var $footnoteAggregate = $elem.find(".footnote-aggregate-list");

    var $footnote_count = 0;

    var $items = $elem.find(".tooltip:not(.tooltipstered)");
    if (!$items.length) {
      return;
    }

    $items.tooltipster({
      theme: "tooltipster-borderless",
      trigger: "click",
      maxWidth: 400,
      interactive: true,
    });

    var $counterType = $elem.attr("data-footnote-counter-type") || "numbers";

    $elem.find(".footnote").each(function () {
      $footnote_count++;
      var $counter =
        $counterType === "numbers"
          ? $footnote_count
          : letters[$footnote_count - 1];
      $(this).find(".footnote__num").html($counter);

      if ($footnoteAggregate) {
        var id = $(this).find(".tooltip").attr("data-tooltip-content");
        $footnoteAggregate.append(
          $('<li><div class="inner">' + $(id).html() + "</div></li>")
        );
      }

      $(this).on("click", function () {
        gaEvent("Footnote", "Open");
      });
    });

    var maxHeight = 100;
    var showHeight = 80;

    $footnoteAggregate.find("li .inner").each(function () {
      var $this = $(this);
      if ($this.height() > maxHeight) {
        $this.addClass("collapsed");
        var $button = $("<button>" + "Show More" + "</button");
        $this.append($button);

        $button.on("click", function () {
          $this.toggleClass("collapsed");
        });
      }
    });
  }

  function initTerms($elem) {
    $elem = $elem || $("body");

    var $items = $elem.find(".term");
    if (!$items.length) {
      return;
    }

    /* Terms */
    $items.tooltipster({
      theme: "tooltipster-borderless tooltipster-term",
      maxWidth: 400,
      interactive: true,
      trigger: "click",
      functionInit: function (instance, helper) {
        var $elem = $(helper.origin);

        var newContent = $elem.attr("data-definition");

        instance.content($("<div>" + newContent + "</div>")[0]);
      },
    });

    $items.on("click", function () {
      gaEvent("Term", "Open");
    });
  }

  function initMore($elem) {
    $elem = $elem || $("body");

    var $items = $elem.find(".more:not(.more-initialized)");
    if (!$items.length) {
      return;
    }

    $items.each(function () {
      var $this = $(this);

      var $content = $this.find(".more-content"),
        $button = $this.find(".more-toggle"),
        $label = $this.find(".more-toggle-label");

      //Init aria label/title
      var label = $this.hasClass("open")
        ? "Hide Additional Information"
        : "Show Additional Information";
      $button.attr("title", label);
      $button.attr("aria-label", label);

      $button.on("click", function (event) {
        $this.toggleClass("open");
        var isOpen = $this.hasClass("open");

        var label = isOpen
          ? "Hide Additional Information"
          : "Show Additional Information";
        $button.attr("title", label);
        $button.attr("aria-label", label);

        var message = isOpen ? "Close" : "Read More";
        $button.parent()[0].lastChild.nodeValue = message;

        $content.slideToggle();
      });

      $this.addClass("more-initialized");

      $this.on("click", function () {
        gaEvent("Read More", "Open");
      });
    });
  }
});
