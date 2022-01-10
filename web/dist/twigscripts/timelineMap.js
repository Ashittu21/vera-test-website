VERA = window.VERA || {};

VERA.timelineMap = function (selector, dataUrl, showOffices) {
  const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };

  var statesHash = {
    Alabama: "AL",
    Alaska: "AK",
    "American Samoa": "AS",
    Arizona: "AZ",
    Arkansas: "AR",
    California: "CA",
    Colorado: "CO",
    Connecticut: "CT",
    Delaware: "DE",
    "District of Columbia": "DC",
    "Federated States Of Micronesia": "FM",
    Florida: "FL",
    Georgia: "GA",
    Guam: "GU",
    Hawaii: "HI",
    Idaho: "ID",
    Illinois: "IL",
    Indiana: "IN",
    Iowa: "IA",
    Kansas: "KS",
    Kentucky: "KY",
    Louisiana: "LA",
    Maine: "ME",
    "Marshall Islands": "MH",
    Maryland: "MD",
    Massachusetts: "MA",
    Michigan: "MI",
    Minnesota: "MN",
    Mississippi: "MS",
    Missouri: "MO",
    Montana: "MT",
    Nebraska: "NE",
    Nevada: "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Northern Mariana Islands": "MP",
    Ohio: "OH",
    Oklahoma: "OK",
    Oregon: "OR",
    Palau: "PW",
    Pennsylvania: "PA",
    "Puerto Rico": "PR",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    Tennessee: "TN",
    Texas: "TX",
    Utah: "UT",
    Vermont: "VT",
    "Virgin Islands": "VI",
    Virginia: "VA",
    Washington: "WA",
    "West Virginia": "WV",
    Wisconsin: "WI",
    Wyoming: "WY",
  };

  var yearMin = 2021;
  var yearMax = 2000;

  d3.csv(dataUrl, function (error, data) {
    console.log(data);

    if (error) {
      console.error(error);
      return;
    }
    makeMap(data);
  });

  function makeMap(data) {
    var timeline_data = data;

    statewide_data = timeline_data
      .filter((row) => row.statewide === "Yes")
      .map((state) => {
        return { abbr: statesHash[state.state], ...state };
      });
    statewide_data_obj = convertArrayToObject(statewide_data, "abbr");
    timeline_data = timeline_data.filter((data) => data.statewide != "Yes");

    timeline_data.forEach((row) => {
      if (row.year > yearMax) {
        yearMax = row.year;
      }
      if (row.year < yearMin) {
        yearMin = row.year;
      }
    });

    $(".slider").attr("max", yearMax);
    $(".slider").attr("min", yearMin);
    $(".slider").attr("value", yearMax);
    $(".year-value").html(yearMax);

    win_w = $(window).width();
    var radius = win_w > 720 ? 4 : 4;
    var map = null;

    var markerSettings = {
      popupTemplate: function (geo, data) {
        if (data.popupOnHover !== false && win_w > 767) {
          if (data.year)
            return [
              `<div class="location-hover ${data.fillKey}"><h5>${
                data.jurisdiction
              }, ${statesHash[data.state]}</h5>`,
              `</div>`,
            ].join("");
        }
      },
      strokeOpacity: 0,
      borderWidth: 1,
      borderOpacity: 1,
      animate: true,
      highlightOnHover: true,
      highlightFillColor: "#231F20",
      highlightBorderColor: "rgba(255, 255, 255, 0)",
      highlightBorderWidth: 5,
      highlightFillOpacity: 1,
      exitDelay: 100,
    };

    var mapData = {
      scope: "usa",
      element: document.querySelector(selector),
      geographyConfig: {
        popupOnHover: true,
        highlightOnHover: false,
        highlightFillColor: "#231F20",
        highlightBorderColor: "#FFFFFF",
        popupTemplate: function (geo, data) {
          if (data.popupOnHover !== false) {
            $(".map--active").removeClass("map--active");
            $("." + geo.id).addClass("map--active");

            $output = `<div class="location-hover ${data.fillKey}"><h5>${data.jurisdiction}</h5>`;
            $output += "</div>";

            return [$output].join("");
          }
        },
      },

      responsive: true,
      bubblesConfig: {
        highlightFillOpacity: 1,
        animate: true,
        fillOpacity: 1,
        radius: radius,
        borderWidth: 1,
      },
      fills: {
        statewide: "#c6c6c6",
        point: "#EF4136",
        inactive: "#86878C",
        defaultFill: "#e7e6e3",
      },
      data: statewide_data_obj,
      done: function (datamap) {
        datamap.svg
          .selectAll(".datamaps-subunit")
          .each(function () {
            $th = $(this);
            if ($th.data("info")) {
              $th.addClass("map--active");
            }
          })
          .on("click", function (geography, data) {
            $th = $(this);
            showSlideout($th.data("info"));
          });
      },
    };

    function outputStream(stream) {
      $("#map-stream .stream-module").not("h4").remove();

      for (var i = 0; i < stream.length; i++) {
        var en = stream[i];
        var item = $("#stream-map .template").clone();
        item.find(".stream-module__heading").html(en.title);
        item.find(".stream-module__meta").html(en.authors);
        item.find(".stream-module__inner").attr("href", en.url);
        item.removeClass("template").removeClass("triggered");
        $("#map-stream").append(item);
      }

      var mapTimeout = window.setTimeout(function () {
        $("#map_content_loader").addClass("hidden");
        $("#map-stream > .stream-module:lt(4)").addClass("triggered");
        if ($("#map-stream > .stream-module").length > 4) {
          $(".map-stream__load-more").removeClass("hidden");
        }
      }, 500);
    }

    /* Ready */
    $(function () {
      map = new Datamap(mapData);

      // {# $('.map-stream__load-more').on('click', function(){
      //   $('#map-stream > .stream-module').addClass('triggered');
      //   $(this).addClass('hidden');
      // }) #}
      if (showOffices) {
        //set bubbles
        $(".datamaps-bubble").each(function (bbble, obj) {
          $th = $(this);
          var x = $th.attr("cx");
          var y = $th.attr("cy");
          var width = radius * 2;
          var half = width / 2;
        });

        window.addEventListener("resize", function (event) {
          map.resize();
        });
        var mapTimeout = window.setTimeout(function () {
          map.resize();
          map.bubbles(timeline_data, markerSettings);
        }, 1000);
      } else {
        window.addEventListener("resize", function (event) {
          map.resize();
        });
        var mapTimeout = window.setTimeout(function () {
          map.resize();
        }, 1000);
      }

      filterPoints();
    });
    const generateLinks = (cell) => {
      pairs = cell.split(/,|;/);
      links = pairs.map((partner) => {
        p = partner.split("(");
        return `<li><a href="${
          p[1].split(")")[0]
        }" target='_blank' rel='npoopener noreferrer'>${p[0]}</a></li>`;
      });

      return links.join("");
    };
    const showSlideout = (data) => {
      $("#slideout-launch").is("checked");
      $("#slideout-launch").attr("checked", true);
      $("#slideout-launch").prop("checked", true);
      const rows = [
        "fund",
        "location",
        "affiliation",
        "year",
        "communityPartners",
        "legalServiceProviders",
        "funding2021",
        "moreInfo",
      ];

      if ($(".slideout .jurisdiction")) {
        $(".slideout .jurisdiction").html(data.jurisdiction);
      }

      // reset content
      $(".slideout .value").html("");
      $(".slideout .row").addClass("hide");

      // show present data
      rows.forEach((cell) => {
        if (data[cell]) {
          $(`.slideout .${cell}`).removeClass("hide");
          $(`.slideout .${cell} .value`).html(
            cell == "year" ? data[cell] : anchorme(data[cell])
          );
        }
      });

      if (data.communityPartners) {
        $(".slideout .communityPartners .value").html(
          generateLinks(data.communityPartners)
        );
      }
      if (data.legalServiceProviders) {
        $(".slideout .legalServiceProviders .value").html(
          generateLinks(data.legalServiceProviders)
        );
      }
    };
    const setBubblesClick = () => {
      d3.selectAll(".datamaps-bubble").on("click", function (bubble) {
        showSlideout(bubble);
      });
    };

    const filterPoints = () => {
      year = $(".slider").val();
      mapFilter = $("[name='filter']:checked").val();

      var timelineData = timeline_data;
      var yearSort = timelineData.filter(
        (row) =>
          row.year <= year &&
          (mapFilter == "all" || mapFilter == row.affiliation)
      );

      statewide_data_filtered = statewide_data.map((row) => {
        return {
          ...row,
          fillKey:
            row.year > year || mapFilter != "all" ? "defaultFill" : "statewide",
        };
      });

      var statewide_data_filtered_obj = convertArrayToObject(
        statewide_data_filtered,
        "abbr"
      );

      map.bubbles(yearSort, markerSettings);
      setBubblesClick();

      map.updateChoropleth(statewide_data_filtered_obj);

      $(".year-value").html(year);
    };

    $(".filter").on("change", filterPoints);
    $(".slider").on("input", filterPoints);
    // const replaceURLWithHTMLLinks = (text) => {
    //   var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
    //   return text.replace(exp, "<a href='$1'>$1</a>");
    // };
  }
};
