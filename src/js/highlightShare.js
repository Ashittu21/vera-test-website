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