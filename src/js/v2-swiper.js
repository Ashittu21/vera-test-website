document.addEventListener('DOMContentLoaded', function () {
  
  if (document.querySelector('.swiperSlider')) { 

    var swiper = new Swiper(".swiperSlider", {
      spaceBetween: 30,
      effect: "fade",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }
    });
    
  }
  
});