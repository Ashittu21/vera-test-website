var VERA = window.VERA || {};

VERA.jailBudgetSavings = function (
  selector,
  dataUrl,
  county,
  state,
  filterColumns,
  primaryDataItems,
  detailDataColumns,
  detailDataItems
) {
  var filteredData;
  var sliderValue;

  var filterValues = [state, county].map(function (d) {
    return d.toLowerCase();
  });
  var format = VERA.format;

  d3.csv(dataUrl, function (error, data) {
    if (error) {
      console.error(error);
      return;
    }

    var elem = d3
      .select(selector)
      .classed("JailBudgetSavings", true)
      .classed("ff-sans", true);

    if (county.substr(0, 2) === "Mc") {
      county = county.substr(0, 2) + county[2].toUpperCase() + county.substr(3);
    }

    filteredData = data
      .filter(function (d) {
        if (filterColumns.length === 0) {
          return false;
        }
        return (
          filterColumns
            .map(function (column, i) {
              return (
                d[column].toLowerCase().replace(",", "") === filterValues[i]
              );
            })
            .indexOf(false) === -1
        );
      })
      .map(function (d) {
        return {
          ...d,
          percentage: +d["pct_change_proj"],
        };
      });

    if (!filteredData.length) {
      console.log("No Jail Budget Savings Data");
      if (!filteredData.length) {
        $(selector).parent().remove();
        return null;
      }
      return null;
    }

    var upper = elem.append("div").classed("JailBudgetSavings-upper", true);

    var controls = upper.append("div");
    controls
      .append("div")
      .classed("h5", true)
      .text("Proposed reduction in local jail population");
    //slider
    var slider = controls
      .append("div")
      .classed("JailBudgetSavings-slider", true);
    slider
      .append("input")
      .classed("JailBudgetSavings-slider-input", true)
      .attr("type", "range")
      .attr("min", 0)
      .attr("max", 99)
      .attr("value", 0)
      .on("input", onSliderChange);
    sliderValue = slider
      .append("div")
      .classed("JailBudgetSavings-slider-value", true)
      .text("0%");

    primaryDesktop(upper, primaryDataItems);
    detailsDesktop(elem);
    updateData(0);
  });

  function primaryDesktop(elem, groups) {
    groups.forEach(function (group) {
      var upperResults = elem
        .append("div")
        .classed("JailBudgetSavings-upper-results", true);

      group.forEach(function (item) {
        var container = upperResults.append("div");
        container.append("div").classed("h5", true).text(item.label);
        item.elem = container.append("div");
        //.text(item.format(0)); //todo where is this 0 from
      });
    });
  }

  function detailsDesktop(elem) {
    var table = elem
      .append("table")
      .classed("JailBudgetSavings-detailstable", true);
    var header = table
      .append("tr")
      .classed("JailsBudgetSavings-detailstable-header", true);

    header
      .selectAll("th")
      .data(["", ...detailDataColumns])
      .enter()
      .append("th")
      .text(function (d) {
        return d;
      });

    detailDataItems.forEach(function (item) {
      var row = table
        .append("tr")
        .classed("JailBudgetSavings-detailstable-row", true);

      row.append("td").text(item.label);

      item.items.forEach(function (item) {
        item.elem = row.append("td");
      });
    });
  }

  // function detailsMobile(elem) {
  //   var header = elem
  //     .append("div")
  //     .classed("JailBudgetSavings-header", true)
  //     .classed("JailBudgetSavings-row", true);
  //   header
  //     .selectAll("div")
  //     .data(["", "Current", "Projected"])
  //     .enter()
  //     .append("div")
  //     .text(function (d) {
  //       return d;
  //     });
  //   var totalPopRow = elem.append("div").classed("JailBudgetSavings-row", true);
  //   totalPopRow.append("div").text("Total Jail Population");
  //   totalPopRow
  //     .append("div")
  //     .text(formatNumber(filteredData[0]["Total Jail Pop_Current"]));
  //   totalPopProjected = totalPopRow
  //     .append("div")
  //     .text(formatNumber(filteredData[0]["Total Jail Pop_Current"]));

  //   var localPopRow = elem.append("div").classed("JailBudgetSavings-row", true);
  //   localPopRow.append("div").text("Local Jail Population");
  //   localPopRow
  //     .append("div")
  //     .text(formatNumber(filteredData[0]["Local Jail Pop_Current"]));
  //   localPopProjected = localPopRow
  //     .append("div")
  //     .text(formatNumber(filteredData[0]["Local Jail Pop_Current"]));

  //   var budgetRow = elem.append("div").classed("JailBudgetSavings-row", true);
  //   budgetRow.append("div").text("Budget ($)");
  //   budgetRow.append("div").text(formatMoney(filteredData[0]["tot_budget"]));
  //   budgetProjected = budgetRow
  //     .append("div")
  //     .text(formatMoney(filteredData[0]["tot_budget"]));
  // }

  function onSliderChange(e) {
    var value = d3.event.target.value / 100;
    sliderValue.text(format["percentageWhole"](value));
    var sliderValueWidth = $(sliderValue.node()).width();
    sliderValue.style(
      "left",
      "calc(" +
        -sliderValueWidth * value +
        "px + " +
        8 * value + //half slider dot
        "px + " +
        format["percentageWhole"](value / 0.99) +
        ")"
    );

    updateData(value);
  }

  function updateData(value) {
    var data = filteredData.find(function (d) {
      return d.percentage === value;
    });
    primaryDataItems.forEach(function (group) {
      group.forEach(function (item) {
        item.elem.text(format[item.format](data[item.key]));
      });
    });

    detailDataItems.forEach(function (row) {
      row.items.forEach(function (item) {
        item.elem.text(format[item.format](data[item.key]));
      });
    });
  }
};
