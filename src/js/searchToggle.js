document.addEventListener('DOMContentLoaded', function () {

  var searchButton = document.getElementById("searchButton");
  var closeButton  = document.getElementById("searchClose");
  var searchInput  = document.getElementById("searchInput");
  var searchLabel  = document.getElementById("searchLabel");

  searchButton.addEventListener("click", function (event) {

    var container = this.closest('.search-wrapper');
    if (!container.classList.contains("active") && searchInput.value.length == 0 ) {
       container.classList.add('active');
    } else if (container.classList.contains("active") && searchInput.value.length > 0 ){ 
      return true;
    }

    event.preventDefault();
  }, false);

  closeButton.addEventListener("click", function (event) {
     var container = this.closest('.search-wrapper');
     if (container.classList.contains("active")) {
        container.classList.remove('active');
     } 
     event.preventDefault();
  }, false);
   
  searchLabel.addEventListener("click", function (event) {
   var container = this.closest('.search-wrapper');
   container.classList.add('active');
   event.preventDefault();
 }, false);

});