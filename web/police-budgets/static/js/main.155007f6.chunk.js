(this["webpackJsonppolice-budgets"]=this["webpackJsonppolice-budgets"]||[]).push([[0],{40:function(e,t,a){e.exports=a.p+"static/media/Consolidated_72PoliceDepartments.3db1b138.csv"},43:function(e,t,a){e.exports=a.p+"static/media/carrot.f3e14036.svg"},51:function(e,t,a){e.exports=a(89)},56:function(e,t,a){},57:function(e,t,a){},58:function(e,t,a){},59:function(e,t,a){},62:function(e,t,a){},89:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),r=a(39),l=a.n(r),i=(a(56),a(3)),u=(a(57),a(40)),o=a.n(u),s=a(92),m=a(5),d=(a(58),a(47)),f=(a(59),Object(n.createContext)(1)),v=function(e){return c.a.createElement(f.Consumer,null,(function(t){return c.a.createElement(f.Provider,{value:t+1},e.children)}))},g=function(e){return c.a.createElement(f.Consumer,null,(function(t){var a="h"+Math.min(t,6);return c.a.createElement(a,e)}))},E=a(17),b=a(41),y=function(e,t){switch(t.type){case"setValue":return Object(m.a)(Object(m.a)({},e),{},{changes:Object(m.a)(Object(m.a)({},e.changes),{},Object(E.a)({},t.key,t.value))});default:return e}},h={changes:{}},P=function(e){var t=Object(b.useStorageReducer)(localStorage,"".concat(e," Police Budget"),y,h),a=Object(i.a)(t,2),n=a[0],c=a[1];return{state:n,setValue:function(e){return function(t){c({type:"setValue",key:e,value:t})}}}},p=a(48),B=a(43),j=a.n(B),O=function(){return c.a.createElement(p.a,{src:j.a})};a(62),a(46);var N=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0}),w=function e(t){var a=t.data,r=t.state,l=t.setValue,i=Object(n.useContext)(f),u=Object.keys(a).sort((function(e,t){var n=A(a[e]),c=A(a[t]);return n>c?-1:n<c?1:0})),o=r.changes;return 1!==u.length||Array.isArray(a[u[0]])?c.a.createElement(v,null,c.a.createElement("div",{style:{marginLeft:"".concat(i>1?1.5:0,"rem")}},u.map((function(t){if(Array.isArray(a[t]))return c.a.createElement("div",{key:t,className:"PoliceBudget-lineitem PoliceBudget-lineitem--final"},c.a.createElement(g,null,t),c.a.createElement("div",{className:"PoliceBudget-lineitem-adjust"},c.a.createElement(x,{value:o[t],onChange:l(a[t][0].uid)})),c.a.createElement("div",null,N.format(a[t][0].total)));var n=function e(t){return Array.isArray(t)?t[0].uid:e(t[Object.keys(t)[0]])}(a[t]),i=C(a[t]),s=A(a[t]),m=A(a[t],o),d=a[u[u.indexOf(t)+1]]&&C(a[u[u.indexOf(t)+1]]);return c.a.createElement(k,{key:t,title:t,nextLevel:i,nextIsParent:d,value:o[n],setValue:l(n),before:s,after:m},i&&c.a.createElement("div",null,c.a.createElement(e,{data:i,state:r,setValue:l})))})))):c.a.createElement(e,{data:a[u[0]],state:r,setValue:l})},k=function(e){var t=e.nextLevel,a=e.nextIsParent,r=e.title,l=e.value,u=e.setValue,o=e.before,s=e.after,m=e.children,d=Object(n.useState)(!1),f=Object(i.a)(d,2),v=f[0],E=f[1],b=o!==s;return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"PoliceBudget-lineitem ".concat(t?"":"PoliceBudget-lineitem--final"," ").concat(a?"PoliceBudget-lineitem--last":""," ").concat(b?"PoliceBudget-lineitem--haschange":"","\n        ")},c.a.createElement("div",{className:"PoliceBudget-lineitem-heading"},t?c.a.createElement("button",{className:"PoliceBudget-lineitem-toggle ".concat(v?"is-open":""),onClick:function(){return E(!v)}},c.a.createElement(O,null),c.a.createElement(g,null,r)):c.a.createElement(g,null,r)),c.a.createElement("div",{className:"PoliceBudget-lineitem-adjust"},!t&&c.a.createElement(x,{value:l,onChange:u})),c.a.createElement("div",{className:"PoliceBudget-lineitem-before"},N.format(o)),c.a.createElement("div",{className:"PoliceBudget-lineitem-after"},N.format(s))),v&&m)},x=function(e){var t=e.value,a=e.onChange;return c.a.createElement("div",{className:"PoliceBudget-adjust"},c.a.createElement("input",{type:"number",value:t||0,increment:1,max:100,min:-100,onChange:function(e){return a(+e.target.value)}}),"%")};function C(e){if(Array.isArray(e))return null;var t=Object.keys(e);return 1===t.length?C(e[t[0]]):e}var A=function e(t,a){return Array.isArray(t)?n(t):Object.values(t).reduce((function(t,c){return t+(Array.isArray(c)?n(c):e(c,a))}),0);function n(e){return e.reduce((function(e,t){var n=a&&a[t.uid]?1-a[t.uid]/100:1;return e+ +t.total*n}),0)}},S=function(e){var t=e.cityLabel,a=e.city,n=e.data,r=P(a),l=r.state,i=r.setValue,u=A(n),o=A(n,l.changes);return c.a.createElement("div",{className:"PoliceBudget"},c.a.createElement("div",{className:"PoliceBudget-main"},c.a.createElement("div",{className:"PoliceBudget-title"},c.a.createElement("h1",null,t)),c.a.createElement("div",{className:"PoliceBudget-lineitem PoliceBudget-header"},c.a.createElement("div",{className:"PoliceBudget-lineitem-heading"},"Category"),c.a.createElement("div",{className:"PoliceBudget-lineitem-adjust"},"% Reduction"),c.a.createElement("div",{className:"PoliceBudget-lineitem-before"},"FY2020"),c.a.createElement("div",{className:"PoliceBudget-lineitem-after"},"Proposed")),c.a.createElement("div",{className:"PoliceBudget-budget"},c.a.createElement(w,{data:n,state:l,setValue:i})),c.a.createElement("div",{className:"PoliceBudget-lineitem PoliceBudget-lineitem--total ".concat(u!==o?"PoliceBudget-lineitem--haschange":"")},c.a.createElement("div",{className:"PoliceBudget-lineitem-heading"},"Total"),c.a.createElement("div",{className:"PoliceBudget-lineitem-adjust"}),c.a.createElement("div",{className:"PoliceBudget-lineitem-before"},N.format(u)),c.a.createElement("div",{className:"PoliceBudget-lineitem-after"},N.format(o)))),c.a.createElement("div",{className:"PoliceBudget-visualization"},c.a.createElement(L,{label:"FY2020",value:N.format(u),className:"PoliceBudget-total-before"}),c.a.createElement(L,{label:"Proposed",value:N.format(o),className:"PoliceBudget-total-after"}),c.a.createElement(L,{label:"Savings",value:"".concat(N.format(u-o)," (").concat(Math.round(100*(u-o)/u),"%)")})))},L=function(e){var t=e.label,a=e.value,n=e.className,r=void 0===n?"":n;return c.a.createElement("div",{className:"PoliceBudget-total ".concat(r)},c.a.createElement("div",{className:"PoliceBudget-total-label"},t),c.a.createElement("div",{className:"PoliceBudget-total-value"},a))},V=function(e){var t=e.data,a=F(t),r=a.data,l=a.slugTitle,u=Object.keys(l).map((function(e){return{value:e,label:l[e]}})),o=window.PoliceBudgetCity||null,s=o&&u.find((function(e){return e.value===o})),m=Object(n.useState)(s?s.value:u[0].value),f=Object(i.a)(m,2),v=f[0],g=f[1],E=l[v];return Object(n.useEffect)((function(){var e=u.map((function(e){return e.value})),t=function(t){"ArrowUp"===t.key?function(){var t=e.indexOf(v),a=u[t+1]?u[t+1]:u[0];g(a.value)}():"ArrowDown"===t.key&&function(){var t=e.indexOf(v),a=u[t-1]?u[t-1]:u[e.length-1];g(a.value)}()};return window.addEventListener("keydown",t),function(){return window.removeEventListener("keydown",t)}}),[v,u]),c.a.createElement("div",{className:"CitySwitcher"},!s&&c.a.createElement(d.a,{options:u,value:u.find((function(e){return e.value===v})),onChange:function(e){g(e.value)}}),c.a.createElement(S,{cityLabel:E,city:v,data:r[v]}))},F=function(e){var t={},a=e.map((function(e){var a="".concat(e.City.trim().toLowerCase().replace(/\s/g,"-"),"-").concat(e["State Abb"].trim().toLowerCase());return t[a]||(t[a]="".concat(e.City.trim(),", ").concat(e["State Abb"].trim())),Object(m.a)({uid:"".concat(e.department,"-").concat(e.expensecat,"-").concat(e.subdep,"-").concat(e.expensedescrip,"-").concat(e.personneltype),slug:a},e)})).reduce((function(e,t){return e[t.slug]||(e[t.slug]=[]),e[t.slug].push(t),e}),{});return{data:D(a),slugTitle:t}},D=function(e){return Object.keys(e).reduce((function(t,a){return t[a]=I("department",e[a]),Object.keys(t[a]).forEach((function(e){t[a][e]=I("expensecat",t[a][e]),Object.keys(t[a][e]).forEach((function(n){t[a][e][n]=I("subdep",t[a][e][n]),Object.keys(t[a][e][n]).forEach((function(c){t[a][e][n][c]=I("expensedescrip",t[a][e][n][c]),Object.keys(t[a][e][n][c]).forEach((function(r){t[a][e][n][c][r]=I("personneltype",t[a][e][n][c][r])}))}))}))})),t}),{})},I=function(e,t){return t.reduce((function(t,a){return t[a[e]]||(t[a[e]]=[]),t[a[e]].push(a),t}),{})},T=function(){var e=U(o.a);return e?c.a.createElement(V,{data:e}):c.a.createElement("div",null,"Loading")},U=function(e){var t=Object(n.useState)(),a=Object(i.a)(t,2),c=a[0],r=a[1];return Object(n.useEffect)((function(){fetch(e).then((function(e){return e.text()})).then((function(e){r(Object(s.a)(e))}))}),[r,e]),c};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(c.a.createElement(T,null),document.getElementById("PoliceBudgets")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[51,1,2]]]);
//# sourceMappingURL=main.155007f6.chunk.js.map