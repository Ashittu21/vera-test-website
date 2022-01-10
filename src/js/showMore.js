(function() {
	"use strict"
	
	window.ShowMore = init;
	
	$(window).on('load', function() {
		init();
	});
	
	function init()
	{
		$('[data-show-more]:not(.show-more-initialized)').each(function() {
			new makeShowMore($(this));
		})
		$('[data-slide-toggle]:not(.slide-toggle-initialized)').each(function() {
			new makeSlideToggle($(this));
		})
	}
	
	function makeShowMore($elem)
	{
		const params = JSON.parse($elem.attr('data-show-more')),
			itemSelector = params.itemSelector,
			buttonSelector = params.buttonSelector,
			$items = $elem.find(itemSelector),
			$remainingItems = $items.slice(1),
			$button = $elem.find(buttonSelector)
			
		var isOpen = false;
		$button.attr('aria-pressed', isOpen)
			
		$remainingItems.hide();
		
		$button.on("click", function() {
			isOpen = !isOpen;
			$button.attr('aria-pressed', isOpen)
			if (isOpen) {		
				$button.text('Show Less');
			} else {
				$button.text('Show More');
			}
			$remainingItems.slideToggle();
			
		});
		
		$elem.addClass('show-more-initialized');
	}
	
	function makeSlideToggle($elem) {
		var $button = $elem.find('.btn');
		var closedHeight, openHeight;
		var open = false;
		
		
		init();
		
		function init()
		{
			measure();
			
			if ((openHeight - closedHeight)/openHeight < .25) {
				$elem.addClass('is-open');
				$elem.css({'height': 'auto'});
				$button.remove();
				return;
			}
			
			$button.on("click", function() {
				open = !open;
				$elem.toggleClass('is-open');
				$elem.animate({'height': (!open ? closedHeight : openHeight)}, function() {
					if (open) {
						$elem.css({'height': 'auto'});
					}
				})
				
			});
			
			window.addEventListener("resize", function() {
				measure();
			});
			
			$elem.addClass('slide-toggle-initialized');
		}
		
		function measure()
		{
			closedHeight = $elem.outerHeight(true);
			openHeight = $elem.children().first().outerHeight(true);
		}
	}
})();