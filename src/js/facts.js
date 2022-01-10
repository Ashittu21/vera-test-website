(function() {
	var VERA = window.VERA || {};
	VERA.initFacts = init;
	window.VERA = VERA;

	$(function() {
		init();
	});

	function init()
	{
		initPercentagePie();
		initRatio();
		initTime();
	}

	function initPercentagePie()
	{
		$('[data-percentage-pie]:not(.percentage-pie-initialized)').each(makePie)
	}

	function initRatio()
	{
		$('[data-ratio]:not(.ratio-initlialized)').each(makeRatio)
	}

	function initTime()
	{
		$('[data-time]:not(.time-initlialized)').each(makeTime)
	}

	function makePie()
	{
		var $this = $(this),
		width = 100,
		height = width,
		radius = width*.4,
		params = JSON.parse($this.attr('data-percentage-pie'));

		$this.addClass('percentage-pie-initialized');

		if (params) {

			var data = [params.value,100-params.value];
			var pieGenerator = d3.pie();
			var arcData = pieGenerator(data);
			var path = d3.arc()
				.innerRadius(radius*.8)
				.outerRadius(radius);

			arcData.pop();

			var svg = d3.select(this)
				.append('svg')
				.attr('viewBox', '0 0 ' + width + ' ' + height)

			var chart = svg
				.selectAll('g')
				.data(arcData)
				.enter()
				.append('g')

			chart
				.append('path')
				.attr('class', 'bg-arc')
				.attr('d', path({
					startAngle: 0,
					endAngle: Math.PI*2
				}))
				.attr('x', width/2)
				.attr('y', height/2)
				.attr('transform', 'translate(' + width/2 + ' ' + height/2 + ')')

			chart
				.append('path')
				.attr('class', 'data-arc')
				.attr('d', path)
				.attr('transform', 'translate(' + width/2 + ' ' + height/2 + ')')

			chart
				.append('text')
				.text(function(d) {
					return d.value + '%';
				})
				.attr('x', width/2)
				.attr('y', height/2)
				.attr('class', 'viz-text filled')

			afterLoad(this);

		} else {
			console.warn('invalid fact params',this);
		}


	}

	function makeRatio()
	{
		var $this = $(this),
		params = JSON.parse($this.attr('data-ratio'));

		$this.addClass('ratio-initialized');

		if (params) {

			var data = [];
			data.length = params.value.consequent;

			var columns = 10,
				rows = Math.ceil(params.value.consequent/columns)

			var width = 100,
				size = data.length >= columns ? width/columns : width/data.length,
				height = rows*size,
				padRatio = .1,
				pad = padRatio*size,
				radius = size/2 - pad*2

			var svg = d3.select(this)
				.append('svg')
				.attr('viewBox', '0 0 ' + width + ' ' + height)

			var chart = svg
				.append('g')
				.selectAll('.piece')
				.data(data)
				.enter()
				.append('circle')
				.attr('r', radius)
				//.attr('height', size - pad*2)
				.attr('cx', function(d,i) {
					return i%columns*size + pad + radius
				})
				.attr('cy', function(d,i) {
					return Math.floor(i/columns)*size + pad + radius
				})
				.attr('class', function(d,i) {
					return 'piece ' + (i<params.value.antecedant ? 'filled' : '')
				})

			afterLoad(this);

		}
	}

	function makeTime()
	{
		var $this = $(this),
		params = JSON.parse($this.attr('data-time'));

		var type = params.unit === 'days' ? 'calendar' : 'clock';

		var $this = $(this);

		var svg = d3.select(this)
					.append('svg')

		switch (type) {
			case 'calendar':

				var calendarDays = 30,
				days = +params.value,
				calendars = Math.ceil(days/calendarDays)


				var columns = Math.max(1, Math.min(7, Math.floor(Math.log(2.72)*calendars) ) ),
					rows = Math.ceil(calendars/columns),
					width = 100,
					height = (width/columns)*(5/7)*rows,

					calPad = .05,
					calWidth = width/columns,
					calPadX = calWidth*calPad,
					calHeight = calWidth*(5/7),
					calPadY = calHeight*calPad,
					calWidthInner = calWidth - calPadX*2,
					calHeightInner = calHeight - calPadY*2,

					cellPad = .05,
					cellWidth = calWidthInner/7,
					cellPadX = cellWidth*cellPad,
					cellHeight = calHeightInner/5,
					cellPadY = cellHeight*cellPad

				svg.attr('viewBox', '0 0 ' + width + ' ' + height)

				var calendars = [];

				var countDays = days
				while (countDays > 0) {
					calendars.push(countDays >= calendarDays ? calendarDays : countDays)
					countDays -= calendarDays
				}

				var cals = svg
					.selectAll('.calendar')
					.data(calendars)
					.enter()
						.append('g')
						.attr('transform', function(d,i) {
							return 'translate(' + ((i%columns)*calWidth + calPadX) + ' ' + (Math.floor(i/columns)*calHeight + calPadY)  + ')'
						})

					cals.append('rect')
						.attr('class', 'calendar-back')
						.attr('width', calWidthInner)
						.attr('height', calHeightInner)


					var data = [];
					data.length = calendarDays;

					cals
						.each(function(d,i) {

							var daysThisMonth = d;

							d3.select(this)
								.selectAll('.day-cell')
								.data(data)
								.enter()
								.append('rect')
								.attr('class', function(d,i) {
									return 'day-cell' + (i<daysThisMonth ? ' filled' : '')
								})
								.attr('width', cellWidth - cellPadX*2)
								.attr('height', cellHeight - cellPadY*2)
								.attr('x', function(d,i) {
									return cellWidth*(i%7) + cellPadX
								})
								.attr('y', function(d,i) {
									return cellHeight*(Math.floor(i/7)) + cellPadY
								})
						})


				break;

			case 'clock':

				var width = 100,
					height = width,
					radius = width*.45

				svg.attr('viewBox', '0 0 ' + width + ' ' + height)

				var path = d3.arc()
					.innerRadius(0)
					.outerRadius(radius)
					.startAngle(0)

				var consequent = params.unit == 'hours' ? '12' : '60';

				var chart = svg
					.append('g')
					.attr('transform', 'translate(' + width/2 + ' ' + height/2 + ')')

				chart
					.append('circle')
					.attr('class', 'clock-back')
					.attr('r', radius)
					.attr('cx', 0)
					.attr('cy', 0)

				chart
					.append('path')
					.attr('class', 'time-amount filled')
					.attr('d', path({endAngle: (params.value/consequent)*Math.PI*2}))

				var markings = [];
				markings.length = 12;
				chart.append('g')
					.attr('class', 'markings')
					.selectAll('circle')
					.data(markings)
					.enter()
					.append('circle')
					.attr('cx', function(d,i) {
						return Math.cos(Math.PI*2*(i/markings.length))*radius*.9;
					})
					.attr('cy', function(d,i) {
						return Math.sin(Math.PI*2*(i/markings.length))*radius*.9;
					})
					.attr('r', radius/40)

				break;
			default:
				return;
		}

		afterLoad(this);
	}

	var factLoaded = new Event('factloaded', {
		bubbles: true
	});
	function afterLoad(element)
	{
		element.dispatchEvent(factLoaded);
	}
})();
