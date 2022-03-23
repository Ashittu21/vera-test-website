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


// Hamburger menu
const hamburgerButton = document.querySelector(".hamburger");
const hamburgerMenu   = document.querySelector(".mobile-nav");
const hamburgerMenuText   = document.querySelector(".menuText");


hamburgerButton.onclick = function() {
  this.classList.toggle("is-active");
  hamburgerMenu.classList.toggle("show-menu");
  hamburgerMenuText.classList.toggle("hideTextMenu");
};



const itemsmenuclick = document.querySelectorAll(".clicky-menu-item > .no-submenu");

itemsmenuclick.forEach( menu => {
  menu.onmouseover = function(e){

    if( e.target.getAttribute('class') === 'no-submenu'){

      const items = $(e.target.parentElement).siblings();
      for (let link of items) {
        var children = link.childNodes;
        for (var i = 0; i < children.length; i++) {
 
          if(children[i].nodeName.toLowerCase() === 'button' && children[i].getAttribute( 'aria-expanded') === 'true' ){

            children[i].setAttribute( 'aria-expanded', false );
            $(".heroType1-container").trigger('mouseover');
          }
          if(children[i].nodeName.toLowerCase() === 'ul' && children[i].getAttribute( 'aria-hidden') === 'false'){

            children[i].setAttribute( 'aria-hidden', true );
            $(".heroType1-container").trigger('mouseover');
          }
        }
      }
    }
  };

});


