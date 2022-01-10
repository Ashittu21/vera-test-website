(function() {
	"use-strict"

	var VERA = window.VERA || {};

	VERA.initPageLoader = init;
	
	$(init);
	
	window.VERA = VERA;
	
	function init($elems)
	{
		
		VERA.sm = VERA.sm || new ScrollMagic.Controller();
		
		$elems = $elems || $('.ajax-page-loader');
		
		$elems.each(function() {
			setupLoader(this);
		});
		
	}
	
	function setupLoader(elem)
	{
	
		var scene = new ScrollMagic.Scene({
			triggerElement: elem,
			triggerHook: 1
		})
		.on("enter", function() {
			loadPage(elem);
			scene.destroy();
		})
		.addTo(VERA.sm)
		.addIndicators()
		;
		
	}
	
	function loadPage(elem) {
		
		var entryId = elem.getAttribute("data-entry-id");
		var actionUrl = elem.getAttribute("data-action-url");
		
		$.ajax({
			url: actionUrl,
			type: 'post'
		})
		.done(function(response) {
			var $e = $(elem);
			$e.after(response);
			$e.remove();
			
			Site.afterAjaxPageLoad();
			
		})
		;
			
	}
	
})();