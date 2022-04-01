/*function searchToggle(obj, evt){
  var container = $('.search-wrapper');
      if(!container.hasClass('active')){
          container.addClass('active');
          evt.preventDefault();
      } else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
          container.removeClass('active');
          container.find('.search-input').val('');
      }
}*/


function openSearch(e) { 
    var container = $('#search-wrapper');

    if(!container.hasClass('active')){
        container.addClass('active');
        e.preventDefault();
    } else if (container.hasClass('active') && container.closest('.input-holder').length == 0) {
        container.removeClass('active');
        container.find('.search-input').val('');
        e.preventDefault();
    }
}