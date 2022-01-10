var VERA = window.VERA || {};

VERA.jailBudget = function (
  selector,
  dataUrl,
  county,
  state,
  filterColumns,
  budgetColumns,
  amountColumn = "amount",
  unfoldToLevel = 1,
  sourceLinkColumn,
  sourceLinkText
) {
  var hasSource = !!sourceLinkColumn;

  var sectHeading =  window.location.pathname.indexOf("what-prosecution-costs") > -1 ? "Explore your county prosecutor's office budget" : "Explore your county's jail budget";

  d3.csv(dataUrl + "?" + Math.random(), function (error, data) {
    if (error) {
      console.error(error);
      return;
    }
    var filterValues = [state.toLowerCase(), county.toLowerCase()];
    var filteredData = data.filter(function (d) {
      if (filterColumns.length === 0) {
        return false;
      }
      return (
        filterColumns
          .map(function (column, i) {
            return d[column].toLowerCase().replace(",", "") === filterValues[i];
          })
          .indexOf(false) === -1
      );
    });

    if (!filteredData.length) {
      return null;
    }

    var organizedData = organizeBudget(filteredData);

    var headerData = [
      { label: "Category", className: "JailBudget-row-title" },
      { label: "Amount", className: "JailBudget-row-total" },
      { label: "% budget", className: "JailBudget-row-percentage" },
    ];

    if (sourceLinkColumn) {
      headerData.push({
        label: "Source",
        className: "JailBudget-row-source",
      });
    }

    var container = d3.select(selector);
    container
      .append("div")
      .text(sectHeading)
      .classed("JailBudget-heading h3", true);
    var table = container.append("div").attr("class", "JailBudget");

    var headerRow = table
      .append("div")
      .attr("class", "JailBudget-header JailBudget-row");
    headerRow
      .selectAll("div")
      .data(headerData)
      .enter()
      .append("div")
      .text(function (d) {
        return d.label;
      })
      .attr("class", function (d) {
        return d.className;
      });

    var tbody = table.append("div");
    var grandTotal = getTotal(organizedData);

    makeBudget(tbody, organizedData, 1, grandTotal);

    function makeBudget(container, data, level, grandTotal) {
      if (Array.isArray(data)) {
        //console.log(data);
        //data.forEach(function (cat) {
        //makeRow(cat.expenditure_description, cat.amount);
        //});
      } else {
        Object.keys(data).forEach(function (cat) {
          var hasChildren = !Array.isArray(data[cat]);
          var wrapper = makeRow(
            container,
            cat,
            getTotal(data[cat]),
            level,
            hasChildren,
            grandTotal,
            !hasChildren && data[cat][0][sourceLinkColumn]
              ? '<a target="_blank" href="' +
                  data[cat][0][sourceLinkColumn] +
                  '">' +
                  VERA.replaceDataText(sourceLinkText, data[cat][0]) +
                  "</a>"
              : !hasChildren
              ? "Vera staff requested budget data."
              : '<span style="visibility: hidden;">Vera staff requested budget data.</span>'
          );
          makeBudget(wrapper, data[cat], level + 1, grandTotal);
        });
      }
    }

    function makeRow(
      container,
      label,
      total,
      level,
      hasChildren,
      grandTotal,
      source
    ) {
      var wrapper = container.append("div");
      var row = wrapper
        .append("div")
        .classed("JailBudget-row", true)
        .classed("JailBudget-row--level" + level, true);

      var title = row
        .append("div")
        .classed("JailBudget-row-title", true)
        .classed("JailBudget-row-title--haschildren", hasChildren)
        .text(label)
        .style("padding-left", (level - 1) * 10 + "px");
      row
        .append("div")
        .classed("JailBudget-row-total", true)
        .text(formatMoney(total));
      row
        .append("div")
        .classed("JailBudget-row-percentage", true)
        .text(formatPercentage(total / grandTotal));

      if (hasSource) {
        row.append("div").classed("JailBudget-row-source", true).html(source);
      }

      if (hasChildren) {
        var childWrapper = wrapper.append("div");
        var $row = $(title.node());
        var $children = $(childWrapper.node());
        var open;

        if (level > unfoldToLevel) {
          childWrapper.style("display", "none");
          open = false;
        } else {
          open = true;
          $row.addClass("open");
        }

        $(row.node()).click(function () {
          if (open) {
            $children.slideUp();
            $row.removeClass("open");
          } else {
            $children.slideDown();
            $row.addClass("open");
          }
          open = !open;
        });

        return childWrapper;
      }
    }

    var total = tbody
      .append("div")
      .classed("JailBudget-row JailBudget-row--total", true);
    total
      .append("div")
      .text("Total Budget")
      .classed("JailBudget-row-title", true);
    total
      .append("div")
      .classed("JailBudget-row-total", true)
      .text(formatMoney(grandTotal));
    total.append("div").text("100%").classed("JailBudget-row-percentage", true);

    if (hasSource) {
      total.append("div").text("").classed("JailBudget-row-source", true);
    }
  });

  var formatMoney = d3.format("$,.0f");
  var formatPercentage = d3.format(".2%");

  function deep_value(obj, path) {
    return path
      .replace(/\[|\]\.?/g, ".")
      .split(".")
      .filter((s) => s)
      .reduce((acc, val) => acc && acc[val], obj);
  }

  function organizeBudget(data, index = 0) {
    data = groupByKey(budgetColumns[index], data);
    if (index + 1 < budgetColumns.length) {
      Object.keys(data).forEach(function (key) {
        data[key] = organizeBudget(data[key], index + 1);
      });
    }
    return data;
  }

  const getTotal = (data) => {
    if (Array.isArray(data)) {
      return sumRows(data);
    }
    return Object.values(data).reduce((r, d) => {
      return r + (Array.isArray(d) ? sumRows(d) : getTotal(d));
    }, 0);

    function sumRows(rows) {
      return rows.reduce((r, d) => {
        return r + +d[amountColumn];
      }, 0);
    }
  };

  var groupByKey = function (key, rows) {
    return rows.reduce(function (r, d) {
      if (!r[d[key]]) {
        r[d[key]] = [];
      }
      r[d[key]].push(d);
      return r;
    }, {});
  };
  var flattenBudget = function (obj) {
    return Object.keys(obj).reduce(function (r, d) {
      if (Array.isArray(obj[d])) {
        return r.concat(obj[d]);
      } else {
        return r.concat(flattenBudget(obj[d]));
      }
    }, []);
  };
};
