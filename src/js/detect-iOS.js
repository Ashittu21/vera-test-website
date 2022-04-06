

document.addEventListener('DOMContentLoaded', function () {

  var contentTag = document.getElementsByTagName('main');
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    contentTag[0].classList.add('iOS');
  } 

});