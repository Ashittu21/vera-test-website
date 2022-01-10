(function () {
  var VERA = window.VERA || {};

  VERA.dataViz = VERA.dataViz || {};
  VERA.sm = VERA.sm || new ScrollMagic.Controller();

  VERA.dataViz = {
    colors: [
      "#ef4136",
      "#a05eb5",
      "#68b2d9",
      "#007a69",
      "#005eb8",
      "#bcbdbc",
      "#b0cc1b",
    ],

    secondaryColors: ["#76110a", "#4c2857", "#194b66"],

    baselineColor: "#A3A3A3",

    animationDuration: 500,

    defaultNumberFormat: ",",

    $scrollTarget: $("html,body"),

    $body: $("body"),

    scrollPositionY: 0,

    formatTooltip: function (instance, helper, content) {
      var $content = $(content);

      var tooltip = helper.origin.getAttribute("data-tooltip");

      if (tooltip) {
        var vars = tooltip.match(/\*(.*?)\*/g);
        var statement = tooltip;

        vars.forEach(function (d) {
          var name = d.replace(/\*/g, "");

          statement = statement.replace(
            d,
            '<span class="value" style="color:' +
              helper.origin.getAttribute("data-color") +
              '">' +
              name +
              "</span>"
          );
        });

        $content.find(".title").html(statement);
        $content.addClass("statement");
      } else {
        $content.find(".title").text(helper.origin.getAttribute("data-label"));
        $content
          .find(".label-x")
          .text(helper.origin.getAttribute("data-x-label"));
        $content.find(".value-x").text(helper.origin.getAttribute("data-x"));
        $content
          .find(".label-y")
          .text(helper.origin.getAttribute("data-y-label"));
        $content.find(".value-y").text(helper.origin.getAttribute("data-y"));
      }

      return content;
    },

    datumExists: function (datum, params) {
      // console.log(!Array.isArray(params), 'data')
      if (!Array.isArray(params)) {
        params = [params];
      }
      var results = [];
      params.forEach(function (p) {
        var d = datum[p.column];
        if (d === undefined || d === null || d.toLowerCase() === "null") {
          results.push(false);
          return;
        }
        results.push(true);
      });
      return results.indexOf(true) !== -1;
    },

    datumFilter: function (datum, params) {
      if (params === undefined) {
        return true;
      }
      if (!Array.isArray(params)) {
        params = [params];
      }

      var result = true;
      params.forEach(function (p) {
        if (p.values.indexOf(datum[p.column]) === -1) {
          result = false;
          return;
        }
      });
      return result;
    },

    datumExclude: function (datum, params) {
      if (params === undefined) {
        return true;
      }
      if (!Array.isArray(params)) {
        params = [params];
      }

      var result = true;
      params.forEach(function (p) {
        if (p.values.indexOf(datum[p.column]) !== -1) {
          result = false;
          return;
        }
      });
      return result;
    },

    makeArray: function (d) {
      if (!Array.isArray(d)) {
        return [d];
      }
      return d;
    },

    formatColumns: function (data) {
      var _this = this;
      var keys = ["x", "y", "geography"];

      keys.forEach(function (k) {
        data[k] = _this.makeArray(data[k]);
        data[k] = _.map(data[k], function (d) {
          if (d === undefined) {
            return;
          }
          if (typeof d === "string") {
            d = {
              column: d,
            };
          }

          if (d.format === undefined) {
            d.format = _this.defaultNumberFormat;
          }
          return d;
        });
      });

      return data;
    },

    orderData: function (orderBy, order, data) {
      // console.log(order,'order')
      return _.map(order, function (a) {
        return _.find(data, function (o) {
          return o[orderBy] === a;
        });
      });
    },

    setupNotes: function ($elem, notes) {
      $elem.html("");

      $elem.text(notes);
    },

    resizeChart: function (outer, inner) {
      var outerNode = outer.node();
      var svgRect = outerNode.getBoundingClientRect(),
        gRect = inner.node().getBoundingClientRect();

      var offset =
        gRect.top + gRect.height - (svgRect.top + svgRect.height) + 30;

      //outer.attr("height", outer.attr("height") + (offset + 10))
      outer.style("margin-bottom", offset + "px");

      var height = outerNode.getAttribute("height");
      var width = outerNode.getAttribute("width");
      var widthToHeight = width / height;

      var $outerNode = $(outerNode);
      var $parent = $outerNode.parent();

      $outerNode.css({
        width: $parent.width(),
        height: $parent.width() / widthToHeight,
      });

      /*
			viewBox = '0 0 ' + newWidth + ' ' + newHeight;

			svg.attr('viewBox', viewBox)
				.attr('width', newWidth)
				.attr('height', newHeight)
	*/
    },

    setupAjaxOnScroll: function (viz) {
      // console.log(viz, 'vizzzz')
      var timer;
      var scene = new ScrollMagic.Scene({
        triggerElement: viz.$scrollContainer[0],
        duration: determineDuration(),
      })
        .on("enter", function () {
          timer = setTimeout(function () {
            viz.init();
            scene.destroy(true);
            window.removeEventListener("resize", recalcDuration);
          }, 100);
        })
        .on("leave", function () {
          clearTimeout(timer);
          // scene.destroy(true);
        })
        .addTo(VERA.sm);

      window.addEventListener("resize", recalcDuration);

      function recalcDuration() {
        scene.duration(determineDuration());
      }

      function determineDuration() {
        return viz.$scrollContainer.outerHeight(true);
      }
    },
  };
})();
