var VERA = window.VERA || {};

VERA.singleRowTable = function (
  selector,
  dataUrl,
  filterColumns,
  filterValues,
  columns,
  rows
) {
  var elem = d3.select(selector);
  var format = VERA.format;

  var table = elem.append("table").classed("table__topx", true);
  var head = table.append("thead");
  head.append("th");
  head
    .selectAll(".column")
    .data(columns)
    .enter()
    .append("th")
    .classed("column", true)
    .text(function (d) {
      return d;
    });

  var body = table.append("tbody");
  var rows = body.selectAll("tr").data(rows).enter().append("tr");

  d3.csv(dataUrl, function (error, data) {
    if (error) {
      console.error(error);
      return;
    }

    var datum = data.find(function (d) {
      if (filterColumns.length === 0) {
        return false;
      }
      return (
        filterColumns
          .map(function (column, i) {
            return (
              d[column].toLowerCase().replace(",", "") ===
              filterValues[i].toLowerCase()
            );
          })
          .indexOf(false) === -1
      );
    });

    rows.each(function (d) {
      var elem = d3.select(this);
      elem.append("td").text(d.label);
      elem
        .selectAll(".cell")
        .data(d.columns)
        .enter()
        .append("td")
        .text(function (d) {
          var value = datum[d.column];
          if (value === null || value === "" || value === "N/A") {
            return "N/A";
          }
          return format[d.format](value);
        });
    });
  });
};
