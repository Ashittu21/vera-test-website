(this["webpackJsonppolice-budgets"]=this["webpackJsonppolice-budgets"]||[]).push([[0],{12:function(e,t,n){e.exports=n(27)},17:function(e,t,n){},18:function(e,t,n){},19:function(e,t,n){},20:function(e,t,n){},27:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(8),o=n.n(c),u=(n(17),n(4)),i=(n(18),n(9)),l=n.n(i),s=n(29),f=(n(19),n(11)),m=(n(20),Object(a.createContext)(1)),d=function(e){return r.a.createElement(m.Consumer,null,(function(t){return r.a.createElement(m.Provider,{value:t+1},e.children)}))},v=function(e){return r.a.createElement(m.Consumer,null,(function(t){var n="h"+Math.min(t,6);return r.a.createElement(n,e)}))},y=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}),E=function e(t){var n=t.data,c=Object(a.useContext)(m),o=Object.keys(n);return r.a.createElement(d,null,r.a.createElement("div",{style:{marginLeft:"".concat(c,"rem")}},1!==o.length||Array.isArray(n[o[0]])?o.map((function(t){return Array.isArray(n[t])?r.a.createElement("div",{key:t,className:"PoliceBudget-lineitem"},r.a.createElement(v,null,t),r.a.createElement("div",null,y.format(n[t][0].total))):r.a.createElement("div",{key:t},r.a.createElement("div",{className:"PoliceBudget-lineitem"},r.a.createElement(v,null,t),r.a.createElement("div",null,p(n[t]))),Object.keys(n[t]).length>1&&r.a.createElement(e,{data:n[t]}))})):r.a.createElement(e,{data:n[o[0]]})))},h=function(e){var t=e.city,n=e.data,a=p(n);return r.a.createElement("div",{className:"PoliceBudget"},r.a.createElement("div",{className:"PoliceBudget-lineitem",style:{position:"sticky",top:"0",backgroundColor:"white"}},r.a.createElement("h1",null,t),r.a.createElement("div",null,a)),r.a.createElement(E,{data:n}))},p=function(e){return y.format(function e(t){return Object.values(t).reduce((function(t,n){return t+(Array.isArray(n)?n.reduce((function(e,t){return e+ +t.total}),0):e(n))}),0)}(e))},b=function(e){var t=e.data,n=g(t),c=Object.keys(n).map((function(e){return{value:e,label:e}})),o=Object(a.useState)(c[0].value),i=Object(u.a)(o,2),l=i[0],s=i[1];return Object(a.useEffect)((function(){var e=c.map((function(e){return e.value})),t=function(t){console.log(t.key),"ArrowRight"===t.key?function(){var t=e.indexOf(l),n=c[t+1]?c[t+1]:c[0];s(n.value)}():"ArrowLeft"===t.key&&function(){var t=e.indexOf(l),n=c[t-1]?c[t-1]:c[e.length-1];s(n.value)}()};return window.addEventListener("keydown",t),function(){return window.removeEventListener("keydown",t)}}),[l,c]),r.a.createElement("div",{className:"CitySwitcher"},r.a.createElement(f.a,{options:c,value:c.find((function(e){return e.value===l})),onChange:function(e){s(e.value)}}),r.a.createElement(h,{city:l,data:n[l]}))},g=function(e){var t=e.reduce((function(e,t){return e[t.citystate]||(e[t.citystate]=[]),e[t.citystate].push(t),e}),{});return k(t)},k=function(e){return Object.keys(e).reduce((function(t,n){return t[n]=w("department",e[n]),Object.keys(t[n]).forEach((function(e){t[n][e]=w("expensecat",t[n][e]),Object.keys(t[n][e]).forEach((function(a){t[n][e][a]=w("expensedescrip",t[n][e][a]),Object.keys(t[n][e][a]).forEach((function(r){t[n][e][a][r]=w("personneltype",t[n][e][a][r])}))}))})),t}),{})},w=function(e,t){return t.reduce((function(t,n){return t[n[e]]||(t[n[e]]=[]),t[n[e]].push(n),t}),{})},O=function(){var e=j(l.a);return e?(console.log(e),r.a.createElement(b,{data:e})):r.a.createElement("div",null,"Loading")},j=function(e){var t=Object(a.useState)(),n=Object(u.a)(t,2),r=n[0],c=n[1];return Object(a.useEffect)((function(){fetch(e).then((function(e){return e.text()})).then((function(e){c(Object(s.a)(e))}))}),[c,e]),r};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(O,null),document.getElementById("PoliceBudgets")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,n){e.exports=n.p+"static/media/Consolidated_72PoliceDepartments.21ec9f08.csv"}},[[12,1,2]]]);
//# sourceMappingURL=main.ebdcde6a.chunk.js.map