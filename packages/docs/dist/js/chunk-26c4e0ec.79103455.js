(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-26c4e0ec"],{"33c2":function(e,t,n){},"3b43":function(e,t,n){"use strict";var i=n("0b38"),a=(n("33c2"),n("ee18")),s=n("429e"),r=n("4430");function o(e,t,n){var i=[];return n.icon.value&&e.useIcon&&i.push(Object(r["p"])("div",{class:"media-left"},[Object(r["p"])(n.icon.value,{size:n.iconSize.value,variant:e.variant,class:e.variant})])),i.push(Object(r["p"])("div",{class:"media-content"},t.slots.default&&t.slots.default()||e.message)),Object(r["p"])("section",{class:"message-body","aria-label":"Close message"},[Object(r["p"])("div",{class:"media"},i)])}function c(e,t,n){var a=t.slots.title?t.slots.title():e.title?[e.title]:[];return e.isClosable&&a.push(Object(r["p"])("button",Object(i["a"])({class:"delete",attrs:{"aria-label":"Close message"}},n.listeners))),Object(r["p"])("header",{class:"message-header"},a)}function u(e,t,n){return Object(r["p"])("article",{class:["message",e.variant,e.size]},t.slots.title||e.title?[c(e,t,n),o(e,t,n)]:[o(e,t,n)])}t["a"]=Object(r["n"])({name:"b-message",props:Object(i["a"])(Object(i["a"])({},a["a"]),s["a"]),setup:function(e,t){var n=Object(a["b"])(e),i=Object(s["c"])(e),o=Object(r["e"])((function(){return n.isOn.value||void 0===e.title&&!!t.slots.title}));return function(){return Object(r["p"])(r["b"],i.value,(function(){return o.value?u(e,t,n):void 0}))}}})},"429e":function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return c})),n.d(t,"c",(function(){return u}));var i=n("380f"),a=n("4430"),s=n("f5dd");function r(e){return{transition:{type:[Object,String],default:Object(i["f"])(e)}}}var o=r("fade");function c(e){return Object(s["m"])(e)?{name:e,css:!0}:e}function u(e){return Object(a["e"])((function(){return c(e.transition)}))}},"8fa9":function(e,t,n){var i=n("7526"),a=n("c1a2");e.exports=function(e,t,n){var s,r;return a&&"function"==typeof(s=t.constructor)&&s!==n&&i(r=s.prototype)&&r!==n.prototype&&a(e,r),e}},ab4d:function(e,t,n){"use strict";n.r(t);var i=n("4430"),a={"aria-label":"summary of buetify"},s=Object(i["j"])(" This documentation assumes you have at least a basic knowledge of Vue. If you don't, head over to "),r=Object(i["k"])("a",{href:"https://v3.vuejs.org",target:"_blank"},"Vue",-1),o=Object(i["j"])(" first before starting here. You will be much better off. "),c=Object(i["i"])('<div class="content"><p> Buetify is a modular library of responsive UI components for <a class="has-text-link" href="https://vuejs.org/" target="_blank" rel="noopener">Vue.js</a> incorporating the <a class="has-text-link" href="http://bulma.io/" target="_blank" rel="noopener">Bulma</a> framework and design. </p><h2>Work in Progress</h2><p> This is a work in progress and is meant to be used with Vue 3. I started Buetify in order to gain a better understanding of design principles, accessibility and Vue. It began as a fork of <a href="https://buefy.org/" target="_blank" rel="noopener">Buefy</a> which is awesome and what should be used in a production setting. This library also includes many concepts from Vuetify in terms of accessibility and how to incorporate typescript into a Vue project. </p><h2> Differences from Buefy </h2><h3>Main Differences</h3><ul><li>Written in Typescript</li><li>Uses only render functions to maximize type safety</li><li>Completely tree-shakeable. Use only what you need</li></ul><h2>Small Differences</h2><ul><li> Requires all components to be nested inside a <code>b-app</code> component for the sidebar, notifications, and modals to work properly </li><li> Requires additional webpack config such that sass variables are prepended to all sass files. This prevents the need from importing all sass upfront </li><li> Small differences in naming conventions, e.g. <code>variant</code> rather than <code>type</code> for color props </li><li> Icons need to be passed as vue components rather than strings. This was done to simplify how icons are handled. Default icons are provided. </li></ul><p> Other than these small differences, Buetify should look and appear to be very similar to Buefy and that is by design! All the styling should be close to identical. The biggest differences are in the implementation. </p></div>',1);function u(e,t,n,u,l,f){var b=Object(i["F"])("b-message");return Object(i["z"])(),Object(i["g"])("article",a,[Object(i["k"])(b,{variant:"is-info"},{default:Object(i["R"])((function(){return[s,r,o]})),_:1}),c])}n("e143");var l=n("3b43"),f=Object(i["n"])({name:"buetify-summary",components:{BMessage:l["a"]}});f.render=u;t["default"]=f},e143:function(e,t,n){},e94e:function(e,t,n){"use strict";var i=n("d4cb"),a=n("f498"),s=n("ebac"),r=n("b8ba"),o=n("f1a7"),c=n("6a61"),u=n("8fa9"),l=n("083f"),f=n("72df"),b=n("82e8"),d=n("65d0").f,p=n("185a").f,h=n("abdf").f,m=n("61ad").trim,v="Number",g=a[v],y=g.prototype,O=c(b(y))==v,j=function(e){var t,n,i,a,s,r,o,c,u=l(e,!1);if("string"==typeof u&&u.length>2)if(u=m(u),t=u.charCodeAt(0),43===t||45===t){if(n=u.charCodeAt(2),88===n||120===n)return NaN}else if(48===t){switch(u.charCodeAt(1)){case 66:case 98:i=2,a=49;break;case 79:case 111:i=8,a=55;break;default:return+u}for(s=u.slice(2),r=s.length,o=0;o<r;o++)if(c=s.charCodeAt(o),c<48||c>a)return NaN;return parseInt(s,i)}return+u};if(s(v,!g(" 0o1")||!g("0b1")||g("+0x1"))){for(var k,I=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof I&&(O?f((function(){y.valueOf.call(n)})):c(n)!=v)?u(new g(j(t)),n,I):j(t)},w=i?d(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;w.length>N;N++)o(g,k=w[N])&&!o(I,k)&&h(I,k,p(g,k));I.prototype=y,y.constructor=I,r(a,v,I)}},ee18:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return u}));n("e94e"),n("ef1f");var i=n("0b38"),a=n("380f"),s=n("4430"),r=n("cf2f"),o={"is-info":Object(s["m"])((function(){return Promise.all([n.e("chunk-2bc7ec9b"),n.e("chunk-76b03f04")]).then(n.bind(null,"33ba"))})),"is-success":Object(s["m"])((function(){return Promise.all([n.e("chunk-2bc7ec9b"),n.e("chunk-51c31fbf")]).then(n.bind(null,"911c"))})),"is-warning":Object(s["m"])((function(){return Promise.all([n.e("chunk-2bc7ec9b"),n.e("chunk-2eca5e60")]).then(n.bind(null,"f156"))})),"is-danger":Object(s["m"])((function(){return Promise.all([n.e("chunk-2bc7ec9b"),n.e("chunk-0bdfb860")]).then(n.bind(null,"1e7f"))}))};var c=Object(i["a"])(Object(i["a"])({},Object(r["b"])("isActive",!0)),{},{title:{type:String},isClosable:{type:Boolean,default:!0},message:{type:String},variant:{type:String,default:""},size:{type:String,default:""},iconSize:{type:String,default:""},useAutoClose:{type:Boolean,default:!1},duration:{type:Number,default:2e3},useIcon:{type:Boolean,default:!1},icons:{type:Object,default:Object(a["f"])(o)},icon:{type:Object}});function u(e){var t=Object(r["c"])(e,"isActive"),n=Object(s["e"])((function(){var t;return null!==(t=e.icon)&&void 0!==t?t:e.icons[e.variant]})),a=Object(s["e"])((function(){return e.iconSize||e.size||"is-large"}));function o(){e.useAutoClose&&setTimeout((function(){t.isOn.value&&t.setOff()}),e.duration)}return Object(i["a"])(Object(i["a"])({},t),{},{icon:n,iconSize:a,setAutoClose:o})}}}]);
//# sourceMappingURL=chunk-26c4e0ec.79103455.js.map