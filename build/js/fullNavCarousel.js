"use strict";//equal cell height hack for fact cards
Flickity.prototype._createResizeClass=function(){this.element.classList.add("flickity-resize");};Flickity.createMethods.push("_createResizeClass");var resize=Flickity.prototype.resize;Flickity.prototype.resize=function(){this.element.classList.remove("flickity-resize");resize.call(this);this.element.classList.add("flickity-resize");};function navCarousel(carouselSelector,articleSelector,parentTitle,parentUrl,parentId,closeOnScrollUp){console.log(closeOnScrollUp);closeOnScrollUp=typeof closeOnScrollUp==="undefined"?true:closeOnScrollUp;var $body=$("body"),$carousel=$(carouselSelector),$article=$(articleSelector),$loader=$(articleSelector+" .streamloader"),$header=$body.find("header.state-of"),time=0.4,_self=this,articleIsOpen=false;var articleSlide=articleSlideTween(),loaderFade=TweenLite.to($loader[0],time,{autoAlpha:1,paused:true});this.open=open,this.close=close,this.initArticle=initArticle,this.$carousel=$carousel;var defaultTitle=parentTitle,defaultUrl=parentUrl,defaultId=parentId,defaultTheme="default";setupCarousel();setupLinks();$article.on("mousewheel",function(event){var scrollTop=$(this).scrollTop();var up=event.originalEvent.wheelDelta>0||event.originalEvent.detail<0;if(closeOnScrollUp&&scrollTop<=0&&up){_self.close(true);}});window.addEventListener("popstate",onPopState);window.addEventListener("resize",windowResized);function open(){articleIsOpen=true;articleSlide.play();}function close(push){if(push===undefined){push=false;}articleIsOpen=false;articleSlide.reverse();document.title=defaultTitle;if(push){pushPage(defaultUrl,defaultTitle,defaultTheme,defaultId);}}function setupCarousel(){var $flick=$carousel.flickity({setGallerySize:false,contain:true,cellAlign:"left",pageDots:false});$carousel.find("a").on("click",function(event){event.preventDefault();});$flick.on("staticClick.flickity",function(event,pointer,cellElement,cellIndex){if(cellIndex===0){$flick.flickity("next");}else{$flick.flickity("select",cellIndex);}var $item=$(cellElement).filter(".item"),//filter only for Nav carousel items (orig design)
link=$item.find("a")[0];if(link!==undefined){ajaxPage(link.getAttribute("href"),link.getAttribute("title"),link.getAttribute("data-theme"),link.getAttribute("data-id"));}});$flick.on("select.flickity",function(){//Todo where does this var come from.  Declaring to avoid strict error
var coverTween=window.coverTween||undefined;if(typeof coverTween!=="undefined"&&coverTween.progress()<1){coverTween.progress(1);}if($flick.data("flickity").selectedIndex===0){$header.addClass("cover-selected");}else{$header.removeClass("cover-selected");}});}function initArticle(){setupLinks();}function setupLinks(){//close article links
$(".header.state-of h1,.js-close-article").on("click",function(event){event.preventDefault();_self.close(true);});//orther article links
var $links=$("a[data-nav-carousel-link]:not(.link-initialized)");$links.on("click",function(event){event.preventDefault();console.log(this);ajaxPage(this.getAttribute("href"),this.getAttribute("title"),this.getAttribute("data-theme"),this.getAttribute("data-id"));});$links.addClass("link-initialized");}function articleSlideTween(){return new TimelineMax({paused:true}).to($article[0],time,{y:"0%"}).to($carousel[0],time,{y:"-100%"},0);}function windowResized(){if(!articleIsOpen){articleSlide.kill();TweenLite.set($article[0],{y:"100%"});articleSlide=articleSlideTween();}}var currentPageRequest=null;function ajaxPage(url,title,theme,id,push){if(push===undefined){push=true;}if(currentPageRequest){currentPageRequest.abort();}if(loaderTimer){clearTimeout(loaderTimer);}$body.addClass("carousel-loading");var loaderTimer=setTimeout(function(){loaderFade.play();},0);if(articleIsOpen){_self.close();}$article.find(">*:not(.streamloader)").remove();if(theme==="alt"){$article.addClass("alt");}else{$article.removeClass("alt");}_self.open();currentPageRequest=$.get(url,function(html){$article.append(html);if(push){pushPage(url,title,theme,id);}setTimeout(function(){$article.scrollTop(0);},0);$body.removeClass("carousel-loading");if(loaderTimer){clearTimeout(loaderTimer);}loaderFade.reverse();Site.init();Site.slideout();VERA.initFacts();initAnalyticsEvents();var carouselIndex=$carousel.find('a[href="'+url+'"]').parent(".item").index();if(carouselIndex&&carouselIndex!==-1){$carousel.flickity("select",carouselIndex);}var $overlay=$("#ShareOverlay"),$new=$article.find(".share-outer");$overlay.find(".share-outer").remove();$overlay.append($new);var path=url.replace(window.location.protocol+"//"+window.location.host,"");gaPageview(path);});updateMeta(id);}function pushPage(url,title,theme,id){history.pushState({title:title,url:url,theme:theme,id:id},url,url+window.location.search);}function onPopState(event){if(event.state===null||event.state.title===defaultTitle){_self.close();document.title=defaultTitle;}else{ajaxPage(event.state.url,event.state.title,event.state.theme,event.state.id,false);}}var currentMetaRequest=null;function updateMeta(id){if(currentMetaRequest){currentMetaRequest.abort();}currentMetaRequest=$.get("/meta.json",{id:id},function(response){console.log("meta",response);document.title=response.title+" | "+defaultTitle;$("title").text(response.title);$('meta[name="description"').attr("content",response.description);$('link[rel="canonical"').attr("href",response.url);$('meta[property="og:title"').attr("content",response.title);$('meta[property="og:description"').attr("content",response.description);$('meta[property="og:image"').attr("content",response.image);$('meta[property="og:url"').attr("content",response.url);$('meta[name="twitter:title"').attr("content",response.title);$('meta[name="twitter:description"').attr("content",response.description);$('meta[name="twitter:image"').attr("content",response.image);});}}