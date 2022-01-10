$(function() {
	"use strict";

	var VERA = window.VERA || {};

	VERA.sm = VERA.sm || new ScrollMagic.Controller();

	var $container = $('.nys');

	var $intro = $container.find('.intro');

	var rectTween = TweenLite.to('#nys svg rect', 1, {
		x: function(i,t) {
			return t.getAttribute('data-x');
		},
		y: function(i,t) {
			return t.getAttribute('data-y');
		}
	});

	var rectScene = new ScrollMagic.Scene({
		triggerElement: 'main',
		triggerHook: 0
	})
	.setTween(rectTween)
	.tweenChanges(true)
	.setPin('#nys svg', {
	})
  .addTo(VERA.sm)
	;

	var fadeScene = new ScrollMagic.Scene({
		triggerElement: 'main',
		triggerHook: 0,
		offset: 100
	})
	.setTween('#nys svg rect', 1, {autoAlpha: 1})
  .addTo(VERA.sm)
	;

	rectScene.duration(determineRectDuration());
	window.addEventListener("resize", function() {
		rectScene.duration(determineRectDuration());
	});

	var stateScene = new ScrollMagic.Scene({
		triggerElement: 'main',
		triggerHook: 0,
		offset: 100
	})
	.setTween('#nys', .5, { autoAlpha: 1 } )
	.addTo(VERA.sm)
	;


	function determineRectDuration()
	{
		var value = Math.max($intro.outerHeight(true) - window.innerHeight*1.3,0);
		return value + "px";
	}

	window.VERA = VERA;


});