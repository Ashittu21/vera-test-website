/**
 * Geocode plugin for Craft CMS
 *
 * Address Field JS
 *
 * @author    Dylan
 * @copyright Copyright (c) 2020 Dylan
 * @link      https://hyperakt.com
 * @package   Geocode
 * @since     1.0.0GeocodeAddress
 */

(function ($, window, document, undefined) {
  var pluginName = "GeocodeAddress",
    defaults = {};

  // Plugin constructor
  function Plugin(element, options) {
    this.element = element;

    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {
    init: function (id) {
      var _this = this;

      console.log(_this);

      $(function () {
        /* -- _this.options gives us access to the $jsonVars that our FieldType passed down to us */
        const googleApiKey = _this.options.google_api_key;
        if (
          googleApiKey &&
          (typeof google === "undefined" ||
            (typeof google !== "undefined" &&
              typeof google.maps === "undefined"))
        ) {
          var gmaps_script = document.createElement("script");
          gmaps_script.src =
            "https://maps.googleapis.com/maps/api/js?key=" + googleApiKey;
          gmaps_script.setAttribute("async", true);
          gmaps_script.setAttribute("defer", true);
          $("body").append(gmaps_script);
        }

        var instance = {
          googleApiKey,
        };

        const id = _this.options.namespace;

        instance.fields = {
          address_query: $(`#${id}address_query`),
          address1: $(`#${id}address1`),
          address2: $(`#${id}address2`),
          neighborhood: $(`#${id}neighborhood`),
          zip: $(`#${id}zip`),
          city: $(`#${id}city`),
          state: $(`#${id}state`),
          country: $(`#${id}country`),
          coordinates_field_lat: $(`#${id}coordinates_field_lat`),
          coordinates_field_lng: $(`#${id}coordinates_field_lng`),
        };

        instance.results_message = $(".results_message");
        instance.geocode_button = $(`#${id}geocode_button`);
        instance.map_container = $(`#${id}map_container`);

        var geocodeInstances = geocodeInstances || [];
        geocodeInstances.push(instance);

        $(function () {
          window.geocodeFields = window.geocodeFields || [];

          geocodeInstances.forEach(function (instance) {
            geocodeFields.push(new geocode(instance));
          });
        });
      });
    },
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);

var geocode = function (instance) {
  var self = this;

  this.fields = instance.fields;
  this.results_message = instance.results_message;
  this.googleApiKey = instance.googleApiKey;
  this.geocode_button = instance.geocode_button;
  this.map_container = instance.map_container;

  this.geocode = function (query, type) {
    type = type || "address";

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: query }, function (results, status) {
      switch (status) {
        case "OK":
          processAddress(results[0]);
          break;
        case "ZERO_RESULTS":
          self.results_message.html("No results");
          break;
        default:
          self.results_message.html("An error occured");
      }
    });

    function processAddress(result) {
      self.clearFields();
      var result_address = result.address_components;

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

      var coords = result.geometry.location;

      self.fields.coordinates_field_lat.val(coords.lat);
      self.fields.coordinates_field_lng.val(coords.lng);

      if (this.googleApiKey) {
        if (self.gmap) {
          self.marker.setPosition(coords);
          if (type == "address") {
            self.gmap.setCenter(coords);
          }
        } else {
          self.makeMap(coords);
        }
      }
    }
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
    console.log(address);
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
