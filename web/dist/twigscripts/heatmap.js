(function () {
  "use strict";

  var VERA = window.VERA || {};

  window.VERA = VERA;

  VERA.heatmap = function (params) {
    // console.log(params, 'PARAMS!!')
    var data,
      mapColor = VERA.dataViz.colors[0],
      emptyColor = "rgba(0,0,0,.1)",
      svg,
      key,
      options,
      animationDuration = VERA.dataViz.animationDuration;
    var $container = $(params.container),
      $chart,
      $vizSelector,
      $vizSelectorSecondary,
      $svg,
      $heading,
      $explainer,
      $notes,
      $scrollTarget = $("html,body");

    var $scrollContainer = $container.closest(
      ".article-block-standard,.article"
    );
    this.$scrollContainer = $scrollContainer.length
      ? $scrollContainer
      : $container;
    this.init = init;

    VERA.dataViz.setupAjaxOnScroll(this);

    function init() {
      $chart = $container.find(".chart");

      ($vizSelector = $container.find(".viz-selector--primary")),
        ($vizSelectorSecondary = $container.find(".viz-selector--secondary"));

      $heading = $container.find(".graph-header-inner-text .heading");
      $explainer = $container.find(".graph-header-inner-text .description");
      $notes = $container.find(".viz-notes");

      var $tooltipTemplate = $container.find(".tooltip-template");
      if ($tooltipTemplate.length) {
        $(".tooltip_templates").append($tooltipTemplate);
      }
      // console.log(params, 'params')

      $.get(params.mapUrl, handleMap);
    }

    function handleMap(response) {
      var $parentContainer = $chart.closest(".article-block-standard");
      $chart.prepend($(response));

      $svg = $chart.find("svg");
      svg = d3.select($svg[0]);
      svg.selectAll("path").attr("fill", "rgba(255,255,255,0)");

      getData();
    }

    function getData() {
      d3.csv(params.data, handleData);
    }

    function handleData(response) {
      data = response;

      // console.log(response)

      makeMap();
      $vizSelector.on("change", function (event) {
        makeMap();
      });

      $vizSelector.find("input").on("change", function (event) {
        var value = $(event.target).val();
        $vizSelectorSecondary.find("select").val(value);
        $vizSelector.find("radiogroup legend.open").removeClass("open");
        $(event.target).closest("radiogroup").find("legend").addClass("open");
        makeMap();
      });

      $vizSelectorSecondary.find("select").on("change", function (event) {
        var value = $(event.target).val();
        $vizSelector.find('[value="' + value + '"]').prop("checked", true);
        $vizSelector.find("input:checked").trigger("change");
      });
    }

    function makeMap() {
      //loading
      $chart.addClass("loading");
      options = JSON.parse(
        $vizSelector.find("input:checked").first().attr("data-options")
      );

      options.data = VERA.dataViz.formatColumns(options.data);

      var chartData = filterData(data, options);
      $heading.text(options.label);
      $explainer.text(options.explainer);

      VERA.dataViz.setupNotes($notes, options.notes);

      var format = options.data.y[0].format;

      var extent, bands;

      var scaleType = "scaleQuantile",
        vertical = false;

      if (options.domain !== undefined) {
        //Custom domain
        extent = options.domain;
        bands = extent.length - 1;
      } else if (format === null) {
        extent = d3
          .map(chartData, function (d) {
            return d[options.data.y[0].column];
          })
          .keys();
        bands = extent.length;
        scaleType = "scaleOrdinal";
        vertical = true;
      } else if (format === "YESNO") {
        extent = [0, "space", 1];
        bands = extent.length - 1;
      } else {
        extent = d3.extent(chartData, function (d) {
          return parseFloat(d[options.data.y[0].column]);
        });
        bands = 4;
      }

      var endColor = d3.color(mapColor);
      var startColor = endColor.brighter(3);

      var color = d3.interpolateHcl(startColor, endColor);

      var inc = 1 / bands;
      var range = [];
      for (var i = 0; i < 1; i += inc) {
        range.push(color(i));
      }

      if (options.reverseScale) {
        range = range.reverse();
      }

      var colorScale = d3[scaleType]().domain(extent).range(range);

      makeKey(range, colorScale, vertical);

      svg.selectAll("path[data-label]").attr("fill", emptyColor);

      var tips = $.tooltipster.instances(params.container + " .tooltip-target");
      tips.forEach(function (t) {
        t.destroy();
      });

      svg.selectAll("[data-value]").classed("tooltip-target", false);

      chartData.forEach(function (d) {
        var datum = d;
        var value = datum[options.data.y[0].column];
        value = format === null ? value : parseFloat(value);

        var color = colorScale(value);

        console.log(d, options.data.y[0].column, value);

        //Colors map shapes based on data-value attribute
        var path = svg.selectAll(
          '[data-value="' + datum[options.data.geography[0].column] + '"]'
        );

        path
          .classed("tooltip-target", true)
          .attr(
            "data-tooltip-content",
            (params.container + "__tooltip-template").replace(".", "#")
          )
          .attr("data-label", function (d) {
            return datum[options.data.label];
          });

        if (
          options.data.x[0].hideInTooltip === undefined ||
          options.data.x[0].hideInTooltip === false
        ) {
          path
            .attr("data-x", function (d) {
              return datum[options.data.x[0].column];
            })
            .attr("data-x-label", function (d) {
              return options.data.x[0].column;
            });
        }

        path
          .attr("data-y", function (d) {
            return yLabel(datum[options.data.y[0].column]);
          })
          .attr("data-y-label", function (d) {
            return options.data.y[0].column;
          })
          .attr("data-tooltip", function (d) {
            if (!options.tooltip) {
              return;
            }
            var vars = options.tooltip.match(/\*(.*?)\*/g);
            var statement = options.tooltip;
            if (vars) {
              vars.forEach(function (d) {
                var name = d.replace(/\*/g, "");

                switch (name) {
                  case "y":
                    switch (options.data[name][0].format) {
                      case null:
                        statement = statement.replace(
                          d,
                          "*" + datum[options.data[name][0].column] + "*"
                        );
                        break;

                      case "YESNO":
                        statement = statement.replace(
                          d,
                          "*" +
                            (datum[options.data[name][0].column] == 1
                              ? "is"
                              : "is not") +
                            "*"
                        );
                        break;

                      default:
                        statement = statement.replace(
                          d,
                          "*" +
                            d3.format(options.data[name][0].format)(
                              datum[options.data[name][0].column]
                            ) +
                            "*"
                        );
                    }
                    break;
                  default:
                    statement = statement.replace(name, datum[name]);
                }
              });
            }

            return statement;
          })
          .attr("data-color", color)
          .transition()
          .duration(animationDuration)
          .attr("fill", color);
      });

      $chart.find(".tooltip-target").tooltipster({
        contentCloning: true,
        functionFormat: VERA.dataViz.formatTooltip,
        theme: ["tooltipster-noir", "tooltipster-noir-customized"],
        side: ["top", "bottom"],
        interactive: true,
        trigger: "custom",
        triggerOpen: {
          mouseenter: true,
          touchstart: true,
          tap: true,
        },
        triggerClose: {
          mouseleave: true,
          originClick: true,
          touchleave: true,
        },
      });

      window.addEventListener("resize", resized);

      $chart.removeClass("loading");
    }

    var resizeTimer;
    function resized() {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }

      resizeTimer = setTimeout(function () {
        VERA.dataViz.resizeChart(svg, key);
      }, 100);
    }

    function yLabel(d, truncate) {
      truncate = truncate === undefined ? false : truncate;

      if (d === "") {
        return d;
      }

      switch (options.data.y[0].format) {
        case null:
          return d;

        case "YESNO":
          return (function (v) {
            if (v === "space") {
              return "";
            } else if (!!+v) {
              return "Yes";
            } else {
              return "No";
            }
          })(d);
          break;

        default:
          return d3.format(
            options.data.y[0].format !== VERA.dataViz.defaultNumberFormat ||
              truncate === false
              ? options.data.y[0].format
              : ",.0s"
          )(d);
      }
    }

    function filterData(data, options) {
      return _.filter(data, function (i) {
        return (
          VERA.dataViz.datumFilter(i, options.where) &&
          VERA.dataViz.datumExists(i, options.data.y) &&
          VERA.dataViz.datumExists(i, options.data.x) &&
          VERA.dataViz.datumExclude(i, options.exclude)
        );
      });
    }

    function makeKey(colors, scale, vertical) {
      vertical = vertical !== undefined ? vertical : false;

      var chartWidth = svg.attr("width"),
        chartHeight = svg.attr("height"),
        ticks;

      var itemSize = chartWidth / 20 < 20 ? chartWidth / 20 : 20,
        itemPad = 1,
        itemWidth = vertical ? itemSize * 2 : itemSize * 3,
        itemHeight = vertical ? itemSize * 1.25 : itemSize;

      svg.selectAll("g.key").remove();

      key = svg.append("g").attr("class", "key").attr("stroke", "none");

      var items = key.selectAll("g").data(colors).enter().append("g");

      items
        .append("rect")
        .attr("width", itemWidth)
        .attr("height", itemHeight)
        .attr("fill", function (d, i) {
          return d;
        });

      if (options.data.y[0].format === "YESNO") {
        var domain = scale.domain();
        ticks = [domain[0], "", domain[1]];
      } else if (scale.domain().length < colors.length) {
        ticks = scale.quantiles().concat(scale.domain());
        ticks.sort(function (a, b) {
          return a - b;
        });
      } else {
        ticks = scale.domain();
      }

      key
        .selectAll(".tick")
        .data(ticks)
        .enter()
        .append("text")
        .attr("class", "tick receives-fill-color")
        .text(function (d) {
          return yLabel(d, true);
        })
        .attr("x", function (d, i) {
          return vertical ? itemWidth + 5 : i * itemWidth * itemPad;
        })
        .attr("y", function (d, i) {
          return vertical ? i * itemHeight + itemHeight / 1.75 : itemHeight * 2;
        })
        .attr("text-anchor", "left")
        .attr("dominant-baseline", "middle");

      var xOffset = 0,
        yOffset = 0;
      items.each(function (d) {
        var prev = this.previousElementSibling;

        if (vertical) {
          var prevHeight = prev
            ? d3.select(prev).node().getBBox().height * itemPad
            : 0;

          yOffset += prevHeight;
        } else {
          var prevWidth = prev
            ? d3.select(prev).node().getBBox().width * itemPad
            : 0;
          xOffset += prevWidth;
          var needsNewLine =
            xOffset + d3.select(this).node().getBBox().width * itemPad >
            chartWidth;

          if (needsNewLine) {
            xOffset = 0;
            yOffset += itemHeight * itemPad * itemPad;
          }
        }

        d3.select(this).attr(
          "transform",
          "translate(" + xOffset + " " + yOffset + ")"
        );
      });

      var keyWidth = itemWidth * (ticks.length - 1);

      key.attr("transform", "translate(" + 0 + " " + (+chartHeight + 30) + ")");

      VERA.dataViz.resizeChart(svg, key);
    }
  };
})();
