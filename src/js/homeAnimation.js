 var swiper = new Swiper(".mySwiper", {
   direction: "vertical",
   loop: true,
   grabCursor: false,
   draggable: false,
   noSwiping: true,
   preventInteractionOnTransition: false,
   allowTouchMove: false,
   slideToClickedSlide: false,
   preventClicksPropagation: false,
   preventClicks: false,
   autoplay: {
     delay: 2700,
   },
 });
 
 const wordWidth = "100%";

 const animationStroke = [{
  width: '1%',
  position: 'relative',
  top: '-30px',
  opacity: 0,
},
{
  width: wordWidth,
  position: 'relative',
  top: '-30px',
  opacity: 1,
}
]

const animationSlideUp = [{
  transform: 'translateY(100px)',
  opacity: 0,
},
{
  transform: 'translateY(0px)',
  opacity: 1,

}
]

 swiper.on('slideChange', function (e) {
   const index = swiper.activeIndex + 1
   const title = document.querySelector(`.swiper-slide:nth-child(${index}) >.heading >div > p`)
   const subTitle = document.querySelector(`.swiper-slide:nth-child(${index}) >.heading > div:first-of-type + div >  p`)
   const img = document.querySelector(`.swiper-slide:nth-child(${index}) >.heading > div:last-child >  img`)
   const lastWord = document.querySelector(`.swiper-slide:nth-child(${index}) >.heading > div:nth-of-type(2) p.slide-up`)
   const wordWidth = lastWord.clientWidth+"px"

   const animationStroke = [{
    width: '1%',
  },
  {
    width: wordWidth,
  }
  ]

 
   title.animate(animationSlideUp, {
     duration: 450,
     fill: 'both',
     easing: 'cubic-bezier(0.65, 0, 0.35, 1)'
   })
   subTitle.animate(animationSlideUp, {
     duration: 900,
     fill: 'both',
     easing: 'cubic-bezier(0.65, 0, 0.35, 1)'
   })
   img.animate(animationStroke, {
     duration: 1800,
     fill: 'both',
     easing: 'cubic-bezier(0.65, 0, 0.35, 1)'
   })


 });