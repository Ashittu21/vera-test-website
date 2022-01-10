Beacon = function(settings) {

  var defaults = {
    gmapsapikey: null,
    onGeocode: null
  };

  settings = settings || {};

  for (var key in defaults) {
    if (!defaults.hasOwnProperty(key)) continue;
    if (settings.hasOwnProperty(key)) continue;

    settings[key] = defaults[key];
  }

  var self = this;
  window.locationUpdated = new Event('locationUpdated');
  window.determiningLocation = new Event('determiningLocation');
  window.locationError = new Event('locationError');

  this.errorCount = 0;

  if (settings.gmapsapikey) {
    includeGmaps();
  }

  this.getLocation = function() {

/*
    if (sessionStorage['Beacon.coords']) {
      self.coords = JSON.parse(sessionStorage['Beacon.coords']);
      window.dispatchEvent(locationUpdated);
      return;
    }
*/

    self.errorCount = 0;
    console.log('Attempting HTML5 Geolocation');
    window.dispatchEvent(determiningLocation);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        self.receivePosition,
        self.errorPosition,
        {timeout:10000,enableHighAccuracy: false}
      );
    } else {
      console.log('Geolocation unsupported by this browser');
    }
  };

  this.getIpLocation = function() {
    console.log('Falling back to IP location');
    $.getJSON('https://ipinfo.io/geo', function(response) {
          var loc = response.loc.split(',');
          var coords = {
              lat: parseFloat(loc[0]),
              lng: parseFloat(loc[1])
          };
          self.usePosition(coords,'IP');
        });
  }

  this.receivePosition = function(response) {
    console.log('received');

    var newPosition = {lat: response.coords.latitude, lng: response.coords.longitude};

    if (self.coords && newPosition.lat === self.coords.lat && newPosition.lng === self.coords.lng) {
      console.log('Same current location');
      return false;
    } else {
      self.usePosition(newPosition);
    }
  };

  this.usePosition = function(position,positionType) {

    self.coords = position;
    self.type = positionType;
    console.log('Current Location: '+position);

    if (self.gmapsLoaded) {
      doStuffWithGmaps();
    } else {
      window.addEventListener("gmapsLoaded", doStuffWithGmaps);
    }

    try {
      sessionStorage.setItem('Beacon.coords', JSON.stringify(self.coords));
    } catch (error) {
      console.warn(error);
    }
    window.dispatchEvent(locationUpdated);

    function doStuffWithGmaps() {
      self.geocode(self.coords);
      self.determineUnits(self.coords);
    }
  }

  this.errorPosition = function(error) {
    self.errorCount++;
    console.warn('Error code: '+error.code+'  Error message: '+error.message);
    if (self.errorCount <=1) {
      self.getIpLocation();
    }
  };

  this.geocode = function(coords) {

    self.geocoder = self.geocoder || new google.maps.Geocoder();

    self.geocoder.geocode({location: coords}, function(results, status) {
      if (status == 'OK') {

        self.data = results[0];

        if (settings.onGeocode) {
          settings.onGeocode(self.data);
        }
          } else {
            console.warn('Geocode was not successful for the following reason: ' + status,true);
          }
    });
  };

  this.determineUnits = function(coords) {
    if (localStorage && localStorage.getItem('Beacon.units') == null) {
      var directionsService = new google.maps.DirectionsService();
      var routeParams = {
        origin: coords,
        destination: coords,
        travelMode: 'WALKING'
      };

      try {
        var myroute = directionsService.route(routeParams, function(result,status) {
          var distance = result.routes[0].legs[0].distance.text;
          self.isMetric = distance.indexOf(" km")!= -1 || distance.indexOf(" m") != -1;
          var units = self.isMetric ? 'metric' : 'us';
          localStorage.setItem('Beacon.units', units);
          $('main').find('[name="units"]').val(units);
        });
      } catch (error) {
        console.warn(error);
      }
    }
  }

  window.gotGmaps = function() {
    self.gmapsLoaded = true;
    var gmapsloaded = new Event('gmapsLoaded');
    window.dispatchEvent(gmapsloaded);
    console.log("Beacon: gmaps loaded");
  }

  function includeGmaps() {
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
      gotGmaps();
    } else {
      var script = document.createElement("script");
      script.src = "https://maps.googleapis.com/maps/api/js?key="+settings.gmapsapikey+"&callback=gotGmaps";
      document.getElementsByTagName('body')[0].appendChild(script);
    }
  }
};