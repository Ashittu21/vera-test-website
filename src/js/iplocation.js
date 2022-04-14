(function () {
  var IPAPIKEY = "da1f341822ce28813f8c3d92cf9d78d1b39901c5";
  var VERA = window.VERA || {};
  VERA.getIpLocation = getIpLocation
  window.VERA = VERA;

  function getIpLocation() {
    return new Promise(function (resolve, reject) {
      try {
        var userLocation = JSON.parse(localStorage.getItem("userLocation"));
        if (userLocation && notTooOld(userLocation.timestamp)) {
          resolve(userLocation);
        } else {
          fetchIpLocation().then(function (location) {
            resolve(location)
          })
        }
      } catch (err) {
        console.warn(err)
      }
    })
  }
  function notTooOld(age) {
    return (Date.now() - age) / 1000 < 2592000 //30 days of seconds
  }
  function fetchIpLocation() {
    return new Promise(function (resolve, reject) {
      $.get("https://ipapi.co/json/?key=" + IPAPIKEY, function (data) {
        const result = {
          state: data.error ? null : data.region_code,
          timestamp: Date.now()
        }
        try {
          localStorage.setItem("userLocation", JSON.stringify(result));
        } catch (err) {
          console.warn(err);
        }
        resolve(result)
      })
    })
  }
})();