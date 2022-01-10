var VERA = window.VERA || {};

VERA.countyHeatmapWithLinks = async function (
  selector,
  stateName,
  dataPath,
  heatmapColumn,
  heatmapColumnLabel,
  tooltipColumns,
  heatmapYear,
  dataStatements,
  baseUrl
) {
  const states = await fetch("/dist/map/states.json").then(function (res) {
    return res.json();
  });
  const stateFips = states.find(function (d) {
    return d.name === stateName;
  }).fips;

  const colors = {
    county: "red",
    state: "black",
    nation: "blue",
  };
  var width = 960;
  var height = 400;
  const neutralFill = "#eee";
  var container = d3.select(selector);

  var sidebar = container.select(".sidebar");
  var vis = container.select(".StateHeatmapWithLinks-vis");
  var heatmap = vis
    .insert("div", ":first-child")
    .classed("StateHeatmapWithLinks-heatmap", true);

  var key = container.append("div").classed("StateHeatmapWithLinks-key", true);

  var heatmapKey = key
    .append("div")
    .classed("StateHeatmapWithLinks-heatmap-key", true);

  var selectWrap = vis
    .append("div")
    .classed("StateHeatmapWithLinks-select", true);
  selectWrap
    .append("div")
    .classed("StateHeatmapWithLinks-select-label", true)
    .text("Select a county to view trends over time");
  var trends = vis.append("div").classed("StateHeatmapWithLinks-trends", true);

  const demo = vis
    .append("div")
    .classed("StateHeatmapWithLinks-demographics", true);

  var svg = container
    .select("svg")
    .attr("viewBox", "0 0 " + width + " " + height)
    .append("g");
  var tooltip = container.select(".heatmap-tooltip");
  var tt_title = tooltip.select(".title");
  var tt_subtitle = tooltip.select(".subtitle");
  var projection = d3
    .geoAlbersUsa()
    .translate([width / 2, height / 2])
    .scale(width);
  var path = d3.geoPath().projection(projection);

  var currentCounty;

  d3.json("/dist/map/us-counties.topojson", function (error, us) {
    if (error) throw error;

    d3.csv(dataPath, function (data) {
      var isMobile;
      var countySelect;
      var statewide;

      //add slugs to data
      data = data.map(function (d) {
        return {
          ...d,
          //id: d["City Name"].replace(/\s|\./g, "") + d["State Code"],
          slug: slugify(d["county"]),
          label: d["county"],
        };
      });

      //make map
      svg
        .append("g")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "state")
        //.style("pointer-events", "none")
        .on("click", reset)
        .attr("fill", "rgba(0,0,0,.01)")
        .attr("stroke", "rgba(0,0,0,.1)")
        .style("display", function (d) {
          return d.id === stateFips ? "none" : "";
        });

      var counties = svg
        .append("g")
        .selectAll("path")
        .data(
          topojson.feature(us, us.objects.counties).features.filter((d) => {
            var state = d.id.toString().padStart(5, "0").slice(0, 2);
            return state === stateFips;
          })
        )
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke-width", 1)
        .attr("vector-effect", "non-scaling-stroke");

      // svg
      //   .append("path")
      //   .datum(
      //     topojson.mesh(us, us.objects.states, function (a, b) {
      //       return a !== b;
      //     })
      //   )
      //   .attr("id", "state-borders")
      //   .attr("d", path);

      var bounds = path.bounds(
          topojson.feature(us, us.objects.states).features.find(function (d) {
            return d.id.toString().padStart(2, "0") === stateFips;
          })
        ),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = 0.8 / Math.max(dx / width, dy / height),
        translate = [width / 2 - scale * x, height / 2 - scale * y];

      svg
        .style("stroke-width", 1 / scale + "px")
        .attr("transform", "translate(" + translate + ")scale(" + scale + ")");

      //data
      var currentYearData = heatmapYear
        ? data.filter(function (d) {
            return +d.year === +heatmapYear;
          })
        : data;

      var currentStateData = currentYearData.filter(function (d) {
        return d.state_name === stateName;
      });

      var heatScale = d3
        .scaleLinear()
        .domain(
          d3.extent(currentStateData, function (d) {
            return +d[heatmapColumn];
          })
        )
        .range(["#FDE3E1", "#EF4136"]);

      //heatmapLegend.text(heatmapColumn);

      //dom
      initCountySelect(selectWrap);
      sidebarSearch(sidebar, currentStateData, baseUrl);
      //updateSidebar();
      //var tooltipCharts = tooltip.append("div");

      makeHeatmap(currentStateData);
      makeHeatmapKey({
        format: d3.format(".0%"),
      });

      // makeDemographics(
      //   data.reduce((r, d) => {
      //     if (d.state === stateCode && !r.find(({ year }) => year === d.year)) {
      //       r.push(d);
      //     }
      //     return r;
      //   }, [])
      // );

      function makeHeatmap(data) {
        counties.each(function () {
          const that = d3.select(this);
          const code = that.datum().id;
          const stateData = data.find((d) => {
            return +d.fips === code;
          });
          that.datum({
            ...stateData,
            ...that.datum(),
            coords: path.centroid(that.datum()),
          });
          //fillCounty(that);
          var hasData =
            that.datum()[heatmapColumn] && that.datum()[heatmapColumn] !== "NA";
          that.attr(
            "fill",
            hasData
              ? heatScale(+that.datum()[heatmapColumn])
              : "rgba(0, 0, 0, 0.01)"
          );

          if (hasData) {
            that.style("cursor", "pointer");
            //events
            that.on("mouseenter", showTooltip).on("mouseleave", hideTooltip);

            that.on("click", function (d) {
              window.location.href = baseUrl + "/" + d.slug;
            });
          }
        });
      }
      function fillCounty(county) {
        if (county) {
          county
            .attr("opacity", 1)
            .attr("stroke-width", function (d) {
              return currentCounty && d.fips === currentCounty.fips ? 1.5 : 1;
            })
            .attr("stroke", "#000");
        } else {
          console.log("Missing data for " + code);
        }
      }

      function makeHeatmapKey(props) {
        const format =
          props.format ||
          function (d) {
            return Math.round(d);
          };
        const keyWidth = 200;
        const keyHeight = 15;
        const gradientId = "key-gradient" + container.node().id;
        //.attr("class", "heatmap-key");

        heatmapKey
          .append("div")
          .classed("StateHeatmapWithLinks-heatmap-key-heading", true)
          .text(heatmapColumnLabel);
        const heatmapKeySvg = heatmapKey
          .append("svg")
          .attr("viewBox", "0 0 " + keyWidth + " " + keyHeight * 2)
          .attr("width", keyWidth)
          .attr("height", keyHeight * 2);
        const linearGradient = heatmapKeySvg
          .append("defs")
          .append("linearGradient")
          .attr("id", gradientId)
          .attr("x2", "100%")
          .attr("y2", "0%");
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
          .attr("fill", "url(#" + gradientId + ")");

        var heatmapKeyLabels = heatmapKeySvg.append("g");

        heatmapKeyLabels
          .append("text")
          .attr("x", 0)
          .attr("y", keyHeight)
          .attr("dominant-baseline", "hanging")
          .text(format(heatScale.domain()[0]));

        heatmapKeyLabels
          .append("text")
          .attr("x", keyWidth)
          .attr("y", keyHeight)
          .text(format(heatScale.domain()[1]))
          .attr("text-anchor", "end")
          .attr("dominant-baseline", "hanging");
      }

      function initCountySelect(container) {
        countySelect = container.append("select").attr("class", "map-dropdown");

        countySelect.on("change", function () {
          updateCounty(d3.event.target.value);
        });

        countySelect
          .append("option")
          .attr("value", "state")
          .text("All Counties");
        countySelect
          .selectAll(".item")
          .data(currentYearData)
          .enter()
          .append("option")
          .attr("class", "item")
          .text(function (d) {
            return d["county"];
          })
          .attr("value", function (d) {
            return d["fips"];
          });

        statewide = {
          ...currentYearData[0],
          statewide: true,
        };
        currentCounty = statewide;

        container.select(".map_inner_wrap").on("click", function () {
          reset();
        });
      }

      function reset() {
        counties.each(function () {
          const county = d3.select(this);
          fillCounty(county);
        });
        currentCounty = statewide;
        countySelect.property("value", "state");
        updateSidebar();
      }

      function updateCounty(newValue) {
        if (newValue === "state") {
          currentCounty = statewide;
          reset();
        } else {
          currentCounty = currentYearData.find(({ fips }) => {
            return newValue == fips;
          });
          updateMap();
        }
        updateSidebar();
      }

      function updateMap() {
        counties
          .filter(({ fips }) => fips !== currentCounty.fips)
          .attr("opacity", 0.4)
          .attr("stroke", "rgba(0,0,0,.3)");

        fillCounty(counties.filter(({ fips }) => fips === currentCounty.fips));
      }

      function showTooltip(d) {
        if (isMobile) {
          return null;
        }
        const bbox = svg.node().parentNode.getBoundingClientRect();
        tt_title.text(`${d["county"]}, ${d["state"]}`);

        if (tooltipColumns && tooltipColumns.length > 0) {
          tt_subtitle.html(`
            <ul class="CitiesMapWithLinks-tooltip-items">
              ${tooltipColumns
                .map(({ column, label }) => {
                  return `<li class="CitiesMapWithLinks-tooltip-item"><div class="CitiesMapWithLinks-tooltip-item-label">${label}</div><div class="CitiesMapWithLinks-tooltip-item-value">${d[column]}</div></li>`;
                })
                .join("")}
            </ul>
          `);
        }

        var yratio = width / bbox.width;
        var y = (d.coords[1] * scale + translate[1]) * (bbox.height / height);

        tooltip
          .style("display", "block")
          .style("top", `${y}px`)
          .style(
            "left",
            `${(d.coords[0] * scale + translate[0]) * (bbox.width / width)}px`
          );
      }
      function hideTooltip(d) {
        tooltip.style("display", "none");
      }
    });
  });
};

function sidebarSearch(container, data, baseUrl) {
  var showAll = false;
  var results = data.sort(function (a, b) {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  });

  var fuse = new Fuse(
    Object.values(
      data.reduce(function (r, d) {
        if (!r[d.label]) {
          r[d.label] = d;
        }
        return r;
      }, {})
    ),
    {
      keys: ["label"],
      threshold: 0.4,
      includeScore: true,
    }
  );
  var searchWrap = container.append("div");
  var searchInput = searchWrap
    .append("label")
    .text("Search Counties")
    .classed("CitiesMapWithLinks-search", true);
  searchInput
    .append("input")
    .attr("type", "text")
    .on("input", function () {
      var theseResults = fuse.search(this.value);
      results = theseResults.length ? theseResults : data;
      updateSidebar();
    });
  var sidebarList = searchWrap.append("ul");
  var sidebarToggle = searchWrap
    .append("button")
    .classed("btn", true)
    .on("click", sidebarResultClick);
  var currentCity;

  updateSidebar();

  window.addEventListener("resize", function () {
    updateSidebar();
  });
  function updateSidebar() {
    isMobile = window.matchMedia("(max-width:1024px)").matches;

    var selection = sidebarList
      .selectAll("li")
      .data(
        isMobile && currentCity
          ? []
          : isMobile && !showAll
          ? results.slice(0, 10)
          : results
      )
      .text(function (d) {
        return d.label;
      });

    sidebarToggle.style(
      "display",
      isMobile && results.length > 10 ? "" : "none"
    );
    sidebarToggle.text(
      showAll ? "Show Less" : "Show " + (results.length - 10) + " More"
    );

    selection
      .enter()
      .append("li")
      .classed("CitiesMapWithLinks-sidebar-list-item", true)
      .text(function (d) {
        return d.label;
      })
      // .on("mouseenter", showTooltip)
      // .on("mouseleave", hideTooltip)
      .on("click", sidebarResultClick);

    selection.exit().remove();
  }

  function sidebarResultClick(d) {
    window.location.href = baseUrl + "/" + d.slug;
  }
}
