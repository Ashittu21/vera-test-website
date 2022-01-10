VERA.citiesMapHeroData = function (
  selector,
  dataPath,
  slugColumns,
  tooltipColumns,
  slug,
  headingColumns
) {
  d3.csv(dataPath + "?" + Math.random(), function (data) {
    data = data.map(function (d) {
      return {
        ...d,
        slug: makeSlug(d, slugColumns),
      };
    });

    const datum = data.find((d) => d.slug === slug);
    if (!datum) {
      window.location.href = "/404";
    }

    var container = d3.select(selector);

    if (headingColumns && headingColumns.length) {
      var heading = headingColumns
        .map(function (d) {
          return datum[d.column];
        })
        .join(", ");

      container.select(".CityHero-heading").text(heading);
      document.title = heading + " | Vera Institute";
    }

    const items = container
      .select(".CityHero-stats")
      .append("ul")
      .classed("CityHero-stats-list", true)
      .selectAll("li")
      .data(
        tooltipColumns.filter(function (d) {
          return datum[d.column];
        })
      )
      .enter()
      .append("li")
      .classed("CityHero-stats-list-item", true);
    items.each(function () {
      const that = d3.select(this);
      that
        .append("div")
        .classed("CityHero-stats-list-item-label", true)
        .text((d) => d.label);
      that
        .append("div")
        .classed("CityHero-stats-list-item-value", true)
        .text((d) => datum[d.column]);
    });
  });
};

function makeSlug(d, columns) {
  return columns
    .map((col) => {
      var val = d[col];
      if (!val) {
        console.error("no data for hero");
      }
      return slugify(val);
    })
    .join("-")
    .toLowerCase();
}

// slug: `${slugify(d["City Name"])}-${slugify(
//   d["State Code"]
// )}`.toLowerCase(),
