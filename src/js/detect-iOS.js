

document.addEventListener('DOMContentLoaded', function () {

  var bodyTag = document.getElementsByTagName('body');
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    bodyTag.classList.add('iOS');
  } 

});