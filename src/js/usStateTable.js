function UsStateTable ({
  selector,
  cmsData,
  csvUrl
}) {
  d3.csv(csvUrl, function(error,data) {
    if (error) { return null }

    update()
    window.addEventListener("resize", function() {
      update()
    })
    
    function update() {
      let columns = determineColumns()
      const container = d3.select(selector)
      container.html(null)
      const chunked = _.chunk(data,Math.ceil(data.length/columns));
      chunked.forEach(data => makeTable(container,data))
    }

    function determineColumns() { 
      if (!window || !window.matchMedia) { return 1 }
      
      if (window.matchMedia(`(min-width: 650px)`).matches) {
        return 2
      }
      return 1
    }
  })

  function makeTable(container, data) {
    const table = container
      .append("table")
      .attr("class","table__topx")
      .attr("style","width: auto;")
      .append("tbody")

    const th = table.append("tr")
    th.append("th").text("State")
    th.append("th").text("PDF")
    th.append("th").text("Total Incarceration")
      
    const rows = table.selectAll(".row")
      .data(data)
      .enter()
      .append("tr")
      .attr("class","row")

    rows.append("td")
      .append("div")
      .attr("style", "display: flex; justify-content: space-between")
      .html(function(d) { 
        let html = ``
        const stateData = cmsData[d["state"]]
        html += stateData 
          ? `<a href="${stateData.url}">${d["state_name"]}</a>` 
          : d["state"]
        
        return html
      })

    const pdfs = rows.append("td")
      .attr("style", "text-align: center")
      .html(function(d) {
        const stateData = cmsData[d["state"]]
        if (stateData) {
          return `
            <a class="download" href="${stateData.pdfUrl}" 
              onclick="ga('send','pageview','${stateData.pdfUrl}')"
              target="_blank" 
              rel="noopener noreferer">
              <span class="icon-doc"></span>
            </a>
          `
        }
      })

    rows.append("td")
      .text(function(d) { return (+d["total_state_incarceration_2015"]).toLocaleString(undefined,{ maximumFractionDigits: 0 }) })
  }
}