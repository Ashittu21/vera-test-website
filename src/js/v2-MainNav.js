console.log('clicky');

 (function() {

	'use strict';

	const ClickyMenus = function(menu) {
		console.log(menu);
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
					if( 'href' !== attr.name ) {
						button.setAttribute( attr.name, attr.value );
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



