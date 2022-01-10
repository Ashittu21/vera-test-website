var VERA = window.VERA || {};

VERA.revenuesChart = function (
  selector,
  dataUrl,
  locale,
  isState,
  state,
  missingMessage
) {
  var total;
  var scale;
  var elem = d3.select(selector);

  d3.csv(dataUrl, function (error, data) {
    if (error) {
      console.error(error);
      return;
    }

    var stateLower = state.toLowerCase();
    var localeLower = locale.toLowerCase();
    var filteredData = data.filter(function (d) {
      if (isState) {
        return d.state_name.toLowerCase() === stateLower;
      } else {
        return (
          d.county_name.toLowerCase() === localeLower &&
          d.state_name.toLowerCase() === stateLower
        );
      }
    });
    if (!filteredData.length) {
      console.log("no data for revenues chart");

      $(elem.node()).closest(".RevenuesChartContainer").remove();
      return null;
    }
    var summedCategories = sumCategories(filteredData);
    total = summedCategories[summedCategories.length - 1].value;
    scale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(summedCategories, function (d) {
          return d.value;
        }),
      ])
      .range([0, 65]);

    elem
      .append("h3")
      .attr("class", "RevenuesChart-heading")
      .text(
        "Revenue from jail fees and charges in " +
          (isState ? locale : locale + ", " + state) +
          ", FY2019"
      );

    var grandTotal = [summedCategories[summedCategories.length - 1]];
    var items = summedCategories.slice(0, summedCategories.length - 1);
    var initialItems = items.slice(0, 10);
    var restItems = items.slice(10, items.length);

    makeItems(initialItems);
    makeItems(restItems, true, restItems.length);
    makeItems(grandTotal);
  });

  function makeItems(data, toggle = false, remainingItemCount) {
    var container = elem
      .append("div")
      .attr("class", "RevenuesChart-toggle-container");
    var inner = container
      .append("div")

      .style("display", toggle ? "none" : "");
    if (toggle && remainingItemCount) {
      let toggleOpen = false;
      container
        .append("button")
        .attr("class", "RevenuesChart-toggle btn")
        .on("click", function () {
          //
          var button = d3.select(this);
          var $items = $(inner.node());
          if (toggleOpen) {
            $items.slideUp();
            button.text("Show " + remainingItemCount + " More");
          } else {
            $items.slideDown();
            button.text("Show Less");
          }
          toggleOpen = !toggleOpen;
        })
        .text("Show " + remainingItemCount + " More");
    }
    inner
      .append("div")
      .selectAll(".RevenuesChart-item")
      .data(data)
      .enter()
      .append("div")
      .attr("class", "RevenuesChart-item")
      .each(makeItem);

    function makeItem(d) {
      var _this = d3.select(this);
      var barHeight = 4;
      _this
        .append("div")
        .attr("class", "RevenuesChart-item-label")
        .text(function (d) {
          return d.label;
        });
      var bar = _this
        .append("svg")
        .attr("class", "RevenuesChart-item-bar")
        .attr("viewBox", "0 0 100 " + barHeight);

      bar
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", barHeight)
        .attr("width", function (d) {
          return scale(d.value);
        })
        .attr("class", "fill--red");

      bar
        .append("text")
        .attr("x", function (d) {
          return scale(d.value) + 2;
        })
        .attr("y", barHeight / 2 + 0.4)
        .attr("dominant-baseline", "middle")
        .attr("font-size", 3.2)
        .text(function (d) {
          return (
            formatMoney(d.value) +
            " (" +
            Math.round((100 * d.value) / total) +
            "%)"
          );
        });
    }
  }
  var formatMoney = d3.format("$,.2f");
  function sumCategories(data) {
    var cats = Object.values(
      data.reduce(function (r, d) {
        if (!r[d.revenue_item]) {
          r[d.revenue_item] = {
            label: d.revenue_item,
            value: 0,
          };
        }
        r[d.revenue_item].value += +d.amount;
        return r;
      }, {})
    ).sort(function (a, b) {
      if (a.value < b.value) {
        return 1;
      } else if (a.value > b.value) {
        return -1;
      } else {
        return 0;
      }
    });
    cats.push({
      label: "Grand Total",
      value: cats.reduce(function (r, d) {
        return r + d.value;
      }, 0),
    });
    return cats;
  }
};
