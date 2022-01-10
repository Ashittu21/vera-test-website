var VERA = window.VERA || {};

VERA.dataText = function (containerId, dataUrl, filterColumns, filterValues) {
  var elem = $("#" + containerId);

  d3.csv(dataUrl, function (error, data) {
    if (error) {
      console.error(error);
      return;
    }
    filterValues = filterValues.map(function (value) {
      return value.toLowerCase();
    });
    var stateData = data.find(function (d) {
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

    var newHtml = replaceText(elem.html(), stateData);

    elem.html(newHtml);
    if (elem[0].textContent.trim() === "") {
      elem.parent().remove();
    }

    window.initFootnotes();
    elem
      .find(".DataText-loading")
      .removeClass("DataText-loading")
      .addClass("DataText-loaded");
  });

  function replaceText(text, data) {
    var toReplace = text.match(/\*(.*?)\*/g);
    if (toReplace) {
      toReplace.forEach(function (term) {
        var column = term.replace(/\*/g, "");
        var value = data[column];

        if (typeof value !== "undefined") {
          var footnote = value.match(/\[footnote](.*?)\[\/footnote\]/s);

          if (footnote) {
            var id = "datatext" + Math.round(Math.random() * 10e9);
            var newText = text.replace(
              term,
              `<span class="footnote"><a href="javascript:void(0)" class="tooltip" data-tooltip-content="#tt-${id}"><i class="footnote__num"></i></a>
            <span class="tt-template">
              <span id="tt-${id}">${footnote[1]}</span>
            </span>
          </span>`
            );

            text = newText;
          } else if (typeof value !== "undefined") {
            text = text.replace(term, value);
          } else if (typeof value === "undefined") {
            text = text.replace(term, "*MISSING DATA FOR: " + term);
          } else {
            text = text.replace(term, "");
          }
        } else {
          console.log("Missing value for " + column);
        }
      });
    }
    return text;
  }
  VERA.replaceDataText = replaceText;
};
