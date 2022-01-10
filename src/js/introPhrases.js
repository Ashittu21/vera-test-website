(function() {
	"use strict"
	
	var VERA = window.VERA || {};
	VERA.initIntroPhrases = init;
	
	window.VERA = VERA;
	
	$(init);
	
	function init()
	{
		
		VERA.sm = VERA.sm || new ScrollMagic.Controller();
		
		var $containers = $('.intro-phrases:not(.phrases-initialized)');
		
		$containers.each(initContainer);
		
	}
	
	function initContainer()
	{
		var $container = $(this);
		
		$container.addClass('phrases-initialized');
		
		var $phrases = $container.find('.phrase');
		
		$phrases.each(setupPhrase);
	}
	
	function setupPhrase()
	{
		
		var tween = TweenLite.to(this, 1, { autoAlpha: 1 });
		
		var scene = new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: .75
		})
		.setTween(tween)
		.addTo(VERA.sm)

	}
	
})();