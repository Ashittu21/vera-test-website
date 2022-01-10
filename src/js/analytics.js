(function() {
	if (typeof ga === "undefined") {
	    window.ga = function() {
		    console.log('Trying to send a GA function, but Google Analytics is not loaded or not available in this environment');
	    }
    };
    
    window.gaEvent = gaEvent;
    window.gaPageview = gaPageview;
    window.initAnalyticsEvents = initEvents;
    
	$(function() {
		initEvents()
	})
	
	function initEvents()
	{
		$('[data-analytics-event]:not(.analytics-event-initialized)').each(function() {
			$(this).on("click", function(event) {
				var params = JSON.parse(event.currentTarget.getAttribute('data-analytics-event'));
				gaEvent(params[0],params[1],(params[2] || null), (params[3] || null))
			}).addClass('analytics-event-initialized');
		});
	}
	
	function gaEvent(category,action,label,value) {
		label = label || null;
		value = value || null;
		
		ga("send","event",category,action,label,value);
		var message = "Sent analytics Event with Category: " + category + ",  Action: " + action + ", Label: " + label + ", and Value: " + value;
		console.log(message);
	}
	
	function gaPageview(path) {
		ga("send","pageview",path);
		var message = "Sent analytics Pageview with path: " + path;
		console.log(message);
	}
})();

