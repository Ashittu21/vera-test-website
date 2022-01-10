var VERA = window.VERA || {};

$(function () {
  VERA.format = {
    percentageWhole: d3.format(".0%"),
    percentageTenth: d3.format(".1%"),
    money: d3.format("$,.0f"),
    number: d3.format(",.0f"),
    string: function (d) {
      return d;
    },
  };
});
