"use strict";function UsMap(_ref){var selector=_ref.selector;return new Promise(function(resolve,reject){var svg=d3.select(selector);d3.json("/dist/map/us.json",function(error,us){if(error)throw error;var width=960;var height=600;var projection=d3.geoAlbersUsa().translate([width/2,height/2]).scale([1250]);var path=d3.geoPath().projection(projection);//setup svg
svg.attr("viewBox","0 0 "+width+" "+height);svg.attr("style","display: block;");//add states
var g=svg.append("g").attr("class","states");var states=g.selectAll("path").data(topojson.feature(us,us.objects.states).features).enter().append("path").attr("vector-effect","non-scaling-stroke").attr("class","state").attr("fill","white").attr("d",path).attr("stroke","#000").attr("stroke-width",1).attr("data-fips",function(d){return d.id;}).attr("data-code",function(d){return d.properties.code;});resolve(svg);});});}function UsMapIncarcerationRegions(_ref2){var map=_ref2.map,csvUrl=_ref2.csvUrl,highlight=_ref2.highlight,cmsData=_ref2.cmsData;var fill={default:"#fff",primary:"#EF4136",region:"#f0bab5",low:"#e5eff8",high:"#67b3d9"};return new Promise(function(resolve,reject){d3.csv(csvUrl,function(d){var regions=d['states_in_division'].replace(/\'|\[|\]|\s/g,'').split(',').map(function(d){return d.trim();});d.regions=regions;return d;},function(error,data){// const scale = d3.scaleLinear()
//   .domain(d3.extent(data, function(d) {
//     return +d["total_state_incarceration_2015"]
//   }))
//   .range([fill.low,fill.high])
// const parent = map.node().parentNode
// const keyEl = document.createElement('div')
// const keyimage = document.createElement('div')
// keyimage.style.backgroundImage = `linear-gradient(to right, ${fill.low}, ${fill.high})`;''
// keyimage.style.width = "100%"
// keyimage.style.height = "20px"
// keyimage.style.maxWidth = "300px"
// const keytext = document.createElement('div')
// keytext.append(document.createElement('div'))
// key.append(keyimage)
// parent.insertBefore(keyEl,parent.childNodes[0]);
// const key = d3.select(keyEl)
// key.attr('style', `max-width: 300px; margin: 1rem auto; font-size: 12px;`).attr('class','ff-sans')
// key.append('div')
//   .attr('style', `
//     background-image: linear-gradient(to right, ${fill.low}, ${fill.high}); 
//     width: 100%; 
//     height: 20px; 
//   `)
// const keytext = key.append('div').attr('style', 'display: flex; justify-content: space-between;')
// keytext.append('div').text(format(scale.domain()[0]))
// keytext.append('div').text(format(scale.domain()[1]))
var states=map.selectAll('.state');states.datum(function(d){var datum=data.find(function(datum){return datum.state===d.properties.code;});if(datum){// datum.fill = scale(+datum["total_state_incarceration_2015"])
datum.fill=fill.default;datum.regions=datum.regions.map(function(region){var regionData=data.find(function(d){return d.state===region;});return{key:region,value:+regionData["total_state_incarceration_2015"]};});d.data=datum;}else{console.log("mising "+d.properties.code);}return d;});states.attr("fill",determineFill);var ttcontainer=d3.select('body').append("div").attr("style","display: none");states.attr("data-tooltip-content",function(d){return"#"+"TT"+map.attr('id')+d.properties.code;}).each(function(d){if(d.data){var tt=ttcontainer.append("div").attr("class","tooltip-template tooltip--incarceration-regions").attr("id","TT"+map.attr('id')+d.properties.code);tt.append("div").text(d.properties.name).attr("class","title");var _data=tt.append("div").attr("class","data");var rate=_data.append("div");rate.append("div").attr("class","label").text("Total incarceration 2015");rate.append("div").attr("class","value").text(format(d.data["total_state_incarceration_2015"]));var rank=tt.append("div");rank.append("div").attr("class","label").text("Regional Ranking");rank.append("div").attr("class","value").text(d.data["regional_rank"]);var pdfLink=cmsData[d.properties.code]?cmsData[d.properties.code].pdfUrl:null;if(pdfLink){var dl=tt.append("div");dl.append("a").attr("href",pdfLink).attr("target","_blank").attr("rel","noopener noreferer").text("Get Fact Sheet");}// const region = tt.append("div")
// region.append("div")
//   .attr("class","label")
//   .text("Region comparison")
// const barscale = d3.scaleLinear()
//   .domain([0,d3.max(d.data.regions, function(d) { return d.value })])
//   .range([0,100])
// const height = 3
// region.append("ul")
//   .attr("class","value region-list")
//   .selectAll("li")
//   .data(d.data.regions.sort((a,b) => b.value - a.value))
//   .enter()
//   .append("li")
//     .classed("color--red", function(state) { 
//       return d.data.state === state.key.trim()
//     })
//     .html(function(d) {
//       return `
//         <div>${d.key.trim()}</div>
//         <svg viewBox="0 0 100 ${height}" preserveAspectRatio="none">
//           <rect x="0" y="0" width="${barscale(d.value)}" height="${height}" fill="${scale(d.value)}" />
//         </svg>
//       `
//     })
}});$(states.nodes()).tooltipster({theme:['tooltipster-noir','tooltipster-noir-customized'],interactive:true});if(highlight){highlightState(map.select('[data-code="'+highlight+'"]'));}var animationTimer=void 0;function startAnimation(){animationTimer=setInterval(function(){var code=data[Math.floor(Math.random()*data.length)].state;states.attr("fill",fill.default);highlightState(map.select('[data-code="'+code+'"]'));},1000);}function stopAnimation(){clearInterval(animationTimer);}if(!highlight){startAnimation();map.on("mouseover",function(){if(d3.event.target.nodeName!=="path"){states.attr("fill",fill.default);}stopAnimation();});}states.on("mouseover",function(){// states.attr('fill-opacity',0)
states.attr("fill",fill.default);highlightState(d3.select(this));}).on("mouseout",function(d){// states.attr('fill-opacity',1)
d3.select(this).attr("fill",determineFill).call(function(d){var data=d.datum().data;var regions=data.regions;if(regions){regions.forEach(function(region){map.select('[data-code="'+region.key+'"]').attr("fill",determineFill);});}});if(highlight){highlightState(map.select('[data-code="'+highlight+'"]'));}}).on("click",function(d){if(cmsData&&cmsData[d.properties.code]){window.location.href=cmsData[d.properties.code].url+window.location.search;}});});});function highlightState(selection){selection.attr("fill",fill.primary)// .attr('fill-opacity',1)
.call(function(d){var data=d.datum().data;var regions=data.regions;if(regions){regions.filter(function(region){return region.key!==data.state;}).forEach(function(region){map.select('[data-code="'+region.key+'"]')// .attr('fill-opacity',1)
.attr("fill",fill.region);});}});}function determineFill(d){return d.data?d.data.fill:fill.default;}}var format=function format(n){return(+n).toLocaleString(undefined,{maximumFractionDigits:0});};