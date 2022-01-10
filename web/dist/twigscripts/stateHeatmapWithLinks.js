var VERA = window.VERA || {};

VERA.stateHeatmapWithLinks = function (
  selector,
  dataPath,
  tooltipHeadingColumn,
  tooltipColumns,
  tooltipYear,
  heatmapColumn,
  heatmapColumnLabel,
  heatmapYear,
  heatmapThresholds,
  cmsData
) {
  var width = 960;
  var height = 600;
  var container = d3.select(selector);

  var svg = container.select("svg");
  var tooltip = container.select(".tooltip");
  var tt_title = tooltip.select(".title");
  var tt_subtitle = tooltip.select(".subtitle");
  var projection = d3
    .geoAlbersUsa()
    .translate([width / 2, height / 2])
    .scale([1250]);
  var path = d3.geoPath().projection(projection);

  d3.json("/dist/map/us.json", function (error, us) {
    if (error) throw error;

    svg.attr("viewBox", "0 0 " + width + " " + height);

    var states = svg
      .append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter()
      .append("g")
      .attr("class", "state")
      .append("path")
      .attr("d", path)
      .attr("stroke", "#000");

    d3.csv(dataPath, function (data) {
      var isMobile;
      const yearColumn = data[0].Year ? "Year" : data[0].year ? "year" : null;
      const heatmapData = data.filter((d) => +d[yearColumn] === +heatmapYear);
      const tooltipData = data.filter((d) => +d[yearColumn] === +tooltipYear);

      var heatScale = heatmapThresholds.length
        ? d3
            .scaleThreshold()
            .domain(heatmapThresholds.slice(1).map(({ value }) => +value))
            .range(
              new Array(heatmapThresholds.length).fill(null).map((d, i) => {
                return `rgba(239, 65, 54, ${
                  0.34 + i * (0.66 / (heatmapThresholds.length - 1))
                })`;
              })
            )
        : //.range(["#FDE3E1", "#F8ADA8", "#F3776F", "#EF4136"])
          d3
            .scaleLinear()
            .domain(
              d3.extent(heatmapData, function (d) {
                return +d[heatmapColumn];
              })
            )
            .range(["#FDE3E1", "#EF4136"]);

      states.each(function () {
        const that = d3.select(this);
        const code = that.datum().properties.code.toUpperCase();

        const stateData = heatmapData.find((props) => {
          return props.stateabb.toUpperCase() === code;
        });

        if (stateData) {
          that.attr("fill", heatScale(stateData[heatmapColumn]));
        } else {
          console.log("Missing data for " + code);
        }
        that.datum({
          ...stateData,
          coords: path.centroid(that.datum()),
          ...that.datum(),
        });

        if (cmsData && cmsData[that.datum().properties.code]) {
          that.style("cursor", "pointer");
          that.on("click", function (d) {
            window.location.href =
              cmsData[d.properties.code].url + window.location.search;
          });
        }
      });

      const keyWidth = 200;
      const keyHeight = 20;
      const heatmapKey = container
        .select(".map_wrap")
        .append("div")
        .classed("heatmap-key", true);

      const gradientId = "key-gradient" + container.node().id;
      heatmapKey
        .append("div")
        .text(heatmapYear + " " + heatmapColumnLabel)
        .classed("key-heading", true);

      if (heatmapThresholds.length > 0) {
        const items = heatmapKey
          .selectAll(".key-item")
          .data(heatmapThresholds)
          .enter()
          .append("div")
          .classed("key-item", true);

        items.each(function (d) {
          const that = d3.select(this);
          that
            .append("div")
            .style("width", "1rem")
            .style("height", "1rem")
            .style("background-color", heatScale(+d.value));

          that.append("div").text(d.label);
        });
      } else {
        const heatmapKeySvg = heatmapKey
          .append("svg")
          .attr("viewBox", "0 0 " + keyWidth + " " + keyHeight * 2)
          .attr("width", keyWidth)
          .attr("height", keyHeight * 2);
        const linearGradient = heatmapKeySvg
          .append("defs")
          .append("linearGradient")
          .attr("id", gradientId);
        linearGradient
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", heatScale.range()[0]);
        linearGradient
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", heatScale.range()[1]);

        heatmapKeySvg
          .append("rect")
          .attr("width", keyWidth)
          .attr("height", keyHeight)
          .attr("y", 0)
          .attr("x", 0)
          .attr("fill", "url(#" + gradientId + ")");

        var heatmapKeyLabels = heatmapKeySvg.append("g");

        heatmapKeyLabels
          .append("text")
          .attr("x", 0)
          .attr("y", keyHeight + 5)
          .text(Math.round(heatScale.domain()[0]))
          .attr("dominant-baseline", "hanging");

        heatmapKeyLabels
          .append("text")
          .attr("x", keyWidth)
          .attr("y", keyHeight + 5)
          .text(Math.round(heatScale.domain()[1]))
          .attr("dominant-baseline", "hanging")
          .attr("text-anchor", "end");
      }

      states.on("mouseenter", showTooltip).on("mouseleave", hideTooltip);

      function showTooltip(d) {
        if (isMobile) {
          return null;
        }
        const bbox = svg.node().parentNode.getBoundingClientRect();
        tt_title.text(d[tooltipHeadingColumn]);

        if (tooltipColumns.length > 0) {
          const data = tooltipData.find(
            ({ stateabb }) => stateabb === d.stateabb
          );
          tt_subtitle.html(`
            <ul class="CitiesMapWithLinks-tooltip-items">
              ${tooltipColumns
                .map(({ column, label }) => {
                  return `<li class="CitiesMapWithLinks-tooltip-item"><div class="CitiesMapWithLinks-tooltip-item-label">${label}</div><div class="CitiesMapWithLinks-tooltip-item-value">${data[column]}</div></li>`;
                })
                .join("")}
            </ul>
          `);
        } else {
          tt_subtitle.html(null);
        }

        tooltip
          .style("display", "block")
          .style("top", `${(d.coords[1] - 20) * (bbox.height / height)}px`)
          .style("left", `${d.coords[0] * (bbox.width / width)}px`);
      }
      function hideTooltip(d) {
        tooltip.style("display", "none");
      }
    });
  });
};
