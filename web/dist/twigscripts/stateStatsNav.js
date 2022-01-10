var VERA = window.VERA || {};

VERA.stateStatsNav = function (containerId, dataUrl, baseUrl) {
  var container = d3.select("#" + containerId).classed("StateStatsNav", true);
  d3.csv(dataUrl, function (error, data) {
    if (error) {
      console.error(error);
      return;
    }

    var links = container
      .selectAll(".StateStatsNav-link")
      .data(data)
      .enter()
      .append("a")
      .attr("class", "StateStatsNav-link")
      .attr("href", function (d) {
        return baseUrl + "/" + slugify(d["State"]);
      });
    links.each(function () {
      var elem = d3.select(this);
      elem
        .append("img")
        .classed("StateStatsNav-link-image", true)
        .attr("src", function (d) {
          return d.statesvg;
        });
      elem
        .append("div")
        .classed("StateStatsNav-link-heading", true)
        .text(function (d) {
          return d["State"];
        });
    });
  });
};
