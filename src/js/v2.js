
 document.addEventListener('DOMContentLoaded', function () {
    
	// Hamburger Menu
 if (document.querySelector('.hamburger')) { 
	 const hamburgerButton = document.querySelector(".hamburger");
	 const hamburgerMenu   = document.querySelector(".mobile-nav");
	 const hamburgerMenuText   = document.querySelector(".menuText");
			 
	 hamburgerButton.onclick = function() {
		 this.classList.toggle("is-active");
		 hamburgerMenu.classList.toggle("show-menu");
		 hamburgerMenuText.classList.toggle("hideTextMenu");
	 };
 }

 // Sticky Menu
 if (document.querySelector('#rowBottom')) { 
	 
		 var h = document.getElementById("rowBottom");
		 var stuck = false;
		 var stickPoint = getDistance();

		 function getDistance() {
			 var topDist = h.offsetTop;
			 return topDist;
		 }
	 
	 window.onscroll = function(e) {

		 var distance = getDistance() - window.pageYOffset;
		 var offset = window.pageYOffset;
		 if ((distance <= 0) && !stuck) {
			 h.style.position = 'fixed';
			 h.style.top = '0px';
			 stuck = true;
			 h.classList.add("show-logo");
			 h.classList.remove("hide-logo");
		 } else if (stuck && (offset <= stickPoint)){
			 h.style.position = 'static';//static
			 stuck = false;
			 h.classList.add("hide-logo");
			 h.classList.remove("show-logo");
		 }
	 }
 }

});

(function(){

  var doc = document.documentElement;
  var w = window;

  var prevScroll = w.scrollY || doc.scrollTop;
  var curScroll;
  var direction = 0;
  var prevDirection = 0;

  var header = document.getElementById('rowBottom');
	var offs   = header.offsetTop;
  var checkScroll = function() {

    /*
    ** Find the direction of scroll
    ** 0 - initial, 1 - up, 2 - down
    */

    curScroll = w.scrollY || doc.scrollTop;
    if (curScroll > prevScroll) { 
      //scrolled up
      direction = 2;
    }
    else if (curScroll < prevScroll) { 
      //scrolled down
      direction = 1;
    }

    if (direction !== prevDirection) {
      toggleHeader(direction, curScroll);
    }

    prevScroll = curScroll;
  };

  var toggleHeader = function(direction, curScroll) {
    if (direction === 2 && curScroll > 186) { 

      //replace 52 with the height of your header in px

      header.classList.add('hide');
      prevDirection = direction;
    }
    else if (direction === 1) {
      header.classList.remove('hide');
      prevDirection = direction;
    }
  };

  window.addEventListener('scroll', checkScroll);

})();