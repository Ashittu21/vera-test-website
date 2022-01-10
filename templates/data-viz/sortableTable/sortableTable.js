$(function () {
  d3.selection.prototype.last = function () {
    var last = this.nodes().length - 1;
    return d3.select(this.nodes()[last]);
  };

  var VERA = window.VERA || {};
  VERA.sortableTable = function (
    selector,
    dataUrl,
    columns,
    baseUrl,
    filterState
  ) {
    var container = d3.select(selector);
    d3.svg("/dist/icons/descending.svg").then(function (descendingIcon) {
      d3.csv(dataUrl, function (error, data) {
        if (error) {
          return null;
        }
        var initialRows = 10;

        if (filterState) {
          data = data.filter(function (d) {
            return d.state_name === filterState;
          });
        }

        var sortColumn =
          columns.find(({ defaultColumn }) => defaultColumn === true) ||
          columns[0];

        var descending = true;
        var showAll = false;
        var displayColumns;
        var isMobile;

        var mobileNav = container
          .append("div")
          .classed("SortableTableToggles", true);

        var table = container
          .append("table")
          .classed("SortableTable table__topx", true);
        var thead = table.append("thead");
        var headerRow = thead.append("tr");
        headerRow
          .append("th")
          .classed("SortableTable-header-column", true)
          //.style("width", "1px")
          .style("white-space", "no-wrap");
        var tbody = table
          //.append("table")
          //.classed("SortableTable table__topx", true)
          .append("tbody");
        var showAllToggle = container
          .append("button")
          .classed("SortableTableShowAll", true)
          .on("click", function () {
            showAll = !showAll;
            update();
          });

        update();

        window.addEventListener("resize", function () {
          update();
        });

        function update() {
          isMobile = window.matchMedia("(max-width:768px)").matches;
          displayColumns = isMobile
            ? columns.filter((d, i) => {
                return i === 0 || d.column === sortColumn.column;
              })
            : columns;
          var mobileNavColumns = columns.filter(
            (d) => d.isSortable && d.column !== sortColumn.column
          );

          var mobileNavToggles = mobileNav
            .selectAll(".SortableTableToggle")
            .data(mobileNavColumns)
            .each(makeToggle);

          mobileNavToggles
            .enter()
            .append("div")
            .classed("SortableTableToggle", true)
            .each(makeToggle);

          mobileNavToggles.exit().remove();

          var headerColumnData = isMobile
            ? [sortColumn]
            : [{}, ...displayColumns];
          var headerColumns = headerRow
            .selectAll("th")
            .data(headerColumnData)
            .style("width", function (d) {
              return d.width ? d.width + "%" : null;
            })
            .classed("active", function (d) {
              return d.column === sortColumn.column;
            })
            .each(makeToggle);

          headerColumns
            .enter()
            .append("th")
            .classed("SortableTable-header-column", true)
            .classed("active", function (d) {
              return d.column === sortColumn.column;
            })
            .classed("dynamic", true)
            .style("width", function (d) {
              return d.width ? d.width + "%" : null;
            })
            .each(makeToggle);

          headerColumns.exit().remove();

          if (isMobile) {
            headerRow.select("th:last-child").attr("colspan", "3");
          } else {
            headerRow.selectAll("th").attr("colspan", null);
          }

          var sorted = data.sort(function (a, b) {
            var parse = parseMethods[sortColumn.format];
            var aval = parse(a[sortColumn.column]);
            var bval = parse(b[sortColumn.column]);
            var order = ["string", "ratio"].includes(sortColumn.format)
              ? !descending
              : descending;
            if (aval > bval) {
              return order ? -1 : 1;
            }
            if (aval < bval) {
              return order ? 1 : -1;
            }
            return 0;
          });
          var sliced = showAll ? sorted : sorted.slice(0, initialRows);

          var rows = tbody.selectAll("tr").data(sliced).each(updateRow);
          rows.enter().append("tr").each(updateRow);
          rows.exit().remove();

          container
            .selectAll(".SortableTable-header-column-button")
            .classed("active", function (d) {
              return d.column === sortColumn.column;
            })
            .classed("ascending", function (d) {
              return d.column === sortColumn.column && !descending;
            })
            .select("div")
            .text(columnText);

          mobileNav.style("display", isMobile ? "flex" : "none");
          //thead.style("display", isMobile ? "none" : "");
          showAllToggle.text(
            showAll
              ? "Show top " + initialRows
              : "Show " + (sorted.length - initialRows) + " more"
          );
        }
        function makeToggle(d) {
          var _this = d3.select(this);
          _this.html(null);
          if (d.isSortable) {
            var button = d3
              .select(this)
              .append("button")
              .classed("SortableTable-header-column-button", true)
              .classed("active", d.column === sortColumn.column)
              .on("click", toggleClick);

            button.append("div").text(columnText);
            button
              .node()
              .appendChild(descendingIcon.documentElement.cloneNode(true));
          } else {
            d3.select(this).text(columnText);
          }
        }
        function toggleClick(d) {
          if (d.column !== sortColumn.column) {
            sortColumn = d;
            descending = true;
          } else {
            descending = !descending;
          }
          update();

          var top = table.node().getBoundingClientRect().top;
          var header = isMobile
            ? mobileNav.node().getBoundingClientRect()
            : headerRow.node().getBoundingClientRect();

          if (top < header.top + header.height) {
            window.scrollBy({
              top: top - (isMobile ? header.top : 0) - header.height,
              behavior: "smooth",
            });
          }
        }
        function updateRow(datum, i) {
          var that = d3.select(this);
          that.selectAll("*").remove();
          that.append("td").text(i + 1);
          //.style("width", "1px");
          var cells = that
            .selectAll("td.dynamic")
            .classed("figure", function (d) {
              return d.format !== "string";
            })
            .data(displayColumns)
            .each(cell)
            .style("width", function (d) {
              return !isMobile && d.width ? d.width + "%" : null;
            });

          cells
            .enter()
            .append("td")
            .style("width", function (d) {
              return !isMobile && d.width ? d.width + "%" : null;
            })
            .classed("dynamic", true)
            .classed("figure", function (d) {
              return d.format !== "string";
            })
            .classed("align--left", function (d) {
              return d.format === "string";
            })
            .each(cell);
          cells.exit().remove();

          function cell(d) {
            var that = d3.select(this);
            that.selectAll("*").remove();
            var linkFrom = d.linkFrom.filter(function (d) {
              return d.column.length > 0;
            });
            if (linkFrom.length) {
              that
                .append("a")
                .attr("href", baseUrl + "/" + getLinkFrom(linkFrom, datum))
                .text(function (d) {
                  return formatValue(datum[d.column], d.format);
                });
            } else {
              that.text(function (d) {
                return formatValue(datum[d.column], d.format);
              });
            }
          }
        }

        function getLinkFrom(items, datum) {
          return items.reduce(function (r, d, i) {
            r += slugify(datum[d.column]);
            if (d.directory === "1") {
              r += "/";
            } else if (i < items.length - 1) {
              r += "-";
            }
            return r;
          }, "");
        }

        function formatValue(value, format) {
          if (value === "") return value;
          switch (format) {
            case "string":
              return value;
            case "money":
              return d3.format("$,.0f")(value);
            case "percentageWhole":
            case "percentage":
              return d3.format(".0%")(value);
            case "number":
              return d3.format(",")(value);
            case "decimalTenth":
              return d3.format(",.1f")(value);
            default:
              return "TODO: format: " + format;
          }
        }

        function columnText(d) {
          return d.label || d.column;
        }
      });
    });

    function percentage(value) {
      return parseFloat(value.replace(/\%/g, ""));
    }

    function float(value) {
      return parseFloat(value);
    }

    var parseMethods = {
      money: function (value) {
        return parseFloat(value.replace(/\$|\,/g, ""));
      },
      percentage: percentage,
      percentageWhole: percentage,
      ratio: function (value) {
        return parseFloat(
          value.replace(/^(1\s?\:\s?)/, "").replace(/(\\s?:\s?1)$/, "")
        );
      },
      string: function (value) {
        return value;
      },
      number: float,
      decimalTenth: float,
    };
  };
});
