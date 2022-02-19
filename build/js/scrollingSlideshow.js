'use strict';(function(){//closure
window.addEventListener("load",function(){init();});var init=function init(){var containers=document.querySelectorAll('.scrolling-slideshow');[].forEach.call(containers,function(container){new initSlideshow(container);});};var initSlideshow=function initSlideshow(container){var slides=container.querySelectorAll('.scrolling-slideshow-item'),slideCount=slides.length;var currentSlideIndex=void 0,currentSlide=void 0;if(!slideCount){console.log("No slides");return;}var initSlides=function initSlides(slides){var sm=new ScrollMagic.Controller();console.log(container);new ScrollMagic.Scene({triggerElement:container,triggerHook:0,offset:$('.header').height()/2}).addTo(sm).setClassToggle(container,'active');//init videos
[].filter.call(slides,function(slide){var media=slide.querySelector('.scrolling-slideshow-item-media');var video=media.querySelector('video');if(video){video.setAttribute('autoplay',true);video.setAttribute('loop',true);}new ScrollMagic.Scene({triggerElement:slide,duration:window.innerHeight}).on("enter",function(){media.classList.add("active");if(video){video.play();}}).on("leave",function(){media.classList.remove("active");if(video){video.pause();}}).addTo(sm);});};initSlides(slides);};//closure
})();