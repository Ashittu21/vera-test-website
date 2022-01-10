(function () {
  "use strict";

  var VERA = window.VERA || {};

  window.VERA = VERA;

  var forExport = false;

  var dlinterval;

  VERA.graph = function (params) {
    var svg,
      g,
      width,
      height,
      viewBox,
      widthToHeight,
      margin = {},
      defaultMargin = {},
      chartWidth,
      chartHeight,
      yDomainScalar,
      barPad,
      showBaseline,
      hasFilter,
      options;

    var selectNumber = 0,
      baselineMult = 6,
      filterLimit = 3,
      animationDuration = VERA.dataViz.animationDuration;

    var $svg,
      rawData,
      rawFilterData,
      $tooltip,
      $filterInner,
      $baselineToggle,
      $baselineToggleContainer,
      $vizSelector,
      $vizSelectorSecondary,
      $chart,
      $geographyKey,
      $heading,
      $explainer,
      $addFilter,
      $key,
      $notes,
      $scrollTarget = $("html,body"),
      $container = $(params.container);

    var parseTime, formatTime, currentParams;

    var $scrollContainer = $container.closest(
      ".article-block-standard, .article"
    );
    this.$scrollContainer = $scrollContainer.length
      ? $scrollContainer
      : $container;
    VERA.dataViz.setupAjaxOnScroll(this);

    init();

    function init() {
      (width = 1000),
        (height = 500),
        (viewBox = "0 0 " + width + " " + height),
        (margin = { top: 20, right: 0, bottom: 80, left: 80 }),
        (defaultMargin = $.extend(true, {}, margin)),
        (yDomainScalar = 1.05),
        (barPad = 0.9),
        (widthToHeight = width / height);

      setChartSizes();

      currentParams = params;

      parseTime = d3.timeParse("%Y");
      formatTime = d3.timeFormat("%Y");

      var q = d3.queue();
      q.defer(d3.csv, currentParams.data);
      if (currentParams.filterData) {
        q.defer(d3.csv, currentParams.filterData);
      }
      q.await(function (error, data, filterData) {
        if (error) throw error;
        handleData({
          data: data,
          filterData: filterData,
        });
      });
    }

    function handleData(response) {
      rawData = response.data;
      rawFilterData = response.filterData;
      hasFilter = !!rawFilterData;
      setupViz();
    }

    function setupViz() {
      var $tooltipTemplate = $container.find(".tooltip-template");
      if ($tooltipTemplate.length) {
        $(".tooltip_templates").append($tooltipTemplate);
      }

      $chart = $container.find(".chart");

      var currentHeight = $container.outerHeight(true);

      if (hasFilter) {
        $filterInner = $container.find(
          ".multi-filter-selector .fieldset-inner .select-wrap"
        );
        $addFilter = $container.find(".js-add-filter");
        $addFilter.on("click", function () {
          makeFilterSelect(false);
        });

        makeFilterSelect(true);
      }

      svg = d3
        .select($chart[0])
        .insert("svg", ".viz-notes")
        .attr("viewBox", viewBox)
        .attr("width", width)
        .attr("height", height);

      $svg = $(svg.node());

      $geographyKey = $container.find(".geography-key svg");

      ($vizSelector = $container.find(".viz-selector--primary")),
        ($vizSelectorSecondary = $container.find(".viz-selector--secondary"));

      $vizSelector.find("radiogroup legend").on("click", function (event) {
        var $e = $(event.target);
        if ($e.hasClass("open")) {
          $e.removeClass("open");
        } else {
          $vizSelector.find("radiogroup legend.open").removeClass("open");
          $e.addClass("open");
        }
      });

      if (!$vizSelector.find("input:checked").length) {
        $vizSelector.find("input").first().prop("checked", true);
      }

      $vizSelector
        .find("radiogroup input:checked")
        .closest("radiogroup")
        .find("legend")
        .addClass("open");

      $heading = $container.find(".graph-header-inner-text .heading");
      $explainer = $container.find(".graph-header-inner-text .description");
      $explainer.addClass("rte");
      $notes = $container.find(".viz-notes");

      $key = $container.find(".key");

      $baselineToggle = $container.find('[name="baseline-toggle"]');
      $baselineToggleContainer = $baselineToggle.closest(".baseline-toggle");
      $baselineToggle.on("change", toggleBaseline);
      toggleBaseline();
      // ^ Toggle Baseline executes the first makeChart()

      $vizSelector.find("input").on("change", function (event) {
        var value = $(event.target).val();
        $vizSelectorSecondary.find("select").val(value);
        $vizSelector.find("radiogroup legend.open").removeClass("open");
        $(event.target).closest("radiogroup").find("legend").addClass("open");
        makeChart();
        if (forExport) {
          makeDownloadLinks();
        }
      });

      $vizSelectorSecondary.find("select").on("change", function (event) {
        var value = $(event.target).val();
        $vizSelector.find('[value="' + value + '"]').prop("checked", true);
        $vizSelector.find("input:checked").trigger("change");
      });

      window.addEventListener("resize", function () {
        resizeChart();
      });
    }

    function makeChart() {
      var currentScrollTop = $(document).scrollTop();

      options = JSON.parse(
        $vizSelector.find("input:checked").first().attr("data-options")
      );

      //Cleanup params
      options.data = VERA.dataViz.formatColumns(options.data);
      options.filter = options.filter || {};
      options.baseline = options.baseline || false;

      if (options.baseline) {
        determineBaselineToggleSetting();
        $baselineToggleContainer.show();
      } else {
        showBaseline = false;
        $baselineToggleContainer.hide();
      }

      var values = [];

      if (hasFilter) {
        $filterInner.find("select").each(function () {
          values.push($(this).val());
        });
      } else {
        values = _.map(options.data, function () {
          return values[options.data.x[0].column];
        });
      }

      options.filter.values = values;

      var params = options;

      //loading
      $svg.empty();
      $chart.addClass("loading");
      $heading.text(options.label);
      $explainer.html(options.explainer);

      VERA.dataViz.setupNotes($notes, options.notes);

      //Generate new chart
      if ($baselineToggle.length) {
        params.baseline = {
          column: $baselineToggle.data("column"),
          value: $baselineToggle.data("value").toString(),
        };
      }

      var chartData = filterData(rawData, params);

      margin = $.extend(true, {}, defaultMargin);
      setChartSizes();
      clearLegend();

      switch (params.type) {
        case "line":
          populateKey(params);
          line(chartData, params);
          break;

        case "bar":
          bar(chartData, params);
          break;

        case "stackedBar":
          //Put them in order of filter dropdowns (would be data order otherwise)
          chartData = VERA.dataViz.orderData(
            params.filter.column,
            values,
            chartData
          );
          stackedBar(chartData, params);
          break;

        default:
          console.warn(
            "I don't know how to make a " +
              params.type +
              " chart.  Write me some code."
          );
      }

      var tips = $.tooltipster.instances(params.container + " .tooltip-target");
      tips.forEach(function (t) {
        t.destroy();
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

      //$(document).scrollTop(currentScrollTop);
      $chart.removeClass("loading");
      colorKey();
      resizeChart();
    }

    function toggleBaseline() {
      determineBaselineToggleSetting();

      if (showBaseline) {
        $svg.addClass("show-baseline");
      } else {
        $svg.removeClass("show-baseline");
      }

      makeChart();
    }

    function determineBaselineToggleSetting() {
      showBaseline = $baselineToggle.filter(":checked").length ? true : false;
    }

    function makeFilterSelect(defaultSelected) {
      defaultSelected = defaultSelected || false;

      var $wrap = $('<div class="select-wrapper"></div>');
      var $select = $('<select name="filter"></select>');
      $wrap.append($select);

      if ($filterInner.find("select").length) {
        var $remove = $('<button title="Remove">&#10005;</button>');
        $wrap.append($remove);
        $remove.on("click", function (event) {
          $(event.target).closest(".select-wrapper").remove();
          colorSelects();
          makeChart();
          checkLimit();
        });
      }

      $select.append(
        $(
          "<option disabled " +
            (!defaultSelected ? "selected" : null) +
            ">Select a county</option>"
        )
      );
      rawFilterData.forEach(function (d, i) {
        var selected = defaultSelected && i === 0;
        $select.append(makeOption(d, selected));
      });
      $filterInner.append($wrap);

      colorSelects();

      $select.on("change", function (event) {
        colorKey();
        makeChart();
      });

      checkLimit();

      function checkLimit() {
        if ($filterInner.find("select").length >= filterLimit) {
          $addFilter.attr("disabled", true);
        } else {
          $addFilter.removeAttr("disabled");
        }
      }

      function makeOption(d, selected) {
        var isSelected = $filterInner.find(
          'option:selected[value="' + d.value + '"]'
        ).length;
        return (
          '<option value="' +
          d.value +
          '"' +
          (isSelected ? " disabled" : "") +
          (selected ? " selected" : null) +
          ">" +
          d.label +
          "</option>"
        );
      }
    }

    function colorSelects() {
      $filterInner.find(".select-wrapper").each(function (i) {
        $(this).find("select").css({
          backgroundColor: VERA.dataViz.colors[i],
          borderColor: VERA.dataViz.colors[i],
        });
      });
    }

    function colorKey() {
      //Colors map key shapes based on data-value attribute

      $geographyKey.find("[data-value]").css("fill", "");

      $filterInner.find(".select-wrapper").each(function (i) {
        var $this = $(this).find("select");

        $geographyKey
          .find('[data-value="' + $this.val() + '"]')
          .css("fill", $this.css("background-color"));
      });
    }

    function clearLegend() {
      $key.html("");
    }

    function populateKey(params) {
      clearLegend();

      params.data.y.forEach(function (d, i) {
        $key.append(makeKeyItem(d.column, i));
      });

      function makeKeyItem(label, count) {
        var icon;
        switch (count) {
          case 0:
            icon =
              '<svg width="26" height="2" viewBox="0 0 78 4" xmlns="http://www.w3.org/2000/svg"><path d="M0 1h78" stroke="#000" stroke-width="2" fill="none" /></svg>';
            break;
          default:
            icon =
              '<svg width="26" height="2" viewBox="0 0 78 4" xmlns="http://www.w3.org/2000/svg"><path d="M0 1h78" stroke="#000" stroke-width="2" fill="none" stroke-dasharray="' +
              count * 8 +
              '"/></svg>';
            break;
        }

        return $(
          '<div class="key-item key-item--' +
            count +
            '">' +
            icon +
            label +
            "</div>"
        );
      }
    }

    //Misc helpers

    function filterData(data, params) {
      var usedFilterValues = [];

      var results = _.filter(data, function (i, j) {
        var passesFilter =
          (params.filter.values !== undefined &&
            params.filter.values.indexOf(i[params.filter.column]) !== -1) ||
          (showBaseline && params.baseline.value === i[params.baseline.column]);

        var dataExists =
          VERA.dataViz.datumExists(i, params.data.y) &&
          VERA.dataViz.datumExists(i, params.data.x);

        var filterResult = VERA.dataViz.datumFilter(i, params.where);

        return passesFilter && filterResult && dataExists;
      });

      return results;
    }

    function setupChart(type) {
      return svg
        .append("g")
        .attr("class", type + "-graph")
        .attr("width", chartWidth)
        .attr("height", chartHeight)
        .attr(
          "transform",
          "translate(" + margin.left + ", " + margin.top + ")"
        );
    }

    function setupAxes(g, xRange, xLabel, yRange, yLabel, yFormat) {
      // Add the X Axis
      var xAxis = d3.axisBottom(xRange).ticks(5);
      var xAxisG = g
        .append("g")
        .attr("class", "axis axis--x")
        .style("opacity", 0);

      xAxisG
        .call(customXAxis)
        .attr("transform", "translate(0," + (chartHeight + 10) + ")");
      if (xRange.step) {
        xAxisG.selectAll(".tick text").call(wrap, xRange.step() * 0.8);

        xAxisG
          .selectAll("tspan")
          .attr("font-family", "GT Walsheim")
          .attr("font-weight", "bold")
          .attr("font-size", "20px");

        window.addEventListener("resize", function () {
          xAxisG
            .call(customXAxis)
            .attr("transform", "translate(0," + chartHeight + ")")
            .selectAll(".tick text")
            .call(wrap, xRange.step() * 0.8);
        });
      } else {
        xAxisG
          .append("text")
          .attr("x", width / 2 - margin.left / 2)
          .attr("y", 80)
          .attr("text-anchor", "middle")
          .attr("class", "axis-label")
          .attr("fill", "#000")
          .text(xLabel);
      }

      var labels = xAxisG.selectAll(".tick text").nodes();
      var spans = xAxisG.selectAll(".tick text tspan").nodes();
      if (labels.length > 4 && spans.length > labels.length) {
        labels.forEach(function (l) {
          var spanCount = $(l).children().length;
          var x = -spanCount * 10;
          var y = 40;

          l.setAttribute(
            "transform",
            "translate(" + x + ", " + y + ") rotate(-45)"
          );
        });
      }

      xAxisG
        // .transition().duration(animationDuration)
        .style("opacity", 1);

      function customXAxis(g) {
        g.call(xAxis);
        g.selectAll(".domain").remove();
        g.selectAll(".tick line").remove();
      }

      // Add the Y Axis
      var yAxis = d3
        .axisRight(yRange)
        .ticks(5)
        .tickSize(chartWidth)
        .tickFormat(yFormat);

      var yAxisG = g
        .append("g")
        .attr("class", "axis axis--y")
        .style("opacity", 0);
      //.attr('transform', 'scale(1,0)')

      yAxisG
        .call(customYAxis)
        .append("g")
        .append("text")
        .attr("x", 0)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("class", "axis-label")
        .attr("fill", "#000")
        .attr("font-family", "GT Walsheim")
        .attr("font-weight", "bold")
        .attr("font-size", "20px")
        .attr(
          "transform",
          "rotate(-90," + (-margin.left - 10) + "," + height / 2 + ")"
        )
        .text(yLabel);

      yAxisG
        // .transition().duration(animationDuration)
        .style("opacity", 1);
      //.attr('transform', 'scale(1,1)')

      function customYAxis(g) {
        g.call(yAxis);
        g.select(".domain").remove();
        g.selectAll(".tick:not(:first-of-type) line");
        //.attr("stroke-dasharray", "5");
        g.selectAll(".tick text").attr("x", -30).attr("dy", 4);
      }

      g.selectAll(".tick text,.axis-label")
        .attr("font-family", "GT Walsheim")
        .attr("font-size", "16px")
        .classed("receives-fill-color", true);
    }

    //Types of charts
    function line(chartData, params) {
      g = setupChart("line");

      //////Separate the time format
      var parseX =
        params.data.x[0].column === "Month"
          ? d3.timeParse("%Y-%m-%d")
          : params.data.x[0].column === "Year"
          ? parseTime
          : parseInt;
      chartData.forEach(function (d) {
        d[params.data.x[0].column + "_dateTime"] = parseX(
          d[params.data.x[0].column]
        );
      });
      //

      // set the ranges
      var x = d3.scaleTime().range([0, chartWidth]);
      var y = d3.scaleLinear().range([chartHeight, 0]);

      // Scale the range of the data
      var xExtent = d3.extent(chartData, function (d) {
        return d[params.data.x[0].column + "_dateTime"];
      });
      x.domain(xExtent);

      y.domain([
        0,
        d3.max(chartData, function (d) {
          var values = _.map(params.data.y, function (a) {
            return d[a.column];
          });

          return d3.max(values, function (d) {
            return parseInt(d);
          });
        }),
      ]);

      var yFormat = d3.format(params.data.y[0].format);
      setupAxes(g, x, params.labels.x, y, params.labels.y, yFormat);

      params.data.y.forEach(function (thisY, j) {
        var thisData = _.filter(chartData, function (a) {
          return (
            [params.baseline.value].indexOf(a[params.filter.column]) !== -1 &&
            VERA.dataViz.datumExists(a, thisY) &&
            VERA.dataViz.datumExists(a, params.data.x)
          );
        });

        if (showBaseline) {
          addLineBaseline(
            thisData,
            params.filter.values === undefined
              ? 0
              : params.filter.values.length,
            j,
            {
              x: params.data.x[0].column + "_dateTime",
              y: thisY.column,
            }
          );
        }
      });

      // var extent = d3.extent(chartData, function (d) {
      //   return parseX(d[params.data.x[0].column]);
      // });

      var guides = g.append("g").attr("class", "hover-guides");
      //var domain = extent[1] - extent[0];
      var guideWidth = chartWidth / chartData.length;

      if (!forExport) {
        chartData.forEach(function (d) {
          guides
            .append("rect")
            .attr("class", "hover-guide")
            .attr(
              "x",
              x(d[params.data.x[0].column + "_dateTime"]) - guideWidth / 2
            )
            .attr("y", 0)
            .attr("width", guideWidth)
            .attr("height", chartHeight)
            .attr("fill", "transparent")
            .attr("data-x", d[params.data.x[0].column])
            .on("mouseover", function (d, i) {
              var value = this.getAttribute("data-x");
              svg
                .selectAll('.dot[data-x="' + value + '"]~.visible-dot')
                .attr("opacity", 1);
            })
            .on("mouseout", function () {
              var value = this.getAttribute("data-x");
              svg
                .selectAll('.dot[data-x="' + value + '"]~.visible-dot')
                .attr("opacity", 0);
            });
        });
      }

      params.filter.values.forEach(function (d, i) {
        params.data.y.forEach(function (thisY, j) {
          var thisData = _.filter(chartData, function (a) {
            return (
              [d].indexOf(a[params.filter.column]) !== -1 &&
              VERA.dataViz.datumExists(a, thisY) &&
              VERA.dataViz.datumExists(a, params.data.x)
            );
          });
          addLine(thisData, i, j, {
            x: params.data.x[0].column + "_dateTime",
            dataX: params.data.x[0].column,
            y: thisY.column,
          });
        });
      });

      function addLine(data, sourceCount, quantityCount, columns) {
        // define the line
        var lineFn = d3
          .line()
          //.curve(d3.curveBasis)
          .x(function (d) {
            return x(d[columns.x]);
          })
          .y(function (d) {
            return y(d[columns.y]);
          });
        var startFn = d3
          .line()
          .x(function (d) {
            return x(d[columns.x]);
          })
          .y(y(0));

        var lineg = g
          .append("g")
          .attr("class", "line-group group--" + quantityCount)
          .attr("fill", VERA.dataViz.colors[sourceCount])
          .attr("stroke", VERA.dataViz.colors[sourceCount]);
        // Add the valueline path.
        lineg
          .append("path")
          .data([data])
          .attr("class", "line")
          .attr(
            "stroke-dasharray",
            quantityCount > 0 ? quantityCount * 8 : null
          )
          .attr("fill", "none")
          .attr("d", function (d) {
            return startFn(d);
          })
          // .transition().duration(animationDuration)
          .attr("d", function (d) {
            return lineFn(d);
          });

        //Add dots
        var dot = lineg
          .selectAll(".datum")
          .data(data)
          .enter()
          .append("g")
          .attr("class", "datum");
        if (!forExport) {
          dot
            .append("circle") // Uses the enter().append() method
            .attr("class", "dot tooltip-target") // Assign a class for styling
            .attr("cx", function (d, i) {
              d.x = x(d[columns.x]);
              return d.x;
            })
            .attr("stroke", "none")
            .attr("fill", "transparent")
            .attr("cy", y(0))
            .attr(
              "data-tooltip-content",
              (currentParams.container + "__tooltip-template").replace(".", "#")
            )
            .attr("data-label", function (d) {
              return d[params.data.label];
            })
            .attr("data-x", function (d) {
              return d[columns.dataX];
            })
            .attr("data-x-label", function (d) {
              return params.data.x[0].column;
            })
            .attr("data-y", function (d) {
              return d3.format(VERA.dataViz.defaultNumberFormat)(d[columns.y]);
            })
            .attr("data-y-label", function (d) {
              return columns.y;
            })
            .attr("data-color", VERA.dataViz.colors[sourceCount])
            .attr("data-tooltip", function (d) {
              return tooltipStatement(d, quantityCount);
            })
            .attr("r", 8)
            // .transition().duration(animationDuration)
            .attr("cy", function (d) {
              d.y = y(d[columns.y]);
              return d.y;
            });

          dot
            .append("line")
            .attr("x1", function (d, i) {
              d.x = x(d[columns.x]);
              return d.x;
            })
            .attr("y1", function (d) {
              d.y = y(d[columns.y]);
              return d.y;
            })
            .attr("x2", function (d, i) {
              d.x = x(d[columns.x]);
              return d.x;
            })
            .attr("y2", chartHeight);

          dot
            .append("circle") // Uses the enter().append() method
            .attr("class", "dot visible-dot") // Assign a class for styling
            .attr("cx", function (d, i) {
              d.x = x(d[columns.x]);
              return d.x;
            })
            .attr("stroke", "none")
            .attr("cy", y(0))
            .attr("r", 5)
            .attr("opacity", 0)
            // .transition().duration(animationDuration)
            .attr("cy", function (d) {
              d.y = y(d[columns.y]);
              return d.y;
            });
        }
      }

      function addLineBaseline(data, sourceCount, quantityCount, columns) {
        var area = d3
          .area()
          .x(function (d) {
            return x(d[columns.x]);
          })
          .y1(function (d) {
            return y(d[columns.y]);
          })
          .y0(y(0));
        var startArea = d3
          .area()
          .x(function (d) {
            return x(d[columns.x]);
          })
          .y1(y(0))
          .y0(y(0));
        var lineg = g
          .append("g")
          .attr("class", "baseline line-group group--baseline" + quantityCount)
          .attr("fill", VERA.dataViz.baselineColor)
          .attr("stroke", "none");
        // Add the valueline path.
        lineg
          .append("path")
          .data([data])
          .attr("class", "line")
          .attr("d", startArea)
          .attr("fill-opacity", 0.2)
          // .transition().duration(animationDuration)
          .attr("d", area);
      }
    }

    function bar(chartData, params) {
      var chartParams = params;

      params.labels = params.labels || { x: null, y: null };

      g = setupChart("bar");

      xDomain = _.map(params.data.y, function (d, i) {
        return Array.isArray(params.labels.x) && params.labels.x[i] != null
          ? params.labels.x[i]
          : d.column;
      });

      // set the ranges
      var xBands = d3.scaleBand().range([0, chartWidth]).domain(xDomain);

      var x = d3.scaleBand();
      var y = d3.scaleLinear().range([chartHeight, 0]);

      // Scale the range of the data
      //x.domain(d3.extent(chartData, function(d) { return d[params.data.x]; }));

      var xDomain = (params.filter.values || []).concat([
        params.baseline.value,
      ]);

      x.domain(xDomain).range([0, xBands.step()]).padding(barPad);

      var yMax =
        yDomainScalar *
        d3.max(chartData, function (d) {
          var values = _.map(params.data.y, function (a) {
            return d[a.column];
          });

          return d3.max(values, function (d) {
            return parseFloat(d);
          });
        });

      y.domain([0, yMax]);

      var yFormat = d3.format(params.data.y[0].format);

      setupAxes(g, xBands, params.labels.x, y, params.labels.y, yFormat);

      params.data.y.forEach(function (thisY, j) {
        var columnLabel =
          Array.isArray(params.labels.x) && params.labels.x[j] != null
            ? params.labels.x[j]
            : params.data.y[j].column;

        var group = g
          .append("g")
          .attr("class", "attribute-group attribute-group--" + j)
          .attr(
            "transform",
            "translate(" +
              (xBands(columnLabel) + x.step() * x.padding()) +
              ", 0)"
          );
        var thisData = _.filter(chartData, function (a) {
          return (
            [params.baseline.value].indexOf(a[params.filter.column]) !== -1 &&
            VERA.dataViz.datumExists(a, params.data.y[j])
          );
        });

        if (showBaseline) {
          addBarBaseline(
            thisData,
            params.filter.values === undefined
              ? 0
              : params.filter.values.length,
            j,
            group
          );
        }

        if (params.filter.values !== undefined) {
          params.filter.values.forEach(function (d, i) {
            var thisData = _.filter(chartData, function (a) {
              return (
                [d].indexOf(a[params.filter.column]) !== -1 &&
                VERA.dataViz.datumExists(a, params.data.y[j])
              );
            });

            addBar(thisData, i, j, group);
          });
        }
      });

      function addBar(data, sourceCount, quantityCount, group) {
        var barG = group
          .append("g")
          .attr("class", "bar-group" + " group--" + quantityCount)
          .attr("fill", VERA.dataViz.colors[sourceCount])
          .selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("class", "tooltip-target")
          .attr("width", x.step() * x.padding())
          .attr("x", x.step() * (1 - x.padding()) + x.step() * sourceCount)
          .attr(
            "data-tooltip-content",
            (currentParams.container + "__tooltip-template").replace(".", "#")
          )
          .attr("data-label", function (d) {
            return d[chartParams.data.label];
          })
          .attr("data-x-label", function (d) {
            return params.data.x[0].column;
          })
          .attr("data-x", function (d) {
            return d[params.data.x[0].column];
          })
          .attr("data-y-label", function (d) {
            return params.data.y[quantityCount].column;
          })
          .attr("data-y", function (d) {
            return d3.format(params.data.y[quantityCount].format)(
              d[params.data.y[quantityCount].column]
            );
          })
          .attr("y", chartHeight)
          .attr("height", 0)
          .attr("data-tooltip", function (d) {
            return tooltipStatement(d, quantityCount);
          })
          .attr("data-color", VERA.dataViz.colors[sourceCount])
          // .transition().duration(animationDuration).delay(function (d, i) { return quantityCount * 50; })
          .attr("y", function (d, i) {
            return y(d[params.data.y[quantityCount].column]);
          })
          .attr("height", function (d, i) {
            return (
              chartHeight -
              y(parseFloat(d[params.data.y[quantityCount].column]))
            );
          });
      }

      function addBarBaseline(data, sourceCount, quantityCount, group) {
        var barG = group
          .append("g")
          .attr(
            "class",
            "baseline bar-group" + " group--baseline" + quantityCount
          )
          .attr("fill", VERA.dataViz.baselineColor)
          .selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("class", "tooltip-target")
          .attr(
            "width",
            x.step() * sourceCount + x.step() * (1 - x.padding()) * baselineMult
          )
          .attr("x", x.step() * (1 - x.padding()) * -(baselineMult / 2))
          //.attr("y", function(d) { return y(d[params.data.y[quantityCount].column]); })
          .attr(
            "data-tooltip-content",
            (currentParams.container + "__tooltip-template").replace(".", "#")
          )
          .attr("data-label", function (d) {
            return d[chartParams.data.label];
          })
          .attr("data-x", function (d) {
            return d[params.data.x[0].column];
          })
          .attr("data-y", function (d) {
            return d[params.data.y[quantityCount].column];
          })
          .attr("data-x-label", function (d) {
            return params.data.x[0].column;
          })
          .attr("data-y-label", function (d) {
            return params.data.y[quantityCount].column;
          })
          .attr("fill-opacity", 0.2)

          .attr("height", 0)
          .attr("y", chartHeight)
          // .transition().duration(animationDuration).delay(function (d, i) { return quantityCount * 50; })
          .attr("y", function (d, i) {
            return y(d[params.data.y[quantityCount].column]);
          })
          .attr("height", function (d, i) {
            return (
              chartHeight - y(parseInt(d[params.data.y[quantityCount].column]))
            );
          });
      }
    }

    function stackedBar(chartData, params) {
      margin.left = 0;

      setChartSizes();

      g = setupChart("bar");

      var y = d3.scaleBand().range([0, chartHeight]).padding(0.5),
        x = d3.scaleLinear().range([0, chartWidth]);

      var keys = _.map(params.data.y, function (d) {
        return d.column;
      });

      var stack = d3
        .stack()
        .keys(keys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);

      y.domain(
        chartData.map(function (d) {
          return d[params.data.label];
        })
      );

      x.domain([0, 1]);

      var labels = _.map(chartData, function (d) {
        return d[params.data.label];
      });

      var dataPoints = chartData.length;

      g.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(labels)
        .enter()
        .append("text")
        .text(function (d) {
          return d;
        })
        .attr("dominant-baseline", "ideographic")
        .attr("y", function (d, i) {
          return y(d);
        });

      var layers = stack(chartData);

      var layer = g
        .selectAll(".stacked-bar")
        .data(layers)
        .enter()
        .append("g")
        .attr("class", "stacked-bar")
        .attr("data-label", function (d, i) {
          return keys[i];
        })
        .attr("data-group", function (d, i) {
          return i;
        });

      var piece = layer
        .selectAll("rect")
        .data(function (d) {
          return d;
        })
        .enter()
        .append("rect")
        .attr("class", "tooltip-target")
        .attr(
          "data-tooltip-content",
          (currentParams.container + "__tooltip-template").replace(".", "#")
        )
        .attr("data-label", function (d) {
          return d.data[params.data.label];
        })
        .attr("fill", function (d, i) {
          var group = d3
            .select(this)
            .node()
            .parentNode.getAttribute("data-group");
          var quotient = group == 0 ? 0 : group / dataPoints;
          return d3.interpolateRgb(
            VERA.dataViz.colors[i],
            VERA.dataViz.secondaryColors[i]
          )(quotient);
        })
        .attr("x", function (d) {
          return x(d[0]);
        })
        .attr("data-x", function (d) {
          return d.data[params.data.x[0].column];
        })
        .attr("data-x-label", function (d) {
          return params.data.x[0].column;
        })
        .attr("y", function (d) {
          return y(d.data[params.data.label]);
        })
        .attr("data-y", function (d, i) {
          return d3.format(params.data.y[i].format)(d[1] - d[0]);
        })
        .attr("data-y-label", function (d, i) {
          return d3.select(this).node().parentNode.getAttribute("data-label");
        })
        .attr("data-tooltip", function (d, i) {
          var group = this.parentNode.getAttribute("data-group");
          return tooltipStatement(d, group);
        })
        .attr("width", function (d) {
          return x(d[1]) - x(d[0]);
        })
        .attr("height", y.bandwidth());

      var dataPoints = chartData.length;
      makeKey(keys, dataPoints, g);

      window.addEventListener("resize", function () {
        g.selectAll(".key").remove();
        makeKey(keys, dataPoints, g);
      });
    }

    function tooltipStatement(d, i) {
      var datum = d;

      //for stacked bar, d has the range, d.data is what we're after
      if (datum.data !== undefined) {
        datum = datum.data;
      }
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
              if (options.data[name][i].format === "YESNO") {
                statement = statement.replace(
                  d,
                  "*" +
                    (datum[options.data[name][i].column] == 1
                      ? "is"
                      : "is not") +
                    "*"
                );
              } else {
                statement = statement.replace(
                  d,
                  "*" +
                    d3.format(options.data[name][i].format)(
                      datum[options.data[name][i].column]
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
    }

    function makeKey(data, dataPoints, parent) {
      var itemSize = chartWidth / 20 < 20 ? chartWidth / 20 : 20,
        itemPad = 1.5;

      var key = parent
        .append("g")
        .attr("class", "key")
        .attr("transform", "translate(0 " + chartHeight + ")");
      var items = key.selectAll("g").data(data).enter().append("g");

      var keygroup = items
        .append("g")
        .attr("class", "key-group")
        .attr("data-group", function (d, i) {
          return i;
        });

      var keyGroupData = [],
        i = 0,
        l = dataPoints;
      for (; i < l; i++) {
        keyGroupData.push(null);
      }

      keygroup
        .selectAll("rect")
        .data(keyGroupData)
        .enter()
        .append("rect")
        .attr("width", itemSize)
        .attr("height", itemSize / keyGroupData.length)
        .attr("fill", function (d, i) {
          var group = d3
            .select(this)
            .node()
            .parentNode.getAttribute("data-group");
          var quotient = group == 0 ? 0 : group / dataPoints;
          return d3.interpolateRgb(
            VERA.dataViz.colors[i],
            VERA.dataViz.secondaryColors[i]
          )(quotient);
        })
        .attr("y", function (d, i) {
          return i * (itemSize / keyGroupData.length);
        });

      items
        .append("text")
        .text(function (d) {
          return d;
        })
        .attr("x", itemSize * itemPad)
        .attr("y", itemSize / 2)
        .attr("dominant-baseline", "middle");

      var xOffset = 0,
        yOffset = 0;
      items.each(function (d) {
        var prev = this.previousElementSibling;
        var prevWidth = prev
          ? d3.select(prev).node().getBBox().width * itemPad
          : 0;

        xOffset += prevWidth;
        var needsNewLine =
          xOffset + d3.select(this).node().getBBox().width * itemPad >
          chartWidth;

        if (needsNewLine) {
          xOffset = 0;
          yOffset += itemSize * itemPad * itemPad;
        }

        d3.select(this).attr(
          "transform",
          "translate(" + xOffset + " " + yOffset + ")"
        );
      });

      resizeChart();
    }

    function setChartSizes() {
      (chartWidth = width - margin.left - margin.right),
        (chartHeight = height - margin.top - margin.bottom);
    }

    function resizeChart() {
      /*
			var box = g.node().getBBox();

			var svgWidth = svg.attr("width"),
				svgHeight = svg.attr("height"),
				svgBox = svg.node().getBBox(),
				widthRatio = svgBox.width/svgWidth,
				heightRatio = svgBox.height/svgHeight

			var heightToWidth = svgHeight/svgWidth;
			var targetHeightToWidth = box.height/box.width;

			var newWidth = chartWidth + margin.left + margin.right,
				newHeight = chartHeight + margin.top + margin.bottom
	*/
      var parentWidth = $svg.parent().width();
      $svg.css("width", parentWidth);
      $svg.css("height", parentWidth / widthToHeight);

      var svgRect = svg.node().getBoundingClientRect(),
        gRect = g.node().getBoundingClientRect();

      var offset =
        gRect.top + gRect.height - (svgRect.top + svgRect.height) + 10;

      svg.style("margin-bottom", offset + "px");
    }

    function makeDownloadLinks() {
      if (dlinterval) {
        clearInterval(dlinterval);
      }
      $svg.attr("xmlns", "http://www.w3.org/2000/svg");
      $svg.parent().children(".download").remove();

      var $select = $(".multi-filter-selector select").first();

      var $firstOption = $select.children("option").eq(1).first();
      $select.val($firstOption.attr("value"));
      $select.trigger("change");

      dlinterval = setInterval(function () {
        var title = $select.children("option:selected").text();
        $svg
          .parent()
          .append(
            `<a class="download" style="display: block" download="${title}.svg" href="${"data:image/svg+xml;utf8"},${encodeURIComponent(
              $svg[0].outerHTML
            )}">${title}</a>`
          );

        var $next = $select.children("option:selected").next();

        if ($next.length) {
          $select.val($next.attr("value"));
          $select.trigger("change");
        } else {
          clearInterval(dlinterval);
        }
      }, 100);
    }

    function wrap(text, width) {
      text.each(function () {
        var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text
            .text(null)
            .append("tspan")
            .attr("x", 0)
            .attr("y", y)
            .attr("dy", dy + "em");

        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));

          var textWidth = 0;
          try {
            textWidth = tspan.node().getComputedTextLength();
          } catch (e) {
            //console.warn(e);
            tspan.text(line.join(" "));
          }

          if (textWidth > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text
              .append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);
          }
        }
      });
    }
  };
})();
