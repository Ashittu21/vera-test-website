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


!function(A,u){"object"==typeof exports&&"undefined"!=typeof module?module.exports=u():"function"==typeof define&&define.amd?define(u):(A=A||self).anchorme=u()}(this,function(){"use strict";var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function A(A){return A&&A.__esModule&&Object.prototype.hasOwnProperty.call(A,"default")?A.default:A}function u(A,u){return A(u={exports:{}},u.exports),u.exports}var N=u(function(A,u){Object.defineProperty(u,"__esModule",{value:!0}),u.TLDs="(AAA|AARP|ABARTH|ABB|ABBOTT|ABBVIE|ABC|ABLE|ABOGADO|ABUDHABI|AC|ACADEMY|ACCENTURE|ACCOUNTANT|ACCOUNTANTS|ACO|ACTOR|AD|ADAC|ADS|ADULT|AE|AEG|AERO|AETNA|AF|AFAMILYCOMPANY|AFL|AFRICA|AG|AGAKHAN|AGENCY|AI|AIG|AIGO|AIRBUS|AIRFORCE|AIRTEL|AKDN|AL|ALFAROMEO|ALIBABA|ALIPAY|ALLFINANZ|ALLSTATE|ALLY|ALSACE|ALSTOM|AM|AMERICANEXPRESS|AMERICANFAMILY|AMEX|AMFAM|AMICA|AMSTERDAM|ANALYTICS|ANDROID|ANQUAN|ANZ|AO|AOL|APARTMENTS|APP|APPLE|AQ|AQUARELLE|AR|ARAB|ARAMCO|ARCHI|ARMY|ARPA|ART|ARTE|AS|ASDA|ASIA|ASSOCIATES|AT|ATHLETA|ATTORNEY|AU|AUCTION|AUDI|AUDIBLE|AUDIO|AUSPOST|AUTHOR|AUTO|AUTOS|AVIANCA|AW|AWS|AX|AXA|AZ|AZURE|BA|BABY|BAIDU|BANAMEX|BANANAREPUBLIC|BAND|BANK|BAR|BARCELONA|BARCLAYCARD|BARCLAYS|BAREFOOT|BARGAINS|BASEBALL|BASKETBALL|BAUHAUS|BAYERN|BB|BBC|BBT|BBVA|BCG|BCN|BD|BE|BEATS|BEAUTY|BEER|BENTLEY|BERLIN|BEST|BESTBUY|BET|BF|BG|BH|BHARTI|BI|BIBLE|BID|BIKE|BING|BINGO|BIO|BIZ|BJ|BLACK|BLACKFRIDAY|BLOCKBUSTER|BLOG|BLOOMBERG|BLUE|BM|BMS|BMW|BN|BNPPARIBAS|BO|BOATS|BOEHRINGER|BOFA|BOM|BOND|BOO|BOOK|BOOKING|BOSCH|BOSTIK|BOSTON|BOT|BOUTIQUE|BOX|BR|BRADESCO|BRIDGESTONE|BROADWAY|BROKER|BROTHER|BRUSSELS|BS|BT|BUDAPEST|BUGATTI|BUILD|BUILDERS|BUSINESS|BUY|BUZZ|BV|BW|BY|BZ|BZH|CA|CAB|CAFE|CAL|CALL|CALVINKLEIN|CAM|CAMERA|CAMP|CANCERRESEARCH|CANON|CAPETOWN|CAPITAL|CAPITALONE|CAR|CARAVAN|CARDS|CARE|CAREER|CAREERS|CARS|CASA|CASE|CASEIH|CASH|CASINO|CAT|CATERING|CATHOLIC|CBA|CBN|CBRE|CBS|CC|CD|CEB|CENTER|CEO|CERN|CF|CFA|CFD|CG|CH|CHANEL|CHANNEL|CHARITY|CHASE|CHAT|CHEAP|CHINTAI|CHRISTMAS|CHROME|CHURCH|CI|CIPRIANI|CIRCLE|CISCO|CITADEL|CITI|CITIC|CITY|CITYEATS|CK|CL|CLAIMS|CLEANING|CLICK|CLINIC|CLINIQUE|CLOTHING|CLOUD|CLUB|CLUBMED|CM|CN|CO|COACH|CODES|COFFEE|COLLEGE|COLOGNE|COM|COMCAST|COMMBANK|COMMUNITY|COMPANY|COMPARE|COMPUTER|COMSEC|CONDOS|CONSTRUCTION|CONSULTING|CONTACT|CONTRACTORS|COOKING|COOKINGCHANNEL|COOL|COOP|CORSICA|COUNTRY|COUPON|COUPONS|COURSES|CPA|CR|CREDIT|CREDITCARD|CREDITUNION|CRICKET|CROWN|CRS|CRUISE|CRUISES|CSC|CU|CUISINELLA|CV|CW|CX|CY|CYMRU|CYOU|CZ|DABUR|DAD|DANCE|DATA|DATE|DATING|DATSUN|DAY|DCLK|DDS|DE|DEAL|DEALER|DEALS|DEGREE|DELIVERY|DELL|DELOITTE|DELTA|DEMOCRAT|DENTAL|DENTIST|DESI|DESIGN|DEV|DHL|DIAMONDS|DIET|DIGITAL|DIRECT|DIRECTORY|DISCOUNT|DISCOVER|DISH|DIY|DJ|DK|DM|DNP|DO|DOCS|DOCTOR|DOG|DOMAINS|DOT|DOWNLOAD|DRIVE|DTV|DUBAI|DUCK|DUNLOP|DUPONT|DURBAN|DVAG|DVR|DZ|EARTH|EAT|EC|ECO|EDEKA|EDU|EDUCATION|EE|EG|EMAIL|EMERCK|ENERGY|ENGINEER|ENGINEERING|ENTERPRISES|EPSON|EQUIPMENT|ER|ERICSSON|ERNI|ES|ESQ|ESTATE|ESURANCE|ET|ETISALAT|EU|EUROVISION|EUS|EVENTS|EXCHANGE|EXPERT|EXPOSED|EXPRESS|EXTRASPACE|FAGE|FAIL|FAIRWINDS|FAITH|FAMILY|FAN|FANS|FARM|FARMERS|FASHION|FAST|FEDEX|FEEDBACK|FERRARI|FERRERO|FI|FIAT|FIDELITY|FIDO|FILM|FINAL|FINANCE|FINANCIAL|FIRE|FIRESTONE|FIRMDALE|FISH|FISHING|FIT|FITNESS|FJ|FK|FLICKR|FLIGHTS|FLIR|FLORIST|FLOWERS|FLY|FM|FO|FOO|FOOD|FOODNETWORK|FOOTBALL|FORD|FOREX|FORSALE|FORUM|FOUNDATION|FOX|FR|FREE|FRESENIUS|FRL|FROGANS|FRONTDOOR|FRONTIER|FTR|FUJITSU|FUJIXEROX|FUN|FUND|FURNITURE|FUTBOL|FYI|GA|GAL|GALLERY|GALLO|GALLUP|GAME|GAMES|GAP|GARDEN|GAY|GB|GBIZ|GD|GDN|GE|GEA|GENT|GENTING|GEORGE|GF|GG|GGEE|GH|GI|GIFT|GIFTS|GIVES|GIVING|GL|GLADE|GLASS|GLE|GLOBAL|GLOBO|GM|GMAIL|GMBH|GMO|GMX|GN|GODADDY|GOLD|GOLDPOINT|GOLF|GOO|GOODYEAR|GOOG|GOOGLE|GOP|GOT|GOV|GP|GQ|GR|GRAINGER|GRAPHICS|GRATIS|GREEN|GRIPE|GROCERY|GROUP|GS|GT|GU|GUARDIAN|GUCCI|GUGE|GUIDE|GUITARS|GURU|GW|GY|HAIR|HAMBURG|HANGOUT|HAUS|HBO|HDFC|HDFCBANK|HEALTH|HEALTHCARE|HELP|HELSINKI|HERE|HERMES|HGTV|HIPHOP|HISAMITSU|HITACHI|HIV|HK|HKT|HM|HN|HOCKEY|HOLDINGS|HOLIDAY|HOMEDEPOT|HOMEGOODS|HOMES|HOMESENSE|HONDA|HORSE|HOSPITAL|HOST|HOSTING|HOT|HOTELES|HOTELS|HOTMAIL|HOUSE|HOW|HR|HSBC|HT|HU|HUGHES|HYATT|HYUNDAI|IBM|ICBC|ICE|ICU|ID|IE|IEEE|IFM|IKANO|IL|IM|IMAMAT|IMDB|IMMO|IMMOBILIEN|IN|INC|INDUSTRIES|INFINITI|INFO|ING|INK|INSTITUTE|INSURANCE|INSURE|INT|INTEL|INTERNATIONAL|INTUIT|INVESTMENTS|IO|IPIRANGA|IQ|IR|IRISH|IS|ISMAILI|IST|ISTANBUL|IT|ITAU|ITV|IVECO|JAGUAR|JAVA|JCB|JCP|JE|JEEP|JETZT|JEWELRY|JIO|JLL|JM|JMP|JNJ|JO|JOBS|JOBURG|JOT|JOY|JP|JPMORGAN|JPRS|JUEGOS|JUNIPER|KAUFEN|KDDI|KE|KERRYHOTELS|KERRYLOGISTICS|KERRYPROPERTIES|KFH|KG|KH|KI|KIA|KIM|KINDER|KINDLE|KITCHEN|KIWI|KM|KN|KOELN|KOMATSU|KOSHER|KP|KPMG|KPN|KR|KRD|KRED|KUOKGROUP|KW|KY|KYOTO|KZ|LA|LACAIXA|LAMBORGHINI|LAMER|LANCASTER|LANCIA|LAND|LANDROVER|LANXESS|LASALLE|LAT|LATINO|LATROBE|LAW|LAWYER|LB|LC|LDS|LEASE|LECLERC|LEFRAK|LEGAL|LEGO|LEXUS|LGBT|LI|LIDL|LIFE|LIFEINSURANCE|LIFESTYLE|LIGHTING|LIKE|LILLY|LIMITED|LIMO|LINCOLN|LINDE|LINK|LIPSY|LIVE|LIVING|LIXIL|LK|LLC|LLP|LOAN|LOANS|LOCKER|LOCUS|LOFT|LOL|LONDON|LOTTE|LOTTO|LOVE|LPL|LPLFINANCIAL|LR|LS|LT|LTD|LTDA|LU|LUNDBECK|LUPIN|LUXE|LUXURY|LV|LY|MA|MACYS|MADRID|MAIF|MAISON|MAKEUP|MAN|MANAGEMENT|MANGO|MAP|MARKET|MARKETING|MARKETS|MARRIOTT|MARSHALLS|MASERATI|MATTEL|MBA|MC|MCKINSEY|MD|ME|MED|MEDIA|MEET|MELBOURNE|MEME|MEMORIAL|MEN|MENU|MERCKMSD|METLIFE|MG|MH|MIAMI|MICROSOFT|MIL|MINI|MINT|MIT|MITSUBISHI|MK|ML|MLB|MLS|MM|MMA|MN|MO|MOBI|MOBILE|MODA|MOE|MOI|MOM|MONASH|MONEY|MONSTER|MORMON|MORTGAGE|MOSCOW|MOTO|MOTORCYCLES|MOV|MOVIE|MP|MQ|MR|MS|MSD|MT|MTN|MTR|MU|MUSEUM|MUTUAL|MV|MW|MX|MY|MZ|NA|NAB|NAGOYA|NAME|NATIONWIDE|NATURA|NAVY|NBA|NC|NE|NEC|NET|NETBANK|NETFLIX|NETWORK|NEUSTAR|NEW|NEWHOLLAND|NEWS|NEXT|NEXTDIRECT|NEXUS|NF|NFL|NG|NGO|NHK|NI|NICO|NIKE|NIKON|NINJA|NISSAN|NISSAY|NL|NO|NOKIA|NORTHWESTERNMUTUAL|NORTON|NOW|NOWRUZ|NOWTV|NP|NR|NRA|NRW|NTT|NU|NYC|NZ|OBI|OBSERVER|OFF|OFFICE|OKINAWA|OLAYAN|OLAYANGROUP|OLDNAVY|OLLO|OM|OMEGA|ONE|ONG|ONL|ONLINE|ONYOURSIDE|OOO|OPEN|ORACLE|ORANGE|ORG|ORGANIC|ORIGINS|OSAKA|OTSUKA|OTT|OVH|PA|PAGE|PANASONIC|PARIS|PARS|PARTNERS|PARTS|PARTY|PASSAGENS|PAY|PCCW|PE|PET|PF|PFIZER|PG|PH|PHARMACY|PHD|PHILIPS|PHONE|PHOTO|PHOTOGRAPHY|PHOTOS|PHYSIO|PICS|PICTET|PICTURES|PID|PIN|PING|PINK|PIONEER|PIZZA|PK|PL|PLACE|PLAY|PLAYSTATION|PLUMBING|PLUS|PM|PN|PNC|POHL|POKER|POLITIE|PORN|POST|PR|PRAMERICA|PRAXI|PRESS|PRIME|PRO|PROD|PRODUCTIONS|PROF|PROGRESSIVE|PROMO|PROPERTIES|PROPERTY|PROTECTION|PRU|PRUDENTIAL|PS|PT|PUB|PW|PWC|PY|QA|QPON|QUEBEC|QUEST|QVC|RACING|RADIO|RAID|RE|READ|REALESTATE|REALTOR|REALTY|RECIPES|RED|REDSTONE|REDUMBRELLA|REHAB|REISE|REISEN|REIT|RELIANCE|REN|RENT|RENTALS|REPAIR|REPORT|REPUBLICAN|REST|RESTAURANT|REVIEW|REVIEWS|REXROTH|RICH|RICHARDLI|RICOH|RIGHTATHOME|RIL|RIO|RIP|RMIT|RO|ROCHER|ROCKS|RODEO|ROGERS|ROOM|RS|RSVP|RU|RUGBY|RUHR|RUN|RW|RWE|RYUKYU|SA|SAARLAND|SAFE|SAFETY|SAKURA|SALE|SALON|SAMSCLUB|SAMSUNG|SANDVIK|SANDVIKCOROMANT|SANOFI|SAP|SARL|SAS|SAVE|SAXO|SB|SBI|SBS|SC|SCA|SCB|SCHAEFFLER|SCHMIDT|SCHOLARSHIPS|SCHOOL|SCHULE|SCHWARZ|SCIENCE|SCJOHNSON|SCOR|SCOT|SD|SE|SEARCH|SEAT|SECURE|SECURITY|SEEK|SELECT|SENER|SERVICES|SES|SEVEN|SEW|SEX|SEXY|SFR|SG|SH|SHANGRILA|SHARP|SHAW|SHELL|SHIA|SHIKSHA|SHOES|SHOP|SHOPPING|SHOUJI|SHOW|SHOWTIME|SHRIRAM|SI|SILK|SINA|SINGLES|SITE|SJ|SK|SKI|SKIN|SKY|SKYPE|SL|SLING|SM|SMART|SMILE|SN|SNCF|SO|SOCCER|SOCIAL|SOFTBANK|SOFTWARE|SOHU|SOLAR|SOLUTIONS|SONG|SONY|SOY|SPACE|SPORT|SPOT|SPREADBETTING|SR|SRL|SS|ST|STADA|STAPLES|STAR|STATEBANK|STATEFARM|STC|STCGROUP|STOCKHOLM|STORAGE|STORE|STREAM|STUDIO|STUDY|STYLE|SU|SUCKS|SUPPLIES|SUPPLY|SUPPORT|SURF|SURGERY|SUZUKI|SV|SWATCH|SWIFTCOVER|SWISS|SX|SY|SYDNEY|SYMANTEC|SYSTEMS|SZ|TAB|TAIPEI|TALK|TAOBAO|TARGET|TATAMOTORS|TATAR|TATTOO|TAX|TAXI|TC|TCI|TD|TDK|TEAM|TECH|TECHNOLOGY|TEL|TEMASEK|TENNIS|TEVA|TF|TG|TH|THD|THEATER|THEATRE|TIAA|TICKETS|TIENDA|TIFFANY|TIPS|TIRES|TIROL|TJ|TJMAXX|TJX|TK|TKMAXX|TL|TM|TMALL|TN|TO|TODAY|TOKYO|TOOLS|TOP|TORAY|TOSHIBA|TOTAL|TOURS|TOWN|TOYOTA|TOYS|TR|TRADE|TRADING|TRAINING|TRAVEL|TRAVELCHANNEL|TRAVELERS|TRAVELERSINSURANCE|TRUST|TRV|TT|TUBE|TUI|TUNES|TUSHU|TV|TVS|TW|TZ|UA|UBANK|UBS|UG|UK|UNICOM|UNIVERSITY|UNO|UOL|UPS|US|UY|UZ|VA|VACATIONS|VANA|VANGUARD|VC|VE|VEGAS|VENTURES|VERISIGN|VERSICHERUNG|VET|VG|VI|VIAJES|VIDEO|VIG|VIKING|VILLAS|VIN|VIP|VIRGIN|VISA|VISION|VIVA|VIVO|VLAANDEREN|VN|VODKA|VOLKSWAGEN|VOLVO|VOTE|VOTING|VOTO|VOYAGE|VU|VUELOS|WALES|WALMART|WALTER|WANG|WANGGOU|WATCH|WATCHES|WEATHER|WEATHERCHANNEL|WEBCAM|WEBER|WEBSITE|WED|WEDDING|WEIBO|WEIR|WF|WHOSWHO|WIEN|WIKI|WILLIAMHILL|WIN|WINDOWS|WINE|WINNERS|WME|WOLTERSKLUWER|WOODSIDE|WORK|WORKS|WORLD|WOW|WS|WTC|WTF|XBOX|XEROX|XFINITY|XIHUAN|XIN|XN--11B4C3D|XN--1CK2E1B|XN--1QQW23A|XN--2SCRJ9C|XN--30RR7Y|XN--3BST00M|XN--3DS443G|XN--3E0B707E|XN--3HCRJ9C|XN--3OQ18VL8PN36A|XN--3PXU8K|XN--42C2D9A|XN--45BR5CYL|XN--45BRJ9C|XN--45Q11C|XN--4GBRIM|XN--54B7FTA0CC|XN--55QW42G|XN--55QX5D|XN--5SU34J936BGSG|XN--5TZM5G|XN--6FRZ82G|XN--6QQ986B3XL|XN--80ADXHKS|XN--80AO21A|XN--80AQECDR1A|XN--80ASEHDB|XN--80ASWG|XN--8Y0A063A|XN--90A3AC|XN--90AE|XN--90AIS|XN--9DBQ2A|XN--9ET52U|XN--9KRT00A|XN--B4W605FERD|XN--BCK1B9A5DRE4C|XN--C1AVG|XN--C2BR7G|XN--CCK2B3B|XN--CG4BKI|XN--CLCHC0EA0B2G2A9GCD|XN--CZR694B|XN--CZRS0T|XN--CZRU2D|XN--D1ACJ3B|XN--D1ALF|XN--E1A4C|XN--ECKVDTC9D|XN--EFVY88H|XN--FCT429K|XN--FHBEI|XN--FIQ228C5HS|XN--FIQ64B|XN--FIQS8S|XN--FIQZ9S|XN--FJQ720A|XN--FLW351E|XN--FPCRJ9C3D|XN--FZC2C9E2C|XN--FZYS8D69UVGM|XN--G2XX48C|XN--GCKR3F0F|XN--GECRJ9C|XN--GK3AT1E|XN--H2BREG3EVE|XN--H2BRJ9C|XN--H2BRJ9C8C|XN--HXT814E|XN--I1B6B1A6A2E|XN--IMR513N|XN--IO0A7I|XN--J1AEF|XN--J1AMH|XN--J6W193G|XN--JLQ61U9W7B|XN--JVR189M|XN--KCRX77D1X4A|XN--KPRW13D|XN--KPRY57D|XN--KPU716F|XN--KPUT3I|XN--L1ACC|XN--LGBBAT1AD8J|XN--MGB9AWBF|XN--MGBA3A3EJT|XN--MGBA3A4F16A|XN--MGBA7C0BBN0A|XN--MGBAAKC7DVF|XN--MGBAAM7A8H|XN--MGBAB2BD|XN--MGBAH1A3HJKRD|XN--MGBAI9AZGQP6J|XN--MGBAYH7GPA|XN--MGBBH1A|XN--MGBBH1A71E|XN--MGBC0A9AZCG|XN--MGBCA7DZDO|XN--MGBCPQ6GPA1A|XN--MGBERP4A5D4AR|XN--MGBGU82A|XN--MGBI4ECEXP|XN--MGBPL2FH|XN--MGBT3DHD|XN--MGBTX2B|XN--MGBX4CD0AB|XN--MIX891F|XN--MK1BU44C|XN--MXTQ1M|XN--NGBC5AZD|XN--NGBE9E0A|XN--NGBRX|XN--NODE|XN--NQV7F|XN--NQV7FS00EMA|XN--NYQY26A|XN--O3CW4H|XN--OGBPF8FL|XN--OTU796D|XN--P1ACF|XN--P1AI|XN--PBT977C|XN--PGBS0DH|XN--PSSY2U|XN--Q7CE6A|XN--Q9JYB4C|XN--QCKA1PMC|XN--QXA6A|XN--QXAM|XN--RHQV96G|XN--ROVU88B|XN--RVC1E0AM3E|XN--S9BRJ9C|XN--SES554G|XN--T60B56A|XN--TCKWE|XN--TIQ49XQYJ|XN--UNUP4Y|XN--VERMGENSBERATER-CTB|XN--VERMGENSBERATUNG-PWB|XN--VHQUV|XN--VUQ861B|XN--W4R85EL8FHU5DNRA|XN--W4RS40L|XN--WGBH1C|XN--WGBL6A|XN--XHQ521B|XN--XKC2AL3HYE2A|XN--XKC2DL3A5EE0H|XN--Y9A3AQ|XN--YFRO4I67O|XN--YGBI2AMMX|XN--ZFR164B|XXX|XYZ|YACHTS|YAHOO|YAMAXUN|YANDEX|YE|YODOBASHI|YOGA|YOKOHAMA|YOU|YOUTUBE|YT|YUN|ZA|ZAPPOS|ZARA|ZERO|ZIP|ZM|ZONE|ZUERICH|ZW|TEST)"});A(N);N.TLDs;var L=u(function(A,E){Object.defineProperty(E,"__esModule",{value:!0}),E.openingParenthesis="([\"'{",E.closingParenthesis=")]\"'}",E.parenthesis=E.openingParenthesis.split("").map(function(A,u){return""+A+E.closingParenthesis.charAt(u)}),E.htmlAttributes=["src","data","href","cite","formaction","icon","manifest","poster","codebase","background","profile","usemap","itemtype","action","longdesc","classid","archive"],E.nonLatinAlphabetRanges="\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0\\u08A2-\\u08AC\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA697\\uA6A0-\\uA6E5\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA793\\uA7A0-\\uA7AA\\uA7F8-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA80-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC",E.TLDs=N.TLDs});A(L);L.openingParenthesis,L.closingParenthesis,L.parenthesis,L.htmlAttributes,L.nonLatinAlphabetRanges,L.TLDs;var B=u(function(A,u){function S(A,u,E){return"function"==typeof E?E(A,u):E}Object.defineProperty(u,"__esModule",{value:!0}),u.transform=function(A,u){var E="",N=1/0,C={},O=!1;if(u&&u.specialTransform)for(var I=0;I<u.specialTransform.length;I++){var R=u.specialTransform[I];if(R.test.test(A.string))return R.transform(A.string,A)}return u&&u.exclude&&S(A.string,A,u.exclude)?A.string:(u&&u.protocol&&(E=S(A.string,A,u.protocol)),E=A.protocol?"":E||(A.isEmail?"mailto:":A.isFile?"file:///":"http://"),u&&u.truncate&&(N=S(A.string,A,u.truncate)),u&&u.middleTruncation&&(O=S(A.string,A,u.middleTruncation)),u&&u.attributes&&(C=S(A.string,A,u.attributes)),"<a "+Object.keys(C).map(function(A){return!0===C[A]?A:A+'="'+C[A]+'" '}).join(" ")+'href="'+E+A.string+'">'+(A.string.length>N?O?A.string.substring(0,Math.floor(N/2))+"…"+A.string.substring(A.string.length-Math.ceil(N/2),A.string.length):A.string.substring(0,N)+"…":A.string)+"</a>")}});A(B);B.transform;var e=u(function(A,u){Object.defineProperty(u,"__esModule",{value:!0});var E="([a-z0-9]+(-+[a-z0-9]+)*\\.)+("+L.TLDs+")",N="a-zA-Z\\d\\-._~\\!$&*+,;=:@%'\"\\[\\]()",C="((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",O="\\[(([a-f0-9:]+:+)+[a-f0-9]+)\\]",I="(https?:|ftps?:)\\/\\/",R="((("+I+")?("+E+"|"+C+"|("+I+")("+O+"|"+("([a-z0-9]+(-+[a-z0-9]+)*\\.)+([a-z0-9][a-z0-9-]{0,"+(Math.max.apply(t,L.TLDs.split("|").map(function(A){return A.length}))-2)+"}[a-z0-9])")+"))(?!@\\w)(:(\\d{1,5}))?)|(((https?:|ftps?:)\\/\\/)\\S+))",S=R+"((((\\/((["+N+"]+(\\/["+N+L.nonLatinAlphabetRanges+"]*)*))?)?)((\\?(["+N+"\\/?]*))?)((\\#(["+N+"\\/?]*))?))?\\b(((["+N+"\\/"+L.nonLatinAlphabetRanges+"][a-zA-Z\\d\\-_~+=\\/"+L.nonLatinAlphabetRanges+"]+)?))+)";u.email="\\b(mailto:)?([a-z0-9!#$%&'*+=?^_`{|}~-]+(\\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*)@("+E+"|"+C+")\\b",u.url="("+S+")|(\\b"+R+"(((\\/(([a-zA-Z\\d\\-._~\\!$&*+,;=:@%'\"\\[\\]()]+(\\/[a-zA-Z\\d\\-._~\\!$&*+,;=:@%'\"\\[\\]()]*)*))?)?)((\\?([a-zA-Z\\d\\-._~\\!$&*+,;=:@%'\"\\[\\]()\\/?]*))?)((\\#([a-zA-Z\\d\\-._~\\!$&*+,;=:@%'\"\\[\\]()\\/?]*))?))?\\b(([\\/]?))+)",u.file="(file:\\/\\/\\/)([a-z]+:(\\/|\\\\)+)?([\\w.]+([\\/\\\\]?)+)+",u.final="("+u.url+")|("+u.email+")|("+u.file+")",u.finalRegex=new RegExp(u.final,"gi"),u.ipRegex=new RegExp("^("+C+"|"+O+")$","i"),u.emailRegex=new RegExp("^("+u.email+")$","i"),u.fileRegex=new RegExp("^("+u.file+")$","i"),u.urlRegex=new RegExp("^("+u.url+")$","i");var T={isURL:0,isEmail:0,isFile:0,file:{fileName:0,protocol:0},email:{protocol:0,local:0,host:0},url:{ipv4:0,ipv6:0,ipv4Confirmation:0,byProtocol:0,port:0,protocol1:0,protocol2:0,protocol3:0,protocolWithDomain:0,path:0,secondPartOfPath:0,query:0,fragment:0}};u.iidxes=T;for(var B=["file:///some/file/path/filename.pdf","mailto:e+_mail.me@sub.domain.com","http://sub.domain.co.uk:3000/p/a/t/h_(asd)/h?q=abc123#dfdf","http://www.عربي.com","http://127.0.0.1:3000/p/a/t_(asd)/h?q=abc123#dfdf","http://[2a00:1450:4025:401::67]/k/something","a.org/abc/ი_გგ"].join(" "),e=null,D=0;null!==(e=u.finalRegex.exec(B));)0===D&&(T.isFile=e.lastIndexOf(e[0]),T.file.fileName=e.indexOf("filename.pdf"),T.file.protocol=e.indexOf("file:///")),1===D&&(T.isEmail=e.lastIndexOf(e[0]),T.email.protocol=e.indexOf("mailto:"),T.email.local=e.indexOf("e+_mail.me"),T.email.host=e.indexOf("sub.domain.com")),2===D&&(T.isURL=e.lastIndexOf(e[0]),T.url.protocol1=e.indexOf("http://"),T.url.protocolWithDomain=e.indexOf("http://sub.domain.co.uk:3000"),T.url.port=e.indexOf("3000"),T.url.path=e.indexOf("/p/a/t/h_(asd)/h"),T.url.query=e.indexOf("q=abc123"),T.url.fragment=e.indexOf("dfdf")),3===D&&(T.url.byProtocol=e.lastIndexOf("http://www.عربي.com"),T.url.protocol2=e.lastIndexOf("http://")),4===D&&(T.url.ipv4=e.indexOf("127.0.0.1"),T.url.ipv4Confirmation=e.indexOf("0.")),5===D&&(T.url.ipv6=e.indexOf("2a00:1450:4025:401::67"),T.url.protocol3=e.lastIndexOf("http://")),6===D&&(T.url.secondPartOfPath=e.indexOf("გგ")),D++});A(e);e.email,e.url,e.file,e.finalRegex,e.ipRegex,e.emailRegex,e.fileRegex,e.urlRegex,e.iidxes;var D=u(function(A,u){Object.defineProperty(u,"__esModule",{value:!0}),u.checkParenthesis=function(A,u,E,N){return N===u&&(E.split(A).length-E.split(u).length==1||A===u&&E.split(A).length%2==0||void 0)},u.maximumAttrLength=L.htmlAttributes.sort(function(A,u){return u.length-A.length})[0].length,u.isInsideAttribute=function(A){return/\s[a-z0-9-]+=('|")$/i.test(A)||/: ?url\(('|")?$/i.test(A)},u.isInsideAnchorTag=function(A,u,E){for(var N=A.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),C=new RegExp("(?=(<a))(?!([\\s\\S]*)(<\\/a>)("+N+"))[\\s\\S]*?("+N+")(?!\"|')","gi"),O=null;null!==(O=C.exec(u));){if(O.index+O[0].length===E)return!0}return!1}});A(D);D.checkParenthesis,D.maximumAttrLength,D.isInsideAttribute,D.isInsideAnchorTag;return A(u(function(A,u){Object.defineProperty(u,"__esModule",{value:!0});function T(I){for(var R=[],S=null,A=function(){var A=S.index,N=A+S[0].length,C=S[0];if("/"===I.charAt(N)&&(C+=I.charAt(N),N++),-1<L.closingParenthesis.indexOf(I.charAt(N))&&L.parenthesis.forEach(function(A){var u=A.charAt(0),E=A.charAt(1);D.checkParenthesis(u,E,C,I.charAt(N))&&(C+=I.charAt(N),N++)}),-1!==['""',"''","()"].indexOf(I.charAt(A-1)+I.charAt(N))&&D.isInsideAttribute(I.substring(A-D.maximumAttrLength-15,A)))return"continue";if(-1<I.substring(N,I.length).indexOf("</a>")&&-1<I.substring(0,A).indexOf("<a")&&D.isInsideAnchorTag(C,I,N))return"continue";if(S[e.iidxes.isURL]){var u=(S[e.iidxes.url.path]||"")+(S[e.iidxes.url.secondPartOfPath]||"")||void 0,E=S[e.iidxes.url.protocol1]||S[e.iidxes.url.protocol2]||S[e.iidxes.url.protocol3];R.push({start:A,end:N,string:C,isURL:!0,protocol:E,port:S[e.iidxes.url.port],ipv4:S[e.iidxes.url.ipv4Confirmation]?S[e.iidxes.url.ipv4]:void 0,ipv6:S[e.iidxes.url.ipv6],host:S[e.iidxes.url.byProtocol]?void 0:(S[e.iidxes.url.protocolWithDomain]||"").substr((E||"").length),confirmedByProtocol:!!S[e.iidxes.url.byProtocol],path:S[e.iidxes.url.byProtocol]?void 0:u,query:S[e.iidxes.url.query]||void 0,fragment:S[e.iidxes.url.fragment]||void 0})}else if(S[e.iidxes.isFile]){var O=C.substr(8);R.push({start:A,end:N,string:C,isFile:!0,protocol:S[e.iidxes.file.protocol],filename:S[e.iidxes.file.fileName],filePath:O,fileDirectory:O.substr(0,O.length-S[e.iidxes.file.fileName].length)})}else S[e.iidxes.isEmail]?R.push({start:A,end:N,string:C,isEmail:!0,local:S[e.iidxes.email.local],protocol:S[e.iidxes.email.protocol],host:S[e.iidxes.email.host]}):R.push({start:A,end:N,string:C})};null!==(S=e.finalRegex.exec(I));)A();return R}function E(A){var u="string"==typeof A?{input:A,options:void 0,extensions:void 0}:A,E=u.input,N=u.options,C=u.extensions;if(C)for(var O=0;O<C.length;O++){var I=C[O];E=E.replace(I.test,I.transform)}var R=T(E),S="";for(O=0;O<R.length;O++)S=(S||(0===O?E.substring(0,R[O].start):""))+B.transform(R[O],N)+(R[O+1]?E.substring(R[O].end,R[O+1].start):E.substring(R[O].end));return S||E}E.list=function(A){return T(A)},E.validate={ip:function(A){return e.ipRegex.test(A)},email:function(A){return e.emailRegex.test(A)},file:function(A){return e.fileRegex.test(A)},url:function(A){return e.urlRegex.test(A)||e.ipRegex.test(A)}},u.default=E}))});
// Append Polyfill
// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty("append")) {
      return;
    }
    Object.defineProperty(item, "append", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(
            isNode ? argItem : document.createTextNode(String(argItem))
          );
        });

        this.appendChild(docFrag);
      },
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

//Array find polyfill
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, "find", {
    value: function (predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true,
  });
}

//Event IE11 poly
(function () {
  if (typeof window.CustomEvent === "function") return false; //If not IE

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.Event = CustomEvent;
})();

function slugify(string) {
  return string
    .toLowerCase()
    .replace(".", "")
    .replace(",", "")
    .replace(/\s/g, "-");
}

var Site = {
  $body: $("body"),
  $header: $("#Header"),
  $navToggle: $("#HeaderMenuToggle"),
  $search: $("#HeaderSearch"),
  headerHeight: $("#Header").outerHeight(),
  ww: $(window).width(),
  wh: $(window).height(),
  hasTouch: false,
  winScrollTop: 0,

  init: function () {
    Site.touchDetection();
    Site.search();
    Site.scrollTo();
    Site.subNav();
    Site.toggleNav();
    Site.sectionNav.init();
    Site.ourWork();
    Site.footer.init();
    Site.squaresInit();
    HighlightShare();
    Site.loadLazySvg();
    Site.images.fadein();
  },

  initConditionals: function () {
    /*
        if($('.homepage-banner').length) {
            Site.homepage.init();
        }
*/
    //remove background-attachment fixed on ios
    var deviceAgent = navigator.userAgent.toLowerCase();
    if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
      $(".i-parallax").removeClass("parallax");
    }

    if ($(".filter").length) {
      Site.modules.filter.init();
    }

    if ($(".share").length) {
      Site.share.init();
    }

    // $(window).on('load', function() { // new...
    if (
      $(".no-touch .fixed-share").length &&
      ($(".fixed-share").closest(".module-intro__content").length ||
        $(".fixed-share").closest(".module-text__inner").length)
    ) {
      // TODO: check this?
      Site.share.fixedPosScroll();
    }
    // });

    if ($(".module-carousel").length) {
      Site.carousel.init();
    }

    if ($(".quote-carousel").length) {
      Site.carousel.quote();
    }

    if ($(".featured-stream-modules").length) {
      Site.carousel.featuredModules();
    }

    if ($(".post-sidebar__series").length) {
      Site.carousel.sidebar();
    }

    if ($(".scroll-to").length) {
      Site.clickScroll.init();
    }

    if ($(".dropdown-outer").length) {
      Site.fakeDropdown();
    }

    if ($(".trigger-modal").length) {
      Site.modal.init();
    }

    if ($(".module-columns-3up").length) {
      Site.sameHeight.init(".module-columns-3up .col > a");
      Site.sameHeight.init(".module-columns-3up .col > .text-outer");

      /*
            for(var i = 1; i <= 10; i++) {
                Site.sameHeight.init('.module-columns-3up .col li:nth-child(' + i + ')');
            }
*/
    }

    // animate touch-device infographics (not scroll to animate)
    if ($(".touch .infographic").length) {
      Site.infographics.init($(".infographic"));
    }

    if ($(".touch .bar-ltr").length) {
      Site.infographics.barGraph($(".bar-ltr"));
    }

    if ($(".inline-audio-player").length) {
      Site.audio.init();
    }

    if ($(".module-body").length) {
      Site.init404.init();
    }

    if ($("#PopupEmailSignup").length) {
      if (!Site.signup.checkEmailCookie()) {
        Site.signup.init($("#PopupSubscribe"));
        var $neveragain = $("#PopupEmailSignup").find(".never-show-signup");
        $neveragain.on("click", function () {
          Site.signup.setEmailCookie("never");
          Site.signup.closeModal();
        });
        Site.signup.setEmailCookie();
        Site.signup.emailSignup();
      }

      // Site.signup.ajaxEmailSignup();
    }

    if ($("#SidebarSubscribe").length) {
      // Site.homepage.ajaxMailChimpForm($("#SidebarSubscribe"), $("#sidebar-result"));
      Site.signup.init($("#SidebarSubscribe"));
    }

    if ($(".fadein").length) {
      Site.images.fadein();
    }

    if ($(".image-attribution").length) {
      Site.images.resizeAttributions();
      window.addEventListener("resize", function () {
        if (Site.resizeTimer) {
          clearTimeout(Site.resizeTimer);
        }
        Site.resizeTimer = setTimeout(function () {
          Site.images.resizeAttributions();
        }, 100);
      });
    }

    $("img").imagesLoaded(function () {
      Site.images.resizeAttributions();
    });

    if ($(".resource__see-more").length) {
      Site.resourcesToggle.init();
    }

    // if($('.resource-grid').length) {
    //     Site.sameHeight.init('.resource-grid li');
    // }

    Site.initTableNotes();

    new Site.slideout();

    Site.donateModal.init();
  },

  loadLazySvg: function () {
    $("[data-lazy-svg]").each(function () {
      var $this = $(this);
      const classString = this.getAttribute("class");
      $.get($this.attr("data-lazy-svg")).done(function (response) {
        var contents = response.documentElement || response;
        var $svg = $(contents);
        $svg.attr("class", classString);
        $this.after($svg);
        $this.remove();
      });
    });
  },

  audio: {
    /*
        init: function() {
            var $audio = $('#AudioFile'),
                $audioFile = $audio[0],
                $playButton = $('.btn-play'),
                $pauseButton = $('.btn-pause'),
                $elapsed = $('.audio__start'),
                $totalTime = $('.audio__end'),
                $loadingIndicator = $('.audio-loading'),
                $audioMarker = $('.audio__marker'),
                manualSeek = false;

            if(!!document.createElement('audio').canPlayType) {
                if (($audioFile.buffered != undefined) && ($audioFile.buffered.length != 0)) {
                    // $(audio).bind('progress', function() {
                    //     var loaded = parseInt(((audio.buffered.end(0) / audio.duration) * 100), 10);
                    //     loadingIndicator.css({width: loaded + '%'});
                    // });
                }
                else {
                    $loadingIndicator.remove();
                }

                $playButton.on('click', function() {
                    $(this).addClass('hidden');
                    $pauseButton.removeClass('hidden');

                    $audioFile.play();

                    $loadingIndicator.remove(); // not sure bout this

                    $('#AudioPlayer').removeClass('hidden');

                    // jquery ui hack:
                    $('#AudioTrackouter').slider({ value: 0 });

                    $('#AudioTrackOuter').slider({
                        value: 0,
                        step: 0.01,
                        orientation: "horizontal",
                        range: "min",
                        max: $audioFile.duration,
                        animate: true,
                        slide: function() {
                            manualSeek = true;
                        },
                        stop: function(e, ui) {
                            manualSeek = false;
                            $audioFile.currentTime = ui.value;
                        }
                    });

                    var duration = parseInt($audioFile.duration, 10),
                        durationMins = Math.floor(duration/60,10),
                        durationSecs = duration - durationMins*60;

                    $totalTime.text(durationMins + ':' + (durationSecs > 9 ? durationSecs : '0' + durationSecs));
                });

                $pauseButton.on('click', function() {
                    $(this).addClass('hidden');
                    $playButton.removeClass('hidden');
                    $audioFile.pause();
                });

                $audio.bind('timeupdate', function() {
                    var pos = ($audioFile.currentTime / $audioFile.duration) * 100,
                        elapsed = parseInt($audioFile.currentTime, 10),
                        elapsedMins = Math.floor(elapsed/60,10),
                        elapsedSecs = elapsed - elapsedMins*60;

                    $elapsed.text(elapsedMins + ':' + (elapsedSecs > 9 ? elapsedSecs : '0' + elapsedSecs));

                    // new for manual seek (ui slider)
                    if (!manualSeek) {
                        $audioMarker.css({left: pos + '%'});
                        $('.ui-slider-range-min').css('width', pos + '%');
                    }
                });
            }
        },
		*/

    init: function () {
      var $players = $(".inline-audio-player");

      $players.each(function () {
        var $audio = $(this).find(".audio_player"),
          $audioFile = $(this).find(".audio-player"),
          $playButton = $(this).find(".btn-play"),
          $pauseButton = $(this).find(".btn-pause"),
          $elapsed = $(this).find(".audio__start"),
          $totalTime = $(this).find(".audio__end"),
          $loadingIndicator = $(this).find(".audio-loading"),
          $audioMarker = $(this).find(".audio__marker"),
          $trackOuter = $(this).find(".audio__track-outer"),
          manualSeek = false;

        if (!!document.createElement("audio").canPlayType) {
          if (
            $audioFile.buffered != undefined &&
            $audioFile.buffered.length != 0
          ) {
            // $(audio).bind('progress', function() {
            //     var loaded = parseInt(((audio.buffered.end(0) / audio.duration) * 100), 10);
            //     loadingIndicator.css({width: loaded + '%'});
            // });
          } else {
            $loadingIndicator.remove();
          }

          $playButton.on("click", function () {
            $(this).addClass("hidden");
            $pauseButton.removeClass("hidden");
            $audio[0].play();

            $loadingIndicator.remove(); // not sure bout this

            $audioFile.removeClass("hidden");

            // jquery ui hack:
            $trackOuter.slider({ value: 0 });

            $trackOuter.slider({
              value: $audio[0].currentTime,
              step: 0.01,
              orientation: "horizontal",
              range: "min",
              max: $audio[0].duration,
              animate: true,
              slide: function () {
                manualSeek = true;
              },
              stop: function (e, ui) {
                manualSeek = false;
                $audio[0].currentTime = ui.value;
              },
            });

            var duration = parseInt($audio[0].duration, 10),
              durationMins = Math.floor(duration / 60, 10),
              durationSecs = duration - durationMins * 60;

            $totalTime.text(
              durationMins +
                ":" +
                (durationSecs > 9 ? durationSecs : "0" + durationSecs)
            );
          });

          $pauseButton.on("click", function () {
            $(this).addClass("hidden");
            $playButton.removeClass("hidden");
            $audio[0].pause();
          });

          $audio.bind("timeupdate", function () {
            var pos = ($audio[0].currentTime / $audio[0].duration) * 100,
              elapsed = parseInt($audio[0].currentTime, 10),
              elapsedMins = Math.floor(elapsed / 60, 10),
              elapsedSecs = elapsed - elapsedMins * 60;

            $elapsed.text(
              elapsedMins +
                ":" +
                (elapsedSecs > 9 ? elapsedSecs : "0" + elapsedSecs)
            );

            // new for manual seek (ui slider)
            if (!manualSeek) {
              $audioMarker.css({ left: pos + "%" });
              $(".ui-slider-range-min").css("width", pos + "%");
            }
          });
        }
      });
    },
  },

  carousel: {
    init: function () {
      $(".module-carousel").each(function () {
        var $this = $(this),
          timeoutResize;

        var options = {
          adaptiveHeight: true,
        };

        var transition = this.dataset.transition;
        if (transition === "fade") {
          options.fade = true;
        }
        var autoplay = this.dataset.autoplay == "true";
        if (autoplay) {
          options.autoplay = true;
        }
        var arrows = this.dataset.arrows == "true";
        options.arrows = arrows;

        $this.slick(options);
      });
    },

    featuredModules: function () {
      $(".featured-stream-modules .col-outer").slick({
        dots: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 700,
            settings: "unslick",
          },
        ],
      });
    },

    quote: function () {
      var carouselResize = function () {
        $(".module-quote-carousel, .slide").height("auto");
        $(".slide").height($(".module-quote-carousel").outerHeight());
      };

      $(".quote-carousel")
        .on("init", function () {
          if (
            !$(".module-quote-carousel").hasClass(
              "module-quote-carousel--facts"
            )
          ) {
            carouselResize();
          }
        })
        .slick();

      if (
        !$(".module-quote-carousel").hasClass("module-quote-carousel--facts")
      ) {
        $(window).on("resize", carouselResize);
      }
    },

    sidebar: function () {
      $(".post-sidebar__series ul").slick({
        dots: false,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 768,
            settings: "unslick",
          },
        ],
      });
    },
  },

  clickScroll: {
    init: function () {
      $(".scroll-to").on("click", function (e) {
        e.preventDefault();

        var $scrollTarget = $("#" + $(this).attr("data-scroll-to"));

        $("html, body").animate(
          {
            scrollTop: $scrollTarget.offset().top - Site.$header.outerHeight(),
          },
          500
        );
      });
    },
  },

  fakeDropdown: function () {
    $(".dropdown-active").on("click", function (e) {
      e.preventDefault();

      if ($(this).closest(".dropdown-outer").length) {
        $(this).closest(".dropdown-outer").toggleClass("open");
      }
    });

    // subnav close event...
    $(".no-touch").on("click", function (e) {
      var clickTarget = $(e.target);
      if (
        clickTarget &&
        !clickTarget.closest(".open").length &&
        !clickTarget.hasClass("open") &&
        !clickTarget.closest(".open").length &&
        !clickTarget.hasClass("open")
      ) {
        $(".dropdown-outer").removeClass("open");
      }
    });
  },

  footer: {
    init: function () {
      //Site.homepage.ajaxMailChimpForm($("#FooterSubscribe"), $("#footer-result"));
      Site.signup.init($("#FooterSubscribe"));
    },
  },

  signup: {
    init: function ($form) {
      var inputs = {};
      inputs.email = $form.find(".email_input")[0];
      inputs.fname = $form.find(".fname_input")[0];
      inputs.lname = $form.find(".lname_input")[0];

      var submit = $form.find(".newsletter_submit");

      _.forEach(inputs, function (value, key) {
        $(value).on("keyup", function (e) {
          var execute = false;
          if (typeof e.key !== "undefined") {
            if (["Enter"].includes(e.key)) {
              execute = true;
            }
          } else if (typeof e.keyIdentifier !== "undefined") {
            if (["Enter"].includes(e.keyIdentifier)) {
              execute = true;
            }
          } else if (typeof e.keyCode !== "undefined") {
            if (["13"].includes(e.keyCode)) {
              execute = true;
            }
          }

          if (execute) {
            submit.click();
          }

          if ($(this).val()) {
            $(this).addClass("filled");
          } else {
            $(this).removeClass("filled");
          }
        });
      });

      submit.on("click", function (e) {
        e.preventDefault();
        Site.signup.validate.all(inputs, $form);
      });
    },

    validate: {
      all: function (inputs, $form) {
        var results = [];

        results.push(Site.signup.validate.email(inputs.email));
        results.push(Site.signup.validate.text(inputs.fname));
        results.push(Site.signup.validate.text(inputs.lname));
        if (results.every(isTrue)) {
          Site.signup.ajaxSubmit($form);
        }

        function isTrue(e, i, a) {
          return e === true;
        }
      },

      email: function (input) {
        var email_re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var result = email_re.test(input.value);
        if (!result) {
          this.error(input);
        }
        return result;
      },

      text: function (input) {
        var result = input.value && input.value != "";
        if (!result) {
          this.error(input);
        }
        return result;
      },

      error: function (input) {
        input.classList.add("error");
        $(input).one("keydown", function (e) {
          $(this).removeClass("error");
        });
      },
    },

    ajaxSubmit: function ($form) {
      $form.addClass("loading");

      var $resultElement = $form.find(".newsletter_subscribe_result");

      var request = $.ajax({
        type: "GET",
        url: $form.attr("action"),
        data: $form.serialize(),
        cache: false,
        dataType: "jsonp",
        jsonp: "c", // trigger MailChimp to return a JSONP response
        contentType: "application/json; charset=utf-8",

        error: function (error) {
          console.log(error);
          // According to jquery docs, this is never called for cross-domain JSONP requests
          $form.removeClass("loading");
        },

        success: function (data) {
          $form.parent().find(".js-remove").hide();
          Site.signup.setEmailCookie("never");

          var message;

          if (data.result != "success") {
            message =
              data.msg ||
              "<p>Sorry. Unable to subscribe. Please try again later.<p>";

            if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
              message = "<p>Looks like you're already subscribed.</p>";
            }
            $resultElement.html(message + VERA.popupEmailThankYou);
          } else {
            ga("send", "event", "form", "submit", "email subscribe");
            $resultElement.html(
              VERA.popupEmailThankYou ||
                "Thank you! Please check your email for a confirmation soon."
            );
          }

          $form.removeClass("loading");

          // setTimeout(function() {
          //   Site.signup.closeModal();
          // }, 4000);
        },
      });
    },

    checkEmailCookie: function () {
      var dc = document.cookie;
      var prefix = "vera_subscribe=";
      var begin = dc.indexOf("; " + prefix);
      if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
      } else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
          end = dc.length;
        }
      }

      Site.signup.setEmailCookie();

      return unescape(dc.substring(begin + prefix.length, end));
    },

    setEmailCookie: function (expires) {
      if (expires == null) {
        expires = 30;
      } else if (expires == "never") {
        expires = 10000;
      }
      var expDate = new Date();
      expDate.setTime(expDate.getTime() + days(expires));
      document.cookie =
        "vera_subscribe=true; path=/; expires=" + expDate.toGMTString() + ";";

      //Site.signup.emailSignup();

      function days(days) {
        return 24 * 60 * 60 * 1000 * days;
      }
    },

    popup: $("#PopupEmailSignup"),

    emailSignup: function () {
      var $popup = Site.signup.popup;
      setTimeout(function () {
        if (!$popup.hasClass("triggered")) {
          $popup.css("display", "block");
          $popup.addClass("triggered");
          $popup.attr("aria-hidden", false);
        }
      }, 2000);

      // close by clicking on X
      $popup.find(".popup-close").on("click", function (e) {
        e.preventDefault();
        $popup.removeClass("visible").hide();
      });

      // close by clicking on overlay
      $(".popup-overlay").on("click", function (e) {
        var clickTarget = $(e.target);
        if (
          clickTarget &&
          !clickTarget.closest(".popup-outer").length &&
          !clickTarget.closest(".popup-outer").length
        ) {
          e.preventDefault();
          $popup.removeClass("visible").hide();
        }
      });
    },

    closeModal: function () {
      Site.signup.popup
        .fadeOut()
        .attr("aria-hidden", true)
        .removeClass("visible");
    },
  },

  homepage: {
    $homepageBanner: $(".homepage-banner"),
    $homepageArrow: $(".scroll-indicator"),
    init: function () {
      var homepageBannerHt = Site.homepage.$homepageBanner.outerHeight();

      if (homepageBannerHt > Site.wh) {
        Site.homepage.$homepageArrow.addClass("visible");
        // $(window).on('scroll', function() {
        //     setTimeout(function() {
        //         Site.homepage.arrowFade();
        //     }, 250);
        // });
      }

      Site.homepage.$homepageArrow.on("click", function () {
        $("body, html").animate({ scrollTop: homepageBannerHt - 66 }, 500);
        Site.homepage.arrowFade();
      });
    },

    ajaxEmailSignup: function () {
      //Site.homepage.ajaxMailChimpForm($("#HomepageSubscribe"), $("#subscribe-result"));
    },

    ajaxMailChimpForm: function ($form, $resultElement) {
      // Hijack the submission. We'll submit the form manually.
      $form.on("submit", function (e) {
        if (!isValidEmail($form)) {
          var error = "A valid email address must be provided.";
          $resultElement.html(error);
        } else {
          $resultElement.html("Please wait...");
          submitSubscribeForm($form, $resultElement);
        }
      });

      // Validate the email address in the form
      function isValidEmail($form) {
        // If email is empty, show error message.
        // contains just one @
        var email = $form.find("input[type='email']").val();
        if (!email || !email.length) {
          return false;
        } else if (email.indexOf("@") == -1) {
          return false;
        }

        return true;
      }

      function submitSubscribeForm($form, $resultElement) {
        $.ajax({
          type: "GET",
          url: $form.attr("action"),
          data: $form.serialize(),
          cache: false,
          dataType: "jsonp",
          jsonp: "c", // trigger MailChimp to return a JSONP response
          contentType: "application/json; charset=utf-8",

          error: function (error) {
            // According to jquery docs, this is never called for cross-domain JSONP requests
          },

          success: function (data) {
            if (data.result != "success") {
              var message =
                data.msg ||
                "Sorry. Unable to subscribe. Please try again later.";

              if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                message = "You're already subscribed. Thank you!";
              }

              $resultElement.html(message);
            } else {
              $resultElement.html(
                "Thank you! Please check your email for a confirmation soon."
              );

              setTimeout(function () {
                $resultElement.fadeOut(500, function () {
                  $resultElement.html("").show();

                  $form.find("input[type=email]").val("");
                });
              }, 4000);
            }
          },
        });
      }
    },

    arrowFade: function () {
      Site.homepage.$homepageArrow.fadeOut(500);
      $(window).off("scroll", Site.homepage.arrowFade);
    },
  },

  images: {
    fadein: function () {
      var $images = $(".fadein:not(.loaded),.fade-in:not(.loaded)");

      $images
        .imagesLoaded({ background: true })
        .progress(function (instance, image) {
          $(image.element).addClass("loaded");
        });

      var $images = $("img.fade-in:not(.loaded)");
      $images.imagesLoaded().progress(function (instance, image) {
        $(image.img).addClass("loaded");
      });
    },

    resizeAttributions: function () {
      $(".image-attribution").each(function () {
        $(this).css("width", $(this).parent().outerHeight());
      });
    },
  },

  infographics: {
    init: function (el) {
      //console.log('out');
      /*
            if(el.children('.pies-inner').length) {
                $('.pie__slice').each(function() {
                    var rotatedAmt = ($(this).attr('data-value')/100)*360;
                    $(this).find('.rotated').css('transform', 'rotate(' + rotatedAmt + 'deg)');
                });
            }
*/

      if (el.children(".bars-outer").length) {
        $(".bar__bar").each(function () {
          var barHt = $(this).attr("data-value");
          $(this).css("height", barHt + "%");
        });
        $(".pie__slice").each(function () {
          var rotatedAmt = ($(this).attr("data-value") / 100) * 360;
          $(this)
            .find(".rotated")
            .css("transform", "rotate(" + rotatedAmt + "deg)");
        });
      }
    },

    barGraph: function (el) {
      if (el.find(".bar-ltr__row").length) {
        $(".bar-ltr__row").each(function () {
          var barWidth = $(this).attr("data-value");

          $(this).css("width", barWidth + "%");
        });
      }
    },
  },

  init404: {
    init: function () {
      Site.init404.resize();

      $(window).on("resize", function () {
        Site.init404.resize();
      });
    },

    resize: function () {
      $(".module-body").css(
        "min-height",
        Site.wh - Site.$header.outerHeight() - $(".footer").outerHeight()
      );
    },
  },

  modal: {
    init: function () {
      $(".trigger-modal").on("click", function (e) {
        e.preventDefault();
        var $modal = $("#" + $(this).attr("data-modal"));
        $modal.addClass("visible");
      });

      $(".modal-outer").on("click", function (e) {
        var clickTarget = $(e.target);
        if (
          clickTarget &&
          !clickTarget.closest("a").length &&
          !clickTarget.closest(".share").length &&
          !clickTarget.closest(".module-intro").length &&
          !clickTarget.closest(".donate-intro").length &&
          !clickTarget.closest(".popup-outer").length &&
          !clickTarget.closest(".popup-outer").length
        ) {
          e.preventDefault();
          Site.modal.close();
        }
      });
    },

    close: function () {
      $(".modal-outer").removeClass("visible");
    },
  },

  modules: {
    filter: {
      init: function () {
        $(".filter--viewtype a").on("click", function (e) {
          e.preventDefault();

          if ($(this).hasClass("active")) {
            return;
          }

          var query = window.location.search;
          var newquery;

          if ($(this).attr("data-viewtype") == "list") {
            if (query === "") {
              newquery = query + "?list=true";
            } else {
              newquery = query + "&list=true";
            }
          } else {
            if (query === "?list=true") {
              newquery = "";
            } else {
              newquery = query.replace("&list=true", "");
            }
          }

          var newurl =
            window.location.origin + window.location.pathname + newquery;
          var stateObj = { query: newurl };
          history.replaceState(stateObj, "", newurl);

          $(".filter--viewtype").find(".active").removeClass("active");
          $(this).addClass("active");

          $(this)
            .closest(".stream-module-outer")
            .attr("data-view", $(this).attr("data-viewtype"));

          Site.scrollTo();
        });

        $(".filter__clear").on("click", function (e) {
          e.preventDefault();
          $(this)
            .closest(".filter__dropdown-inner")
            .find("input[type=checkbox]")
            .each(function () {
              $(this).prop("checked", false);
            });
          $(this)
            .closest(".filter__dropdown-inner")
            .find("input[type=text]")
            .val("");
          $("#date-slider").slider("values", [
            Stream.content.daterange.start,
            Stream.content.daterange.end,
          ]);
          $("#date-slider .ui-slider-handle:first-of-type").attr(
            "data-year",
            Stream.content.daterange.start
          );
          $("#date-slider .ui-slider-handle:nth-of-type(2)").attr(
            "data-year",
            Stream.content.daterange.end
          );
          $(Stream.filter.from).val(Stream.content.daterange.start);
          $(Stream.filter.to).val(Stream.content.daterange.end);
        });

        $(".filter__dropdown-inner .btn, .filter__dropdown-outer").on(
          "click",
          this.toggle
        );

        $(".filter__dropdown-child-outer").on("click", this.childToggle);
      },
      // this is for knowledgebank filters
      // that are inside of an accordion
      childToggle: function () {
        var $list = $(this).next();
        $list.toggleClass("dropped");
        $(this).toggleClass("open");
      },
      toggle: function () {
        Site.modules.filter.isOpen = !Site.modules.filter.isOpen;

        if (Site.modules.filter.isOpen) {
          $(window).on("keydown", Site.modules.filter.keyListen);
        } else {
          $(window).off("keydown", Site.modules.filter.keyListen);
        }
        $(".filter__dropdown-outer").toggleClass("open");
        $(".filter__dropdown-outer")
          .closest(".filter-outer")
          .find(".filter__dropdown")
          .toggleClass("dropped");
      },
      isOpen: false,
      keyListen: function (e) {
        var close = false;
        if (typeof e.key !== "undefined") {
          if (["Enter", "Escape"].includes(e.key)) {
            close = true;
          }
        } else if (typeof e.keyIdentifier !== "undefined") {
          if (["Enter", "U+001B"].includes(e.keyIdentifier)) {
            close = true;
          }
        } else if (typeof e.keyCode !== "undefined") {
          if (["13", "27"].includes(e.keyCode)) {
            close = true;
          }
        }

        if (close) {
          e.preventDefault();
          Site.modules.filter.toggle();
        }
      },
    },

    firstLetter: function () {
      var $firstEl = $(
          ".post-module .module-image-right__text > *:first-child"
        ),
        firstContent = $firstEl.html().trim(),
        firstLetter = firstContent.charAt(0),
        letterWrapped = '<span class="first-letter">' + firstLetter + "</span>";

      firstContent = firstContent.slice(1);
      firstContent = letterWrapped + firstContent;

      $firstEl.html(firstContent);
    },
  },

  newsPopup: {
    checkEmailCookie: function () {
      var dc = document.cookie;
      var prefix = "veraBlog=";
      var begin = dc.indexOf("; " + prefix);
      if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
      } else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
          end = dc.length;
        }
      }

      Site.newsPopup.setEmailCookie();

      return unescape(dc.substring(begin + prefix.length, end));
    },

    setEmailCookie: function () {
      var expDate = new Date();
      expDate.setTime(expDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
      document.cookie =
        "veraBlog=true; expires=" + expDate.toGMTString() + "; path=/";

      Site.newsPopup.emailSignup();
    },

    emailSignup: function () {
      var $modal = $("#PopupEmailSignup"),
        body = document.body,
        html = document.documentElement;

      var triggeredPoint =
        Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        ) / 2;

      // just a note: the event to trigger this popup is different than the homepage popup!

      $(window).on("scroll", function () {
        if (!$modal.hasClass("triggered")) {
          if ($(window).scrollTop() > triggeredPoint) {
            $modal.addClass("triggered").fadeIn(500, function () {
              $(this).addClass("visible");
            });
          }
        }
      });

      // close by clicking on X
      $modal.find(".popup-close").on("click", function (e) {
        e.preventDefault();
        $modal.removeClass("visible").hide();
      });

      // close by clicking on overlay
      $(".popup-overlay").on("click", function (e) {
        var clickTarget = $(e.target);
        if (
          clickTarget &&
          !clickTarget.closest(".popup-outer").length &&
          !clickTarget.closest(".popup-outer").length
        ) {
          e.preventDefault();
          $modal.removeClass("visible").hide();
        }
      });
    },
  },

  ourWork: function () {
    $(".mobile-toggle").on("click", function (e) {
      e.preventDefault();

      $(this)
        .toggleClass("mobile-open")
        .next(".action-areas")
        .toggleClass("mobile-visible");
    });
  },

  recalc: function () {
    Site.ww = $(window).width();
    Site.wh = $(window).height();
    Site.headerHeight = Site.$header.outerHeight();
  },

  resourcesToggle: {
    init: function () {
      $(".resource__see-more").on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("open");
        $(".resources--toggled").toggleClass("open");

        if ($(this).text() == "See More") {
          $(this).text("See Less");
        } else {
          $(this).text("See More");
        }
      });
    },
  },

  sameHeight: {
    init: function (selectr) {
      $(window).on("load resize", function () {
        Site.sameHeight.resize(selectr);
      });
    },

    resize: function (selectr) {
      var maxHt = 0;

      $(selectr).height("auto");

      $(selectr).each(function () {
        if ($(this).outerHeight() > maxHt) {
          maxHt = $(this).outerHeight();
        }
      });

      $(selectr).height(maxHt);
    },
  },

  scrollTo: function () {
    var els =
        ".stream-module, .post-module, .infographic, .lazy-load, .mobile-dropdown, .bar-ltr, .fadeup",
      $el = $(".no-touch").find(els);
    function onScroll() {
      $el.each(function () {
        var el = $(this);

        if (window.pageYOffset + window.innerHeight > el.offset().top) {
          el.addClass("triggered");

          if (el.hasClass("infographic")) {
            Site.infographics.init(el);
          }

          if (el.hasClass("bar-ltr")) {
            Site.infographics.barGraph(el);
          }
        }
      });
    }

    if (!Site.hasTouch && $el.length) {
      onScroll();
      $(window).on("load scroll resize", onScroll);
      $("#article").on("scroll", onScroll);
    } else {
      $(".fadeup").removeClass("fadeup");
    }
  },

  search: function () {
    $(".header__search__container.container .header__search__input").on(
      "keydown",
      function () {
        event.stopPropagation();
      }
    );

    $(".toggle-search").on("click", function (e) {
      e.preventDefault();

      Site.$search.toggleClass("search-open");

      if (Site.$search.hasClass("search-open")) {
        setTimeout(function () {
          Site.$search.find(".header__search__input").focus();
        }, 100);
      }
    });
  },

  sectionNav: {
    $sectionNav: $(".mobile-dropdown"),
    $sectionNavSpacer: $(".mobile-dropdown + .mobile-dropdown-spacer"),
    currentPage: { url: null },
    init: function () {
      // Little hacky.  This was triggering on all pages fighting other popstate events
      if (!$(".mobile-dropdown").length) {
        return;
      }
      // nav mobile
      $(".mobile-dropdown__mobile-active").on("click", function (e) {
        e.preventDefault();

        $(this).closest(".mobile-dropdown").toggleClass("open");
      });

      // nav fixed postion
      if (Site.sectionNav.$sectionNav.length) {
        Site.sectionNav.fixedPosScroll();
      }
      console.log("init")

      // nav ajax links
      var $ajaxContainer = $("#SectionContent"),
        $ajaxLoadingContainer = $(".ajax-outer"),
        $mobileNavActive = $(".mobile-dropdown__mobile-active"),
        $loader = $(".streamloader"),
        currentRequest = null;

      sizeSpacer();
      window.addEventListener("resize", sizeSpacer);

      function sizeSpacer() {
        var sectionHeight = Site.sectionNav.$sectionNav.height() + "px";
        Site.sectionNav.$sectionNavSpacer.css("height", sectionHeight);
      }

      // change state
      function sectionChange(state) {
        //Stop tab load if we're already there
        if (
          !(
            state == null ||
            state.url === Site.sectionNav.currentPage.url ||
            state.url === window.location.href
          )
        ) {
          Site.sectionNav.currentPage = state;

          var $this = $(".mobile-dropdown li:first-child > a");

          // show loader
          $loader.removeClass("hidden");

          // change active link
          Site.sectionNav.$sectionNav.find(".active").removeClass("active");

          $(".mobile-dropdown li").each(function () {
            if (state.url == $(this).find("a").attr("href")) {
              // TODO: this is probably bad
              $this = $(this).find("a");
            }
          });

          $this.addClass("active");

          Site.sectionNav.$sectionNav.removeClass("open");
          $mobileNavActive.text($this.text());

          // fade out!
          $ajaxLoadingContainer.addClass("loading");

          console.log("STATE URL - :" + state.url);

          currentRequest = $.ajax({
            type: "GET",
            url: state.url,
            beforeSend: function () {
              if (currentRequest != null) {
                currentRequest.abort();
              }
            },
            success: function (data) {
              $ajaxContainer.empty();
              $ajaxContainer.append(data);
              // relevant to about section

              console.log($ajaxContainer.find("script"));

              Site.scrollTo();
              Site.initConditionals();

              $loader.addClass("hidden");

              // fade back in!
              $ajaxLoadingContainer.removeClass("loading");

              initVideos();

              // scroll to bottom of banner
              if ($(".text-banner").length) {
                $("body, html").animate(
                  { scrollTop: $(".text-banner").outerHeight() },
                  500
                );
              }
            },
            error: function (e) {
              // Error
            },
          });
        }
      }

      // push this page as a state?

      try {
        history.replaceState(
          { url: window.location.href },
          null,
          window.location.href
        );
      } catch (e) {
        console.log(e);
      }

      $(window).on("popstate", function (e) {
        sectionChange(e.originalEvent.state);
      });

      $(".mobile-dropdown a:not(.link-out)").on("click", function (e) {
        e.preventDefault();
        var $this = $(this),
          thisUrl = $(this).attr("href");

        // ajax
        sectionChange({ url: thisUrl });

        // push new state
        try {
          history.replaceState({ url: thisUrl }, null, thisUrl);
        } catch (e) {
          console.warn(e);
        }
      });
    },

    fixedPosScroll: function () {
      // scroll vars etc
      var $fixedBar = Site.sectionNav.$sectionNav,
        fixedNavOffsetTop = $fixedBar.offset().top,
        scrollTriggered = false,
        winScrollTop = 0;
      function navScroll() {
        scrollTriggered = false;

        if (winScrollTop + Site.headerHeight > fixedNavOffsetTop) {
          $fixedBar.addClass("fixed");
        } else {
          $fixedBar.removeClass("fixed");
        }
      }

      function onScroll() {
        triggerAction();
      }

      function triggerAction() {
        if (!scrollTriggered) {
          winScrollTop = $(window).scrollTop();
          requestAnimationFrame(navScroll);
        }

        scrollTriggered = true;
      }

      onScroll();

      $(window).on("scroll", onScroll);

      $(window).on("load resize", function () {
        fixedNavOffsetTop = $fixedBar.offset().top;
        onScroll();
      });
    },
  },

  share: {
    init: function () {
      // click event handler
      // $('.share a').on('click', function(e) {
      //     e.preventDefault();
      //     if($(this).attr('target') === '_blank') {
      //         var w = 500,
      //             h = 300,
      //             left = (Site.ww/2) - (w/2),
      //             top = (Site.wh/2) - (h/2);
      //         window.open(this.href, "socialWindow", "width=" + w + ",height=" + h + ",top=" + top + ",left= " + left);
      //     }
      // });
    },

    fixedPosScroll: function () {
      // scroll vars etc
      var $shareButtons = $(".fixed-share"),
        shareOffsetTop = $shareButtons.offset().top,
        shareHeight = $shareButtons.children("ul").outerHeight(),
        $shareContainer = $shareButtons.closest(".module-intro"),
        shareContainerOffsetTop = $shareContainer.offset().top,
        shareContainerHeight = $shareContainer.outerHeight() - 40,
        topHeight = $(".mobile-dropdown").length
          ? Site.headerHeight * 2
          : Site.headerHeight, // TODO: ???
        scrollTriggered = false,
        winScrollTop = 0;

      function removeDupes() {
        $(".fixed-share").each(function (idx) {
          if (idx > 0) {
            $(this).remove();
          }
        });
      }

      function calcScroll() {
        shareOffsetTop = $shareButtons.offset().top;
        shareHeight = $shareButtons.children("ul").outerHeight();
        shareContainerOffsetTop = $shareContainer.offset().top;
        shareContainerHeight = $shareContainer.outerHeight() - 40;
      }

      function shareScroll() {
        scrollTriggered = false;

        if (winScrollTop + topHeight > shareOffsetTop) {
          if (
            winScrollTop >
            shareContainerOffsetTop +
              shareContainerHeight -
              shareHeight -
              topHeight
          ) {
            $shareButtons.addClass("past");
          } else {
            $shareButtons.removeClass("past").addClass("fixed");
          }
        } else {
          $shareButtons.removeClass("fixed");
        }
      }

      function onScroll() {
        winScrollTop = $(window).scrollTop();
        triggerAction();
      }

      function triggerAction() {
        if (!scrollTriggered) {
          requestAnimationFrame(shareScroll);
        }

        scrollTriggered = true;
      }

      calcScroll();
      removeDupes(); // because there should only be one set of fixed-position scroll share buttons. right?

      if (Site.ww >= 768) {
        requestAnimationFrame(shareScroll);

        $(window).on("scroll", onScroll);
      } else {
        $(window).off("scroll", onScroll); // remove event handler to improve DOM performance?
      }

      $(window).on("resize", function () {
        calcScroll();

        if (Site.ww >= 768) {
          requestAnimationFrame(shareScroll);

          $(window).on("scroll", onScroll);
        } else {
          $(window).off("scroll", onScroll); // remove event handler to improve DOM performance?
        }
      });
    },
  },

  subNav: function () {
    // subnav click event
    $(".main-nav-outer a").each(function () {
      $(this).on("click", function (e) {
        var subnav = $(this).attr("data-subnav");

        if (subnav) {
          e.preventDefault();
          if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(".subnav-open").removeClass("subnav-open").css("max-height", 0);

            if (Site.ww >= 1024) {
              Site.$header.removeClass("mainnav-open");
            }
          } else {
            if ($(".subnav-open").length) {
              $(".main-nav-outer .active").removeClass("active");
              $(".subnav-open").removeClass("subnav-open").css("max-height", 0);
            }

            $(this).addClass("active");
            Site.$header.addClass("mainnav-open");
            $("#" + subnav + "Subnav")
              .addClass("subnav-open")
              .css({
                "max-height":
                  window.innerHeight -
                  (Site.$header.outerHeight() + $(".main-nav").outerHeight()),
              });
            $(".main-nav-outer").addClass("subnav-open");
          }
        }
      });
    });

    // subnav close event...
    $(".no-touch").on("click", function (e) {
      if (Site.$header.hasClass("mainnav-open")) {
        var clickTarget = $(e.target);
        if (
          clickTarget &&
          !clickTarget.closest(".subnav-open").length &&
          !clickTarget.hasClass("subnav-open") &&
          !clickTarget.closest(".mainnav-open").length &&
          !clickTarget.hasClass("mainnav-open") &&
          Site.$header.hasClass("mainnav-open")
        ) {
          $(".main-nav .active").removeClass("active");
          Site.$header.removeClass("mainnav-open");
          $(".subnav-open").removeClass("subnav-open").css("max-height", 0);
        }
      }
    });

    //subnav second-word line break thing
    $(".main-subnav--resource li").each(function () {
      var textOuter = $(this).find(".text-outer").text(),
        textArr = textOuter.split(" "),
        newTextString = "";

      if (textArr[1]) {
        textArr[1] = textArr[1] + "<br/>";
      }

      for (var i = 0; i < textArr.length; i++) {
        newTextString += textArr[i] + " ";
      }

      $(this).find(".text-outer").html(newTextString);
    });
  },

  toggleNav: function () {
    Site.$navToggle.on("click", function (e) {
      e.preventDefault();
      Site.$header.toggleClass("mainnav-open");
      if (!Site.$header.hasClass("mainnav-open")) {
        $(".subnav-open").removeClass("subnav-open").css("max-height", 0);
        $(".search-open").removeClass("search-open");
        $(".main-nav-outer .active").removeClass("active");
      }
    });
  },

  touchDetection: function () {
    var isTouchDevice = "ontouchstart" in document.documentElement;

    if (isTouchDevice) {
      Site.$body.removeClass("no-touch").addClass("touch");
      Site.hasTouch = true;
    }
  },
};

Site.squaresInit = function () {
  var $squares = $(".rotated-square-cta");

  $(window).on("resize", function () {
    resize();
  });

  resize();

  function resize() {
    $squares.each(function () {
      $(this).height($(this).width());
    });
  }
};

Site.donateModal = {
  init: function () {
    $(".donate-cta-outer").each(function () {
      var $outer = $(this);
      var $cta = $outer.find(".donate-cta");

      var cookie = Site.checkCookie("vera_donate_" + $cta.attr("data-cta-id"));

      if (cookie) {
        abort();
        return true;
      }

      var ctaStates = $cta
        .attr("data-states")
        .split(",")
        .filter((i) => i !== "");
      if (ctaStates && ctaStates.length) {
        $.getJSON("/dist/map/states.json", null, function (stateData) {
          VERA.getIpLocation().then(function (location) {
            var userFips = stateData.find((d) => d.abbrev === location.state)
              .fips;
            var showCta = ctaStates.includes(userFips);
            showCta ? show() : abort();
          });
        });
      } else {
        show();
      }

      function abort() {
        $(this).remove();
      }

      function show() {
        var cookieId =
          "vera_donate_" + $outer.find(".donate-cta").attr("data-cta-id");
        var closeModal = function () {
          $outer.fadeOut(function () {
            $outer.remove();
          });
          Site.donateModal.setDonateCookie(cookieId);
        };

        $outer.find(".popup-close").on("click", closeModal);
        $outer.on("click", closeModal);
        $outer.find(".donate-cta").on("click", function (e) {
          e.stopPropagation();
        });
        $outer.find(".donate-cta-button").on("click", function () {
          Site.donateModal.setDonateCookie(cookieId, "never");
          if (typeof ga !== "undefined") {
            ga(
              "send",
              "event",
              "Donate Popup",
              "Click",
              $cta.attr("data-cta-title")
            );
          }
        });

        $outer.css({ display: "flex" }).fadeIn();
      }
    });
  },

  setDonateCookie: function (id, expires) {
    if (expires == null) {
      expires = 1;
    } else if (expires == "never") {
      expires = 10000;
    }
    var expDate = new Date();
    expDate.setTime(expDate.getTime() + days(expires));
    document.cookie =
      id + "=true; path=/; expires=" + expDate.toGMTString() + ";";

    function days(days) {
      return 24 * 60 * 60 * 1000 * days;
    }
  },
};

Site.slideout = function () {
  "use strict";

  Site.slider =
    Site.slider ||
    new Slider({
      afterLoad: function () {
        var $close = $(".Slider--inner").find(".slideout_close");
        $close.on("click", function () {
          Site.slider.close();
        });

        initFootnotes($(".Slider--inner"));
        initVideos();
      },
      afterClose: function () {
        // safari fixed repaint hack
        var $close = $(".Slider--inner").find(".slideout_close");
        $close.hide();
        setTimeout(function () {
          $close.show();
        }, 100);
      },
    });

  $(".slideoutcta:not(.slideoutcta-initialized)").each(function () {
    var $this = $(this);

    $this.addClass("slideoutcta-initialized");
    $this.find(".cta_wrap").on("click", function () {
      openCta($this.attr("data-url"), $this.attr("data-class"));
    });
  });

  function openCta(url, sliderClass) {
    Site.slider.open(url, sliderClass);
  }
};

Site.checkCookie = function (cookie) {
  var dc = document.cookie;
  var prefix = cookie + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
  return unescape(dc.substring(begin + prefix.length, end));
};

Site.initTableNotes = function () {
  "use-strict";

  $(".table__notes__toggle:not(.table-notes-initialized)").each(function () {
    var $this = $(this);
    var $notes = $this.siblings(".table__notes").first();

    $this.on("click", function () {
      this.blur();
      $this.toggleClass("open");
      $notes.slideToggle();
    });

    $this.addClass("table-notes-initialized");
  });
};

Site.afterAjaxPageLoad = function () {
  Site.initConditionals();
};

$(document).ready(function () {
  var VERA = window.VERA || {};
  VERA.isMobile = screen.width <= 1024;
  $("html").removeClass("no-js").addClass("js");
  Site.init();
  Site.initConditionals();
});

$(window).on("resize", function () {
  Site.recalc();
});


var VERA = window.VERA || {};

VERA.sm = VERA.sm || new ScrollMagic.Controller();
VERA.videoTiles = videoTiles;
window.VERA = VERA;

function videoTiles($article) {
  $article
    .find(".article-video-tile:not(.modal-initialized)")
    .each(function () {
      var $this = $(this),
        $media = $this.find(".media"),
        isVimeo;

      $("body").append($media);

      function play(player) {
        isVimeo ? player.play() : player.playVideo();
        /* else Youtube */
      }

      function pause(player) {
        isVimeo ? player.pause() : player.pauseVideo();
        /* else Youtube */
      }

      $media.on("click", function () {
        handleClick();
      });

      $this.on("click", function () {
        handleClick();
      });

      $this.addClass("modal-initialized");

      function handleClick() {
        $this.toggleClass("media-open");

        $media.toggleClass("open");

        var isOpen = $media.hasClass("open");

        if ($this.data("player")) {
          isVimeo = typeof $this.data("player").getPaused !== "undefined";
          if (isOpen) {
            play($this.data("player"));
          } else {
            pause($this.data("player"));
          }
        }
      }
    });
}

$(function () {
  "use-strict";

  var $body = $("body");
  var articleClassTest = /article-theme--(\S+)/g;
  var colorComboClassTest = /color-combo--(\S+)/g;

  var animationTime = 1,
    isMobile = VERA.isMobile;

  var $articles = $("article.article");

  $articles.each(function () {
    initArticle($(this));
  });

  function initArticle($article) {
    var optionsJson = $article.attr("data-article-options");
    var options = optionsJson === undefined ? {} : JSON.parse(optionsJson);
    videoTiles($article);
    if (options.slideFade) {
      fadeSlide($article);
    }
    fixedHeros($article);
    fullscreen($article);
    explainers($article);
    fadeGalleryImages($article);
    Site.slideout();
  }

  // const scenes = [];
  // $('article[data-anchor-link]').each(function() {

  // 		var scene = new ScrollMagic.Scene({
  // 			triggerElement: this,
  // 		})
  // 		.addTo(VERA.sm)
  // 		.on("enter", scrolledToPage)

  // 		updateSceneHeight(scene);

  // 		scene.duration(function() {
  // 			return scene.eHeight;
  // 		});

  // 		scenes.push(scene);

  // });
  // window.addEventListener("resize", function() {
  // 	scenes.forEach(updateSceneHeight);
  // });

  // function updateSceneHeight(scene)
  // {
  // 	scene.eHeight = $(scene.triggerElement()).outerHeight(true);
  // }

  // function scrolledToPage(event)
  // {
  // 	//var $e = $(event.target.triggerElement());
  // 	//updateColors($e.attr('data-article-theme'));
  // }

  // function updateColors(articleTheme)
  // {
  // 	var newClass = 'article-theme--' + articleTheme;
  // 	if (!articleClassTest.test($body.attr('class'))) {
  // 		$body.addClass(newClass);
  // 	} else {
  // 		$body.attr('class', function(i,c) {
  // 			return c.replace( articleClassTest, newClass );
  // 		});
  // 	}
  // }

  function fadeGalleryImages($article) {
    if (!isMobile) {
      //All elements fade in and slide up
      var $elements = $article.find(
        ".article-image-gallery .article-photo-tile:not(.no-transform):not(.fade-in-animation-initialized)"
      );

      $elements.each(function () {
        TweenMax.set(this, { autoAlpha: 0, y: 100 });
        new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: 0.85,
        })
          .setTween(this, animationTime, { autoAlpha: 1, y: 0 })
          .addTo(VERA.sm);
      });

      $elements.addClass("fade-in-animation-initialized");
    }
  }

  function fadeSlide($article) {
    if (!isMobile) {
      //All elements fade in and slide up
      var $elements = $article.find(
        ".scroll-section > *:not(.no-transform):not(.fade-in-animation-initialized)"
      );

      $elements.each(function () {
        TweenMax.set(this, { autoAlpha: 0, y: 100 });
        new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: 0.85,
        })
          .setTween(this, animationTime, { autoAlpha: 1, y: 0 })
          .addTo(VERA.sm);
      });

      $elements.addClass("fade-in-animation-initialized");
    }
  }

  //Fixed heros
  function fixedHeros($article) {
    var $heroSpacers = $article.find(".banner-spacer");

    $heroSpacers.each(function () {
      var $spacer = $(this);
      var $hero = $spacer.siblings(".article-hero");
      var $bg = $hero.css("background-image");

      if (!$hero.find(".scaler").length) {
        $hero.append(
          '<div class="scaler" style="background-image:' +
            encodeURI($bg).replace(/%22/g, "'") +
            '"></div>'
        );
      }

      $hero.addClass("scaler-container");

      var $scaler = $hero.find(".scaler"),
        $titleWrap = $hero.find(".title_wrap"),
        $screen = $hero.find(".screen");

      $hero.find(".next-slide").on("click", function () {
        var nextSiblingOffset = $hero.next(":not(.show-on-print)").offset();
        TweenLite.set(window, { scrollTo: nextSiblingOffset.top });
      });

      var fade = new TimelineLite({ paused: true })
        .to($hero[0], animationTime, { autoAlpha: 1 })
        .to($screen, animationTime, { autoAlpha: 0.5 }, 0)
        .to($titleWrap, animationTime, { y: 0, autoAlpha: 1 }, 0)
        .to($scaler, animationTime, { scale: 1.3 }, 0);

      var heroScene = new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 0.5,
        duration: determineHeroDuration(),
      })
        .addTo(VERA.sm)
        .on("enter", function () {
          fade.play();
        })
        .on("leave", function () {
          fade.reverse();
        });

      window.addEventListener("resize", function () {
        heroScene.duration(determineHeroDuration());
      });

      function determineHeroDuration() {
        return $spacer.outerHeight(true);
      }
    });
  }

  function fullscreen($article) {
    var $blocks = $article.find(".article-block-wrapper.fullscreen");
    $blocks.each(function () {
      var $block = $(this),
        $content = $block.find(".fullscreen-inner"),
        tween = new TimelineLite({ ease: SlowMo.ease.config(0.7, 0.7, false) })
          .to($content[0], 1, { autoAlpha: 1 })
          .to($content[0], 1, { autoAlpha: 0 }, "+=3");

      var duration = getDuration();
      var scene = new ScrollMagic.Scene({
        triggerElement: this,
        duration: duration,
        triggerHook: 1,
      })
        .addTo(VERA.sm)
        .setTween(tween);
      //.addIndicators({ name: "fixed", indent: 1 })

      TweenLite.set($content[0], { autoAlpha: 0 });

      window.addEventListener("resize", function () {
        scene.duration(getDuration());
      });

      function getDuration() {
        return $block.height();
      }
    });
  }

  function explainers($article) {
    var $explainers = $article.find(
      ".article-section-explainer:not(.slide-in-initialized)"
    );

    $explainers.each(function () {
      //Should really do this with CSS
      if (!isMobile) {
        var timeline = new TimelineLite();
        timeline.to($(this).find(".bar"), animationTime / 2, { scaleY: 1 });
        timeline.to($(this).find(".bar-wrap"), animationTime, {
          x: 0,
          ease: Expo.easeInOut,
        });
        timeline.to(
          $(this).find(".text"),
          animationTime,
          { x: 0, ease: Expo.easeInOut },
          "-=1"
        );

        new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: 0.75,
        })
          .setTween(timeline)
          .addTo(VERA.sm);
      } else {
        TweenLite.set($(this).find(".bar"), { scaleY: 1 });
        TweenLite.set($(this).find(".bar-wrap"), {
          x: 0,
          ease: Expo.easeInOut,
        });
        TweenLite.set(
          $(this).find(".text"),
          { x: 0, ease: Expo.easeInOut },
          "-=1"
        );
      }
    });
  }

  /*
	//Pullquotes
	var $pullquotes = $('article.article .article-pullquote:not(.slide-in-initialized)');

	$pullquotes.each(function() {
		var timeline = new TimelineLite();
		timeline.to($(this).find('.quote'), animationTime, { x: 0, scale: 1, y: 0, ease: Power4.easeInOut });
		timeline.to($(this).find('.text'), animationTime, { x: 0, ease: Power4.easeInOut }, 0);

		new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: .75
		})
		.setTween(timeline)
		.addTo(VERA.sm)
		;
	})
*/
});

/*
	TEST WITH:
	/reimagining-prison-webumentary
	/unlocking-the-black-box-of-prosecution
*/

(function() {
	"use strict"

	var VERA = window.VERA || {};
	VERA.sm = VERA.sm || new ScrollMagic.Controller();
	VERA.initBackgroundScroll = init;
	window.VERA = VERA;

	var
		$body = $('body'),
		$bgContainer,
		$bgImages,
		$bgScreen,
		screenTween,
		screenTweenDuration,
		colorComboClassTest = /color-combo--(\S+)/g

	function init($container)
	{
		$bgContainer = $('.background-scroll-container').first(),
		$bgImages = $bgContainer.find('.background-scroll-images'),
		$bgScreen = $bgContainer.find('.background-scroll-screen')

		onload($container)

		var $bgs = $container.find('[data-background-scroll]')

		screenTween = new TimelineLite( { paused: true, ease: Linear.easeNone } )
			.to( $bgScreen[0], 0.5, { autoAlpha: .85 }, 0 )

		screenTweenDuration = screenTween.duration()

		$bgs.each(initOne)
	}

	function onload(el) {
		if (colorComboClassTest.test($body.attr('class'))) return;
		var currentCombo = el.attr('data-color-combo');
		var $article = el.closest('article.article');
		var theme = $article.attr('data-article-theme');
		var defaultCombo = themeSwitch(theme);
	}

	function themeSwitch(theme) {
		switch (theme) {
			case 'black':
				return 'black-white'
				break;
			case 'gray':
				return 'gray-black'
				break;
			default:
				return 'white-black'
		}
	}

	function initOne(i,el)
	{
		var $trigger = $(el),
			$content = $trigger.next(),
			$scrollWrap = $trigger.closest('.scroll-section')

		var screenDuration = getScreenDuration(),
			imageDuration = getImageDuration(),
			$img

		const $article = $trigger.closest('article.article');

		var theme = $article.attr('data-article-theme'),
			defaultCombo;

		defaultCombo = themeSwitch(theme);

		$trigger.closest('.bg-container').addClass('bg-color' + ' color-combo--' + this.getAttribute("data-color-combo"));

		if ($trigger.hasClass('background-scroll-trigger-image')) {

			if (!Modernizr.objectfit) {

				var bgSrc = this.getAttribute("data-bg-src");
				$img = $('<div>');
				$img.addClass('bg-image').css({ backgroundImage: "url(" + bgSrc + ")" })

			} else {
				var src = this.getAttribute("data-src"),
					srcset = this.getAttribute("data-srcset")

				$img = $('<img>');
				$img.attr('src', src).attr('srcset', srcset)

			}

		} else {
			//TODO cleanup and test with RP and Empire
			$img = $('<div>')
		}

		$bgImages.append($img);

		var imageFade = TweenLite.to($img[0], 0.25, { autoAlpha: 1, paused: true, ease: Linear.easeNone });
		var imageScene = new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 1,
			offset: 1
		})
		.addTo(VERA.sm)
		//.addIndicators({ name: "image " + i })
		.on("enter", function(event) {
			imageFade.play(0)
			var currentCombo = $trigger.attr('data-color-combo');
			if (currentCombo === 'inherit') {
				currentCombo = defaultCombo
			}
			$body.removeClass(function(index, className) {
				return (className.match (/(^|\s)(color-combo--)\S+/g) || []).join(' ');
			})
			$body.addClass("color-combo--" + currentCombo);

			console.log(currentCombo,'imagescene ' + i);
		})
		.on("leave", function() {
			var currentCombo = $trigger.attr('data-color-combo');
			imageFade.pause(0);
		})

		var screenScene = new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 1,
			//offset: 100
		})
		.addTo(VERA.sm)
		//.addIndicators({name: "screenfade", indent: 15})
		.on('start', function(event) {
			event.scrollDirection === "REVERSE" ? screenTween.play() : screenTween.reverse()
		})
		.on('end', function(event) {
			event.scrollDirection === "REVERSE" ? screenTween.reverse() : screenTween.play()
		})

		windowResized()
		window.addEventListener("resize", windowResized)

		function getImageDuration()
		{
			return Math.max($scrollWrap.height(), 0)
		}

		function getScreenDuration()
		{
			return $trigger.height()
		}

		function windowResized() {
			imageScene.duration(getImageDuration())
			screenScene.duration(getScreenDuration())
		}
	}
})();

(function() {
  var VERA = window.VERA || {};
  VERA.sm = VERA.sm || new ScrollMagic.Controller();
  window.VERA = VERA

  $(function() {
    $('.ByTheNumbers-row:not(.ByTheNumbers-row-initialized)').each(function(i,n) {
      $(n).addClass('ByTheNumbers-row-initialized');
      var $e = $(n).find('[data-count-number]');
      var $spacer = $e.find('.ByTheNumbers-figure-spacer');
      var $target = $e.find('.ByTheNumbers-figure-target');
      var data = JSON.parse($e.attr('data-count-number'))
      var format = d3.format(data.format)
      var counter = {
        count: 0
      }

      $spacer.text(format(data.number))

      var tween = new TimelineLite({ paused: true})
      tween.to(n, 1, { autoAlpha: 1 })
      tween.to(counter, 1, {
        count: data.number,
        onUpdate: function() {
          $target.text(format(counter.count));
        }
      }, 0)

      new ScrollMagic.Scene({
        triggerElement: $e[0],
        triggerHook: .75
      })
      .on('start', function(e) {
          e.scrollDirection === "FORWARD" || e.scrollDirection === "PAUSED" ? tween.play(0) : tween.reverse(0)
      })
      .addTo(VERA.sm)
    })
  })
})();
(function (window) {
  "use strict";

  var VERA = window.VERA || {};
  VERA.initCarousel = setupCarousel;
  window.VERA = VERA;

  function setupCarousel(options) {
    options = options || {};
    var $carousel = $(".js-carousel");
    var $title = $(".js-fade-out");
    var $flk = $carousel.flickity({
      cellAlign: options.cellAlign || "center",
      imagesLoaded: true,
    });

    // fade out title on scroll
    $carousel.on("scroll.flickity", function (event, progress) {
      if (!$title || window.innerWidth < 1025) return;

      var currentIndex = $carousel.data("flickity").selectedIndex;
      if (currentIndex > 0) {
        $title.fadeOut();
      } else {
        $title.fadeIn();
      }
    });

    $carousel.on(
      "staticClick.flickity",
      function (event, pointer, cellElement, cellIndex) {
        // dismiss if cell was not clicked
        if (!cellElement) return;

        // select cell on click
        $carousel.find(".is-selected").removeClass("is-selected");
        $(cellElement).addClass("is-selected");
        $flk.flickity("select", cellIndex);
      }
    );
  }

  document.fonts.ready.then(function () {
    $(".flickity-enabled").flickity("resize");
  });
})(window);

(function() {
//closure

  window.addEventListener("load", function() {
    init()
  })

  const init = function() {
    $('.carousel-slideshow').flickity({
      wrapAround: true,
      pageDots: false,
      prevNextButtons: false,
      imagesLoaded: true
    })
  }
//closure
})();

let acharts =  document.querySelectorAll(".achart");

function mostrarScroll(){
  let scrollTop = document.documentElement.scrollTop;
  for (var i=0; i < acharts.length; i++ ){
    let alturaAnimado = acharts[i].offsetTop;
    if(alturaAnimado - 30 < scrollTop){
      acharts[i].style.display = "block";
    }
  }
}

window.addEventListener('scroll', mostrarScroll);
(function () {
  var VERA = window.VERA || {};

  VERA.dataViz = VERA.dataViz || {};
  VERA.sm = VERA.sm || new ScrollMagic.Controller();

  VERA.dataViz = {
    colors: [
      "#ef4136",
      "#a05eb5",
      "#68b2d9",
      "#007a69",
      "#005eb8",
      "#bcbdbc",
      "#b0cc1b",
    ],

    secondaryColors: ["#76110a", "#4c2857", "#194b66"],

    baselineColor: "#A3A3A3",

    animationDuration: 500,

    defaultNumberFormat: ",",

    $scrollTarget: $("html,body"),

    $body: $("body"),

    scrollPositionY: 0,

    formatTooltip: function (instance, helper, content) {
      var $content = $(content);

      var tooltip = helper.origin.getAttribute("data-tooltip");

      if (tooltip) {
        var vars = tooltip.match(/\*(.*?)\*/g);
        var statement = tooltip;

        vars.forEach(function (d) {
          var name = d.replace(/\*/g, "");

          statement = statement.replace(
            d,
            '<span class="value" style="color:' +
              helper.origin.getAttribute("data-color") +
              '">' +
              name +
              "</span>"
          );
        });

        $content.find(".title").html(statement);
        $content.addClass("statement");
      } else {
        $content.find(".title").text(helper.origin.getAttribute("data-label"));
        $content
          .find(".label-x")
          .text(helper.origin.getAttribute("data-x-label"));
        $content.find(".value-x").text(helper.origin.getAttribute("data-x"));
        $content
          .find(".label-y")
          .text(helper.origin.getAttribute("data-y-label"));
        $content.find(".value-y").text(helper.origin.getAttribute("data-y"));
      }

      return content;
    },

    datumExists: function (datum, params) {
      // console.log(!Array.isArray(params), 'data')
      if (!Array.isArray(params)) {
        params = [params];
      }
      var results = [];
      params.forEach(function (p) {
        var d = datum[p.column];
        if (d === undefined || d === null || d.toLowerCase() === "null") {
          results.push(false);
          return;
        }
        results.push(true);
      });
      return results.indexOf(true) !== -1;
    },

    datumFilter: function (datum, params) {
      if (params === undefined) {
        return true;
      }
      if (!Array.isArray(params)) {
        params = [params];
      }

      var result = true;
      params.forEach(function (p) {
        if (p.values.indexOf(datum[p.column]) === -1) {
          result = false;
          return;
        }
      });
      return result;
    },

    datumExclude: function (datum, params) {
      if (params === undefined) {
        return true;
      }
      if (!Array.isArray(params)) {
        params = [params];
      }

      var result = true;
      params.forEach(function (p) {
        if (p.values.indexOf(datum[p.column]) !== -1) {
          result = false;
          return;
        }
      });
      return result;
    },

    makeArray: function (d) {
      if (!Array.isArray(d)) {
        return [d];
      }
      return d;
    },

    formatColumns: function (data) {
      var _this = this;
      var keys = ["x", "y", "geography"];

      keys.forEach(function (k) {
        data[k] = _this.makeArray(data[k]);
        data[k] = _.map(data[k], function (d) {
          if (d === undefined) {
            return;
          }
          if (typeof d === "string") {
            d = {
              column: d,
            };
          }

          if (d.format === undefined) {
            d.format = _this.defaultNumberFormat;
          }
          return d;
        });
      });

      return data;
    },

    orderData: function (orderBy, order, data) {
      // console.log(order,'order')
      return _.map(order, function (a) {
        return _.find(data, function (o) {
          return o[orderBy] === a;
        });
      });
    },

    setupNotes: function ($elem, notes) {
      $elem.html("");

      $elem.text(notes);
    },

    resizeChart: function (outer, inner) {
      var outerNode = outer.node();
      var svgRect = outerNode.getBoundingClientRect(),
        gRect = inner.node().getBoundingClientRect();

      var offset =
        gRect.top + gRect.height - (svgRect.top + svgRect.height) + 30;

      //outer.attr("height", outer.attr("height") + (offset + 10))
      outer.style("margin-bottom", offset + "px");

      var height = outerNode.getAttribute("height");
      var width = outerNode.getAttribute("width");
      var widthToHeight = width / height;

      var $outerNode = $(outerNode);
      var $parent = $outerNode.parent();

      $outerNode.css({
        width: $parent.width(),
        height: $parent.width() / widthToHeight,
      });

      /*
			viewBox = '0 0 ' + newWidth + ' ' + newHeight;

			svg.attr('viewBox', viewBox)
				.attr('width', newWidth)
				.attr('height', newHeight)
	*/
    },

    setupAjaxOnScroll: function (viz) {
      // console.log(viz, 'vizzzz')
      var timer;
      var scene = new ScrollMagic.Scene({
        triggerElement: viz.$scrollContainer[0],
        duration: determineDuration(),
      })
        .on("enter", function () {
          timer = setTimeout(function () {
            viz.init();
            scene.destroy(true);
            window.removeEventListener("resize", recalcDuration);
          }, 100);
        })
        .on("leave", function () {
          clearTimeout(timer);
          // scene.destroy(true);
        })
        .addTo(VERA.sm);

      window.addEventListener("resize", recalcDuration);

      function recalcDuration() {
        scene.duration(determineDuration());
      }

      function determineDuration() {
        return viz.$scrollContainer.outerHeight(true);
      }
    },
  };
})();

$(".drop").click(function() {
    var is_open = $(this).hasClass("open");
    if (is_open) {
      $(this).removeClass("open");
    } else {
      $(this).addClass("open");
    }
  });
  
  $(".drop li").click(function() {
  
    var selected_value = $(this).html();
    var first_li = $(".drop li:first-child").html();
  
    $(".drop li:first-child").html(selected_value);
    $(this).html(first_li);
  
  });
  
  $(document).mouseup(function(event) {
  
    var target = event.target;
    var select = $(".select");
  
    if (!select.is(target) && select.has(target).length === 0) {
      select.removeClass("open");
    }
  
  });
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

var VERA = window.VERA || {};

$(function () {
  VERA.format = {
    percentageWhole: d3.format(".0%"),
    percentageTenth: d3.format(".1%"),
    money: d3.format("$,.0f"),
    number: d3.format(",.0f"),
    string: function (d) {
      return d;
    },
  };
});

//equal cell height hack for fact cards
Flickity.prototype._createResizeClass = function () {
  this.element.classList.add("flickity-resize");
};

Flickity.createMethods.push("_createResizeClass");

var resize = Flickity.prototype.resize;
Flickity.prototype.resize = function () {
  this.element.classList.remove("flickity-resize");
  resize.call(this);
  this.element.classList.add("flickity-resize");
};

function navCarousel(
  carouselSelector,
  articleSelector,
  parentTitle,
  parentUrl,
  parentId,
  closeOnScrollUp
) {
  console.log(closeOnScrollUp);
  closeOnScrollUp =
    typeof closeOnScrollUp === "undefined" ? true : closeOnScrollUp;

  var $body = $("body"),
    $carousel = $(carouselSelector),
    $article = $(articleSelector),
    $loader = $(articleSelector + " .streamloader"),
    $header = $body.find("header.state-of"),
    time = 0.4,
    _self = this,
    articleIsOpen = false;

  var articleSlide = articleSlideTween(),
    loaderFade = TweenLite.to($loader[0], time, { autoAlpha: 1, paused: true });

  (this.open = open),
    (this.close = close),
    (this.initArticle = initArticle),
    (this.$carousel = $carousel);

  var defaultTitle = parentTitle,
    defaultUrl = parentUrl,
    defaultId = parentId,
    defaultTheme = "default";

  setupCarousel();
  setupLinks();

  $article.on("mousewheel", function (event) {
    var scrollTop = $(this).scrollTop();
    var up =
      event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0;

    if (closeOnScrollUp && scrollTop <= 0 && up) {
      _self.close(true);
    }
  });

  window.addEventListener("popstate", onPopState);
  window.addEventListener("resize", windowResized);

  function open() {
    articleIsOpen = true;
    articleSlide.play();
  }

  function close(push) {
    if (push === undefined) {
      push = false;
    }
    articleIsOpen = false;
    articleSlide.reverse();
    document.title = defaultTitle;

    if (push) {
      pushPage(defaultUrl, defaultTitle, defaultTheme, defaultId);
    }
  }

  function setupCarousel() {
    var $flick = $carousel.flickity({
      setGallerySize: false,
      contain: true,
      cellAlign: "left",
      pageDots: false,
    });

    $carousel.find("a").on("click", function (event) {
      event.preventDefault();
    });

    $flick.on(
      "staticClick.flickity",
      function (event, pointer, cellElement, cellIndex) {
        if (cellIndex === 0) {
          $flick.flickity("next");
        } else {
          $flick.flickity("select", cellIndex);
        }

        var $item = $(cellElement).filter(".item"), //filter only for Nav carousel items (orig design)
          link = $item.find("a")[0];
        if (link !== undefined) {
          ajaxPage(
            link.getAttribute("href"),
            link.getAttribute("title"),
            link.getAttribute("data-theme"),
            link.getAttribute("data-id")
          );
        }
      }
    );

    $flick.on("select.flickity", function () {
      //Todo where does this var come from.  Declaring to avoid strict error
      var coverTween = window.coverTween || undefined;
      if (typeof coverTween !== "undefined" && coverTween.progress() < 1) {
        coverTween.progress(1);
      }
      if ($flick.data("flickity").selectedIndex === 0) {
        $header.addClass("cover-selected");
      } else {
        $header.removeClass("cover-selected");
      }
    });
  }

  function initArticle() {
    setupLinks();
  }

  function setupLinks() {
    //close article links
    $(".header.state-of h1,.js-close-article").on("click", function (event) {
      event.preventDefault();
      _self.close(true);
    });

    //orther article links
    var $links = $("a[data-nav-carousel-link]:not(.link-initialized)");
    $links.on("click", function (event) {
      event.preventDefault();
      console.log(this);
      ajaxPage(
        this.getAttribute("href"),
        this.getAttribute("title"),
        this.getAttribute("data-theme"),
        this.getAttribute("data-id")
      );
    });
    $links.addClass("link-initialized");
  }

  function articleSlideTween() {
    return new TimelineMax({ paused: true })
      .to($article[0], time, { y: "0%" })
      .to($carousel[0], time, { y: "-100%" }, 0);
  }

  function windowResized() {
    if (!articleIsOpen) {
      articleSlide.kill();
      TweenLite.set($article[0], { y: "100%" });
      articleSlide = articleSlideTween();
    }
  }

  var currentPageRequest = null;
  function ajaxPage(url, title, theme, id, push) {
    if (push === undefined) {
      push = true;
    }
    if (currentPageRequest) {
      currentPageRequest.abort();
    }
    if (loaderTimer) {
      clearTimeout(loaderTimer);
    }

    $body.addClass("carousel-loading");
    var loaderTimer = setTimeout(function () {
      loaderFade.play();
    }, 0);

    if (articleIsOpen) {
      _self.close();
    }

    $article.find(">*:not(.streamloader)").remove();
    if (theme === "alt") {
      $article.addClass("alt");
    } else {
      $article.removeClass("alt");
    }

    _self.open();

    currentPageRequest = $.get(url, function (html) {
      $article.append(html);

      if (push) {
        pushPage(url, title, theme, id);
      }

      setTimeout(function () {
        $article.scrollTop(0);
      }, 0);

      $body.removeClass("carousel-loading");
      if (loaderTimer) {
        clearTimeout(loaderTimer);
      }
      loaderFade.reverse();

      Site.init();
      Site.slideout();
      VERA.initFacts();
      initAnalyticsEvents();

      var carouselIndex = $carousel
        .find('a[href="' + url + '"]')
        .parent(".item")
        .index();
      if (carouselIndex && carouselIndex !== -1) {
        $carousel.flickity("select", carouselIndex);
      }

      var $overlay = $("#ShareOverlay"),
        $new = $article.find(".share-outer");
      $overlay.find(".share-outer").remove();
      $overlay.append($new);

      var path = url.replace(
        window.location.protocol + "//" + window.location.host,
        ""
      );
      gaPageview(path);
    });

    updateMeta(id);
  }

  function pushPage(url, title, theme, id) {
    history.pushState(
      {
        title: title,
        url: url,
        theme: theme,
        id: id,
      },
      url,
      url + window.location.search
    );
  }

  function onPopState(event) {
    if (event.state === null || event.state.title === defaultTitle) {
      _self.close();
      document.title = defaultTitle;
    } else {
      ajaxPage(
        event.state.url,
        event.state.title,
        event.state.theme,
        event.state.id,
        false
      );
    }
  }

  var currentMetaRequest = null;
  function updateMeta(id) {
    if (currentMetaRequest) {
      currentMetaRequest.abort();
    }
    currentMetaRequest = $.get("/meta.json", { id: id }, function (response) {
      console.log("meta", response);
      document.title = response.title + " | " + defaultTitle;
      $("title").text(response.title);
      $('meta[name="description"').attr("content", response.description);

      $('link[rel="canonical"').attr("href", response.url);

      $('meta[property="og:title"').attr("content", response.title);
      $('meta[property="og:description"').attr("content", response.description);
      $('meta[property="og:image"').attr("content", response.image);
      $('meta[property="og:url"').attr("content", response.url);

      $('meta[name="twitter:title"').attr("content", response.title);
      $('meta[name="twitter:description"').attr(
        "content",
        response.description
      );
      $('meta[name="twitter:image"').attr("content", response.image);
    });
  }
}

(function(window) {
	"use strict";
	
	var HighlightShare = function()
	{
		var arrowSize=5,size=20;

		
		var elems = document.querySelectorAll('[data-highlight-share]');
		var link = window.location.href;
		
		var ogimage = document.head.querySelector('meta[property="og:image"]');
		var image =  ogimage ? ogimage.content : null;
		
		Array.prototype.forEach.call(elems, function(e) {
			e.addEventListener("mouseup", function(e) {
				destroy();
				
				setTimeout(function() {
					var text = null,range=null;
					if (window.getSelection) {
						range = window.getSelection();
				        text = range.toString();
				    } else if (document.selection && document.selection.type != "Control") {
					    range = document.selection.createRange();
				        text = range.text;
				    }
				    
				    var coords = getSelectionCoords();
				    if (!coords) {
					    coords = {
						  x: e.pageX,
						  y: e.pageY  
					    };
				    }
				    
				    if (!text.trim()) {return}
				    
				    var x=coords.x,y=coords.y;
				    
				    var share = document.createElement("div");
				    share.setAttribute("data-highlight-share-module", '');
				    share.style.position = "absolute";
				    share.style.display = "flex";
				    share.style.alignItems = "center";
				    share.style.top = (y - arrowSize) + "px";
				    share.style.left = x + "px";
				    share.style.transform = "translate(-50%,-100%)";
				    share.style.padding = "3px";
				    share.style.backgroundColor = "black";
				    share.style.color = "white";
				    share.style.boxShadow = "0 0 1px 1px rgba(0,0,0,.25)";
				    share.style.fontSize = size + "px";
				    
				    var arrow = document.createElement("div");
					arrow.style.borderLeft = arrowSize + "px solid transparent";
					arrow.style.borderRight = arrowSize + "px solid transparent";
					arrow.style.borderTop = arrowSize + "px solid black";
					arrow.style.position = "absolute";
					arrow.style.top = "100%";
					arrow.style.left = "50%";
					arrow.style.transform = "translateX(-50%)";
					
					share.appendChild(arrow);
					
					var twitter = makeTwitter(link,text);
					share.appendChild(twitter);
					
					var facebook = makeFacebook(link,text,image);
					share.appendChild(facebook);
					
					var email = makeEmail(link,text);
					share.appendChild(email);
				    
				    if (typeof jQuery !== "undefined") {
					    share.style.opacity = 0;
					    share.style.transform = "translate(-50%,-50%)";
					    document.body.appendChild(share);
					    $(share).animate(
					    	{opacity: 1}, 
					    	{
						    step: function(now,fx) {
					    		$(this).css({transform: "translate(-50%, -" + (now*100) + "%)"});
					    	},
					    	duration: 100
					    });
				    } else {
				    	document.body.appendChild(share);
				    }
			    
			    }, 100);
			});
		});
		
		function destroy()
		{
			var shares = document.querySelectorAll('[data-highlight-share-module]');
			
			Array.prototype.forEach.call(shares, function(e) {
				e.parentNode.removeChild(e);
			});
		}
		
		function makeTwitter(linkUrl,text)
		{
			var link = document.createElement("a");
			link.setAttribute("href", "https://www.twitter.com/intent/tweet?link=" + linkUrl + "&text=" + text);
			link.classList.add("icon-twitter");
			addLinkStyle(link);
			
			return link;
		}
		
		function makeFacebook(linkUrl,text,image)
		{	
			var link = document.createElement("a");
			var href = "https://www.facebook.com/sharer/sharer.php?u=" + linkUrl +  "&description=" + text;
			if (image) {
				href += "&picture=" + image;
			}
			link.setAttribute("href", href);
			link.classList.add("icon-facebook");
			addLinkStyle(link);
			
			return link;
		}
		
		function makeEmail(linkUrl,text)
		{
			var link = document.createElement("a");
			var href = "mailto:?body=" + text + "%0A%0A" + linkUrl;
			link.setAttribute("href", href);
			link.classList.add("icon-mail");
			addLinkStyle(link);
			link.style.fontSize = ".75em";
			
			return link;
		}
		
		function addLinkStyle(link)
		{
			link.style.textAlign = "center";
			link.style.color = "white";
			link.style.padding = "3px";
			link.style.width = size*1.25 + "px";
			link.style.height = size*1.25 + "px";
			link.style.display = "flex";
			link.style.alignItems = "center";
			link.style.justifyContent = "center";
			
			link.setAttribute("target", "_blank");
		}
		
		function getSelectionCoords() {
		    var sel = document.selection, range;
		    var x = 0, y = 0;
		    
		    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		    if (sel) {
		        if (sel.type != "Control") {
		            range = sel.createRange();
		            range.collapse(false);
		            x = range.boundingLeft;
		            y = range.boundingTop;
		        }
		    } else if (window.getSelection) {
		        sel = window.getSelection();
		        if (sel.rangeCount) {
		            range = sel.getRangeAt(0).cloneRange();
					range.collapse(false);
					
		            if (typeof range.getBoundingClientRect !== "undefined") {
		                var rect = range.getBoundingClientRect();
						if (!rect.left && !rect.top) {
							return false;
						} else {
		                	x = rect.left;
							y = rect.top + scrollTop;
		                }
		            }
		        }
		    }
		    return { x: x, y: y };
		}
	};
	
	window.HighlightShare = HighlightShare;
	
})(window);
(function() {

  var VERA = window.VERA || {};
  VERA.sm = VERA.sm || new ScrollMagic.Controller();
  window.VERA = VERA;

  VERA.imageMask = function(id) {
    const
      barHeight = 10,
      barRatio = 5

    let
      width,
      height

    const
      container = d3.select('#' + id),
      barsvg = d3.select('#' + id + '-bars'),
      bars = d3.select('#' + id + '-bar-clip')

    const tween = new TimelineLite()
      //.from(container.node(), 1, { autoAlpha: 0})
      .to(barsvg.node(), 1, { y: 0, ease: Linear.easeNone }, 0)

    // new ScrollMagic.Scene({
    //   triggerElement: container.node(),
    //   triggerHook: 0,
    //   duration: '100%'
    // })
    // .addTo(VERA.sm)
    //.setPin(container.select('.pin-container').node())

    new ScrollMagic.Scene({
      triggerElement: container.node(),
      triggerHook: 0,
      duration: '100%'
    })
    .addTo(VERA.sm)
    //.addIndicators({ name: 'pin' })
    .setTween(tween)
    .setPin(container.select('.pin-child-target').node())

    resized()
    window.addEventListener("resize", resized)

    function resized() {
      width = window.innerWidth
      height = window.innerHeight

      var data = []
      var barCount = height/(barHeight*barRatio)
      for (var i=0; i<barCount; i++) {
        data.push({
          y: i*barHeight*barRatio
        })
      }

      var rects = bars
        .selectAll('rect')
        .data(data)

      var enter = rects
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('height', barHeight)

      var update = rects.merge(enter)
        .attr('y', function(d) {
          return d.y
        })
        .attr('width', width)

      rects.exit().remove()
    }
  }
})();
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
(function () {
  var IPAPIKEY = "da1f341822ce28813f8c3d92cf9d78d1b39901c5";
  var VERA = window.VERA || {};
  VERA.getIpLocation = getIpLocation
  window.VERA = VERA;

  function getIpLocation() {
    return new Promise(function (resolve, reject) {
      try {
        var userLocation = JSON.parse(localStorage.getItem("userLocation"));
        if (userLocation && notTooOld(userLocation.timestamp)) {
          resolve(userLocation);
        } else {
          fetchIpLocation().then(function (location) {
            resolve(location)
          })
        }
      } catch (err) {
        console.warn(err)
      }
    })
  }
  function notTooOld(age) {
    return (Date.now() - age) / 1000 < 2592000 //30 days of seconds
  }
  function fetchIpLocation() {
    return new Promise(function (resolve, reject) {
      $.get("https://ipapi.co/json/?key=" + IPAPIKEY, function (data) {
        const result = {
          state: data.error ? null : data.region_code,
          timestamp: Date.now()
        }
        try {
          localStorage.setItem("userLocation", JSON.stringify(result));
        } catch (err) {
          console.warn(err);
        }
        resolve(result)
      })
    })
  }
})();
(function (window) {
  window.VERA = window.VERA || {};

  VERA.mapInit = function (options) {
    var populateData = function (data) {
      //self.title.html(data.title);
      self.overview.html(data.body);

      console.log(data.level);

      if (data.level === 0) {
        //console.log('from pop');
        //TODO this reset was triggering twice, from here and from useData...why
        //self.stateSelect.removeClass('as-title');
        //self.markerSelect.removeClass('as-title');
        //self.title.show()
        //self.title.closest('.map__header').find('.back').before(self.stateSelect).before(self.markerSelect);
      } else if (data.level === 1) {
        //self.title.closest('.map__header').find('.back').before(self.markerSelect);
        //self.markerSelect.removeClass('as-title');
        //self.title.hide();
        //self.titleWrap.after(self.stateSelect);
        //self.stateSelect.addClass('as-title');
      } else {
        //self.title.closest('.map__header').find('.back').before(self.stateSelect);
        //self.stateSelect.removeClass('as-title');
        //self.title.hide()
        //self.titleWrap.after(self.markerSelect);
        //self.markerSelect.addClass('as-title');

        if (self.markerSelect.children().length == 2) {
          self.nextMarkerButton.addClass("hidden");
        } else {
          self.nextMarkerButton.removeClass("hidden");
        }
      }

      resizeSelects();
      //initilize any slider cta that are in the
      Site.slideout();
    };

    var useData = function (data, backTo) {
      backTo = backTo || null;

      self.overview.css({ opacity: 0 });
      self.populateData(data);
      self.overview.animate({ opacity: 1 });

      if (data.level === 0) {
        //console.log('from use');
        reset();
      }

      self.container.attr("data-level", data.level);

      if (backTo !== null) {
        self.back.addClass("show");
      } else {
        self.back.removeClass("show");
      }
      self.currentBackTo = backTo;

      //determineOverflow();
    };

    var self = this;

    var defaults = {
      zoom: true,
      zoomRatio: 1,
      zoomState: false,
      populateData: populateData,
    };

    options = options !== null ? options : {};

    self.options = extendDefaults(options, defaults);

    function extendDefaults(options, defaults) {
      Object.keys(defaults).forEach(function (key) {
        if (!(key in options)) {
          options[key] = defaults[key];
        }
      });
      return options;
    }

    self.populateData = self.options.populateData;

    self.useData = useData;

    var markersize = 8;
    var transitionTime = 500;
    var activeClass = "zoomed";

    var width = 960,
      height = 600,
      active = d3.select(null),
      blurCloneMap;

    this.svg = d3.select("#" + VERA.mapdata.mapid + " .project-map-svg");
    this.svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", "0 0 " + width + " " + height);

    this.projection = d3
      .geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale([1250]);

    this.path = d3.geoPath().projection(self.projection);

    this.mapdata = VERA.mapdata.data;
    this.states = this.mapdata.states;

    this.container = $("#" + VERA.mapdata.mapid);

    this.mapwrap = this.container.find(".map_inner_wrap");
    this.title = this.container.find(".map__title");
    this.titleWrap = this.container.find(".map__title_wrap");
    this.content = this.container.find(".map__content");
    this.overview = this.container.find(".map__overview");
    this.back = this.container.find(".back");
    this.tooltip = this.container.find(".tooltip");
    this.tooltiptitle = this.tooltip.find(".title");
    this.tooltipsubtitle = this.tooltip.find(".subtitle");
    this.loader = this.container.find(".streamloader");

    this.stateSelect = this.container.find(".state_select");
    this.markerSelect = this.container.find(".marker_select");
    this.tempSelect = this.container.find(".map_select__temp");

    //this.prevMarkerButton = this.container.find('.js-marker-prev');
    this.nextMarkerButton = this.container.find(".js-marker-next");

    this.stateLegend = this.container.find(".map__legend--state");
    this.markerLegend = this.container.find(".map__legend--marker");

    this.translate = [0, 0];
    this.scale = 1;

    var stateidprefix = "state_";

    this.init = function () {
      // http://bsouthga.github.io/d3-exploder/us.json
      // /dist/map/us-states.json
      self.loader.removeClass("hidden");

      d3.json("/dist/map/us.json", function (error, us) {
        if (error) throw error;

        self.data = us;

        //States
        self.g = self.svg
          .append("g")
          .attr("class", "states")
          .selectAll("path")
          .data(topojson.feature(self.data, self.data.objects.states).features)
          .enter()
          .append("g")
          .attr("class", "state")
          .append("path")
          .attr("d", self.path)
          .each(function (d) {
            d.id = stateidprefix + parseInt(d.id);

            var $state = $(this);

            var i = 0,
              l = self.states.length,
              matched = false;

            for (; i < l; i++) {
              if (self.states[i].stateid == d.id) {
                matched = true;
                break;
              }
            }

            var g = this.parentNode;
            g.setAttribute("data-state", d.properties.name);

            this.id = d.id;
            this.setAttribute("data-name", d.properties.name);
            this.setAttribute("data-abbr", d.properties.code);

            this.setAttribute("title", d.properties.name);

            $state.addClass("state__path");

            if (matched) {
              d.entryId = self.states[i].entryid;
              d.title = d.properties.name;
              d.subtitle = self.states[i].subtitle;
              d.body = self.states[i].body;
              d.level = self.states[i].level;
              d.data = self.states[i].data;

              $state.addClass("state__is-active");

              if (self.states[i].toggleGroup) {
                this.setAttribute(
                  "data-toggle-group",
                  self.states[i].toggleGroup
                );
                d.toggleGroup = self.states[i].toggleGroup;
              }

              if (self.states[i].group && self.states[i].group !== "none") {
                g.setAttribute("in-group", "");
                $state.addClass("state__" + self.states[i].group);
              }
              $(this).on("mouseover", function (e) {
                if (
                  (!self.options.zoom && screen.width > 1024) ||
                  (!self.container.hasClass(activeClass) && screen.width > 1024)
                ) {
                  showTooltip(this, e);
                }
              });
              $(this).on("mouseleave", hideTooltip);
            } else {
              $state.addClass("state__is-not-active");
            }
          });

        self.container.find(".state[in-group]").each(function () {
          self.svg.select(".states").node().appendChild(this);
        });

        //Markers
        if (VERA.mapdata.hasMarkers) {
          self.markers = self.svg.append("g");
          self.markers
            .attr("class", "markers")
            .selectAll("g")
            .data(self.states)
            .enter()
            .append("g")
            .attr("data-state", function (d) {
              return d.title;
            })
            .selectAll("path")
            .data(function (d) {
              return d.markers;
            })
            .enter()
            .append("g")
            .attr("data-title", function (d) {
              return d.title;
            })
            .selectAll("path")
            .data(function (d) {
              return typeof d.dots !== "undefined" ? d.dots : false;
            })
            .enter()
            .append("path")
            .datum(function (d) {
              var parent = d3.select(this.parentNode).datum();
              var point = {
                type: "Point",
                coordinates: self.projection([d.coords.lng, d.coords.lat]),
                title: parent.title,
                subtitle: d.subtitle ? d.subtitle : parent.subtitle,
                id: parent.id,
                group: parent.group,
              };
              return point;
            })
            .attr("d", function (d) {
              if (d.coordinates) {
                //return 'M 0 0 a '+markersize+' '+markersize+' 0 1 0 .000000001z';
                return (
                  "M " +
                  markersize +
                  " 0 a " +
                  markersize +
                  " " +
                  markersize +
                  " 0 1 0 0.00001 0z"
                );
              } else {
                console.warn("no coords for " + d.title);
              }
            })
            .attr("transform", function (d) {
              if (d.coordinates) {
                d.startx = d.coordinates[0];
                d.starty = d.coordinates[1];
                d.initialTransform =
                  "translate(" +
                  (d.coordinates[0] - markersize / 2) +
                  "," +
                  (d.coordinates[1] - markersize / 2) +
                  ")";
                return d.initialTransform;
              }
            })
            //.attr("style", "transform-origin: "  + "px " + markersize/2 + "px")
            .attr("id", function (d) {
              return d.id;
            })
            .attr("title", function (d) {
              return d.title;
            })
            .attr("stroke-linecap", "square")
            .attr("class", function (d) {
              return "marker" + " marker__" + d.group;
            })
            .on("mouseover", function (e) {
              if (screen.width > 1024) {
                var siblings = $(self.container).find(
                  '.marker[title="' + this.getAttribute("title") + '"]'
                );
                siblings.addClass("hovered");
                showTooltip(this, e);

                var $group = self.container
                  .find(
                    '.markers g[data-title="' +
                      this.getAttribute("title") +
                      '"]'
                  )
                  .first();
                $group.parent().append($group);
              }
            })
            .on("mouseleave", function () {
              if (screen.width > 1024) {
                var siblings = $(self.container).find(
                  '.marker[title="' + this.getAttribute("title") + '"]'
                );
                siblings.removeClass("hovered");
                hideTooltip();
              }
            });

          setTimeout(checkUrl, 300);
        }

        self.svg
          .selectAll(".state__path.state__is-active")
          .on("click", function () {
            if ($(this).hasClass(activeClass)) {
              //$(this).removeClass('zoomed')
              reset();
            } else {
              self.stateSelect.val(this.id);
              self.stateSelect.trigger("change");
            }
          });

        self.svg
          .selectAll(".state__path.state__is-not-active")
          .on("click", function () {
            reset();
          });

        self.svg.selectAll(".marker").on("click", function () {
          self.markerSelect.val(this.id);
          self.markerSelect.trigger("change");
        });

        self.svg.on("click", function () {
          //self.goBack();
          //reset();
        });

        self.back.on("click", function () {
          while (self.currentBackTo) {
            self.goBack();
          }
        });

        //self.prevMarkerButton.on("click",self.prevMarker);
        self.nextMarkerButton.on("click", function () {
          $(this).blur();
          self.nextMarker();
        });

        self.stateSelectMenu = new selectMenu(
          self.container.find(".state_select_menu").first(),
          self.stateSelect
        );

        self.stateSelect
          .removeAttr("disabled")
          .on("mousedown", function (e) {
            if (screen.width > 1024) {
              e.preventDefault();
              e.stopPropagation();
              this.blur();
              self.stateSelectMenu.toggle();
            }
          })
          .on("click", function (e) {
            e.stopPropagation();
          })
          .on("change", function (e) {
            var id = $(this).val();
            var path = self.svg.select("#" + id);
            if (id === self.mapdata.country.entryid) {
              self.useData(findData(id));
            } else {
              clicked(path);
            }
            resizeSelects();
          });

        self.markerSelectMenu = new selectMenu(
          self.container.find(".marker_select_menu").first(),
          self.markerSelect
        );

        self.markerSelect
          .removeAttr("disabled")
          .on("mousedown", function (e) {
            if (screen.width > 1024) {
              e.preventDefault();
              e.stopPropagation();
              this.blur();
              self.markerSelectMenu.toggle();
            }
          })
          .on("click", function (e) {
            e.stopPropagation();
          })
          .on("change", function () {
            var id = $(this).val();
            if (id === "none") {
              self.goBack();
            } else {
              var path = self.svg.select("#" + id);
              markerClicked(path);
            }
            resizeSelects();
          });
        resizeSelects();
        var svg = self.mapwrap.find("svg.project-map-svg");
        var width = svg.width();
        var height = svg.height();
        svg.attr("width", width).attr("height", height);

        window.addEventListener("resize", function () {
          //determineOverflow();
          resizeSelects();

          var svg = self.mapwrap.find("svg.project-map-svg");
          var width = svg.width();
          var height = svg.height();
          svg.attr("width", width).attr("height", height);
        });
        //determineOverflow();

        self.loader.addClass("hidden");

        if (options.callback) {
          self.callback = options.callback;
          self.callback();
        }

        var maploaded = document.createEvent("Event");
        maploaded.initEvent("maploaded", true, true);
        window.dispatchEvent(maploaded);

        if (self.options.zoomState) {
          self.clonesvg = clone(self.svg.node());
          var svgclone = self.clonesvg.node();

          var blur = { value: "blur(0px)" };

          blurCloneMap = new TimelineMax({ paused: true });
          blurCloneMap.to(svgclone, transitionTime / 1000, { autoAlpha: 0.3 });
          blurCloneMap.to(
            blur,
            transitionTime / 1000,
            {
              value: "blur(10px)",
              onUpdate: function () {
                svgclone.style.filter = blur.value;
              },
            },
            0
          );
          window.a = blurCloneMap;

          var maps = self.container.find(".project-map-svg");

          maps.each(function (i) {
            var $this = $(this);
            if (i === 0) {
              $this.find(".state__path").css({ transition: "none" });
            }
            $this.css({ zIndex: maps.length - i });
          });
        }
      });
    };

    this.interacted = false;
    this.firstInteraction = function () {
      self.interacted = true;
    };

    this.goBack = function () {
      $(self.container).find(".marker.active").removeClass("active");
      if (self.currentBackTo) {
        if (typeof self.currentBackTo._groups !== "undefined") {
          self.useData(self.currentBackTo.datum(), self.mapdata.country);
        } else {
          self.useData(findData(self.currentBackTo.entryid));
        }
      }
    };

    this.nextMarker = function () {
      var node = self.currentMarker.node();
      var parent = node.parentNode;
      var newMarker = parent.parentNode.firstChild.firstChild;
      markerClicked(d3.select(newMarker));
      self.markerSelect.val(newMarker.id);
      resizeSelects();
    };

    this.surfaceStates = function (group) {
      self.container
        .find('.state__path[data-toggle-group="' + group + '"]')
        .each(function () {
          self.svg.select(".states").node().appendChild($(this).parent()[0]);
        });
    };

    var selectMenu = function ($menu, $select) {
      var innerself = this;

      this.menu = $menu;

      this.toggle = function () {
        if (innerself.menu.hasClass("open")) {
          innerself.close();
        } else {
          innerself.open();
        }
      };

      this.open = function () {
        closeMenu();
        innerself.menu.addClass("open");
        $("body").one("click", innerself.close);
      };

      this.close = function () {
        innerself.menu.removeClass("open");
        $("body").off("click", innerself.close);
      };

      this.initButtons = function () {
        innerself.menu.find(".map_select_button").on("click", function () {
          $select.val(this.dataset.option);
          $select.trigger("change");
          innerself.close();
        });
      };

      this.initButtons();
    };

    function closeMenu() {
      self.container.find(".map_select_menu.open").removeClass("open");
    }

    function showTooltip(elem, event) {
      if (window.innerWidth > 1024) {
        if (elem.getAttribute("class").indexOf("marker") !== -1) {
          var d = d3.select(elem).datum();
          var bbox = elem.getBBox();
          var scaler = markersize;
          var center = [
            d.startx - scaler + bbox.width / 2,
            d.starty - scaler + bbox.height / 2,
          ];
        } else {
          var center = self.path.centroid(d3.select(elem).datum());
        }

        var xscale = self.mapwrap.outerWidth() / width;
        var yscale = self.mapwrap.outerHeight() / height;

        self.tooltip.css({
          top: (center[1] * self.scale + self.translate[1] - 15) * yscale,
          left: (center[0] * self.scale + self.translate[0]) * xscale,
        });
        var data = d3.select(elem).datum();
        self.tooltiptitle.html(data.title);
        self.tooltipsubtitle.html(data.subtitle);
        if (
          !data.subtitle ||
          (typeof data.subtitle === "String" && data.subtitle.strip() === "")
        ) {
          self.tooltipsubtitle.addClass("hide");
        } else {
          self.tooltipsubtitle.removeClass("hide");
        }
        self.tooltip.addClass("show");
      }
    }

    function hideTooltip() {
      self.tooltip.removeClass("show");
    }

    function findData(id) {
      if (self.mapdata.country.entryid == id) {
        return self.mapdata.country;
      }

      var stack = self.mapdata.states;
      var i = 0,
        l = stack.length;
      for (; i < l; i++) {
        if (stack[i].entryid == id) {
          return stack[i];
        }
        if (Array.isArray(stack[i])) {
          var stack = stack[i];
          var i = 0;
          l = stack.length;
          for (; i < l; i++) {
            if (stack[i].entryid == id) {
              return stack[i];
            }
          }
        }
      }
      return false;
    }

    function checkUrl() {
      if (window.location.href.indexOf("selectmap=") > 0) {
        var params = window.location.href.split("selectmap=")[1];
        var stateId = params ? params.split(":")[0] : null;
        var markerId = params ? params.split(":")[1] : null;

        if (stateId) {
          var statePath = self.svg.select("#state_" + stateId);
          clicked(statePath);

          var map = self.svg.node();
          window.scrollTo(0, $(map).offset().top);

          if (markerId) {
            var markerPath = self.svg.select("#marker_" + markerId);
            setTimeout(function () {
              markerClicked(markerPath);
            }, 100);
          }
        }
      }
    }

    function clicked(path) {
      self.firstInteraction();
      if (d3.event) {
        //d3.event.stopPropagation();
      }
      console.log("click");
      hideTooltip();

      closeMenu();
      if (active.node() && path.node()) {
        active.classed(activeClass, false);

        if (active.node().id === path.node().id) {
          return self.goBack();
        } else {
          /*
					while (self.currentBackTo) {
						self.goBack();
					}
					if (d3.event) {
						return;
					}
*/
        }
      }

      var d = path.datum();

      var data = findData(d.entryId);
      self.markerSelect.find(":not([value=none])").remove();
      self.markerSelectMenu.menu
        .find('.map_select_button:not([data-option="none"])')
        .parent()
        .remove();
      data.markers.forEach(function (marker) {
        self.markerSelect.append(
          '<option value="' + marker.id + '">' + marker.title + "</option>"
        );
        self.markerSelectMenu.menu.append(
          '<div class="map_select_button_wrap"><button class="map_select_button" data-option="' +
            marker.id +
            '">' +
            marker.title +
            "</button></div>"
        );
        self.markerSelectMenu.initButtons();
      });

      if (self.markerSelect.find("option").length <= 1) {
        self.markerSelect.addClass("hide");
      } else {
        self.markerSelect.removeClass("hide");
      }

      active.classed(activeClass, false);
      active = path.classed(activeClass, true);

      if (self.options.zoom) {
        zoom();
      }

      self.surfaceStates(d.toggleGroup);
      setTimeout(function () {
        self.useData(d, determineBackTo(d));
      }, 100);

      var markersSelector = '.markers g[data-state="' + d.title + '"] .marker';
      var $markers = $(markersSelector);

      $(".markers .marker").removeClass("marker__selectable");
      $markers.addClass("marker__selectable");
      if (!data.body || data.body.trim() == "") {
        if ($markers.length) {
          var marker = d3.select(markersSelector);
          self.markerSelect.val(marker.datum().id);
          setTimeout(function () {
            self.markerSelect.trigger("change");
          }, 100);
        }
      }

      self.stateLegend.attr("aria-hidden", true);
      self.markerLegend.attr("aria-hidden", false);

      self.container.addClass(activeClass);

      function zoom() {
        var bounds = self.path.bounds(d),
          dx = bounds[1][0] - bounds[0][0],
          dy = bounds[1][1] - bounds[0][1],
          x = (bounds[0][0] + bounds[1][0]) / 2,
          y = (bounds[0][1] + bounds[1][1]) / 2,
          scale =
            (self.options.zoomRatio * 0.9) / Math.max(dx / width, dy / height),
          translate = [width / 2 - scale * x, height / 2 - scale * y];

        if (self.options.zoomState) {
          self.svg.selectAll(".state__path").attr("opacity", 0);

          active.attr("opacity", 1);

          blurCloneMap.play();
        }

        self.svg
          .selectAll(".states,.markers")
          .transition()
          .duration(transitionTime)
          .attr(
            "transform",
            "translate(" + translate + ") scale(" + scale + ")"
          );

        self.svg.selectAll(".marker").attr("transform", function (d) {
          if (d.initialTransform) {
            var thescale =
              "scale(" +
              (window.innerWidth > 1024 ? 1 / scale : (1 / scale) * 1.5) +
              ")";
            var scaler = markersize / scale;
            var transform =
              "translate(" +
              (d.startx - scaler) +
              " " +
              (d.starty - scaler) +
              ") " +
              thescale;
            return transform;
          }
        });

        self.translate = translate;
        self.scale = scale;
      }
    }

    function reset() {
      self.stateSelect.val(self.stateSelect.find("option:first").val());

      closeMenu();

      $(".markers .marker").removeClass("marker__selectable");

      active.classed(activeClass, false);
      active = d3.select(null);
      self.svg
        .selectAll(".states,.markers")
        .transition()
        .duration(transitionTime)
        .attr("transform", "")
        .on("end", function (d) {
          self.svg.selectAll(".state__path").attr("opacity", 1);
        });

      self.svg.selectAll(".marker").attr("transform", function (d) {
        if (d.initialTransform) {
          return d.initialTransform;
        }
      });

      if (self.options.zoomState) {
        blurCloneMap.reverse();
      }

      self.container.removeClass(activeClass);

      self.translate = [0, 0];
      self.scale = 1;

      self.stateLegend.attr("aria-hidden", false);
      self.markerLegend.attr("aria-hidden", true);

      resizeSelects();
    }

    function markerClicked(path) {
      if (d3.event) {
        d3.event.stopPropagation();
      }

      self.currentMarker = path;

      var d = d3.select(path.node().parentNode).datum();

      var siblings = $(self.container).find(
        '.marker[title="' + path.node().getAttribute("title") + '"]'
      );
      $(self.container).find(".marker.active").removeClass("active");
      siblings.addClass("active");

      var $group = self.container
        .find(
          '.markers g[data-title="' + path.node().getAttribute("title") + '"]'
        )
        .first();
      $group.parent().append($group);

      self.useData(d, determineBackTo(d));

      if (active.node() && d) {
        var statenum = active.node().id.split("_")[1];
        var markerid = d.id.split("_")[1];
        var currPath = window.location.href;
        var noquerystring = currPath.indexOf("?") === -1;
        var updatedPath = currPath
          .split("selectmap=")[0]
          .concat(
            (noquerystring ? "?" : "") +
              "selectmap=" +
              statenum +
              ":" +
              markerid
          );
        window.history.pushState({}, "", updatedPath);
      }
    }

    function determineBackTo(result) {
      switch (result.level) {
        case 1:
          return self.mapdata.country;
          break;
        case 2:
          var state = d3
            .select("#" + result.id)
            .node()
            .parentNode.parentNode.getAttribute("data-state");
          var data = d3.select('.state__path[data-name="' + state + '"]');
          if (!data.datum().body) {
            return self.mapdata.country;
          }
          return data;
          break;
        default:
          return null;
      }
    }

    function resizeSelect($select, $temp, other) {
      other = other || null;

      $temp.html($select.find("option:selected").clone());
      if ($select.hasClass("as-title")) {
        $temp.addClass("as-title");
      } else {
        $temp.removeClass("as-title");
      }

      var width = $temp.width();

      if (other) {
        var diff = $select.parent().outerWidth(true) - $select.parent().width();
        var maxwidth =
          other.container.outerWidth(true) -
          other.select.outerWidth(true) -
          diff;

        if ($temp.outerWidth(true) > maxwidth) {
          width = maxwidth - ($select.outerWidth(true) - $select.width());
          var $parent = $select.parent();
          width -= diff;
        }
      }

      if ($(window).width() <= 768) {
        width = "100%";
      }

      $select.width(width);
    }

    function resizeSelects() {
      resizeSelect(self.stateSelect, self.tempSelect);
      resizeSelect(self.markerSelect, self.tempSelect);
    }

    function clone(node) {
      return d3.select(
        node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling)
      );
    }

    self.init();
  };
})(window);

(function(window) {
  "use strict";

  var VERA = window.VERA || {};

  window.VERA = VERA;

  VERA.initPercentagePeopleData = function() {
    $('.percentage-people-visualization:not(.percentage-people-visualization-initialized)').each(function(i,elem) {
      initPercentagePeople(elem)
    });
  }

  function initPercentagePeople(elem) {
    var
      INTERVAL = 3000,
      shifts = JSON.parse(elem.dataset.percentagePeopleShifts),
      pathString,
      pWidth,
      pHeight,
      data,
      shiftIndex=0,
      currentShift=shifts[shiftIndex],
      ran=false

    elem.classList.add('percentage-people-visualization-initialized')

    var pointType = elem.dataset.pointType
    switch (pointType) {
      case 'person':
          pathString = "M18 26V11c0-1.2-1-2.2-2.2-2.2h-4.7l.8-5.1c.1-.2.1-.4.1-.6V3c0-1.6-1.4-3-3-3-1.7 0-3 1.3-3 3v.1c0 .2 0 .4.1.6l.8 5.1H2.2C1 8.8 0 9.8 0 11v16.5c0 1.8.8 2.9 2.3 3.1v-.9C.8 29.5.9 27.5.9 27.5h1.4V12.6h.9v35.6c-.9.3-1.9.8-1.9 1.7h7.3v-19h.9V50h7.3c0-.9-1-1.5-1.9-1.7V12.7h.9v14.8h1.4s.1 2-1.4 2.2v.9c1.5-.2 2.3-1.3 2.3-3.1L18 26z",
          pWidth = 18,
          pHeight = 50
        break;
      default:
    }

    var cols = 20,
      rows = 100/cols,
      xPad = 4,
      yPad = 4,
      pointWidth = pWidth + xPad*2,
      pointHeight = pHeight + yPad*2

    var
      width = cols*pointWidth,
      height = rows*pointHeight

    var svg = d3.select(elem).select('.data-viz-fact-visualization').append('svg')
      .attr("width",width).attr("height",height)
      .attr("viewBox","0 0 "+width+" "+height)

    var captions = elem.querySelectorAll('.data-viz-fact-caption');

    var win = $(window);
    var viewport = {
      top : win.scrollTop(),
      left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    d3.select(elem).selectAll('.data-viz-fact-caption').attr("style", "transition-duration: " + INTERVAL/1000 + 's')

    update(data,shifts[shiftIndex])

    window.addEventListener('scroll', _.throttle(setIntervals, 500))

    function setIntervals() {
      var parent = $(elem).parent()
      var elementTop = parent.offset().top;
      var elementBottom = elementTop + parent.outerHeight();

      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && (elementTop - 250) < viewportBottom) {
        if (elem.classList.contains('is-animating')) return;
        elem.classList.add('is-animating')
        elem.intervalSet = setInterval(update, INTERVAL)
      } else {
        if (!elem.classList.contains('is-animating')) return;
        elem.classList.remove('is-animating')
        clearInterval(elem.intervalSet)
      }
    }

    function update() {
      d3.select(captions[shiftIndex]).classed('is-active', false)
      shiftIndex++
      if (shiftIndex >= shifts.length) {
        shiftIndex = 0
      }
      d3.select(captions[shiftIndex]).classed('is-active', true)
      var reverse = currentShift.percentageHighlighted < shifts[shiftIndex].percentageHighlighted

      currentShift = shifts[shiftIndex]
      data = []
      for (let i=0; i<100; i++) {
        data.push({
          highlight: i>=(100 - currentShift.percentageHighlighted)
        })
      }

      var points = svg
        .selectAll(".point")
        .data(data)

      var enter = points.enter()
        .append('path')
        .attr('d', pathString)
        .attr('class', 'point receives-fill-color')
        .attr('transform', function(d,i) {
          var
            row = i%rows,
            col = Math.floor(i/rows)

          return 'translate(' + (col*(pointWidth) + xPad) + ',' + (row*pointHeight + yPad) + ')'
        })

      points.merge(enter)
        .transition()
        .delay(function(d,i,n) {
          return reverse ? (n.length*20 - i*20) : i*20
        })
        .attr('class', function(d,i) {
          return 'point receives-fill-color' + (d.highlight ? ' will-highlight receives-fill-highlight' : '')
        })

      points.exit().remove()
    }
  }
})(window);

(function() {
//closure

window.addEventListener("load", function() {
  init()
})

const init = function() {
  var containers = document.querySelectorAll('.scrolling-slideshow');
  [].forEach.call(containers, (container) => {
    new initSlideshow(container);
  })
}

const initSlideshow = function(container) {

  var slides = container.querySelectorAll('.scrolling-slideshow-item'),
    slideCount = slides.length

  let
    currentSlideIndex,
    currentSlide

  if (!slideCount) {
    console.log("No slides");
    return
  }

  const initSlides = (slides) => {
    const sm = new ScrollMagic.Controller();

    console.log(container)

    new ScrollMagic.Scene({
      triggerElement: container,
      triggerHook: 0,
      offset: $('.header').height()/2
    })
      .addTo(sm)
      .setClassToggle(container, 'active')
      ;

    //init videos
    [].filter.call(slides, function(slide) {
      const media = slide.querySelector('.scrolling-slideshow-item-media')
      const video = media.querySelector('video');
      if (video) {
        video.setAttribute('autoplay', true);
        video.setAttribute('loop', true);
      }
      new ScrollMagic.Scene({
        triggerElement: slide,
        duration: window.innerHeight
      })
        .on("enter", function() {
          media.classList.add("active")
          if (video) {
            video.play()
          }
        })
        .on("leave", function() {
          media.classList.remove("active")
          if (video) {
            video.pause()
          }
        })
        .addTo(sm)
    })
  }

  initSlides(slides)
}
//closure
})();

$(function () {
 
  const searchbtn = document.querySelector('.contentInput-search');

    if(document.querySelector('.sj-content')){
      // INPUT 
      searchbtn.addEventListener("click", e=>{
        console.log("opciones : ", optionSelected);
      //  buildtableJobs(fakedata);
      });


    }
    

    function buildtableJobs(data) {
      let tbody = tablejobs.querySelector('tbody');
    //  let newdata = _.groupBy(data, 'typejob');
      tbody.innerHTML = "";


      $(tbody).append(`
        <tr class="tableJob_headline">
                    <th colspan="4" scope="colgroup" class="text-star p-4">Permanent positions</th>
          </tr>
        `);
      newdata.permanent.forEach(inforow => {
        $(tbody).append(`
        <tr class="tableJob_row">
          <td scope="row">
            <p class="title">${inforow.position}</p>
            <p class="label">Team: ${inforow.team}</p>
          </td>
          <td>${inforow.type}</td>
          <td>${inforow.location}</td>
          <td> <a href="${inforow.url}" class="theButton"><span>Apply Now</span></a></td>
        </tr>
        `)
      });
      $(tbody).append(`
        <tr class="tableJob_headline">
                    <th colspan="4" scope="colgroup" class="text-star p-4">Temporary positions</th>
          </tr>
        `)
      newdata.temporary.forEach(inforow => {
        $(tbody).append(`
        <tr class="tableJob_row">
          <td scope="row">
            <p class="title">${inforow.position}</p>
            <p class="label">Team: ${inforow.team}</p>
          </td>
          <td>${inforow.type}</td>
          <td>${inforow.location}</td>
          <td> <a href="${inforow.url}" class="theButton"><span>Apply Now</span></a></td>
        </tr>
        `)
      });
    }
   
  
});
 
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
(function(window){
  "use-strict";

  var VERA = window.VERA || {};
  VERA.initSidebar = initSidebar;
  window.VERA = VERA;

  var els = {};

  function initSidebar() {
    els.$article = $('.js-subnav-anchor');
    els.$link = $('.js-subnav-link');
    els.$container = $('.js-has-subnav');
    els.$nav = $('.sidebar-subnav')
    els.$header = $('header.header')

    els.$link.on('click', goToSection)

    setActive();

    window.addEventListener('scroll', _.throttle(setActive, 50))
  }

  function goToSection(e) {
    var current = e.currentTarget;
    var href = current.dataset.target;

    $('html, body').animate({
      scrollTop: $('#' + href).offset().top - els.$header.height()
    });
  }

  function setActive() {
    var pageOffset = window.pageYOffset;
    var elOffset = els.$container.offset().top

    if ((pageOffset >= elOffset) && (pageOffset <= elOffset + els.$container.height())) {
      els.$nav.addClass('is-fixed')
    } else {
      els.$nav.removeClass('is-fixed')
    }

    els.$link.each(function(i, el){
      var reference = el.dataset.target;
      var parentEl = el.parentElement;
      var section = document.getElementById(reference);

      if(pageOffset >= $(section).offset().top - 200) {
        parentEl.classList.add('is-active')
      } else {
        parentEl.classList.remove('is-active')
      }
    })
  }

})(window);

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
(function (window) {
  "use strict";

  var VERA = window.VERA || {};

  window.VERA = VERA;

  $(function () {
    VERA.sm = VERA.sm || new ScrollMagic.Controller();
    VERA.article = new Article();
  });

  var Article = function () {
    var self = this;
    this.headers = $('.featured-banner.editorial:not(.show-on-print)');

    // console.log(this, 'this?')

    if (this.headers.length) {
      this.headers.each(function () {
        var scroll = $(this).filter('.editorialIntroduction').length ? true : false;
        header(this, scroll);
      });
    }

    var $dropdown = $('.dropdown');
    var $dropdownOuter = $('.dropdown-outer');
    var $dropdownCurrent = $dropdownOuter.find('.dropdown-active');
    var $radialNav = $('.header__menu-radial');
    var $headerTiles = $('.header-tiles')

    intialSetRadialNavChapter()

    //TODO I think we don't need this because scrollmagic initializes (DV 7/18/18)
    if (window.location.hash) {
      $dropdown.find('.anchor-link.active').removeClass('active');
      var $currentAnchor = $('.anchor-link[href="' + window.location.hash + '"]');
      $currentAnchor.addClass('active');
      $dropdownCurrent.text($currentAnchor.data('chapter'));
    }

    if ($('.article p img').length) {
      if ($('.article p img').css('float') === 'left') {
        $('.article p img').addClass('c-figure--left')
      }

      if ($('.article p img').css('float') === 'right') {
        $('.article p img').addClass('c-figure--right')
      }
    }

    $('.anchor-link').on("click", function (e) {

      e.preventDefault();

      var $this = $(this);

      changeChapter($this, true);

      $dropdownOuter.removeClass('open');
      $headerTiles.removeClass('mainnav-open');

    });

    $('.share-overlay .icon-print').on("click", function (event) {
      event.preventDefault();
      window.print();
    });


    if (!$('.campaignSlide').length || $('.touch').length) {

      // don't use scroll magic for campaign
      $('.anchor--chapter').each(function () {

        var $this = $(this);
        var $link = $('.anchor-link[href="#' + $this.attr('id') + '"]');
        var $prev = $('.anchor-link[href="#' + $this.prevAll('.anchor--chapter').first().attr('id') + '"]');

        var scene = new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: .5
        })
          .on('enter', function () {
            changeChapter($link);
          })
          .on('leave', function () {
            changeChapter($prev);
          })
          .addTo(VERA.sm)
          ;


      });

      // Update radial nav
      window.addEventListener('scroll', _.throttle(animateRadialNav, 500))
    }

    function intialSetRadialNavChapter() {
      if (!$radialNav.length) return;

      var $articles = $('article[data-anchor-link]');
      $articles.each(function (i, el) {
        if ($(el).hasClass('active')) {
          if ($(el).hasClass('js-hide-radial-nav')) {
            $radialNav.addClass('is-intro')
          } else {
            $radialNav.removeClass('is-intro')
          }
          updateRadialNavChapter(i)
        }
      })
    }

    function animateRadialNav() {
      if (!$radialNav.length) return;

      var $articles = $('article[data-anchor-link]');
      var $introArticle = $articles.filter('.js-hide-radial-nav');
      var currentEl = $articles.first();
      var index = 1;
      if ($introArticle.length) {
        var scrollPerc = window.pageYOffset - $introArticle.outerHeight() + $('header').outerHeight() + $('footer').outerHeight();
      } else {
        var scrollPerc = window.pageYOffset + $('header').outerHeight() + $('footer').outerHeight();
      }
      $radialNav.removeClass('is-intro');

      $articles.each(function (i, el) {
        var elementTop = $(el).offset().top;
        var elementBottom = elementTop + $(el).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        // get element currently in viewport
        if (elementBottom > viewportTop && elementTop < viewportBottom) {
          if ($articles.hasClass('js-hide-radial-nav')) {
            index = i;
          } else { index = i + 1; }
          currentEl = el;

          if ($(currentEl).hasClass('js-hide-radial-nav')) {
            $radialNav.addClass('is-intro')
          } else {
            $radialNav.removeClass('is-intro')
          }
        }
      })

      var $articlesArray = $articles.not('.js-hide-radial-nav');
      // TODO: refactor and use for loop instead of if / else below
      // for (var c = 1; c < $articles.length; c++) {
      // 	if (index > 1) {
      // 		scrollPerc = scrollPerc - $($articlesArray[index - 1]).prevAll('article[data-anchor-link]').outerHeight();
      // 		// $articlesArray.each(function(i, el){
      // 		// 	scrollPerc = scrollPerc - el
      // 		// })
      // 		// scrollPerc = scrollPerc - ($($articles[index - 1]).outerHeight())
      // 	}
      // }

      if (index === 2) {
        scrollPerc = scrollPerc - $($articlesArray[0]).outerHeight();
      } else if (index === 3) {
        scrollPerc = scrollPerc - $($articlesArray[0]).outerHeight() - $($articlesArray[1]).outerHeight();
      } else if (index === 4) {
        scrollPerc = scrollPerc - $($articlesArray[0]).outerHeight() - $($articlesArray[1]).outerHeight() - $($articlesArray[2]).outerHeight();
      } else if (index === 5) {
        scrollPerc = scrollPerc - $($articlesArray[0]).outerHeight() - $($articlesArray[1]).outerHeight() - $($articlesArray[2]).outerHeight() - $($articlesArray[3]).outerHeight();
      }

      // mobile styles
      if (window.innerWidth < 700) {
        if ($(currentEl).prev().attr('id') == 'introduction') {
          $radialNav.addClass('is-intro')
        } else {
          $radialNav.removeClass('is-intro')
        }

        if ($articles.hasClass('special-reports-chapter')) {
          index -= 1
        }
      }

      updateRadialNavChapter(index)

      var $circle = $('.circle');
      if (percentScrolled(currentEl, scrollPerc) > 0)
        $circle.attr('stroke-dasharray', percentScrolled(currentEl, scrollPerc) + ', 100')
    }

    function updateRadialNavChapter(index) {
      var currentChapter = $radialNav.find('.current-chapter')
      if (index < 1) index = 1
      currentChapter.html(index)
    }

    function percentScrolled(article, scrollDistance) {
      var $articleHeight = $(article).height();
      var percentScrolled = scrollDistance / $articleHeight;

      return Math.floor(percentScrolled * 100);
    }

    function changeChapter($anchorLink, scroll) {

      scroll = scroll || false;

      if ($dropdown) {
        $dropdown.find('.anchor-link.active').removeClass('active');
        $anchorLink.addClass('active');
        $dropdownCurrent.text($anchorLink.data('chapter'));
      }

      var hash = $anchorLink.attr('href');
      if (hash !== undefined) {
        var id = hash.replace('#', '');
      }

      try {
        if (history.pushState) {
          //history.pushState(null, null, hash);
        } else {
          location.hash = hash;
        }
      } catch (e) {
        console.log(e)
      }

      if (!$('.campaignSlide').length || $('.touch').length) { }

      if (scroll && (!$('.campaignSlide').length || $('.touch').length)) {
        $('html,body').animate({
          scrollTop: $('#' + id).offset().top
        });
      }

    }
  };

  function header(header, scroll) {

    scroll = scroll || false;

    var $header = $(header);
    var $line = $header.find('.line');
    var $title = $header.find('.title');
    var $subtitle = $header.find('.subtitle');
    var $overview = $header.find('.overview');
    var $screen = $header.find('.screen');

    var scene, timer;

    var titleProps = {
      opacity: 1,
      webkitFilter: "blur(0px)",
      filter: "blur(0px)",
      x: 0
    }

    var intro = new TimelineMax({ paused: scroll })
      .to($title, 1, titleProps)
      .to($subtitle, 1, titleProps, 0)

    if (scroll) {

      if ($(window).scrollTop() > 0) {
        intro.time(1);
      } else {
        intro.play();
      }

    } else {

      var scene = new ScrollMagic.Scene({
        triggerElement: header,
        triggerHook: 0.5
      })
        .setTween(intro)
        .addTo(VERA.sm)

    }


    if (scroll) {

      createScene();

      window.addEventListener("resize", function () {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          scene.destroy(true);
          createScene();
        }, 100);
      });

    }

    $header.find('video').on("canplaythrough", function () {
      this.play();
    });


    function createScene() {

      $line.css({ height: "" });

      if (scroll) {
        var timeline = new TimelineMax()
          .to($title, 1, { opacity: 0, webkitFilter: "blur(5px)", filter: "blur(5px)", delay: 1 })
          .to($subtitle, 1, { opacity: 0, webkitFilter: "blur(5px)", filter: "blur(5px)", delay: 1 }, 0)
          .to($line, .5, { height: 0 })
          .to($line, .2, { opacity: 0, delay: .3 })
          .to($screen, .25, { opacity: .5 })
          .to($overview, .25, { opacity: 1, delay: .5 })

      }

      scene = new ScrollMagic.Scene({
        triggerElement: header,
        offset: getHeaderHeight(),
        triggerHook: 0,
        duration: '100%'
      })
        .setPin(header)
        .setTween(timeline)
        .addTo(VERA.sm)

      $header.find('video').each(function () {
        this.play();
      });

      function getHeaderHeight() {

        return -$('.header').height();

      }

    }
  }

})(window);

(function() {
  "use strict"

  var VERA = window.VERA || {};
  VERA.sm = VERA.sm || new ScrollMagic.Controller();
  VERA.textSlideshow = init;
  window.VERA = VERA;

  var $body = $('body'),
    $container,
    $slide,
    slideTween

  function init(callback) {
    $container = $('.article-text-slideshow')
    $slide = $container.find('.article-text-slide')

    $slide.each(function(i, el) {
      var $animatableEl = $(el).find('.article-text-slide__wrapper')

      const
        startProps = {
          autoAlpha: 0,
          y: 10,
          webkitFilter: 'blur(10px)',
          filter:'blur(10px)'
        },
        endProps = {
          autoAlpha: 1,
          y: 0,
          webkitFilter: 'blur(0px)',
          filter:'blur(0px)'
        }

      TweenLite.set($animatableEl, startProps)

      var animation = new TimelineLite()
        .to($animatableEl, 1, endProps)
        .to($animatableEl, 1, startProps, "+=1")


      var scene = new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 0.5,
        duration: '100%'
      })
      .setTween(animation)
      .addTo(VERA.sm)
     //.addIndicators()
    });
  }

  window.addEventListener("resize", function() {})

  function getScreenDuration() {
    return $slide.height()*0.85
  }

})();

(function() {
//closure

window.addEventListener("load", function() {
  init()
})

const
  DEFAULT_SLIDE_TIME = 4000,
  LONG_SLIDE_TIME = 5500

let
  slideTime = DEFAULT_SLIDE_TIME

const init = function() {
  var containers = document.querySelectorAll('.timed-slideshow');
  [].forEach.call(containers, (container) => {
    new initSlideshow(container);
  })
}

const initSlideshow = function(container) {

  let fadeTl;

  let
    scrollDownOnComplete = false,
    resetOnScrollTo = true

  var
    $scroller = $('html,body'),
    slides = container.querySelectorAll('.timed-slideshow-item'),
    slideCount = slides.length,
    options = JSON.parse(container.dataset.options)

  let
    currentSlideIndex,
    currentSlide

  let slideTimer

  if (!slideCount) {
    console.log("No slides");
    return
  }

  if (options.asHero) {
    scrollDownOnComplete = true,
    resetOnScrollTo = true
  }

  if (resetOnScrollTo) {
    const sm = new ScrollMagic.Controller()

    new ScrollMagic.Scene({
      triggerElement: container,
      triggerHook: 0.5,
      duration: container.getBoundingClientRect().height
    })
    .on('enter', (event) => {
      startOver()
    })
    .addTo(sm)
  }

  let continueShow = true
  const nextSlide = function() {
    currentSlideIndex++;
    if (currentSlideIndex >= slideCount) {
      currentSlideIndex = 0;

      if (scrollDownOnComplete) {
        const rect = container.getBoundingClientRect(),
          scrollTo = +rect.height + $(container).offset().top

        if ($scroller.scrollTop() < rect.height) {
          $scroller.animate({
            scrollTop: scrollTo
          })
        }
        continueShow = false;
      }
    }
    if (continueShow) {
      currentSlide = changeSlide(currentSlide, slides[currentSlideIndex])
    }
  }

  const startOver = () => {
    if (slideTimer) { clearTimeout(slideTimer)}
    if (fadeTl) {
      fadeTl.pause().clear()
    }
    currentSlideIndex = -1
    currentSlide = null
    continueShow = true
    TweenLite.set(slides, { autoAlpha: 0 })

    const videos = container.querySelectorAll('video');
    [].forEach.call(videos, (video) => {
      video.pause()
    })

    nextSlide()
  }

  const initSlides = (slides) => {
    //init videos
    [].filter.call(slides, function(slide) {
      var video = slide.querySelector('video')
      if (video) {
        var onEnd = function() {
          video.pause()
          nextSlide()
        }
        video.addEventListener('ended', onEnd)
      }
    })
  }

  const changeSlide = (prev,next) => {

    var video = next.querySelector('video');
    var copy = next.querySelector('.heading');

    if (copy !== null) {
      let copyLength = copy.innerHTML.length
      if (copyLength > 150) {
        slideTime = LONG_SLIDE_TIME
      }
    }

    fadeTl = new TimelineLite({
      paused: true,
      onComplete: video === null ? function() {
        slideTimer = setTimeout(function() {
          nextSlide()
        }, slideTime)
      } : null
    });

    if (prev) {
      fadeTl.to( prev, 1, { autoAlpha: 0 })
    }
    fadeTl.to( next, 1, { autoAlpha: 1 })

    if (video) {
      video.currentTime = 0;
      video.play()
    }

    fadeTl.play()

    return next
  }

  initSlides(slides)
  startOver()
}
//closure
})();


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
function UsStateTable ({
  selector,
  cmsData,
  csvUrl
}) {
  d3.csv(csvUrl, function(error,data) {
    if (error) { return null }

    update()
    window.addEventListener("resize", function() {
      update()
    })
    
    function update() {
      let columns = determineColumns()
      const container = d3.select(selector)
      container.html(null)
      const chunked = _.chunk(data,Math.ceil(data.length/columns));
      chunked.forEach(data => makeTable(container,data))
    }

    function determineColumns() { 
      if (!window || !window.matchMedia) { return 1 }
      
      if (window.matchMedia(`(min-width: 650px)`).matches) {
        return 2
      }
      return 1
    }
  })

  function makeTable(container, data) {
    const table = container
      .append("table")
      .attr("class","table__topx")
      .attr("style","width: auto;")
      .append("tbody")

    const th = table.append("tr")
    th.append("th").text("State")
    th.append("th").text("PDF")
    th.append("th").text("Total Incarceration")
      
    const rows = table.selectAll(".row")
      .data(data)
      .enter()
      .append("tr")
      .attr("class","row")

    rows.append("td")
      .append("div")
      .attr("style", "display: flex; justify-content: space-between")
      .html(function(d) { 
        let html = ``
        const stateData = cmsData[d["state"]]
        html += stateData 
          ? `<a href="${stateData.url}">${d["state_name"]}</a>` 
          : d["state"]
        
        return html
      })

    const pdfs = rows.append("td")
      .attr("style", "text-align: center")
      .html(function(d) {
        const stateData = cmsData[d["state"]]
        if (stateData) {
          return `
            <a class="download" href="${stateData.pdfUrl}" 
              onclick="ga('send','pageview','${stateData.pdfUrl}')"
              target="_blank" 
              rel="noopener noreferer">
              <span class="icon-doc"></span>
            </a>
          `
        }
      })

    rows.append("td")
      .text(function(d) { return (+d["total_state_incarceration_2015"]).toLocaleString(undefined,{ maximumFractionDigits: 0 }) })
  }
}
function UsMap({
  selector
}) {
  return new Promise(function(resolve,reject) {
    const svg = d3.select(selector)

    d3.json("/dist/map/us.json", function(error, us) {
      if (error) throw error;
  
      const width = 960
      const height = 600
      const projection = d3.geoAlbersUsa()
        .translate([width/2, height/2])
        .scale([1250])
      const path = d3.geoPath().projection(projection)
      
      //setup svg
      svg.attr("viewBox", "0 0 " + width + " " + height)
      svg.attr("style", "display: block;")
  
      //add states
      const g = svg.append("g")
        .attr("class", "states")
        
      const states = g.selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter()
        .append("path")
        .attr("vector-effect","non-scaling-stroke")
        .attr("class","state")
        .attr("fill","white")
        .attr("d", path)
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("data-fips", function(d) { return d.id })
        .attr("data-code", function(d) { return d.properties.code })
      resolve(svg)
    });
  })
}

function UsMapIncarcerationRegions({
  map,
  csvUrl,
  highlight,
  cmsData
}) {
  const fill = {
    default: "#fff",
    primary: "#EF4136",
    region: "#f0bab5",
    low: "#e5eff8",
    high: "#67b3d9"
  }
  return new Promise(function(resolve,reject) {
    d3.csv(csvUrl, function(d) {
      const regions = d['states_in_division']
        .replace(/\'|\[|\]|\s/g,'')
        .split(',')
        .map(d => d.trim())
      d.regions = regions
      return d
    }, function(error, data) {
      // const scale = d3.scaleLinear()
      //   .domain(d3.extent(data, function(d) {
      //     return +d["total_state_incarceration_2015"]
      //   }))
      //   .range([fill.low,fill.high])
      
      // const parent = map.node().parentNode
      
      // const keyEl = document.createElement('div')

      // const keyimage = document.createElement('div')
      // keyimage.style.backgroundImage = `linear-gradient(to right, ${fill.low}, ${fill.high})`;''
      // keyimage.style.width = "100%"
      // keyimage.style.height = "20px"
      // keyimage.style.maxWidth = "300px"

      // const keytext = document.createElement('div')
      // keytext.append(document.createElement('div'))

      // key.append(keyimage)
      // parent.insertBefore(keyEl,parent.childNodes[0]);
      // const key = d3.select(keyEl)

      // key.attr('style', `max-width: 300px; margin: 1rem auto; font-size: 12px;`).attr('class','ff-sans')

      // key.append('div')
      //   .attr('style', `
      //     background-image: linear-gradient(to right, ${fill.low}, ${fill.high}); 
      //     width: 100%; 
      //     height: 20px; 
      //   `)

      // const keytext = key.append('div').attr('style', 'display: flex; justify-content: space-between;')
      // keytext.append('div').text(format(scale.domain()[0]))
      // keytext.append('div').text(format(scale.domain()[1]))
      
      const states = map.selectAll('.state')
        
      states.datum(function(d) {
          const datum = data.find(function(datum) { 
            return datum.state === d.properties.code
          })
          if (datum) {
            // datum.fill = scale(+datum["total_state_incarceration_2015"])
            datum.fill = fill.default
            datum.regions = datum.regions.map(region => {
              const regionData = data.find(function(d) { return d.state === region })
              return {
                key: region,
                value: +regionData["total_state_incarceration_2015"]
              }
            })
            d.data = datum
          } else {
            console.log("mising " + d.properties.code)
          }
          return d
        })

      states.attr("fill",determineFill)

      const ttcontainer = d3.select('body')
        .append("div")
        .attr("style", "display: none")
      states
        .attr("data-tooltip-content", function(d) {
          return "#" + "TT" + map.attr('id') + d.properties.code
        })
        .each(function(d) {
          if (d.data) {
            const tt = ttcontainer
              .append("div")
              .attr("class","tooltip-template tooltip--incarceration-regions")
              .attr("id", "TT" + map.attr('id') + d.properties.code)
              
            tt.append("div")
              .text(d.properties.name)
              .attr("class","title")

            const data = tt.append("div").attr("class","data")
            const rate = data.append("div")
            rate.append("div").attr("class","label").text("Total incarceration 2015")
            rate.append("div").attr("class","value").text(format(d.data["total_state_incarceration_2015"]))

            const rank = tt.append("div")
            rank.append("div").attr("class","label").text("Regional Ranking")
            rank.append("div").attr("class","value").text(d.data["regional_rank"])

            const pdfLink = cmsData[d.properties.code] ? cmsData[d.properties.code].pdfUrl : null
            if (pdfLink) {
              const dl = tt.append("div")
              dl.append("a")
                .attr("href", pdfLink)
                .attr("target", "_blank")
                .attr("rel","noopener noreferer")
                .text("Get Fact Sheet")
            }

            // const region = tt.append("div")
            // region.append("div")
            //   .attr("class","label")
            //   .text("Region comparison")

            // const barscale = d3.scaleLinear()
            //   .domain([0,d3.max(d.data.regions, function(d) { return d.value })])
            //   .range([0,100])
            // const height = 3

            // region.append("ul")
            //   .attr("class","value region-list")
            //   .selectAll("li")
            //   .data(d.data.regions.sort((a,b) => b.value - a.value))
            //   .enter()
            //   .append("li")
            //     .classed("color--red", function(state) { 
            //       return d.data.state === state.key.trim()
            //     })
            //     .html(function(d) {
            //       return `
            //         <div>${d.key.trim()}</div>
            //         <svg viewBox="0 0 100 ${height}" preserveAspectRatio="none">
            //           <rect x="0" y="0" width="${barscale(d.value)}" height="${height}" fill="${scale(d.value)}" />
            //         </svg>
            //       `
            //     })
          }
        })


      $(states.nodes()).tooltipster({
        theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
        interactive: true
      })

      if (highlight) {
        highlightState(map.select('[data-code="' + highlight + '"]'))
      }

      let animationTimer
      function startAnimation() {
        animationTimer = setInterval(() => {
          const code = data[Math.floor(Math.random()*data.length)].state
          states.attr("fill",fill.default)
          highlightState(map.select('[data-code="' + code + '"]'))
        }, 1000);
      }
      function stopAnimation() {
        clearInterval(animationTimer)
      }

      if (!highlight) {
        startAnimation()

        map.on("mouseover", function() {
          if (d3.event.target.nodeName !== "path") {
            states.attr("fill",fill.default)
          }
          stopAnimation()
        })
      }
        
      states
        .on("mouseover", function() {
          // states.attr('fill-opacity',0)
          states.attr("fill",fill.default)
          highlightState(d3.select(this));
        })
        .on("mouseout", function(d) {
          // states.attr('fill-opacity',1)
          d3.select(this)
            .attr("fill", determineFill)
            .call(function(d) {     
              const data = d.datum().data
              const regions = data.regions
              if (regions) {
                regions.forEach(region => {
                  map.select('[data-code="' + region.key + '"]')
                    .attr("fill", determineFill)
                })
              }
            })
          
          if (highlight) {
            highlightState(map.select('[data-code="' + highlight + '"]'))
          }
        })
        .on("click", function(d) {
          if (cmsData && cmsData[d.properties.code]) {
            window.location.href = cmsData[d.properties.code].url + window.location.search
          }
        })
    });
  })

  function highlightState(selection) {
    selection
      .attr("fill", fill.primary)
      // .attr('fill-opacity',1)
      .call(function(d) {
        const data = d.datum().data
        const regions = data.regions
        if (regions) {
          regions
            .filter(region => region.key !== data.state)
            .forEach(region => {
              map.select('[data-code="' + region.key + '"]')
                // .attr('fill-opacity',1)
                .attr("fill", fill.region)
            })
        }
      })
  }

  function determineFill(d) {
    return (d.data ? d.data.fill : fill.default)
  }
}


const format = n => (+n).toLocaleString(undefined,{ maximumFractionDigits: 0 })
//console.log('clicky');

 (function() {

	'use strict';

	const ClickyMenus = function(menu) {
		//console.log(menu);
		// DOM element(s)
		let	container = menu.parentElement,
		  	currentMenuItem,
		 	  i,
			  len;

		this.init = function() {
			menuSetup();
			document.addEventListener('mouseover', closeOpenMenu);
		}


		/*===================================================
		=            Menu Open / Close Functions            =
		===================================================*/

		function toggleOnMenuClick( e ) {
			const button = e.currentTarget;
			let acm = null;
			const btn = document.getElementById( button.getAttribute( 'aria-controls' ) );
			if(currentMenuItem !== undefined && currentMenuItem !== false && currentMenuItem !== true){
			  acm = document.getElementById( currentMenuItem.getAttribute( 'aria-controls' ) );
			}
			// close open menu if there is one
			if ( currentMenuItem && button !== currentMenuItem ) {
				toggleSubmenu( currentMenuItem );
			}
			if(btn !== acm && currentMenuItem !== undefined && currentMenuItem !== false && currentMenuItem !== true){
				//close open submenu when is different arial controls
				toggleSubmenu( currentMenuItem );
			}
			
			toggleSubmenu( button );
		};


		function toggleSubmenu( button ) {
			const submenu = document.getElementById( button.getAttribute( 'aria-controls' ) );
			if ( 'true' === button.getAttribute( 'aria-expanded' ) ) { //submenu es open
				button.setAttribute( 'aria-expanded', false );
				submenu.setAttribute( 'aria-hidden', true );
				currentMenuItem = false;
			} else { //submenu es cerrado
				button.setAttribute( 'aria-expanded', true );
				submenu.setAttribute( 'aria-hidden', false );
				preventOffScreenSubmenu( submenu );
				currentMenuItem = button;
			}

		};


		function preventOffScreenSubmenu( submenu ) {
			const 	screenWidth =	window.innerWidth ||
									document.documentElement.clientWidth ||
									document.body.clientWidth,
					parent = submenu.offsetParent,
					menuLeftEdge = parent.getBoundingClientRect().left,
					menuRightEdge = menuLeftEdge + submenu.offsetWidth;

			if ( menuRightEdge + 32 > screenWidth ) { // adding 32 so it's not too close
				submenu.classList.add( 'sub-menu--right' );
			}

		}

		function closeOnEscKey(e) {
			if(	27 === e.keyCode ) {

				// we're in a submenu item
				if( null !== e.target.closest('ul[aria-hidden="false"]') ) {
					currentMenuItem.focus();
					toggleSubmenu( currentMenuItem );

				// we're on a parent item
				} else if ( 'true' === e.target.getAttribute('aria-expanded') ) {
					toggleSubmenu( currentMenuItem );
				}

			}

		}

    function closeOpenMenu( e ) {
			if ( currentMenuItem && ! e.target.closest( '#' + container.id ) ) {
				toggleSubmenu( currentMenuItem );
			}

		};


		/*===========================================================
		=            Modify Menu Markup & Bind Listeners            =
		=============================================================*/
		function menuSetup() {

			menu.classList.remove('no-js');
			menu.querySelectorAll('ul').forEach( ( submenu ) => {

				const menuItem = submenu.parentElement;
				if ( 'undefined' !== typeof submenu ) {

					let button = convertLinkToButton( menuItem );

					setUpAria( submenu, button );

					// bind event listener to button
					button.addEventListener('mouseover', toggleOnMenuClick);
					//button.addEventListener( 'mouseeave', toggleOnMenuClick );
					menu.addEventListener( 'keyup', closeOnEscKey );

				}

			});

		};



    /**
		 * Why do this? See https://justmarkup.com/articles/2019-01-21-the-link-to-button-enhancement/
		 */
		function convertLinkToButton( menuItem ) {

			const 	link = menuItem.getElementsByTagName( 'a' )[0],
					    linkHTML = link.innerHTML,
					    linkAtts = link.attributes,
					    button = document.createElement( 'button' );

			if( null !== link ) {

				// copy button attributes and content from link
				button.innerHTML = linkHTML.trim();
				for( i = 0, len = linkAtts.length; i < len; i++ ) {
					let attr = linkAtts[i];

					if ('href' == attr.name) {
						button.setAttribute("onClick", "linkButtonJZG('"+attr.value+"');");
					} else { 
						button.setAttribute(attr.name, attr.value);
					}
				}
				menuItem.replaceChild( button, link );
			}
			return button;
		}

		function setUpAria( submenu, button ) {

			const submenuId = submenu.getAttribute('id');
			let containerId = container.getAttribute('id');
		

			let id;
			if( null === submenuId ) {
				id = containerId+'-'+ button.textContent.trim().replace(/\s+/g, '-').toLowerCase() + '-submenu';
			} else {
				id = containerId+'-'+ menuItemId + '-submenu';
			}

			// set button ARIA
			button.setAttribute( 'aria-controls', id );
			button.setAttribute( 'aria-expanded', false );

			// set submenu ARIA
			submenu.setAttribute( 'id', id );
			submenu.setAttribute( 'aria-hidden', true );

		}

	}

   
   
   	/* Create a ClickMenus object and initiate menu for any menu with .clicky-menu class */
	document.addEventListener('DOMContentLoaded', function(){
		const menus = document.querySelectorAll( '.clicky-menu' );

		menus.forEach(menu => {
			let clickyMenu = new ClickyMenus(menu);
			clickyMenu.init();
		});

			const itemsmenuclick = document.querySelectorAll(".clicky-menu-item > .no-submenu");
   		itemsmenuclick.forEach( menu => {
					menu.onmouseover = function(e){
					if( e.target.getAttribute('class') === 'no-submenu'){
						const items = $(e.target.parentElement).siblings();
						for (let link of items) {
							var children = link.childNodes;
							for (var i = 0; i < children.length; i++) {
								
								if(children[i].nodeName.toLowerCase() === 'button' && children[i].getAttribute( 'aria-expanded') === 'true' ){
									children[i].setAttribute( 'aria-expanded', false );
									$(".heroType1-container").trigger('mouseover');
								}
								if(children[i].nodeName.toLowerCase() === 'ul' && children[i].getAttribute( 'aria-hidden') === 'false'){
									children[i].setAttribute( 'aria-hidden', true );
									$(".heroType1-container").trigger('mouseover');
								}
							}
						}
					}
				};
			});
	});
	 
	 


}());



function linkButtonJZG(url){
	if (window.innerWidth > 768) {
		location.href = url;
		//  return false;
	} else { 
		return false;
	}
}




document.addEventListener('DOMContentLoaded', function () {

  var contentTag = document.getElementsByTagName('main');
  var isMacLike = /(Mac|iPad)/i.test(navigator.platform);
  var isIOS = /(iPhone|iPod)/i.test(navigator.userAgent) && !window.MSStream;
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1)); 
    }
  }

  if (isIOS) {
    contentTag[0].classList.add('iOS');
  } 

  if (isRetinaDisplay && isMacLike && isSafari) { 
    contentTag[0].classList.add('retina');
  }

});
document.addEventListener('DOMContentLoaded', function () {

  if (document.querySelector('.heroType3')) {

    // Delay Swiper initialization by 2 seconds
    setTimeout(function () {
      var swiper = new Swiper(".homeSlider", {
        direction: "vertical",
        loop: true,
        grabCursor: false, 
        draggable: false, 
        noSwiping: true,
        preventInteractionOnTransition: false,
        allowTouchMove: false, 
        slideToClickedSlide: false,
        preventClicksPropagation: false, 
        preventClicks: false, 
        autoplay: {
          delay: 2700,
        },
        on: {
          init: function () { }
        }
      });
      const underlineFirst = document.querySelector(`.swiper-slide:nth-child(2) > .headingHero > div:nth-of-type(2) > div > .heroUnderline > .heroUnderline-word`);
      const imgFirst = document.querySelector(`.swiper-slide:nth-child(2) > .headingHero >  div:nth-of-type(2) > div > .heroUnderline > img`);

      const wordWidthFirst = underlineFirst.clientWidth + "px";
      const animationStrokeFirst = [{
        width: '0px',
      }, {
        width: wordWidthFirst,
      }];

      imgFirst.animate(animationStrokeFirst, {
        duration: 1300,
        fill: 'both',
        easing: 'cubic-bezier(0.65, 0, 0.35, 1)'
      });

      const animationStroke = [{
          width: '0px',
          position: 'relative',
          top: '0px',
          opacity: 0,
        },
        {
          width: wordWidthFirst,
          position: 'relative',
          top: '-30px',
          opacity: 1,
        }
      ];

      const animationSlideUp = [{
          transform: 'translateY(100px)',
          opacity: 0,
        },
        {
          transform: 'translateY(0px)',
          opacity: 1,

        }
      ];

      swiper.on(`slideChange`, function (e) {

        const index = swiper.activeIndex + 1;
        const title = document.querySelector(`.swiper-slide:nth-child(${index}) > .headingHero > div:first-of-type > div`);
        const subTitle = document.querySelector(`.swiper-slide:nth-child(${index}) > .headingHero > div:nth-of-type(2) > div`);
        const underline = document.querySelector(`.swiper-slide:nth-child(${index}) > .headingHero > div:nth-of-type(2) > div > .heroUnderline > .heroUnderline-word`);
        const img = document.querySelector(`.swiper-slide:nth-child(${index}) > .headingHero >  div:nth-of-type(2) > div > .heroUnderline > img`);
        const wordWidth = underline.clientWidth + "px";

        const animationStroke = [{
          width: '0px',
        }, {
          width: wordWidth,
        }];

        title.animate(animationSlideUp, {
          duration: 450,
          fill: 'both',
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)'
        });

        subTitle.animate(animationSlideUp, {
          duration: 900,
          fill: 'both',
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)'
        });

        img.animate(animationStroke, {
          duration: 1300,
          fill: 'both',
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)'
        });
      });
    }, 3000);


    setTimeout(function () {
      const uFirst = document.querySelector(`.swiper-slide:nth-child(1) > .headingHero > div:nth-of-type(2) > div > .heroUnderline > .heroUnderline-word`);
      const iFirst = document.querySelector(`.swiper-slide:nth-child(1) > .headingHero >  div:nth-of-type(2) > div > .heroUnderline > img`);
      iFirst.style.display = 'block';
      const wFirst = uFirst.clientWidth + "px";
      const aFirst = [{
        width: '0',
      }, {
        width: wFirst,
      }];

      iFirst.animate(aFirst, {
        duration: 450,
        fill: 'both',
        easing: 'cubic-bezier(0.65, 0, 0.35, 1)'
      });
    }, 2000);

  }

});

const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

window.addEventListener("scroll", () => { 
  handleScrollAnimation();
});


document.addEventListener('DOMContentLoaded', function () { 
  
  if (document.body.classList.contains('bc-careers')){ 
    async function loadIntoTable(url, table){
      const tableBody = table.querySelector('tbody');
      axios.get(url).then(function (response) {
        

        
        // Vars
        var optionSelected = [];
        const contenttags = document.querySelector('#JobsearchTags');
        const inputsearch = document.querySelector('.contentInput_search');
        const btnclear = document.querySelector('.contentInput__close');
        // const tablejobs = document.querySelector('.tableJob');
        
        
        // Clear Search Input
        inputsearch.addEventListener("input",e=>{
          if(e.target.value == ''){
            btnclear.style.visibility='hidden';
          }else{
            btnclear.style.visibility='visible';
          }
        });
        
        // Clear
        btnclear.addEventListener("click", e=>{
          inputsearch.value='';
          btnclear.style.visibility = 'hidden';
          let cards = document.querySelectorAll('.tableJob_row');
          liveSearch(cards);
        });
        
        // Create Tag
        function createTagItem(name, id, cat) {
          let a = document.createElement('a');
          a.textContent = name;
          a.setAttribute("data-check", id);
          a.setAttribute("data-category", cat);
          a.setAttribute("href", '#');
          a.setAttribute("class", 'filterTags');
          return a;
        }
        
        // Delete Tag
        function deleteTagItem(t) {
          $.each(optionSelected, function(i) {
            if (optionSelected[i].id === t) {
              optionSelected.splice(i, 1);
              return false;
            }
          });
          document.querySelector('[data-check="' + t + '"]').remove();
          buildTableJobs(optionSelected);
        }
        
        // Unselect Tags
        $(document).on('click', '.filterTags', function (event) {
          
          event.preventDefault();
          console.log(this.getAttribute('data-check'));
          document.getElementById(this.getAttribute('data-check')).checked = false;
          deleteTagItem(this.getAttribute('data-check'));
          
          switch (this.getAttribute('data-category')) {
            case 'teams':
            var totalTeams = $('input[name="optionsTeams[]"]:checked').length;
            if(totalTeams >=1){
              $(".dropdown-text-teams").html('' + totalTeams  + ' teams selected ');
            }else{
              $(".dropdown-text-teams").html('Select a team');
            }
            break;
            case 'locations':
            var totalLocations = $('input[name="optionsLocations[]"]:checked').length;
            if(totalLocations>=1){
              $(".dropdown-text-locations").html('' + totalLocations + ' locations selected ');
            }else{
              $(".dropdown-text-locations").html('Select a location');
            }
            break;
            case 'jobtype':
            var totalJobtype = $('input[name="optionsJobtype[]"]:checked').length;
            if(totalJobtype>=1){
              $(".dropdown-text-jobtype").html('' + totalJobtype + ' Job type selected ');
            }else{
              $(".dropdown-text-jobtype").html('Select a job type');
            }
            break;
          }
          
        });
        
        var allJobTypes = [];
        var allLocations = [];
        var allTeams = [];

        
        response.data.jobs.forEach((obj) => {
          
          const rowElement = document.createElement("tr");
          rowElement.classList.add('tableJob_row');
          
          // Add job classes
          if(obj.hasOwnProperty('metadata')){
            var jobtype = obj.metadata[0].value ?? '';
            if (jobtype != '') { 
              var jobtypeId = jobtype.replaceAll(' ', '').replaceAll('-', '').toLowerCase();
              allJobTypes.push({ id:jobtypeId, class:'jobtype_'+jobtypeId, name:jobtype });
              rowElement.classList.add('jobtype_' + jobtypeId);
            }
          }

          // Add team clasess
          var team_name  = obj.departments[0].name ?? '';
          var team_id = obj.departments[0].id ?? '';
          allTeams.push({ id:team_id , class:'team_'+team_id, name:team_name });
          rowElement.classList.add('team_' + team_id);
          
          // Add location clasess
          obj.offices.forEach((locationObj) => {
            var location_id = locationObj.id;
            var location_name = locationObj.name;
            allLocations.push({ id:location_id , class:'location_'+location_id, name:location_name });
            rowElement.classList.add('location_'+locationObj.id);
          });
          
          rowElement.innerHTML = `
          <td scope="row">
            <p class="title">${obj.title}</p>
            <p class="label">Team: ${obj.departments[0].name}</p>
          </td>
          <td>${jobtype}</td>
          <td>${obj.location.name}</td>
          <td><a href="./job?gh_jid=${obj.id}"class="theButton"><span>Apply Now</span></a></td>`;
          tableBody.appendChild(rowElement);
          
        }); // for each jobs
        
        
        // All Teams
        const teamString = new Set(allTeams.map(JSON.stringify));
        const teamStringsArray = Array.from(teamString);
        const teamObjects = teamStringsArray.map(JSON.parse);
        console.log(teamObjects);
        
        // Add Teams to dropdown
        var listTeams = document.querySelector('#listTeams');
        listTeams.innerHTML = '';
        teamObjects.forEach((item) => {
          listTeams.insertAdjacentHTML('beforeend', `
          <li class="checkFilter">
          <input type="checkbox" name='optionsTeams[]' id="team_${item.id}" class="teams_checkbox option justone" value="${item.id}" data-category="teams"/>
          <label class="labelTopic" for="team_${item.id}">
          ${item.name}
          </label>
          </li>`);
        }); 
        
        //  Listener Teams
        $("input[type='checkbox'].teams_checkbox").change(function() {
          
          var a = $("input[type='checkbox'].teams_checkbox");
          if ($(this).is(':checked')) {
            optionSelected.push({
              label: $(this).next().text().trim(),
              id: $(this).attr('id'),
              category: $(this).data('category'),
            });
            
            contenttags.appendChild(createTagItem($(this).next().text().trim(), $(this).attr('id'), $(this).data('category')));
            
          } else {
            deleteTagItem($(this).attr('id'));
          }
          var totalTopics = $('input[name="optionsTeams[]"]:checked').length;
          
          if(totalTopics>=1){
            $(".dropdown-text-teams").html('' + totalTopics + ' teams selected ');
          }else{
            $(".dropdown-text-teams").html('Select a team');
          }

          buildTableJobs(optionSelected);
        });
        
        
        //  Remove duplicated Locations
        const ulString = new Set(allLocations.map(JSON.stringify));
        const ulStringsArray = Array.from(ulString);
        const ulObjects = ulStringsArray.map(JSON.parse);
        console.log(ulObjects);
        
        // Add locations to dropdown
        var listLocations = document.querySelector('#listLocations');
        listLocations.innerHTML = '';
        ulObjects.forEach((item) => {
          listLocations.insertAdjacentHTML('beforeend', `
          <li class="checkFilter">
          <input type="checkbox" name='optionsLocations[]' id="location_${item.id}" class="locations_checkbox option justone" value="${item.id}" data-category="locations"/>
          <label class="labelTopic" for="location_${item.id}">
          ${item.name}
          </label>
          </li>`);
        }); 
        
        //  Listener Locations
        $("input[type='checkbox'].locations_checkbox").change(function() {
          
          var a = $("input[type='checkbox'].locations_checkbox");
          if ($(this).is(':checked')) {
            optionSelected.push({
              label: $(this).next().text().trim(),
              id: $(this).attr('id'),
              category: $(this).data('category'),
            });
            
            contenttags.appendChild(createTagItem($(this).next().text().trim(), $(this).attr('id'), $(this).data('category')));
            console.log($(this).data('category'));
            
          } else {
            deleteTagItem($(this).attr('id'));
          }
          
          var totalTopics = $('input[name="optionsLocations[]"]:checked').length;
          if(totalTopics>=1){
            $(".dropdown-text-locations").html('' + totalTopics + ' locations selected ');
          }else{
            $(".dropdown-text-locations").html('Select a location');
          }

          buildTableJobs(optionSelected);
        });
        
 
        // All Job Types
        const jbString = new Set(allJobTypes.map(JSON.stringify));
        const jbStringsArray = Array.from(jbString);
        const jbObjects = jbStringsArray.map(JSON.parse);
        console.log(jbObjects);

        // Add Job Types to dropdown
        var listJobTypes = document.querySelector('#listJobtype');
        listJobTypes.innerHTML = '';
        jbObjects.forEach((item) => {
          listJobTypes.insertAdjacentHTML('beforeend', `
          <li class="checkFilter">
            <input type="checkbox" name='optionsJobtype[]' id="jobtype_${item.id}" class="jobtype_checkbox option justone checktypejob"  value="${item.id}" data-category="jobtype"/>
            <label class="labelTopic" for="jobtype_${item.id}">${item.name}</label>
          </li>`);
        }); 
        
        // Listener Job Type
        $("input[type='checkbox'].jobtype_checkbox").change(function() {
          
          var a = $("input[type='checkbox'].jobtype_checkbox");
          if ($(this).is(':checked')) {
            optionSelected.push({
              label: $(this).next().text().trim(),
              id: $(this).attr('id'),
              category: $(this).data('category'),
            });
            
            contenttags.appendChild(createTagItem($(this).next().text().trim(), $(this).attr('id'), $(this).data('category')));
            
          } else {
            deleteTagItem($(this).attr('id'));
          }
          var totalJobtype = $('input[name="optionsJobtype[]"]:checked').length;
          
          if(totalJobtype>=1){
            $(".dropdown-text-jobtype").html('' + totalJobtype + ' Job type selected ');
          }else{
            $(".dropdown-text-jobtype").html('Select a job type');
          }
          buildTableJobs(optionSelected);
        });
          
        let cards = document.querySelectorAll('.tableJob_row');
        let typingTimer;               
        let typeInterval = 500;  
        let searchInput = document.getElementById('searchbox');
        searchInput.addEventListener('keyup', () => {
          clearTimeout(typingTimer);
          typingTimer = setTimeout(liveSearch(cards), typeInterval);
        }); 
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });
    }
    loadIntoTable("./get-jobs.php", document.querySelector('table.tableJob'));
  }
});


function buildTableJobs(data) { 
  console.clear();
  console.log(data);

  const tRow = document.querySelectorAll(".tableJob_row");

  tRow.forEach((el) => {
    el.classList.remove('oculto');
  });

  data.forEach((classname) => {
  tRow.forEach((element) => {
      if(element.classList.contains(classname.id)){ }else{ 
        element.classList.add('oculto');
      }
    });
  });
}

function liveSearch(cards) {
  let search_query = document.getElementById("searchbox").value;
  for (var i = 0; i < cards.length; i++) {
    if(cards[i].textContent.toLowerCase()
    .includes(search_query.toLowerCase())) {
      cards[i].classList.remove("is-hidden");
    } else {
      cards[i].classList.add("is-hidden");
    }
  }
}


document.addEventListener('DOMContentLoaded', function () {

  if (document.body.classList.contains('bc-job')) {

    console.log(document.getElementById("jobId").value);
    let jobId = document.getElementById("jobId").value;


    console.log(jobId);

    async function loadInfo(url) {

      axios.get(url).then(function (response) {

          var d = new Date(response.data.updated_at);
          document.getElementById("jobDate").innerHTML = d.toLocaleString('en-US', {
            weekday: 'short',
            day: 'numeric',
            year: 'numeric',
            month: 'long',
          });
          document.getElementById("jobContent").innerHTML = htmlDecode(response.data.content);
          document.getElementById("jobTitle").innerHTML = response.data.title;
          document.getElementById("jobLocation").innerHTML = response.data.location.name;
          document.getElementById("jobTeam").innerHTML = response.data.departments[0].name;
          document.getElementById("jobType").innerHTML = response.data.metadata[0].value ?? '';

          buildForm(response.data.questions, 'formJob');
        
           setFormActionUrl("formContainer", jobId);

          if (response.data.compliance !== null) {
            generateMarkup(response.data.compliance, 'formContainer');
        } 
        
          const fileInputs = document.querySelectorAll('input[type="file"]');
          fileInputs.forEach(fileInput => {
            fileInput.addEventListener('change', async () => {
              const inputName = fileInput.name;
              const file = fileInput.files[0];
              await encodeFileToBase64(file, inputName);
              console.log(`File ${file.name} uploaded`);
            });
          });

          const resumeInput = document.getElementsByName('resume')[0];
          const resumeToggle = document.getElementsByClassName('toggleText')[0];
          const resumeText = document.getElementsByName('resume_text')[0];

          // Add event listener to resumeToggle link
          resumeToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior

            // Toggle display of resumeText
            if (resumeText.style.display === 'none') {
              resumeText.style.display = 'block';
              resumeText.required = true; // Make resumeText mandatory
              resumeInput.required = false; // Make resumeInput not mandatory

              var contentInputs = document.querySelectorAll('[name="resume_content"]');
              var filenameInputs = document.querySelectorAll('[name="resume_content_filename"]');

              contentInputs.forEach(function (element) {
                element.remove();
              });

              filenameInputs.forEach(function (element) {
                element.remove();
              });

            } else {
              resumeText.style.display = 'none';
              resumeText.required = false; // Make resumeText not mandatory
              resumeInput.required = true; // Make resumeInput mandatory
            }
          });

          // Add event listener to resumeInput
          resumeInput.addEventListener('change', () => {
            // Hide resumeText if file is selected
            resumeText.style.display = 'none';
            resumeText.required = false; // Make resumeText not mandatory
            resumeInput.required = true; // Make resumeInput mandatory
          });

          const coverLetterInput = document.getElementsByName('cover_letter')[0];
          const coverLetterToggle = document.getElementsByClassName('toggleText')[1];
          const coverLetterText = document.getElementsByName('cover_letter_text')[0];

          // Add event listener to coverLetterToggle link
          coverLetterToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior

            // Toggle display of coverLetterText
            if (coverLetterText.style.display === 'none') {
              coverLetterText.style.display = 'block';
              coverLetterText.required = true; // Make coverLetterText mandatory
              coverLetterInput.required = false; // Make coverLetterInput not mandatory
              coverLetterInput.value = "";

              var contentInputs = document.querySelectorAll('[name="cover_letter_content"]');
              var filenameInputs = document.querySelectorAll('[name="cover_letter_content_filename"]');

              contentInputs.forEach(function (element) {
                element.remove();
              });

              filenameInputs.forEach(function (element) {
                element.remove();
              });


            } else {
              coverLetterText.style.display = 'none';
              coverLetterText.required = false; // Make coverLetterText not mandatory
              coverLetterInput.required = true; // Make coverLetterInput mandatory
            }
          });

          // Add event listener to coverLetterInput
          coverLetterInput.addEventListener('change', () => {
            coverLetterText.style.display = 'none';
            coverLetterText.required = false; // Make coverLetterText not mandatory
            coverLetterInput.required = true; // Make coverLetterInput mandatory
          });

          addSubmitButtonToForm('formContainer');

          const submitJobForm = document.getElementById('submitJobForm');
          const formMessage = document.getElementById('formMessage');

          submitJobForm.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Get form data
            const form = document.getElementById('formContainer');
            const formData = new FormData(form);
          
            // Validate required fields
            let allRequiredFieldsHaveValue = true;
            const requiredFields = form.querySelectorAll('[required]');
            const invalidFields = [];
            requiredFields.forEach(field => {
              if (!formData.get(field.name)) {
                // Field is required but has no value
                allRequiredFieldsHaveValue = false;
                field.classList.add('error'); // add error class to show error style
                invalidFields.push(field.getAttribute('data-name')); // add field name to invalid fields array
          
                // Add event listener to remove error class on input
                field.addEventListener('input', () => {
                  if (formData.get(field.name)) {
                    field.classList.remove('error'); // remove error class if field has value
                    invalidFields.splice(invalidFields.indexOf(field.getAttribute('data-name')), 1); // remove field from invalid fields array
                  }
                });
              } else {
                field.classList.remove('error'); // remove error class if previously added
              }
            });
          
            if (!allRequiredFieldsHaveValue) {
              formMessage.classList.add('errorForm');
              formMessage.innerHTML = `Please fill in the following required fields: ${invalidFields.join(', ')}.`;
              return; // stop execution if any required field is empty
            }
          
            // Send form data with Axios
            axios.post(form.action, formData)
              .then(response => {
                if (response.data.success) {
                  // Show success message
                  formMessage.classList.remove('errorForm');
                  formMessage.classList.add('successForm');
                  //formMessage.innerHTML = response.data.success;
                  form.setAttribute('style', 'display:none;');
                  formMessage.innerHTML = '<strong>Thank you for applying.</strong><br>Your application has been received. If there is a fit, someone will be getting back to you.';
                }
              })
              .catch(error => {
                if (error.response && error.response.status === 422 && error.response.data.error) {
                  // Show error message
                  const errorMessage = document.createElement('div');
                  errorMessage.classList.add('errorForm');
                  errorMessage.textContent = error.response.data.error;
                  formMessage.innerHTML = '';
                  formMessage.appendChild(errorMessage);
                } else {
                  console.error(error);
                }
              });
          });
          

        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    }
    loadInfo("./get-job.php?id=" + jobId);
  }
});

function buildForm(json, containerId) {
  const container = document.getElementById(containerId);
  json.forEach(question => {
    //console.log(question.name);
    const questionDiv = document.createElement('div');
    questionDiv.className = 'col-md-6';
    questionDiv.classList.add('input-group');

    const label = document.createElement('label');
    label.textContent = question.label;

    const fields = question.fields.map(field => {
      const input = document.createElement(field.type === 'textarea' ? 'textarea' : 'input');

      if (field.type === 'input_file') {
        input.type = 'file';
        input.accept = ".pdf, .doc, .docx, .txt, .rtf";
      } else {
        input.type = field.type;
      }

      if (field.type === 'textarea') {
        input.style.display = 'none';
      }

      input.name = field.name;
      input.placeholder = field.placeholder || '';
      input.required = question.required;
      input.setAttribute('data-name', question.label);
      return input;
    });

    fields.forEach(field => {
      questionDiv.appendChild(field);
    });

    if (question.fields.some(field => field.type === 'input_file')) {
      const link = document.createElement('a');
      link.href = '#';
      link.className = 'toggleText';
      link.textContent = 'Attach or enter manually';
      questionDiv.appendChild(link);
    }

    questionDiv.insertBefore(label, fields[0]);

    container.appendChild(questionDiv);

  });
}

const htmlDecode = (input) => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

function generateMarkup(json, containerId) {

  const container = document.getElementById(containerId);
  let markup = '';
  console.log(json);
  for (let i = json.length - 1; i >= 0; i--) {
    const item = json[i];

    if (item.description) {
      const div = document.createElement('div');
      div.classList.add('compilance', 'col-md-12');
      div.innerHTML = htmlDecode(item.description);
      container.appendChild(div);
    }

    if (item.questions.length > 0) {
      const form = document.createElement('div');
      item.questions.forEach(question => {
        const div = document.createElement('div');
        div.classList.add('selectForm');
        const label = document.createElement('label');
        label.textContent = question.label === 'Race' ? 'Are you Hispanic/Latino?' :
          question.label === 'Gender' ? 'Gender' :
          question.label === 'VeteranStatus' ? 'Veteran Status' :
          question.label === 'DisabilityStatus' ? 'Disability Status' : question.label;

        div.appendChild(label);
        question.fields.forEach(field => {
          let input;
          switch (field.type) {
            case 'multi_value_single_select':
              input = document.createElement('select');
              input.name = field.name;
              input.classList.add('select-css');
              field.values.forEach(value => {
                const option = document.createElement('option');
                option.value = value.value;
                option.textContent = value.label;
                input.appendChild(option);
              });
              break;
          }
          div.appendChild(input);
        });
        form.appendChild(div);
      });
      container.appendChild(form);
    }
  };
}

function setFormActionUrl(formId, idParameter) {
  // Construct the URL using the idParameter
  var url = "./post-job.php";
  // Get the form element
  var form = document.getElementById(formId);
  var jobID = document.getElementById("idJobInput");
  jobID.value = idParameter;
  form.action = url;
}

function encodeFileToBase64(file, inputName) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const fileName = file.name;
      const base64EncodedData = reader.result.split(',')[1];
      const contentInput = document.querySelector(`input[name="${inputName}_content"]`);
      if (contentInput) {
        contentInput.value = base64EncodedData;
      } else {
        const contentInput = document.createElement('input');
        contentInput.type = 'hidden';
        contentInput.name = `${inputName}_content`;
        contentInput.value = base64EncodedData;
        const fileInput = document.querySelector(`input[name="${inputName}"]`);
        fileInput.insertAdjacentElement('afterend', contentInput);
      }
      const filenameInput = document.querySelector(`input[name="${inputName}_content_filename"]`);
      if (filenameInput) {
        filenameInput.value = fileName;
      } else {
        const filenameInput = document.createElement('input');
        filenameInput.type = 'hidden';
        filenameInput.name = `${inputName}_content_filename`;
        filenameInput.value = fileName;
        const contentInput = document.querySelector(`input[name="${inputName}_content"]`);
        contentInput.insertAdjacentElement('afterend', filenameInput);
      }
      resolve({ fileName, base64EncodedData });
    };
    reader.onerror = error => reject(error);
  });
}

function addSubmitButtonToForm(formId) {
  // Get a reference to the form element
  const form = document.getElementById(formId);

  // Create the button element and set its attributes
  const button = document.createElement('button');
  button.id = 'submitJobForm';
  button.classList.add('button', 'button-2x', 'orange');
  button.innerHTML = '<span>Submit Application</span>';

  // Create a div element and set its class name
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('actions');
  // Append the button to the actions div
  actionsDiv.appendChild(button);
  // Add the actions div to the end of the form
  form.appendChild(actionsDiv);
}


document.addEventListener('DOMContentLoaded', function () {

  if (document.querySelector('.search-wrapper')) {

    var searchBtn   = document.querySelector("#searchButton");
    var closeButton = document.getElementById("searchClose");
    var searchInput = document.getElementById("searchInput");
    var searchLabel = document.getElementById("searchLabel");

    searchBtn.addEventListener("click", function (event) {
      var container = this.closest('.search-wrapper');
      if (!container.classList.contains("active") && searchInput.value.length == 0) {
        container.classList.add('active');
      } else if (container.classList.contains("active") && searchInput.value.length > 0) {
        return true;
      }
      event.preventDefault();
    }, false);

    closeButton.addEventListener("click", function (event) {
      var container = this.closest('.search-wrapper');
      if (container.classList.contains("active")) {
        container.classList.remove('active');
      }
      event.preventDefault();
    }, false);
    
    searchLabel.addEventListener("click", function (event) {
      var container = this.closest('.search-wrapper');
      container.classList.add('active');
      event.preventDefault();
    }, false);
    
  } 

});

document.addEventListener('DOMContentLoaded', function () {
  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
    });
  
});
document.addEventListener('DOMContentLoaded', function () {
  
  if (document.querySelector('.swiperSlider')) { 

    var swiper = new Swiper(".swiperSlider", {
      spaceBetween: 30,
      effect: "fade",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }
    });
    
  }
  
});
var $body;

window.addEventListener("load", function () {
  videoOnLoad();
});

function videoOnLoad() {
  var
    ytSrc = "https://www.youtube.com/iframe_api",
    vimSrc = "https://player.vimeo.com/api/player.js"

  $body = $('body')
  loadScript(ytSrc);
  loadScript(vimSrc);
}

function loadScript(src, callback) {
  callback = typeof callback === "function" ? callback : function () {
    return null
  };
  var tag = document.createElement('script');
  tag.src = src;
  tag.onload = function () {
    callback();
  }
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

if (document.querySelector('.videoBlock-video .video-player-v2.vimeo')) { 
  document.querySelectorAll('.videoBlock-video .video-player-v2.vimeo:not(.video-initialized)').forEach(item => {
    item.addEventListener('click', e => {
      var target = e.target;
      var videoId = target.parentNode.parentNode.dataset.videoid;
      target.parentNode.parentNode.classList.add('videoStart');
      
      var iframeDiv = document.querySelector('#iframe__' + videoId);
      const options = {
        id: videoId,
        width: 840,
        responsive: true
      };
  
      const player = new Vimeo.Player(iframeDiv, options);
      player.setVolume(0.5);
      player.play();
    })
  })

}


if (document.querySelector('.videoBlock-video .video-player-v2.youtube')) { 


  document.querySelectorAll('.videoBlock-video .video-player-v2.youtube:not(.video-initialized)').forEach(item => {
    item.addEventListener('click', e => {
      var targetYT = e.target;
      var videoId = targetYT.parentNode.parentNode.dataset.videoid;
      targetYT.parentNode.parentNode.classList.add('videoStart');
      var iframeDiv = document.querySelector('#iframe__' + videoId);
      var player;
      player = new YT.Player(iframeDiv, {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          info: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          wmode: "transparent"
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
  
      function onPlayerReady(event) {
        event.target.playVideo();
      }
  
      var done = false;
  
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
  
      function stopVideo() {
        player.stopVideo();
      }
  
    })
  });

}
document.addEventListener('DOMContentLoaded', function () {
    
	// Hamburger Menu
 if (document.querySelector('.hamburger')) { 
	 const hamburgerButton = document.querySelector(".hamburger");
	 const hamburgerMenu   = document.querySelector(".mobile-nav");
	 const hamburgerMenuText   = document.querySelector(".menuText");
			 
	 hamburgerButton.onclick = function() {
		 this.classList.toggle("is-active");
		 hamburgerMenu.classList.toggle("show-menu");
		 hamburgerMenuText.classList.toggle("hideTextMenu");
	 };
 }

});
var $body;
window.addEventListener("load", function() {
	videoOnLoadDep()
});

function videoOnLoadDep()
{
	var
		ytSrc = "https://www.youtube.com/iframe_api",
		vimSrc = "https://player.vimeo.com/api/player.js"
  	$body = $('body')
    loadScriptDep(ytSrc);
    loadScriptDep(vimSrc, function() {
      onVimeoApiReady();
    });
}

function loadScriptDep(src,callback)
{
	callback = typeof callback === "function" ? callback : function() {return null};
	var tag = document.createElement('script');
	tag.src = src;
	tag.onload = function() {
		callback();
	}
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function initVideos() {
	onVimeoApiReady()
	onYouTubeIframeAPIReady()
}

const PLAY_ON_SCROLL_TRIGGER_HOOK = 1
function onVimeoApiReady() {

	$('.video-player.vimeo:not(.video-initialized)').each(function() {

		var $player = $(this);
		var player;
		var playOnScroll = $player.attr('data-play-on-scroll') == 'true';
		var $media = setupVideoPlayerIframe($player);

		if (playOnScroll) {

			$media.addClass('iframe_target')
			$media.addClass('play-on-scroll')

			$body.append($media);

			player = new Vimeo.Player($media[0]);

			TweenLite.set( $media[0], { autoAlpha: 0 } );

			var fade = TweenLite.to( $media[0], 0.1, { autoAlpha: 1, paused: true } );

			var sentAnalyticsEvent = false;

			var scene = new ScrollMagic.Scene({
				triggerElement: $player[0],
				triggerHook: PLAY_ON_SCROLL_TRIGGER_HOOK
			})
			.addTo(VERA.sm)
			.setClassToggle($player[0], 'pinned')
			.on('enter', function() {
				if (player.play) {
					player.play();
				}
				fade.play();

				if (!sentAnalyticsEvent) {
					sentAnalyticsEvent = true;
					gaEvent("Video","Play","Play-On-Scroll");
				}
			})
			.on('leave', function() {
				if (player.pause) {
					player.pause();
				}
				fade.reverse();
			})

			scene.duration(determineDuration($player));

			window.addEventListener('resize', function() {
				scene.duration(determineDuration($player));
			});

		} else {

			$player.one("click", function() {

				$player.find('.video-player-cover').remove();

				player = new Vimeo.Player($media[0]);
				player.play();

				$player.data('player', player);

				var scene = new ScrollMagic.Scene({
					triggerElement: $player[0],
				})
				.addTo(VERA.sm)
		/*
				.on('enter', function() {
					player.playVideo();
				})
		*/
				.on('leave', function() {
					player.pause();
				})

				scene.duration(determineDuration($player));

			});

			$player.find('.video-outer').addClass('loaded');

		}

	});

}

function setupVideoPlayerIframe($player) {
	var $iframe = $player.find('.iframe_target');
	$iframe.html($iframe.attr('data-embed'));
	$iframe = $iframe.find('iframe');
	$iframe.attr('allow',"autoplay");
	return $iframe;
}

function onYouTubeIframeAPIReady() {
	//inline videos
	$('.video-player.youtube:not(.video-initialized)').each(function() {

		var $this = $(this).find('.video-player-cover'), $player = $(this);

		$this.addClass('video-initialized');

		var playOnScroll = $player.attr('data-play-on-scroll') == 'true';

		var player;

		if (VERA.isMobile) {

			player = playYoutube($this[0],0);

		} else {

			if (playOnScroll) {

				var sentAnalyticsEvent = false;

				player = playYoutube($this[0], 0);
				if (!player) {
					console.warn('video player missing')
					return
				}

				var $next = $this.parents(':not(:last-child)').next(),
					$media = $player.find('iframe');

				$body.append($media);
				$media.addClass('play-on-scroll');

				TweenLite.set( $media[0], { autoAlpha: 0 } )
				var fade = TweenLite.to( $media[0], 0.1, { autoAlpha: 1, paused: true } );

				var firstBuff = true;
				player.addEventListener('onStateChange', function(event) {
					switch (event.data) {
						case 0:
							if ($next.length) {
								fade.pause(0);
								TweenLite.to( window, 1, { scrollTo: $next.offset().top - window.innerHeight/2 } );
							}
							break;
						case 3:
							if (firstBuff) {
								player.pauseVideo();
							}
							firstBuff = false;

						default:
					}
				})

				player.addEventListener('onReady', function() {
					player.playVideo();
				})

				var scene = new ScrollMagic.Scene({
					triggerElement: $player[0],
					triggerHook: PLAY_ON_SCROLL_TRIGGER_HOOK
				})
				//.addIndicators({ name: 'video' })
				.addTo(VERA.sm)
				.setClassToggle($player[0], 'pinned')
				.on('enter', function() {
					if (player.playVideo) {
						player.playVideo();
					}
					fade.pause(1);
					if (!sentAnalyticsEvent) {
						sentAnalyticsEvent = true;
						gaEvent("Video","Play","Play-On-Scroll");
					}
				})
				.on('leave', function() {
					if (player.pauseVideo) {
						player.pauseVideo();
					}

					fade.pause(0)
				})

				scene.duration(determineDuration($player));

				window.addEventListener('resize', function() {
					scene.duration(determineDuration($player));
				});

			} else {

				$this.one("click", function() {

					player = playYoutube(this,1);

					var scene = new ScrollMagic.Scene({
						triggerElement: $player[0],
					})
					.addTo(VERA.sm)
/*
					.on('enter', function() {
						player.playVideo();
					})
*/
					.on('leave', function() {
						player.pauseVideo();
					})

					scene.duration(determineDuration($player));

					window.addEventListener('resize', function() {
						scene.duration(determineDuration($player));
					});

				});
			}
		}

		$this.addClass('loaded');

	});

	//sidebar videos
	$('.video-play-trigger.youtube:not(.video-initialized)').each(function() {

		var $this = $(this), $media = $('#' + $this.attr('data-media-id'));

		$this.addClass('video-initialized');

		$this.one("click", function() {

			$media.find('.video-player-cover').remove();
			var $player = $media.find('.iframe_target');

			var v = new YT.Player($player[0], {
				height: '390',
				width: '640',
				host: 'https://www.youtube.com',
				origin: window.location.origin,
				videoId: $player.parent().attr('data-videoid'),
				playerVars: {
          showInfo: false,
					host: 'https://www.youtube.com',
					modestbranding: true,
					origin: window.location.origin,
					rel: 0,
					autoplay: 1,
					enablejsapi: 1
				}
			});

			$this.data('player', v);

		});
	});
}


function playYoutube(cover,autoplay) {
  var autoplay = typeof autoplay !== undefined ? autoplay : 1;
	var $player = $(cover).parent();
	var $landing = $player.closest('.video-container').siblings('.special-reports-landing')
	var playerId = $player.find('.iframe_target').attr('id');
	var vidPlayer;

	$(cover).fadeOut();

	if ($landing.length) {
		$landing.css({transform: "translateY(0)", "margin-bottom": "60px"});
	}

	if (playerId) {
		vidPlayer = new YT.Player(playerId, {
			height: '390',
			width: '640',
			host: 'https://www.youtube.com',
			videoId: $player.attr('data-videoid'),
			playerVars: {
	      showinfo: 0,
				modestbranding: 1,
				rel: 0,
				autoplay: autoplay,
				origin: window.location.origin,
				enablejsapi: 1
			}
		});

		return vidPlayer

	} else {
		console.warn($player,'missing')
	}
}


function determineDuration($elem)
{
	return $elem.outerHeight(true);
}

$(function () {
  $(".VideoCta").each(initVideoCta);

  function initVideoCta(elem) {
    const $this = $(this);
    const modal = $this.find(".VideoCta-modal");

    $this.find("button").on("click", open);
    $this.find(".VideoCta-close").on("click", close);

    function open() {
      modal.addClass("modal--open");
    }
    function close() {
      modal.removeClass("modal--open");
    }
  }
});
