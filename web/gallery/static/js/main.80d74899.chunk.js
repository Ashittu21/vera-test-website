(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{164:function(e,t,a){e.exports=a(385)},169:function(e,t,a){},170:function(e,t,a){},256:function(e,t,a){},369:function(e,t,a){},385:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(6),i=a.n(c),l=(a(169),a(170),a(394)),o=a(395),s=a(163),m=a(43),u=a(12),d=function(e){var t=e.endpoint,a=e.children,c=void 0===a?null:a,i=e.loading,l=void 0===i?r.a.createElement("div",{className:"bg--yellow"}):i,o=Object(n.useRef)(),s=Object(n.useState)(JSON.parse(sessionStorage.getItem(t))),m=Object(u.a)(s,2),d=m[0],f=m[1];return Object(n.useEffect)(function(){o.current&&o.current.abort(),o.current=new AbortController,fetch(t,{signal:o.current.signal}).then(function(e){return e.json()}).then(function(e){sessionStorage.setItem(t,JSON.stringify(e)),f(e)}).catch(function(e){console.log(e.name)})},[t]),console.log(d),d?c(d):l},f=a(70),E=a.n(f),h=a(149),g=a(393),v=a(66),b=a(17),p=a(387),w=a(388),y=a(389),k=a(390),N=a(391),j=a(392),O=function(e){var t=e.url,a=void 0===t?"https://www.vera.org/"+window.location.pathname.replace("/",""):t,n=e.hideHeading,c=void 0!==n&&n;return r.a.createElement("div",{className:"Share"},!c&&r.a.createElement("div",{className:"footnote ff-sans"},"Share"),r.a.createElement("div",{className:"Share-inner"},r.a.createElement(p.a,{url:a},r.a.createElement(w.a,{size:48})),r.a.createElement(y.a,{url:a},r.a.createElement(k.a,{size:48})),r.a.createElement(N.a,{url:a},r.a.createElement(j.a,{size:48}))))},L=function(e){var t=e.items,a=e.currentSlug,n=e.hideShare,c=void 0!==n&&n;return r.a.createElement("section",{className:"Grid"},!c&&r.a.createElement(O,null),r.a.createElement("ul",{className:"Grid-list bg--black"},t.map(function(e){return r.a.createElement(x,{key:e.id,item:e,currentSlug:a})})))},x=function(e){var t=e.item,a=e.currentSlug,c=Object(n.useState)(!1),i=Object(u.a)(c,2),l=i[0],o=i[1],s=Object(b.c)(function(){return{from:{opacity:0},config:{tension:50}}}),m=Object(u.a)(s,2),d=m[0];return(0,m[1])({opacity:l?1:0}),r.a.createElement(v.a,{onEnter:function(){o(!0)},onLeave:function(){o(!1)}},r.a.createElement(b.a.div,{style:Object(h.a)({backgroundImage:"url(".concat(t.image,")")},d),className:"\n          Grid-item\n          Grid-item--".concat(t.type,"\n          ff-sans--bold\n          ").concat(t.slug===a?"Grid-item--currentExhibit":"","\n          ").concat(t.colorCombo&&"color-combo--".concat(t.colorCombo),"\n        "),key:t.id},"fillTile"===t.type?r.a.createElement("div",{className:"Grid-item-inner color--white size--body"},t.text):r.a.createElement(g.a,{className:"Grid-item-inner color--red",to:"/".concat(t.slug)},r.a.createElement("div",{className:"text-align--center"},r.a.createElement("div",{className:"stroke-text--thin size--headerxl"},t.title),r.a.createElement("div",{className:"size--body"},t.subtitle)))))},S=function(e){return e.replace(/ /g,"").toLowerCase()},H=a(152),I=a(155),A=a.n(I),R=function(e){var t=e.videoId,a=e.service;return r.a.createElement("div",{className:"Video block"},r.a.createElement("div",{className:"iframe-wrapper"},"youtube"===a?r.a.createElement(H.a,{videoId:t}):r.a.createElement(A.a,{videoId:t})))},z=a(105),G=a.n(z);G.a.setAppElement("#root"),Object(f.configureAnchors)({offset:-60});var _=function(e){e.match;var t=Object(n.useState)(!1),a=Object(u.a)(t,2),c=a[0],i=a[1],l=Object(n.useRef)(),o=Object(b.c)(function(){return{from:{opacity:0},ref:l}}),s=Object(u.a)(o,2),f=s[0];(0,s[1])({opacity:c?1:0});var h=Object(n.useRef)(),g=Object(b.c)(function(){return{from:{opacity:0},ref:h}}),p=Object(u.a)(g,2),w=p[0];return(0,p[1])({opacity:c?1:0}),Object(b.b)(c?[l,h]:[h,l],[0,.5,1]),r.a.createElement(d,{endpoint:"".concat("https://www.vera.org/","gallery/").concat(window.GALLERY_ID,".json")},function(e){return r.a.createElement("div",{className:"Home ff-serif bg--black"},r.a.createElement(v.a,{onEnter:function(){i(!0)},onLeave:function(){i(!1)}},r.a.createElement("section",{className:"Home-splash"},r.a.createElement(b.a.div,{style:f},r.a.createElement("div",{className:"background-screen"}),r.a.createElement("video",{className:"background-video",muted:!0,autoPlay:!0,loop:!0},r.a.createElement("source",{src:e.videoUrl}))),r.a.createElement("div",{className:"Home-splash-inner block--small color--white"},r.a.createElement("h1",{className:"Home-splash-title-heading size--headerxl ff-sans--bold uppercase"},e.heading.split(" ").map(function(e,t){return r.a.createElement("span",{key:e+t},e+" ")})),r.a.createElement(b.a.div,{style:w,className:"Home-splash-title-subheading size--body ff-sans"},e.subheading),r.a.createElement(b.a.div,{style:w,className:"Home-splash-links ff-sans--bold color--white"},e.anchors.map(function(e){return r.a.createElement("a",{className:"Home-splash-link color--white hover-bg--red",key:S(e),href:"#".concat(S(e))},e)})),r.a.createElement(b.a.div,{style:w,className:"Home-splash-share"},r.a.createElement(O,{hideHeading:!0}))))),e.blocks.map(function(t){var a,n=t.component,c=t.id,i=t.anchor,l=Object(m.a)(t,["component","id","anchor"]);switch(n){case"TextSection":return a=r.a.createElement("div",{key:c},r.a.createElement(M,l)),i?r.a.createElement(E.a,{key:c,id:S(i)},a):a;case"Grid":return a=r.a.createElement("div",{key:c},r.a.createElement(L,{items:e.children,hideShare:!0})),i?r.a.createElement(E.a,{key:c,id:S(i)},a):a;default:return null}}))})},M=function(e){var t=e.backgroundImage,a=e.blocks;return r.a.createElement("section",{className:"Home-splash-section bg--black color--white",style:{backgroundImage:"url(".concat(t,")"),backgroundAttachment:"fixed",position:"relative"}},t&&r.a.createElement("div",{className:"background-screen bg--red"}),r.a.createElement("div",{className:"block block--small"},a.map(function(e){switch(e.component){case"Heading":return r.a.createElement(T,Object.assign({key:e.id},e));case"Text":return r.a.createElement("div",{key:e.id,className:"rte block ff-sans size--body",dangerouslySetInnerHTML:{__html:e.text}});case"Ctas":return r.a.createElement("div",{key:e.id,className:"Home-splash-ctas Home-splash-links ff-sans--bold"},e.blocks.map(function(e){switch(e.component){case"LinkOut":return r.a.createElement("a",{key:e.id,className:"Home-splash-link color--white hover-bg--red",href:e.url},e.text);case"VideoModal":return r.a.createElement(C,{key:e.id,text:e.text,videoId:e.videoId,service:e.service});default:return null}}));case"List":return r.a.createElement("div",{key:e.id,className:"Home-splash-list"},e.blocks.map(function(e){switch(e.component){case"ListItem":return r.a.createElement("div",{className:"Home-splash-list-item border-color--red",key:e.id},e.blocks.map(function(e){switch(e.component){case"Heading":return r.a.createElement("div",{key:e.id,className:"ff-sans stroke-text--thin size--h2 Home-splash-list-heading",dangerouslySetInnerHTML:{__html:e.text}});case"Text":return r.a.createElement("div",{key:e.id,className:"Text ff-sans size--body",dangerouslySetInnerHTML:{__html:e.text}});default:return null}}));case"Heading":return r.a.createElement(T,Object.assign({key:e.id},e));default:return null}}));default:return null}})))},T=function(e){return r.a.createElement("h2",{className:"Home-splash-heading size--headerxl",dangerouslySetInnerHTML:{__html:e.text}})},C=function(e){var t=e.videoId,a=e.text,c=e.service,i=Object(n.useState)(!1),l=Object(u.a)(i,2),o=l[0],s=l[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{className:"Home-splash-link color--white hover-bg--red",onClick:function(){s(!0)}},a),r.a.createElement(G.a,{style:{overlay:{zIndex:4},content:{backgroundColor:"transparent",borderRadius:0,border:0,display:"flex",alignItems:"center",justifyContent:"center",padding:0}},isOpen:o,onRequestClose:function(){s(!1)}},r.a.createElement(R,{videoId:t,service:c})))},B=a(156),P=a.n(B),Y=(a(256),function(){return Object(n.useEffect)(function(){window.scrollTo(0,0)},[]),null}),D=a(157),J=a.n(D),V=(a(369),function(e){return r.a.createElement("svg",Object.assign({width:"21",height:"25",viewBox:"0 0 28 35",xmlns:"http://www.w3.org/2000/svg"},e),r.a.createElement("path",{d:"M.469.726l27.425 16.97L.469 34.666z"}))}),U=function(e){return r.a.createElement("svg",Object.assign({width:"21",height:"25",viewBox:"0 0 21 25",xmlns:"http://www.w3.org/2000/svg"},e),r.a.createElement("path",{d:"M14.778 0H21v25h-6.222zM0 0h6.222v25H0z"}))},F=a(162),Q=(a(384),["play","pause"]),W=function(e){var t=parseInt(e,10),a=Math.floor(t/3600),n=Math.floor((t-3600*a)/60),r=t-3600*a-60*n;return r<10&&(r="0"+r),(a?a+":":"")+n+":"+r},q=function(e){var t=e.playerRef,a=void 0===t?Object(n.useRef)():t,c=e.children,i=Object(m.a)(e,["playerRef","children"]),l=Object(n.useState)(!0),o=Object(u.a)(l,2),s=o[0],d=o[1],f=Object(n.useState)(0),E=Object(u.a)(f,2),h=E[0],g=E[1],v=Object(n.useState)(0),b=Object(u.a)(v,2),p=b[0],w=b[1];function y(){d(a.current.paused)}function k(){g(a.current.currentTime)}function N(){w(a.current.duration)}return Object(n.useEffect)(function(){return Q.forEach(function(e){a.current.addEventListener(e,y)}),a.current.addEventListener("timeupdate",k),a.current.addEventListener("durationchange",N),function(){Q.forEach(function(e){a.current.removeEventListener(e,y)}),a.current.removeEventListener("timeupdate",k),a.current.removeEventListener("durationchange",N)}},[]),r.a.createElement("div",{className:"AudioPlayer bg--black color--white ".concat(0===p&&"AudioPlayer--loading")},r.a.createElement("button",{className:"AudioPlayer-pp",onClick:function(){s?a.current.play():a.current.pause()}},s?r.a.createElement(V,{className:"fill--white"}):r.a.createElement(U,{className:"fill--white"})),r.a.createElement("div",{className:"AudioPlayer-progress ff-sans"},W(h),"/",W(p)),r.a.createElement(F.a,{min:0,max:p,value:h,onChange:function(e){a.current.currentTime=e}}),r.a.createElement("audio",Object.assign({ref:a},i),c))},$=function(e){var t=e.match;return r.a.createElement(d,{endpoint:"".concat("https://www.vera.org/","exhibit/").concat(t.params.slug,".json")},function(e){return r.a.createElement(K,{data:e,currentSlug:t.params.slug})})},K=function(e){var t=e.data,a=e.currentSlug;return Object(n.useEffect)(function(){window.scrollTo(0,0)},[t]),r.a.createElement("div",{className:"Page bg--black color--white"},r.a.createElement("div",{className:"container "},r.a.createElement(Y,null),r.a.createElement("h1",{className:"heading ff-sans--bold size--headerxl"},t.title),r.a.createElement("h2",{className:"heading ff-sans--bold"},t.subtitle),r.a.createElement("div",{className:"Page-body text-with-border border-color--red"},t.items.map(X))),r.a.createElement(L,{items:t.siblings,currentSlug:a}))},X=function(e){switch(e.component){case"Image":return r.a.createElement(Z,Object.assign({},e,{key:e.id}));case"Text":return r.a.createElement(ee,Object.assign({},e,{key:e.id}));case"Video":return r.a.createElement(R,Object.assign({},e,{key:e.id}));case"Quote":return r.a.createElement(te,Object.assign({},e,{key:e.id}));case"Audio":return r.a.createElement(ae,Object.assign({},e,{key:e.id}));default:return console.log("Missing Component: ".concat(e.component)),null}},Z=function(e){var t=e.images,a=e.caption;return r.a.createElement("div",{className:"ImageGrid"},r.a.createElement(J.a,{className:"ImageGrid-grid block"},{images:t}.images.map(function(e){return r.a.createElement("img",{key:e.url,alt:e.title,src:e.url})})),a&&r.a.createElement("div",{className:"ImageGrid-caption"},r.a.createElement("div",{className:"img-caption color--white"},a)))},ee=function(e){var t=e.text;return r.a.createElement("div",{className:"Text block rte ff-sans size--body ".concat(t.includes("image-caption")?"text-align--center block--negative-margin":""),dangerouslySetInnerHTML:{__html:t}})},te=function(e){var t=e.text;return r.a.createElement("div",{className:"Quote block ff-serif size--h2 text-align--center"},t)},ae=function(e){var t=e.audioUrl,a=e.images,c=Object(n.useRef)(),i=Object(n.useRef)();function l(){i.current.playPlayer()}function o(){i.current.stopPlayer()}return Object(n.useEffect)(function(){return c.current.addEventListener("play",l),c.current.addEventListener("pause",o),function(){c.current.removeEventListener("play",l),c.current.removeEventListener("pause",o)}},[]),r.a.createElement("div",{className:"Audio block"},r.a.createElement(q,{playerRef:c},r.a.createElement("source",{src:t})),r.a.createElement(P.a,{flickityRef:function(e){return i.current=e},options:{draggable:!1,prevNextButtons:!1,pageDots:!1,autoPlay:5e3},reloadOnUpdate:!0},a.map(function(e){return r.a.createElement("div",{key:e.url,className:"iframe-wrapper",style:{width:"100%"}},r.a.createElement("img",{alt:e.title,src:e.url}))})))},ne=a(104),re=function(e){var t=e.isLink,a=e.to,n=e.children,c=Object(m.a)(e,["isLink","to","children"]);return t?r.a.createElement("a",Object.assign({href:a},c),n):r.a.createElement(ne.a,Object.assign({to:a},c),n)},ce=function(e){var t=e.isHome;return r.a.createElement(d,{endpoint:"".concat("https://www.vera.org/","gallerynav/").concat(window.GALLERY_ID,".json")},function(e){var a=e.heading,n=e.anchors;return r.a.createElement("nav",{className:"Nav bg--red color--white",style:{height:"60px"}},r.a.createElement("div",{className:"Nav-lockup"},r.a.createElement("a",{href:"/"},r.a.createElement("img",{alt:"Vera Institute of Justice",src:"".concat("https://www.vera.org/","dist/img/logo_med-white.svg")})),r.a.createElement(re,{isLink:t,to:window.GALLERY_BASENAME,className:"Nav-heading size--body color--white"},a)),r.a.createElement("div",{className:"Nav-links ff-sans"},n.map(function(e){return r.a.createElement(re,{key:S(e),isLink:t,to:"".concat(window.GALLERY_BASENAME,"#").concat(S(e)),className:"ff-sans--bold color--white"},e)})))})};window.GALLERY_ID=window.GALLERY_ID||25695,window.GALLERY_BASENAME=window.GALLERY_BASENAME||"/through-their-eyes";var ie=function(){return r.a.createElement(l.a,{basename:window.GALLERY_BASENAME},r.a.createElement(r.a.Fragment,null,r.a.createElement(ce,{isHome:!0}),r.a.createElement(o.a,null,r.a.createElement(s.a,{exact:!0,path:"/",component:_}),r.a.createElement(s.a,{path:"/:slug",component:$}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(ie,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[164,1,2]]]);
//# sourceMappingURL=main.80d74899.chunk.js.map