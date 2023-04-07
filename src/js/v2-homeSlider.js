document.addEventListener('DOMContentLoaded', function () {

  if (document.querySelector('.heroType3')) {
    
    var swiper = new Swiper(".homeSlider", {
      direction: "vertical",
      loop: true,
      grabCursor: false, //false
      draggable: false, //false
      noSwiping: true,
      preventInteractionOnTransition: false,
      allowTouchMove: false, //false
      slideToClickedSlide: false,
      preventClicksPropagation: false,  //false
      preventClicks: false, //false
      autoplay: false,
      autoplay: {
        delay: 2700,
      },
     /* on: {
        init: function () {
          console.log('swiper initialized');
        }
      }*/
    });


    const underlineFirst = document.querySelector(`.swiper-slide:nth-child(2) > .headingHero > div:nth-of-type(2) > div > .heroUnderline > .heroUnderline-word`);
    const imgFirst = document.querySelector(`.swiper-slide:nth-child(2) > .headingHero >  div:nth-of-type(2) > div > .heroUnderline > img`);
    
    const wordWidthFirst = underlineFirst.clientWidth + "px";
    const animationStrokeFirst = [{ width: '0px', }, { width: wordWidthFirst,}];

    //const wordWidthFirst = underlineFirst.offsetWidth;
    //imgFirst.style.setProperty("width", wordWidthFirst+"px", "important");
    //imgFirst.style.width = wordWidthFirst;


    imgFirst.animate(animationStrokeFirst, {
      duration: 1300,
      fill: 'both',
      easing: 'cubic-bezier(0.65, 0, 0.35, 1)'
    });

    const animationStroke = [{
        width: '0px',
        position: 'relative',
        top: '0px',
        opacity: 0,
      },
      {
        width: wordWidthFirst,
        position: 'relative',
        top: '-30px',
        opacity: 1,
      }
    ];

    const animationSlideUp = [{
        transform: 'translateY(100px)',
        opacity: 0,
      },
      {
        transform: 'translateY(0px)',
        opacity: 1,

      }
    ];
      

    swiper.on(`slideChange`, function (e) {

      const index = swiper.activeIndex + 1;

      const title = document.querySelector(`.swiper-slide:nth-child(${index}) > .headingHero > div:first-of-type > div`);
      const subTitle = document.querySelector(`.swiper-slide:nth-child(${index}) > .headingHero > div:nth-of-type(2) > div`);

      const underline = document.querySelector(`.swiper-slide:nth-child(${index}) > .headingHero > div:nth-of-type(2) > div > .heroUnderline > .heroUnderline-word`);
      const img = document.querySelector(`.swiper-slide:nth-child(${index}) > .headingHero >  div:nth-of-type(2) > div > .heroUnderline > img`);

      const wordWidth = underline.clientWidth + "px";

      const animationStroke = [{ width: '0px', }, { width: wordWidth,}];

      title.animate(animationSlideUp, {
        duration: 450,
        fill: 'both',
        easing: 'cubic-bezier(0.65, 0, 0.35, 1)'
      });
      
       subTitle.animate(animationSlideUp, {
        duration: 900,
        fill: 'both',
        easing: 'cubic-bezier(0.65, 0, 0.35, 1)'
      });
            
      img.animate(animationStroke, {
        duration: 1300,
        fill: 'both',
        easing: 'cubic-bezier(0.65, 0, 0.35, 1)'
      });


    });

  }

});
