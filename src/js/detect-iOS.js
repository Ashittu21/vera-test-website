

document.addEventListener('DOMContentLoaded', function () {

  var contentTag = document.getElementsByTagName('main');

  function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1)); 
    }
  }

  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (isIOS) {
    contentTag[0].classList.add('iOS');
  } 

  if (isRetinaDisplay) { 
    contentTag[0].classList.add('retina');
  }

});