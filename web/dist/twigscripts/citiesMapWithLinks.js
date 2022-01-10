var VERA = window.VERA || {};
VERA.citiesMapWithLinks = function (
  selector,
  dataPath,
  baseUrl,
  tooltipColumns,
  slugColumns,
  tooltipHeadingColumns,
  tooltipSubheadingColumns
) {
  var width = 960;
  var height = 600;
  var container = d3.select(selector);

  var sidebar = container.select(".map__content");

  var svg = container.select("svg");
  var tooltip = container.select(".tooltip");
  var tt_title = tooltip.select(".title");
  var tt_subtitle = tooltip.select(".subtitle");
  var tt_data = tooltip.select(".data");

  var projection = d3
    .geoAlbersUsa()
    .translate([width / 2, height / 2])
    .scale([1250]);
  var path = d3.geoPath().projection(projection);

  function makeSlug(d) {
    return slugColumns
      .map((column) => {
        // console.log(slugify(d[column]));
        return slugify(d[column]);
      })
      .join("-");
  }

  function makeLabel(d) {
    return slugColumns
      .map((column) => {
        return d[column];
      })
      .join(", ");
  }

  function getLabel(d) {
    return d.label;
  }

  d3.json("/dist/map/us.json", function (error, us) {
    if (error) throw error;

    svg.attr("viewBox", "0 0 " + width + " " + height);

    svg
      .append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter()
      .append("g")
      .attr("class", "state")
      .append("path")
      .attr("d", path);

    d3.csv(dataPath, function (data) {
      var isMobile;
      var hasData = tooltipColumns.length;
      var showAll = false;
      data = data.map(function (d) {
        var slug = makeSlug(d);
        return {
          ...d,
          id: slug,
          slug,
          coords: projection([parseFloat(d.Longitude), parseFloat(d.Latitude)]),
          label: makeLabel(d),
        };
      });
      var alphaData = data.sort(function (a, b) {
        if (a.label > b.label) {
          return 1;
        }
        if (a.label < b.label) {
          return -1;
        }
        return 0;
      });
      var results = data;

      var fuse = new Fuse(data, {
        keys: slugColumns,
        threshold: 0.4,
        includeScore: true,
      });
      var searchWrap = sidebar.append("div");
      var searchInput = searchWrap
        .append("label")
        .text("Search Cities")
        .classed("CitiesMapWithLinks-search", true);
      searchInput
        .append("input")
        .attr("type", "text")
        .on("input", function () {
          var theseResults = fuse.search(this.value);
          results = theseResults.length ? theseResults : alphaData;
          updateSidebar();
        });
      var sidebarList = searchWrap.append("ul");
      var sidebarToggle = searchWrap
        .append("button")
        .classed("btn", true)
        .on("click", function () {
          showAll = !showAll;
          updateSidebar();
        });
      var detail = sidebar
        .append("div")
        .classed("CitiesMapWithLinks-detail", true);
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
          .text(getLabel);

        sidebarToggle.style(
          "display",
          isMobile && results.length > 10 ? "" : "none"
        );
        sidebarToggle.text(
          showAll ? "Show Less" : "Show " + (results.length - 10) + " More"
        );

        var item = selection
          .enter()
          .append("li")
          .classed("CitiesMapWithLinks-sidebar-list-item", true)
          .text(getLabel)
          .on("click", sidebarResultClick);

        item.on("mouseenter", showTooltip).on("mouseleave", hideTooltip);

        selection.exit().remove();

        cityDetail(currentCity);
      }

      function sidebarResultClick(d) {
        if (isMobile && hasData) {
          currentCity = d;
          updateSidebar();
        } else {
          window.location.href = baseUrl + "/" + d.slug;
        }
      }

      function cityDetail(datum) {
        detail.html(null);
        if (!datum || !isMobile) {
          searchWrap.style("display", "");
          detail.style("display", "none");
          return null;
        }
        detail.style("display", "");
        searchWrap.style("display", "none");
        detail
          .append("div")
          .classed("CitiesMapWithLinks-detail-heading", true)
          .text(getLabel(datum));

        var items = detail
          .append("ul")
          .classed("CityHero-stats-list", true)
          .selectAll("li")
          .data(tooltipColumns.map(({ column }) => column))
          .enter()
          .append("li")
          .classed("CityHero-stats-list-item", true);

        items.each(function () {
          const that = d3.select(this);
          that
            .append("div")
            .classed("CityHero-stats-list-item-label", true)
            .text((d) => d);
          that
            .append("div")
            .classed("CityHero-stats-list-item-value", true)
            .text((d) => datum[d]);
        });

        detail
          .append("a")
          .classed("btn", true)
          .text("Adjust the Police Budget")
          .attr("href", baseUrl + "/" + datum.slug);

        detail
          .append("button")
          .classed("secondary-btn", true)
          .text("Choose another city")
          .on("click", function () {
            currentCity = null;
            updateSidebar();
          });
      }

      var item = svg
        .append("g")
        .attr("class", "markers")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .classed("marker", true)
        .classed("marker__selectable", true)
        .attr("r", 6)
        .attr("id", function (d) {
          return d.id;
        })
        .attr("fill", "black")
        .attr("transform", function (d) {
          const coords = d.coords;
          if (!coords) {
            console.log(`bad coords: ${d["City Name"]}`);
            return null;
          }
          return `translate(${coords[0]},${coords[1]})`;
        })
        .on("click", sidebarResultClick);

      //if (tooltipColumns.length > 0) {
      item.on("mouseenter", showTooltip).on("mouseleave", hideTooltip);
      //}

      function joinTooltipHeading(data, columns) {
        return columns
          .map(function (e) {
            return data[e.column];
          })
          .join(", ");
      }

      function showTooltip(d) {
        if (isMobile) {
          return null;
        }
        const bbox = svg.node().parentNode.getBoundingClientRect();
        tt_title.text(joinTooltipHeading(d, tooltipHeadingColumns));

        if (tooltipSubheadingColumns && tooltipSubheadingColumns.length) {
          tt_subtitle.text(joinTooltipHeading(d, tooltipSubheadingColumns));
        } else {
          tt_subtitle.html(null);
        }

        if (tooltipColumns.length > 0) {
          tt_data.html(`
            <ul class="CitiesMapWithLinks-tooltip-items">
              ${tooltipColumns
                .map(({ column, label }) => {
                  return `<li class="CitiesMapWithLinks-tooltip-item"><div class="CitiesMapWithLinks-tooltip-item-label">${label}</div><div class="CitiesMapWithLinks-tooltip-item-value">${d[column]}</div></li>`;
                })
                .join("")}
            </ul>
          `);
        }

        tooltip
          .style("display", "block")
          .style("top", `${(d.coords[1] - 20) * (bbox.height / height)}px`)
          .style("left", `${d.coords[0] * (bbox.width / width)}px`);
        d3.select(`#${d.id}`).classed("active", true);
      }
      function hideTooltip(d) {
        tooltip.style("display", "none");
        d3.select(`#${d.id}`).classed("active", false);
      }
    });
  });
};
