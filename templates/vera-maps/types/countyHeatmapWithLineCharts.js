var VERA = window.VERA || {};

VERA.countyHeatmapWithLineCharts = async function (
  selector,
  stateCode,
  dataPath,
  heatmapColumn,
  heatmapColumnLabel,
  lineChartColumns,
  heatmapYear,
  dataStatements
) {
  const states = await fetch("/dist/map/states.json").then(function (res) {
    return res.json();
  });
  const stateFips = states.find(function (d) {
    return d.abbrev === stateCode;
  }).fips; //find from code!!
  const colors = {
    county: "red",
    state: "black",
    nation: "blue",
  };
  var width = 960;
  var height = 400;
  const neutralFill = "#eee";
  var container = d3.select(selector);

  var sidebar = container.select(".StateHeatmapWithLinks-sidebar");
  var vis = container.select(".StateHeatmapWithLinks-vis");
  var heatmap = vis
    .insert("div", ":first-child")
    .classed("StateHeatmapWithLinks-heatmap", true);
  var heatmapKey = heatmap
    .append("div")
    .classed("StateHeatmapWithLinks-heatmap-key", true);
  var heatmapLegend = heatmap
    .append("div")
    .classed("StateHeatmapWithLinks-legend", true);

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
  var tooltip = container.select(".tooltip");
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
      var heatScale = d3
        .scaleLinear()
        .domain(
          d3.extent(data, function (d) {
            return +d[heatmapColumn];
          })
        )
        .range(["#FDE3E1", "#EF4136"]);

      //dom
      initCountySelect(selectWrap);
      updateSidebar();
      var tooltipCharts = tooltip.append("div");

      //events
      counties.on("mouseenter", showTooltip).on("mouseleave", hideTooltip);
      makeHeatmapKey();
      makeHeatmap(data);
      makeDemographics(
        data.reduce((r, d) => {
          if (d.state === stateCode && !r.find(({ year }) => year === d.year)) {
            r.push(d);
          }
          return r;
        }, [])
      );

      function makeHeatmap(data) {
        counties.each(function () {
          const that = d3.select(this);
          const code = that.datum().id;
          const stateData = currentYearData.find((d) => {
            return +d.fips === code;
          });
          that.datum({
            ...stateData,
            ...that.datum(),
            coords: path.centroid(that.datum()),
          });
          //fillCounty(that);
          that.attr(
            "fill",
            that.datum()[heatmapColumn] && that.datum()[heatmapColumn] !== "NA"
              ? heatScale(+that.datum()[heatmapColumn])
              : "rgba(0, 0, 0, 0.01)"
          );
          that.style("cursor", "pointer");
          that.on("mouseenter");
          that.on("click", function (d) {
            console.log("click");
            console.log(d);

            if (d.fips === currentCounty.fips) {
              reset();
            } else {
              countySelect.property("value", d.fips);
              updateCounty(d.id);
              d3.event.stopPropagation();
            }
          });
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

      function makeHeatmapKey() {
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
          .text(Math.round(heatScale.domain()[0]));

        heatmapKeyLabels
          .append("text")
          .attr("x", keyWidth)
          .attr("y", keyHeight)
          .text(Math.round(heatScale.domain()[1]))
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
            return d["county_name"];
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

      function makeDemographics(data) {
        const demoOptions = [
          { value: "white", label: "White" },
          { value: "black", label: "Black" },
          { value: "latinx", label: "Latinx" },
          // { value: "native_american", label: "Native American" },
        ];
        const demos = demoOptions.map(({ value }) => value);
        //.classed("container", true)
        //.classed("vpadblock", true);
        const controls = demo.append("div").classed("controls", true);
        const header = demo
          .append("div")
          .classed("side-by-side-charts-header", true);
        const chart = demo.append("div").classed("side-by-side-charts", true);

        header
          .append("div")
          .classed("ff-sans", true)
          .classed("size--h3", true)
          .text("Overdose Deaths and Jail Population by race");

        const variableOptions = [
          {
            value: "estimated_od_deaths_rate",
            label: "Estimated OD deaths per 100k",
          },
          {
            value: "jail_pop_rate",
            label: "Jail population per 100k",
          },
        ];

        let variableValue = variableOptions[0].value;
        //let demoValue = demoOptions[0].value;
        const update = (variable) => {
          chart.html(null);
          const chartSuccess = variableOptions.map(({ label, value }) =>
            demographicChart(data, chart, label, demos, value)
          );
          if (chartSuccess.includes(false)) {
            demo.html(null);
          }
        };

        //makeRadio(controls, variableOptions, "variable", variableValue, update);
        const key = header
          .append("div")
          .classed("side-by-side-charts-header-key", true);
        demoOptions.forEach((d, i) =>
          makeKeyItem(key, d.label, `stroke-line${i + 4}`)
        );
        // makeRadio(controls, demoOptions, "demographic", demoValue,update);
        update(variableValue);
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

      function updateSidebar() {
        countyDetail(currentCounty);
      }

      function updateMap() {
        counties
          .filter(({ fips }) => fips !== currentCounty.fips)
          .attr("opacity", 0.4)
          .attr("stroke", "rgba(0,0,0,.3)");

        fillCounty(counties.filter(({ fips }) => fips === currentCounty.fips));
      }

      function countyDetail(datum) {
        trends.html(null);

        trends
          .append("div")
          .text("Trends over time")
          .classed(
            "StateHeatmapWithLinks-trends-heading ff-sans size--h3",
            true
          );

        const key = trends
          .append("div")
          .classed("StateHeatmapWithLinks-trends-key", true);

        if (!datum) return;

        // sidebar
        //   .append("div")
        //   .attr("class", "map-sidebar-stat")
        //   .html(
        //     dataStatements.map(({ text, column }) => {
        //       return text.replace(
        //         "*value*",
        //         `<span class="value">${d3.format(".0f")(datum[column])}</span>`
        //       );
        //     })
        //   );

        if (!datum.statewide) {
          makeKeyItem(key, "County", "stroke-line1");
        }

        makeKeyItem(key, "State", "stroke-line2");
        makeKeyItem(key, "Nation", "stroke-line3");

        lineChartColumns.forEach((chart) => {
          lineChart(
            datum,
            trends,
            chart.label,
            datum.statewide
              ? {
                  state: chart.state,
                  nation: chart.national,
                }
              : {
                  county: chart.county,
                  state: chart.state,
                  nation: chart.national,
                }
          );
        });
      }

      function makeKeyItem(container, text, lineClass) {
        const svg = container
          .append("svg")
          .attr("class", "key")
          .attr("viewBox", `0 0 ${100} ${20}`)
          .attr("width", 100)
          .attr("height", 20);
        const g = svg.append("g");
        g.append("line")
          .attr("x1", 0)
          .attr("x2", 20)
          .attr("y1", 10)
          .attr("y2", 10)
          .attr("class", lineClass)
          .attr("stroke-width", 2);
        g.append("text")
          .attr("x", 25)
          .attr("y", 10)
          .attr("dominant-baseline", "middle")
          .text(text);
      }

      function showTooltip(d) {
        if (isMobile) {
          return null;
        }
        const bbox = svg.node().parentNode.getBoundingClientRect();
        tt_title.text(`${d["county_name"]}, ${d["state"]}`);

        // tt_subtitle.text(
        //   `${d3.format(".0f")(
        //     d["county_estimated_od_deaths_rate"]
        //   )} Estimated Overdose Deaths in ${heatmapYear}`
        // );

        // tooltipCharts.html(null);
        // lineChart(d, tooltipCharts, {
        //   county: "county_estimated_od_deaths_rate",
        //   state: "state_total_estimated_od_deaths_rate",
        //   nation: "national_total_estimated_od_deaths_rate",
        // });
        // lineChart(d, tooltipCharts, {
        //   county: "county_total_jail_pop_rate",
        //   state: "state_total_jail_pop_rate",
        //   nation: "national_total_jail_pop_rate",
        // });

        tooltip
          .style("display", "block")
          .style(
            "top",
            `${
              (d.coords[1] * scale + translate[1] - 20) * (bbox.height / height)
            }px`
          )
          .style(
            "left",
            `${(d.coords[0] * scale + translate[0]) * (bbox.width / width)}px`
          );
      }
      function hideTooltip(d) {
        tooltip.style("display", "none");
      }

      function lineChart(d, container, label, column) {
        const margin = { top: 0, right: 30, bottom: 20, left: 40 };
        const width = 500 - margin.left - margin.right;
        const height = 180 - margin.top - margin.bottom;

        const wrap = container
          .append("div")
          .classed("line-chart-container", true);

        wrap.append("div").classed("line-chart-heading", true).text(label);
        const svg = wrap
          .append("svg")
          .classed("line-chart", true)
          .attr(
            "viewBox",
            `0 -20 ${width + margin.left + margin.right} ${
              height + margin.top + margin.bottom + 20
            }`
          );

        const lineData = data.filter(({ fips }) => {
          return fips === d.fips;
        });
        console.log(column.county, lineData);
        const max =
          Math.max(
            ...(column.county
              ? lineData
                  .filter((d) => d[column.county] !== "NA")
                  .map((d) => +d[column.county])
              : []),
            ...lineData
              .filter((d) => d[column.state] !== "NA")
              .map((d) => +d[column.state]),
            ...lineData
              .filter((d) => d[column.nation] !== "NA")
              .map((d) => +d[column.nation])
          ) * 1.1;

        const x = d3
          .scaleLinear()
          .domain(d3.extent(lineData, (d) => +d.year))
          .range([0, width]);
        const y = d3.scaleLinear().domain([0, max]).range([height, 0]);

        const xAxis = svg
          .append("g")
          .classed("line-chart-xaxis", true)
          .attr("transform", "translate(" + margin.left + "," + height + ")")
          .call(d3.axisBottom(x).tickFormat(d3.format("0")).ticks(4));
        const yAxis = svg
          .append("g")
          .classed("line-chart-yaxis", true)
          .attr("transform", "translate(" + margin.left + ",0)")
          .call(d3.axisLeft(y).ticks(2));

        xAxis.selectAll(".tick line, .domain").remove();
        xAxis
          .append("line")
          .attr("x1", x.range()[0])
          .attr("x2", x.range()[1])
          .attr("y1", 0)
          .attr("y2", 0)
          .attr("stroke", "black");
        yAxis.selectAll(".tick line, .domain").remove();
        yAxis
          .append("line")
          .attr("x1", 0)
          .attr("x2", 0)
          .attr("y1", y.range()[0])
          .attr("y2", y.range()[1])
          .attr("stroke", "black");

        const lines = svg
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + 0 + ")")
          .datum(lineData);

        if (column.nation) {
          //Nation
          lines
            .append("path")
            .attr("class", "tooltip-chart-line stroke-line3")
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("vector-effect", "non-scaling-stroke")
            .attr(
              "d",
              d3
                .line()
                .x(function (d) {
                  return x(+d.year);
                })
                .y(function (d) {
                  return y(+d[column.nation]);
                })
            );
        }

        if (column.state) {
          //State
          lines
            .append("path")
            .attr("class", "tooltip-chart-line stroke-line2")
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("vector-effect", "non-scaling-stroke")
            .attr(
              "d",
              d3
                .line()
                .x(function (d) {
                  return x(+d.year);
                })
                .y(function (d) {
                  return y(+d[column.state]);
                })
            );
        }

        if (column.county) {
          //County

          lines
            .append("path")
            .attr("class", "tooltip-chart-line stroke-line1")
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("vector-effect", "non-scaling-stroke")
            .datum((d) => {
              console.log(d);
              return d.filter((d) => !isNaN(+d[column.county]));
            })
            .attr(
              "d",
              d3
                .line()
                .x(function (d) {
                  console.log(+d.year);
                  return x(+d.year);
                })
                .y(function (d) {
                  console.log(+d[column.county]);
                  if (!isNaN(+d[column.county])) {
                    return y(+d[column.county]);
                  }
                })
            );
        }
      }
    });
  });
};

function demographicChart(data, container, label, columns, variable) {
  const margin = { top: 0, right: 30, bottom: 20, left: 40 };
  const width = 500 - margin.left - margin.right;
  const height = 180 - margin.top - margin.bottom;
  const wrap = container.append("div");

  wrap.append("div").classed("line-chart-heading", true).text(label);
  const lineData = data.filter((d) => {
    const values = columns.reduce((r, column) => {
      const value = +d[`state_${column}_${variable}`];
      if (typeof value !== "undefined" && value !== null && !isNaN(value)) {
        r.push(value);
      } else {
        console.log("missing", `state_${column}_${variable}`, d.year);
      }
      return r;
    }, []);
    return values.length > 0;
    //return values.length === columns.length;
  });

  if (lineData.length === 0) {
    return false;
  }

  const svg = wrap
    .append("svg")
    .classed("line-chart", true)
    .attr(
      "viewBox",
      `0 -20 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom + 20
      }`
    )
    .attr("vector-effect", "non-scaling-stroke");

  if (lineData.length === 0) {
    console.log(`State level data missing for ${variable}`);
    return;
  }

  const max =
    Math.max(
      ...lineData
        //.filter((d) => d[column.state] !== "NA")
        .map((d) => {
          const columnValues = columns.map((column) => {
            const val = +d[`state_${column}_${variable}`];
            return isNaN(val) ? 0 : val;
          });
          const maxColumns = Math.max(...columnValues);
          return maxColumns;
        })
    ) * 1.1;

  const x = d3
    .scaleLinear()
    .domain(d3.extent(lineData, (d) => +d.year))
    .range([0, width]);
  const y = d3.scaleLinear().domain([0, max]).range([height, 0]);

  const xAxis = svg
    .append("g")
    .classed("line-chart-xaxis", true)
    .attr("transform", "translate(" + margin.left + "," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("0")).ticks(4));
  const yAxis = svg
    .append("g")
    .classed("line-chart-yaxis", true)
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(d3.axisLeft(y).ticks(2));

  xAxis.selectAll(".tick line, .domain").remove();
  xAxis
    .append("line")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
    .attr("y1", 0)
    .attr("y2", 0)
    .attr("stroke", "black");
  yAxis.selectAll(".tick line, .domain").remove();
  yAxis
    .append("line")
    .attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", y.range()[0])
    .attr("y2", y.range()[1])
    .attr("stroke", "black");

  const lines = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + 0 + ")")
    .datum(lineData);

  columns.forEach((column, i) => {
    //Nation
    lines
      .append("path")
      .attr("class", `tooltip-chart-line stroke-line${i + 4}`)
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("vector-effect", "non-scaling-stroke")
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(+d.year);
          })
          .y(function (d) {
            const val = +d[`state_${column}_${variable}`];
            if (!isNaN(val)) {
              return y(val);
            }
          })
      );
  });
  return true;
}

function makeRadio(container, options, name, current, update) {
  const _fieldset = container.append("fieldset");
  const _options = _fieldset
    .selectAll("label")
    .data(options)
    .enter()
    .append("label");
  _options.each(function (d) {
    const _this = d3.select(this);
    _this
      .append("input")
      .attr("type", "radio")
      .attr("value", d.value)
      .attr("name", name)
      .attr("checked", d.value === current ? "true" : null)
      .on("change", function () {
        current = d3.event.target.value;
        update(d3.event.target.value);
      });
    _this.append("div").text(d.label);
  });
}
