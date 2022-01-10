(function(window) {
	"use strict"

	var Slider = function(settings)
	{

		var self = this;

		settings = settings || {};

		if (settings.afterLoad) {
			this.afterLoad = settings.afterLoad;
		}

		if (settings.afterClose) {
			this.afterClose = settings.afterClose;
		}

		var slider = document.getElementById("Slider--article");

		if (slider === null) {
			slider = document.createElement("article");
			slider.id = 'Slider--article';
		}

		var screen,inner,innerContents='';

		screen = slider.querySelector('.Slider--screen')
		if (screen === null) {
			screen = document.createElement("div");
			screen.classList.add('Slider--screen');
		}

		inner = slider.querySelector('.Slider--inner');
		if (inner === null) {
			inner = document.createElement("div");
			inner.classList.add('Slider--inner');
		} else {
			innerContents = inner.innerHTML;
		}

		screen.addEventListener("click", function() {
			self.close();
		});

		slider.append(screen);
		slider.append(inner);

		document.body.append(slider);

		this.open = function(url,sliderClass)
		{
			console.log(sliderClass)
			sliderClass = sliderClass || 'informational';

			clear();
			slider.classList.add('Slider__open','loading');
			if (sliderClass) {
				slider.classList.add(sliderClass);
			}
			document.body.classList.add('no-scroll');

			$.ajax({
				url: url,
				method: 'get'
			})
			.done(function(response) {

				inner.innerHTML = innerContents + response;
				self.afterLoad();
				slider.classList.remove('loading');

			})

			function clear()
			{
				inner.innerHTML = innerContents ? innerContents : '';
			}
		}

		this.close = function()
		{
			slider.classList.remove('Slider__open');
			document.body.classList.remove('no-scroll');
			if (self.afterClose) {
				self.afterClose();
			}
		}
	};

	window.Slider = Slider;
})(window);