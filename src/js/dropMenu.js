$(".drop").click(function() {
    var is_open = $(this).hasClass("open");
    if (is_open) {
      $(this).removeClass("open");
    } else {
      $(this).addClass("open");
    }
  });
  
  $(".drop li").click(function() {
  
    var selected_value = $(this).html();
    var first_li = $(".drop li:first-child").html();
  
    $(".drop li:first-child").html(selected_value);
    $(this).html(first_li);
  
  });
  
  $(document).mouseup(function(event) {
  
    var target = event.target;
    var select = $(".select");
  
    if (!select.is(target) && select.has(target).length === 0) {
      select.removeClass("open");
    }
  
  });