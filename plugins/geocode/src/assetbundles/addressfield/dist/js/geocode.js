var geocode = { gmap: null };

var geocode = function (instance) {
  var self = this;

  this.fields = instance.fields;
  this.results_message = instance.results_message;
  this.googleApiKey = instance.googleApiKey;
  this.geocode_button = instance.geocode_button;
  this.map_container = instance.map_container;

  this.geocode = function (query, type) {
    type = type || "address";

    $.getJSON(
      "https://maps.googleapis.com/maps/api/geocode/json?" + type + "=" + query
    )
      .success(function (response) {
        self.clearFields();

        if (response.status === "ZERO_RESULTS") {
          self.results_message.html("No results");
          return false;
        }

        var result_address = response.results[0].address_components;

        var suite_result = result_address.find(function (o) {
          return o.types.indexOf("subpremise") !== -1;
        });

        var number_result = result_address.find(function (o) {
          return o.types.indexOf("street_number") !== -1;
        });

        var street_result = result_address.find(function (o) {
          return o.types.indexOf("route") !== -1;
        });

        if (number_result !== undefined && street_result !== undefined) {
          self.fields.address1.val(
            number_result.long_name + " " + street_result.long_name
          );
        }

        if (suite_result !== undefined) {
          self.fields.address2.val(suite_result.long_name);
        }

        var neighborhood_result = result_address.find(function (o) {
          return o.types.indexOf("neighborhood") !== -1;
        });

        if (neighborhood_result !== undefined) {
          self.fields.neighborhood.val(neighborhood_result.long_name);
        }

        var city_result = result_address.find(function (o) {
          return o.types.indexOf("locality") !== -1;
        });

        if (city_result === undefined) {
          city_result = result_address.find(function (o) {
            return o.types.indexOf("sublocality_level_1") !== -1;
          });
        }

        if (city_result !== undefined) {
          self.fields.city.val(city_result.long_name);
        }

        var state_result = result_address.find(function (o) {
          return o.types.indexOf("administrative_area_level_1") !== -1;
        });

        if (state_result !== undefined) {
          self.fields.state.val(state_result.short_name);
        }

        //COUNTRY
        var country_result = result_address.find(function (o) {
          return o.types.indexOf("country") !== -1;
        });

        if (country_result !== undefined) {
          self.fields.country.val(country_result.long_name);
        }

        var zip_result = result_address.find(function (o) {
          return o.types.indexOf("postal_code") !== -1;
        });

        if (zip_result !== undefined) {
          self.fields.zip.val(zip_result.long_name);
        }

        var coords = response.results[0].geometry.location;

        self.fields.coordinates_field_lat.val(coords.lat);
        self.fields.coordinates_field_lng.val(coords.lng);

        if (googleApiKey) {
          if (self.gmap) {
            self.marker.setPosition(coords);
            if (type == "address") {
              self.gmap.setCenter(coords);
            }
          } else {
            self.makeMap(coords);
          }
        }
      })
      .fail(function (response) {
        console.warn(response);
      });
  };

  this.makeMap = function (coords) {
    var waitForGmaps = setInterval(function () {
      if (typeof google !== "undefined" && typeof google.maps !== "undefined") {
        clearInterval(waitForGmaps);

        var pos = new google.maps.LatLng({ lat: coords.lat, lng: coords.lng });
        self.gmap = new google.maps.Map(self.map_container[0], {
          center: pos,
          zoom: 14,
        });
        self.marker = new google.maps.Marker({
          position: pos,
          map: self.gmap,
          draggable: true,
        });

        google.maps.event.addListener(
          self.marker,
          "dragend",
          self.updatePositionByMarker
        );

        self.map_container.addClass("loaded");
      }

      window.addEventListener("resize", function () {
        google.maps.event.trigger(self.gmap, "resize");
        self.gmap.setCenter(self.marker.position);
      });
    }, 100);
  };

  this.updatePositionByMarker = function (marker) {
    self.clearFields(true);
    var coords = {
      lat: marker.latLng.lat(),
      lng: marker.latLng.lng(),
    };
    self.fields.coordinates_field_lat.val(coords.lat);
    self.fields.coordinates_field_lng.val(coords.lng);
    self.geocode(coords.lat + "," + coords.lng, "latlng");
  };

  this.clearFields = function (clearQuery) {
    clearQuery = clearQuery || false;

    self.results_message.empty();
    for (var key in self.fields) {
      if (!self.fields.hasOwnProperty(key)) continue;

      if (key === "address_query" && !clearQuery) continue;

      self.fields[key].val("");
    }
  };

  this.geocode_button.on("click", function () {
    var address = self.fields.address_query.val();
    self.geocode(self.fields.address_query.val());
  });

  this.fields.address_query.on("change", function () {
    self.geocode($(this).val());
  });

  if (
    this.fields.coordinates_field_lat.val() &&
    this.fields.coordinates_field_lng.val()
  ) {
    var coords = {
      lat: parseFloat(self.fields.coordinates_field_lat.val()),
      lng: parseFloat(self.fields.coordinates_field_lng.val()),
    };
    self.makeMap(coords);
  }
};

$(function () {
  if (googleApiKey) {
    var gmaps_script = document.createElement("script");
    gmaps_script.src =
      "https://maps.googleapis.com/maps/api/js?key=" + googleApiKey;
    gmaps_script.setAttribute("async", true);
    gmaps_script.setAttribute("defer", true);
    $("body").append(gmaps_script);
  }
});
