
(function(window) {
	var VERA = window.VERA || {};

	VERA.makeTopX = function(containerSelector,filterSelectors,defaultArgs) {
		var fuseOptions = {
			threshold: .35,
			keys: [
				{name: 'county', weight: 0.5},
				{name: 'state'},
				{name: 'CZLabel'},
				{name: 'alternates', weight: 0.4}
			]
		};

		var controller = '/actions/TopX/Data/';
		var tableaction = 'renderTable';
		var rowaction = 'renderRow';

		var self = this;

		this.ID = 'fips';

		this.defaultArgs = defaultArgs;

		this.container = $(containerSelector);
		this.tableWrap = this.container.find('.table_wrap');
		this.tableBody = this.tableWrap.find('tbody');

		this.currentLocale = this.container.find('[name="locale_type"]');
		this.currentSize = this.container.find('[name="size"]');

		this.loader = this.container.find('.streamloader');

		this.currentLocationButton = this.container.find('.get_current_location');

		this.queryField = this.container.find('.query');
		this.queryResults = this.container.find('.query_results');

		this.firstInteraction = function() {
			if (typeof ga !== 'undefined') {
				ga('send', 'event', 'topX table', 'first click', this.container.find('.h2').text());
			}
		};


		if (!Array.isArray(filterSelectors)) { filterSelectors = [filterSelectors]; }

		filterSelectors.forEach(function(selector) {
			var set = self.container.find(selector);

			set.find(set.data('selector')).on('change', function() {
				self.firstInteraction();
				var field = $(this);
				var val = field.val();

				var args = self.defaultArgs;
				self.queryResults.empty().addClass('hidden');
				self.queryField.val("");

				args.andWhere = args.andWhere || {};
				args.andWhere.size = getCurrentSize();

				self.queryTable(args);
			});
		});

		this.currentLocationButton.on("click", determineLocation);

		self.search = {};

		initSearch('/dist/data/county_lookup.json', 'county');
		//initSearch('/dist/data/states.json', 'state');

		this.queryTable = function(args) {
			self.firstInteraction();
			args = args || self.defaultArgs;

			self.loadTimer = setTimeout(function() {
				self.loader.removeClass('hidden');
				self.container.addClass('loading');
			}, 1000);


			$.ajax({
				method: 'post',
				url: controller+tableaction,
				data: {args: args}
			})
			.done(function(response) {
				var $allResults = $(response).find('tr:not(.heading)');
				var $results = $.map($allResults, function(e,i) {
					var $this = $(e);
					if (self.tableBody.find('tr[data-id="' + $this.data('id') + '"]').length === 0) {
						return $this;
					}
				});

				var $toRemove = self.tableWrap.find('tr:not(.queried,.heading)')

				$toRemove = $.map($toRemove, function(e,i) {
					var $this = $(e);
					var toReturn = $this;
					$allResults.each(function() {
						if ($this.data('id') === $(this).data('id')) {
							toReturn = null;
						}
					});
					if (toReturn) {
						return toReturn;
					}
				});

				$toRemove.forEach(function(item) {
					$(item).remove();
				});

				self.tableBody.append($results);
				self.sortTableByRank();

			})
			.fail(function(response) {
				console.warn(response);
			})
			.always(function() {
				if (self.loadTimer) {
					clearTimeout(self.loadTimer);
				}

				self.loader.addClass('hidden');
				self.container.removeClass('loading');
			});
			;
		};

		this.sortTableByRank = function() {
			var rows = self.tableBody.find('tr:not(.heading)').get();

			rows.sort(function(a,b) {
				return parseFloat(a.dataset.rank) - parseFloat(b.dataset.rank);
			});

			self.tableBody.append(rows);
		};

		this.queryRow = function(args) {
			self.firstInteraction();
			$.getJSON({
				method: 'post',
				url: controller+rowaction,
				data: {args: args}
			})
			.done(function(response) {
				if (response.error) {
					alert(response.error);
					self.queryField.focus();
				} else {
					var existing = self.tableBody.find('[data-id="'+response.id+'"]');

					if (existing.length) {
						existing.removeClass('highlight');
						void existing[0].offsetWidth;
						existing.addClass('highlight queried');
					} else {
						var closest = null;
						var distance = null;
						self.tableBody.find('tr').each(function() {
							var thisDistance = Math.abs(this.dataset.rank) - response.rank;
							if (closest = null || thisDistance < distance) {
								closest = this;
								distance = thisDistance;
							}
						});
						var $row = $(response.content);
						$row.addClass('queried');

/*
						$row.find('.remove_row').on("click", function() {
							$(this).closest('tr').remove();
						});
*/

						self.tableBody.append($row);
						self.sortTableByRank();

						var offset = 20;
						var windowBottom = $('body').scrollTop() + $(window).height();
						var rowBottom = $row.offset().top + $row.outerHeight(true);
						//console.log(windowBottom,rowBottom);
						if (rowBottom + offset > windowBottom) {
							//console.log('in');
							$('html,body').animate({
								scrollTop: rowBottom - $(window).height() + offset
							});
						}
					}
				}
			})
			.fail(function(response) {
				console.warn(response);
			})
			.always(function() {

			})
			;

		};

		function getCurrentSize() {
			return self.currentSize.filter(':checked').val();
		}

/*
		function getCurrentLocale() {
			return self.currentLocale.filter(':checked');
		}
*/

		function initSearch(lookupUrl,fuseInstance) {

			$.getJSON({
				url: lookupUrl
			})
			.done(function(response) {
				self.search[fuseInstance] = new Fuse(response,fuseOptions);

				//If queryfield not initialized
				if (self.query === undefined) {
					self.query = new initQuery();
				}

			})
			.fail(function(response) {
				console.warn(response);
			})
			;
		}

		function initQuery() {
			self.queryField
				.on('keydown', function(e) {

					var key = e.key || e.code;

					switch (key) {
						case 'Enter':
							var selected = self.queryResults.find('.selected');
							if (selected && selected.data('id') != 'undefined') {
								selectQuery(selected);
								self.queryField.blur();
							} else {
								console.log("Tried search but nothing to select");
							}
							break;

						case 'ArrowUp':
							var current = self.queryResults.find('.selected');
							if (current.prev().length) {
								current.prev().addClass('selected');
								current.removeClass('selected');
							}
							break;

						case 'ArrowDown':
							var current = self.queryResults.find('.selected');
							if (current.next().length) {
								current.next().addClass('selected');
								current.removeClass('selected');
							}
							break;
						case 'Escape':
							self.queryField.blur();
							break;
						default:
					}

				})
				.on('keyup', function(e) {

					var key = e.key || e.code;
					var skips = ['Enter','ArrowUp','ArrowDown','Escape'];

					if (skips.indexOf(key) !== -1) {
						return;
					}

					self.queryResults.empty();

					var val = $(this).val();

					if (val === '') {
						return;
					}

					//var currentLocale = getCurrentLocale()
					//currentLocale = currentLocale.val();
					var results = self.search['county'].search(val).slice(0,10);
					var noresults = false;

					if (!results.length) {
						results = [{name: "No Results"}];
						noresults = true;
					}

					results.forEach(function(result) {
						var label = noresults ? 'No Results!' : result.county + ', ' + result.state + ' (' + result.CZLabel + ')';
						self.queryResults.append('<li class="'+( result.fips ? 'query_result' : 'query_result none' )+'" data-id="' + result.fips + '">' + label + '</li>');
					});

					if (!noresults) {
						self.queryResults.children(':not(.none)').first().addClass('selected');
					}

					self.queryResults.children(':not(.none)')
						.on("mouseover", function() {
							self.queryResults.find('.selected').removeClass('selected');
							$(this).addClass('selected');
						})
						.on("mousedown", function(e) {e.preventDefault();})
						.on("mouseup", function() {self.queryField.trigger("blur");})
						.on("click", function(e) {
							var query = $(e.target);
							selectQuery(query);
						})
					;
				})
				.on('blur', function(e) {
					self.queryResults.addClass('hidden');
				})
				.on('focus', function() {
					self.queryResults.removeClass('hidden');
				})
			;
		}

		function determineLocation() {

			self.currentLocationButton.find('span').text('Determining Location');

			VERA.beacon = new Beacon({
				gmapsapikey: 'AIzaSyCUEbplmckN40d3iGssxm7TX4bjW5vZ3fs',
				onGeocode: function(result) {
					var county = null;
					var state = null;

					result.address_components.forEach(function(piece) {
						if (piece.types.indexOf("administrative_area_level_2") !== -1) {
							county = piece.long_name;
						} else if (piece.types.indexOf("administrative_area_level_1") !== -1) {
							state = piece.short_name;
						}
					});

					self.county = county;
					self.state = state;

					self.container.find('.current_location').text(county + ", " + state).removeClass('hidden');
					self.currentLocationButton.hide();

					var nycounties = ['New York County','Kings County','Queens County','Dutchess County','Bronx County'];
					if (nycounties.indexOf(county) !== -1) {
						county = 'New York City';
					}


					self.queryRow({
						select: self.defaultArgs.select,
						andWhere: { name: 'county' + ' ="' + county + '" AND state ="' + state + '"' },
						columns: self.defaultArgs.columns,
						displayName: county + ', ' + state
					});
				}
			});

			window.addEventListener("locationUpdated", function() {
				console.log(VERA.beacon.coords);
			});

			VERA.beacon.getLocation();
		}

		function selectQuery(query) {
			self.queryField.val(query.text());
			self.queryRow({
				select: self.defaultArgs.select,
				andWhere: { name: self.ID + ' ="' + query.data('id') + '"' },
				columns: self.defaultArgs.columns,
				displayName: query.text()
			});
		}
	};

})(window);