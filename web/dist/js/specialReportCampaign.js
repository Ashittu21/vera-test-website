(function(){var t;t="undefined"!=typeof exports&&null!==exports?exports:this,t.Lethargy=function(){function t(t,s,i,l){this.stability=null!=t?Math.abs(t):8,this.sensitivity=null!=s?1+Math.abs(s):100,this.tolerance=null!=i?1+Math.abs(i):1.1,this.delay=null!=l?l:150,this.lastUpDeltas=function(){var t,s,i;for(i=[],t=1,s=2*this.stability;s>=1?s>=t:t>=s;s>=1?t++:t--)i.push(null);return i}.call(this),this.lastDownDeltas=function(){var t,s,i;for(i=[],t=1,s=2*this.stability;s>=1?s>=t:t>=s;s>=1?t++:t--)i.push(null);return i}.call(this),this.deltasTimestamp=function(){var t,s,i;for(i=[],t=1,s=2*this.stability;s>=1?s>=t:t>=s;s>=1?t++:t--)i.push(null);return i}.call(this)}return t.prototype.check=function(t){var s;return t=t.originalEvent||t,null!=t.wheelDelta?s=t.wheelDelta:null!=t.deltaY?s=-40*t.deltaY:(null!=t.detail||0===t.detail)&&(s=-40*t.detail),this.deltasTimestamp.push(Date.now()),this.deltasTimestamp.shift(),s>0?(this.lastUpDeltas.push(s),this.lastUpDeltas.shift(),this.isInertia(1)):(this.lastDownDeltas.push(s),this.lastDownDeltas.shift(),this.isInertia(-1))},t.prototype.isInertia=function(t){var s,i,l,a,e,n,h;return s=-1===t?this.lastDownDeltas:this.lastUpDeltas,null===s[0]?t:this.deltasTimestamp[2*this.stability-2]+this.delay>Date.now()&&s[0]===s[2*this.stability-1]?!1:(l=s.slice(0,this.stability),i=s.slice(this.stability,2*this.stability),h=l.reduce(function(t,s){return t+s}),e=i.reduce(function(t,s){return t+s}),n=h/l.length,a=e/i.length,Math.abs(n)<Math.abs(a*this.tolerance)&&this.sensitivity<Math.abs(a)?t:!1)},t.prototype.showLastUpDeltas=function(){return this.lastUpDeltas},t.prototype.showLastDownDeltas=function(){return this.lastDownDeltas},t}()}).call(this);


/* Momentum Scroll */
(function ($){
	var
		  ns		= (new Date).getTime()
		, special	= $.event.special
		, dispatch	= $.event.handle || $.event.dispatch

		, scroll		= 'scroll'
		, scrollStart	= scroll + 'start'
		, scrollEnd		= scroll + 'end'
		, nsScrollStart	= scroll +'.'+ scrollStart + ns
		, nsScrollEnd	= scroll +'.'+ scrollEnd + ns
	;

	special.scrollstart = {
		setup: function (){
			var pid, handler = function (evt/**$.Event*/){
				if( pid == null ){
					evt.type = scrollStart;
					dispatch.apply(this, arguments);
				}
				else {
					clearTimeout(pid);
				}

				pid = setTimeout(function(){
					pid = null;
				}, special.scrollend.delay);

			};

			$(this).bind(nsScrollStart, handler);
		},

		teardown: function (){
			$(this).unbind(nsScrollStart);
		}
	};

	special.scrollend = {
		delay: 300,

		setup: function (){
			var pid, handler = function (evt/**$.Event*/){
				var _this = this, args = arguments;

				clearTimeout(pid);
				pid = setTimeout(function(){
					evt.type = scrollEnd;
					dispatch.apply(_this, args);
				}, special.scrollend.delay);

			};

			$(this).bind(nsScrollEnd, handler);

		},

		teardown: function (){
			$(this).unbind(nsScrollEnd);
		}
	};
})(jQuery);

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

scrollCtrl = {
	init: function(){

		this.currSlide = 0;
		this.pager = $('.pager');
		this.chapters = $('#content > .special-reports-chapter');
		this.isLast = false;
		this.body = $('body');
		this.nextBtn = $('.campaign-slide-ctrl .next-slide');
		this.isScolling = false;
		this.scrollTimer = null;
		this.lastScrollVel = 0;
		this.scrolled = false;
		this.lastMag = 0;
		this.anchors = $('.anchor-link');
		this.link = $('.js-anchor-link')
		this.dropdown = $('.dropdown');
		this.dropdownCurrent = $('.dropdown-outer .dropdown-active');
		this.header = $('#Header');
		this.radialNav = $('.header__menu-radial');
		this.navOpen = false;

		//this.lethargy = new Lethargy(); // Use defaults
		this.lethargy = new Lethargy(7, 90, 0.05); // Tinkering with the options

		this.initNav()

		//override Tween
		TweenMax.to( $('.title'), 0.1, { x: 0 });

		self = this;
		if (!isMobile.any() || $(window).width() > 1023){
			$(window).bind('DOMMouseScroll MozMousePixelScroll mousewheel wheel', this.scrolling);

			$chapters = self.dropdown.html();
			this.pager.find('ul').append($chapters);

			if(window.location.hash){
				this.gotoChapter(window.location.hash.substring(1));
			}else{
				$('.special-reports-chapter').first().addClass('active');
				this.pager.find('li:first-child').addClass('active');
			}
			//set up banners
			//banner clone
			self.chapters.each(function(){
				$sect = $(this).find('.featured-banner');
				$bg = $sect.css('background-image');
				if($bg != "none") {
					$sect.addClass('scaler-container');
					if(!$sect.find('.scaler').length){
						$sect.append( '<div class="scaler" style="background-image:' + encodeURI($bg).replace(/%22/g, "'") + '"></div>');
					}
				}
			});

			this.nextBtn.on('click', this.nextSlide);
			$('.campaign-slide-ctrl .last-slide').on('click', this.prevSlide);

			$('.special-reports-dropdown a, .pager a').on('click', function(e){
				e.preventDefault();
				$loc = $(this).attr('href');
				self.jumpTo($(this).parent().index())
			})

			$('.cta-buttons a').on('click', function(e){
				if(e.currentTarget.target !== '_blank') {
					e.preventDefault();
					self.gotoChapter($(this).attr('href').substring(1));
				}
			});

			$(document).on('keydown', function(e) {
				if (e.keyCode == '38') { // up
		        self.prevSlide();
			    }
			    else if (e.keyCode == '40') { // down
		        self.nextSlide();
			    }
			})

			this.pager.addClass('loaded');
		}
	},
	gotoChapter : function($chapter){
		$('.anchor--chapter').each(function(i){
				if($(this).attr('id') == $chapter){
					self.jumpTo(i);
				}
		});
	},
	renderNavAsChapter : function(direction) {
		if(!this.header.hasClass('header-tiles') || window.innerWidth < 1025) return;

		var index = direction == 'next' ? 0 : 1;
		var animation = direction == 'next' ? '100vh' : '-100vh';
		var header = this.header;

		if(self.currSlide == index) {
			// not sure why we need this timeout here...
			// would like to refactor this
			setTimeout(function(){
				TweenMax.to(header, 0, { top: animation, onComplete: function() {
					header.addClass('mainnav-open');
					TweenMax.to(header, 0.3, { top: '0', delay: 0 });
					}
				})
			}, 10)

			this.navOpen = true;

			// make sure not to skip slide
			setTimeout(function() { if(direction == 'next') { self.jumpTo(0) } else { self.jumpTo(1) } }, 350)
		} else {
			this.header.removeClass('mainnav-open')
			this.navOpen = false;
		}
	},
	scrolling : function(e){
		$dir = (e.originalEvent.wheelDelta);
		if (e.type == 'DOMMouseScroll') {
			$dir = e.originalEvent.detail;
		}

      if(!$('.enable-scroll').length){
      	e.preventDefault()
	      e.stopPropagation();

	      if(self.lethargy.check(e) !== false) {
	        // Do something with the scroll event
	        if(!self.scrolled){
	        	if($dir < 0){
							self.nextSlide();
							self.isScrolling = true;
						}
					else if($dir > 0){
						self.prevSlide();
						self.isScrolling = true;
					}
		     }
        self.scrolled = true;
		   }
		   else{
		   	self.scrolled = false;
		   }
		}
		else{
			if($(window).scrollTop() == 0 && $dir > 0){
				$('.enable-scroll').removeClass('enable-scroll');
			}
		}
	},
	hideSlide : function($el){
		$el.removeClass('active');
		$el.find('.triggered').removeClass('triggered');
	},
	showSlide : function($el){
		$el.removeClass('visited').addClass('active').find('.triggered').removeClass('triggered');

		setTimeout(function(){
				$el.find('.post-module, .post-article, .title, .subtitle, .stream-module').addClass('triggered');
			}, 500);
	},
	checkLast : function(){
		if(self.currSlide < self.chapters.length - 1){
			$(window).scrollTop(0);
			self.body.removeClass('enable-scroll');
			this.nextBtn.removeClass('fadeout');
		}
		else{

			this.nextBtn.addClass('fadeout');
			var $lastSlidePause = setTimeout(function(){
				self.body.addClass('enable-scroll');
			}, 500);
		}
	},
	nextSlide : function(){
		if(self.currSlide < self.chapters.length - 1){
			if(!self.navOpen) {
				self.renderNavAsChapter('next')
			} else {
				self.header.removeClass('mainnav-open')
				self.navOpen = false;
			}
			self.jumpTo(self.currSlide + 1);
		}
	},
	prevSlide: function(){
		if(self.currSlide > 0){
			if(!self.navOpen) {
				self.renderNavAsChapter('prev')
			} else {
				self.header.removeClass('mainnav-open')
				self.navOpen = false;
			}
			self.jumpTo(self.currSlide - 1);
		}
	},
	jumpTo: function($index){
		$th = $(this);
		$ht = $(window).height();

		$('.page.active').removeClass('active');
		$th.removeClass('visited').addClass('active');

		self.updateRadialNavChapter($index)

		if(self.currSlide < $index){
			for($i=0; $i < $index ; $i++){
				self.chapters.eq($i)
				.addClass('visited');
			}

			self.hideSlide($('.special-reports-chapter.active'));
			self.showSlide(self.chapters.eq($index));

		}
		else if(self.currSlide > $index){
			self.showSlide(self.chapters.eq($index));
			$lastSlide = self.currSlide;
			window.setTimeout(function(){

				self.chapters.eq($lastSlide).removeClass('active');
				for($i = self.chapters.length - 1; $i > $index ; $i--){
					self.chapters.eq($i)
					.removeClass('visited')
					.find('.triggered').removeClass('triggered');
				}

			}, 300);

		}

		self.navUpdate($index);

		self.pager.find('li.active').removeClass('active');
		self.pager.find('li').eq($index).addClass('active');

		self.currSlide = $index;

		self.checkLast();

		gaPageview(location.pathname + location.hash);
	},

	navUpdate : function($index){
		var index = $index - 1;
		var hash
		if (index < 0) {
			hash = ""
		} else {
			$anchorLink = self.anchors.eq(index);
			hash = $anchorLink.attr('href');
		}
		location.hash = hash;
		self.dropdown.find('.anchor-link.active').removeClass('active');
		$anchorLink.addClass('active');
		self.dropdownCurrent.text($anchorLink.data('chapter'));
	},

	updateRadialNavChapter : function(index) {
		if (!this.radialNav.length) return;
		var currentChapter = this.radialNav.find('.current-chapter')
		var currentLink = this.link[index]

		if (index == 0 || ($(currentLink) && $(currentLink).hasClass('is-hidden'))) {
			this.radialNav.addClass('is-intro')
		} else {
			this.radialNav.removeClass('is-intro')
		}
		currentChapter.html(index)
	},

	initNav: function() {
		if(this.header.hasClass('header--special')) return;
		var header = this.header;
		this.link.on('click', function(){
			if(header.hasClass('mainnav-open')) header.toggleClass('mainnav-open')
			self.gotoChapter($(this).attr('href').substring(1));
		})
	},

};

(function(window) {

	if($('.special-report-campaign').length){
		$iframe_id = null;
		scrollCtrl.init();

		$('.video-tile-container').each(function() {
			var $tile = $(this)
			VERA.videoTiles($tile)
		})

		// Search for FIPS
		var fips_search = {};
		var fuseOptions = {
				threshold: .35,
				keys: [
					{name: 'county', weight: 0.5},
					{name: 'state', weight: 0.4},
					{name: 'CZLabel'},
					{name: 'alternates', weight: 0.4}
				]
			};

		var countyLookup;
		function initSearch(lookupUrl,fuseInstance) {
			$.getJSON({
				url: lookupUrl
			})
			.done(function(response) {
				countyLookup = response
				fips_search[fuseInstance] = new Fuse(response,fuseOptions);

			})
			.fail(function(response) {
				console.warn(response);
			})
			;
		}

		initSearch('https://www.vera.org/dist/data/county_lookup.json', 'county');
		VERA.beacon = new Beacon({
			gmapsapikey: 'AIzaSyCUEbplmckN40d3iGssxm7TX4bjW5vZ3fs',
			onGeocode: function(result){
				var county = null;
				var state = null;
				//forEach
				result.address_components.forEach(function(piece) {
					if (piece.types.indexOf("administrative_area_level_2") !== -1) {
						county = piece.long_name;
					} else if (piece.types.indexOf("administrative_area_level_1") !== -1) {
						state = piece.short_name;
					}
				});
				// counties
				var nycounties = ['New York County','Kings County','Queens County','Dutchess County','Bronx County'];
				if (nycounties.indexOf(county) !== -1) {
					county = 'New York City';
				}
				//update trends URL
				var fips = _.filter(countyLookup, {county: county, state: state})[0].fips

				if (!fips) {
					fips = fips_search['county'].search(county + " " + state).slice(0,1)[0].fips;
				}
				$link = 'https://trends.vera.org/incarceration-rates?data=pretrial&fips=' + fips;
				// each button
				$('a.btn').each(function(){
					$th = $(this);

					if($th.attr('href') !== undefined && $th.attr('href').indexOf('trends.vera.org') > -1){
						$th.attr('href', $link);
					}
				});
			}, // end onGeocode
		}); // end beacon
		window.VERA = VERA;
		window.addEventListener("locationUpdated", function() {
			console.log(VERA.beacon);
		});
		VERA.beacon.getLocation();
	}
})(window);


window.addEventListener("load", function() {
	var $vimeocovers = $('.video-player-cover.vimeo');
	$vimeocovers.on("click", function() {
		playVimeo(this);
	});
	$('.video-outer').addClass('loaded');
});

function playVimeo(cover) {

	$(cover).fadeOut();
	$player = $(cover).parent();

	$('.special-reports-landing').css({transform: "translateY(0)", "margin-bottom": "60px"});
		var player = $player.find('.iframe_target');
	 	player.html(player.attr('data-embed'));
}

function initYoutubeScripts() {
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
