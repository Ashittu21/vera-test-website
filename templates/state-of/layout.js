$(function() {
  window.NavCarousel = new navCarousel(
    '#full-nav-carousel',
    '#article',
    {{ landing.stateOfSeo.seoTitle | json_encode | raw }},
    {{ landing.url | json_encode | raw }},
    {{ landing.id }},
    {{ (landing.serialLayout.value == "grid" ? false : true) | json_encode | raw }} //close on scrollup
  );
  Site.slideout();

  {% if craft.request.getParam('skip') is not null %}
  NavCarousel.$carousel.flickity('select',1,false,true);
  {% endif %}

  {% if openArticle is defined %}
  NavCarousel.open();
  {% if openArticle matches '/^\\d+$/' %}
    NavCarousel.$carousel.flickity('select',
    {{ openArticle }})
  {% endif %}
  {% endif %}
});