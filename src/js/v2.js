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

});