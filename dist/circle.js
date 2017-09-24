!function(t){function e(s){if(i[s])return i[s].exports;var r=i[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=2)}([function(t,e,i){"use strict";e.b=function(t){return(t=t.replace(/^([A-Z]+)([A-Z][a-z])/g,"$1-$2")).replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()},e.f=function(t){return t.replace(/(-[a-z])/g,function(t){return t.toUpperCase().replace("-","")})},e.c=function(t){if(t.match(/\[/))return t.replace(/^(.*)\[[^[]+?\]$/,"$1")},e.a=function(t){return t.match(/\[/)?t.replace(/^.*\['([^']+)'\]$/,"$1"):t},e.e=function(){return null!==navigator.userAgent.match(/Firefox/)},e.d=function(){return null!==navigator.userAgent.match(/Edge/)}},function(t,e,i){"use strict";function s(t){return t.replace(/\.([^.]+)/g,"['$1']")}class DBNotation{static isTwoWays(t){return t.match(/^\[\[.*\]\]$/)}static isOneWay(t){return t.match(/^\[.*\]$/)}static isEvent(t){return t.match(/^&/)}static extractModelVar(t){let e=t.replace(/^\[(.*?)\]$/g,"$1").replace(/^\[(.*?)\]$/g,"$1");return e=s(e)}static extractEventExpr(t){return t.substring(1)}static get scope(){return{TWO_WAYS:"=",ONE_WAY:"<",LITTERAL:"@",EVENT:"&"}}}e.a=DBNotation},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(3);window.circle&&console.warning("circle already loaded"),console.log("circle start"),window.o=function(t,e){if(void 0===e)return t.getRootNode().host;let i=t.getRootNode().host;for(;i.constructor.tag!==e;)if(!(i=i.getRootNode().host))throw new Error("circle.wc: cannot find a component with tag "+e);return i},Object.setPrototypeOf(window.o,new s.a),window.circle=window.o;class CircleExpr extends o.Element{render(){let t=void 0===this.model.expr?"":this.model.expr;t="object"==typeof t?JSON.stringify(t):t,this.root.innerHTML=t}}CircleExpr.reg},function(t,e,i){"use strict";var s=i(4),r=i(6);class Circle{constructor(){this.Element=s.a,this.Behavior=r.a,this.digestId=0,this.dependancyInjectionRegistry={},this.behaviorRegistry={}}stackTrace(){return(new Error).stack}di(t,e){return arguments.length>1&&(this.dependancyInjectionRegistry[t]=e),this.dependancyInjectionRegistry[t]}}e.a=Circle},function(module,__webpack_exports__,__webpack_require__){"use strict";function parseBehavior(t){for(let e in window.circle.behaviorRegistry)t.querySelectorAll(`[${e}]`).forEach(t=>{new window.circle.behaviorRegistry[e](t)})}var __WEBPACK_IMPORTED_MODULE_0__functions_js__=__webpack_require__(0),__WEBPACK_IMPORTED_MODULE_1__Databinding_js__=__webpack_require__(5);const doc=document.currentScript.ownerDocument;class CircleElement extends HTMLElement{static get tag(){return Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__.b)(this.name)}static get reg(){window.customElements.define(this.tag,this)}static get observedAttributes(){return this._oa}static set oa(t){this._oa=t}attributeChangedCallback(t,e,i){this.setModel(Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__.f)(t),i)}constructor(){function t(i){return{set(s,r,n){const o=i?`${i}['${r}']`:r;if(Array.isArray(s)&&"length"===r)return!0;s[r]=null===n||"object"!=typeof n||n instanceof CircleProxyType?n:new Proxy(n,t(o)),circle.digestId++;let c=o;for(;c;)e.digest(c),c=Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__.c)(c);return!0},deleteProperty:(t,s)=>(delete t[s],Array.isArray(t)&&t.length--,circle.digestId++,e.digest(i),!0),getPrototypeOf(t){return CircleProxyType.prototype}}}super();const e=this;class CircleProxyType{}this.event={},this.model=new Proxy({},t()),this.digestRegistry={},this.templateSelector="#"+this.constructor.tag,this.databinding=new __WEBPACK_IMPORTED_MODULE_1__Databinding_js__.a(this),this.isRenderingAsked=!1}getParent(){return this.getRootNode().host}connectedCallback(){this.root=this.root||this.attachShadow({mode:"open"}),this.myDoc=Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__.e)()||Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__.d)()||null===document.currentScript?doc:document.currentScript.ownerDocument;const t=this.myDoc.querySelector(this.templateSelector);if(t){const e=document.importNode(t.content,!0);this.parseExpr(e),this.root.innerHTML="",this.root.appendChild(e),parseBehavior(this.root)}this.databinding.connectedCallBack(),this.init()}init(){}askRendering(){this.isRenderingAsked||(this.isRenderingAsked=!0,setTimeout(()=>{this.render(),this.isRenderingAsked=!1},0))}render(){}onDigest(t){this.databinding.onDigest(t)}bindKey(t,e){const i=this.digestRegistry;void 0===i[t]?i[t]=[e]:i[t].push(e)}digest(t){this.digestRegistry[t]&&this.digestRegistry[t].forEach((e,i)=>{e.onDigest(t)}),this.databinding.digest(t)}getModel(absoluteKey){const k=Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__.c)(absoluteKey);k&&"object"!=typeof this.getModel(k)&&this.setModel(k,{});const prefix=absoluteKey.startsWith("[")?"this.model":"this.model.",str=prefix+absoluteKey;return eval(str)}hasModel(t){const e=Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__.c)(t),i=Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__.a)(t);return e?this.hasModel(e)&&i in this.getModel(e):i in this.model}setModel(absoluteKey,value){if(this.getModel(absoluteKey)===value)return;const str="this.model."+absoluteKey+" = value";eval(str)}setEvent(attr,value){this.event[attr]=(()=>eval(value))}parseExpr(t){const e=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,null,!1);let i=[];for(let t=e.nextNode();null!==t;t=e.nextNode())t.data.match(/{{(.*?)}}/g)&&i.push(t);i.forEach(t=>{const e=document.createElement("span");e.innerHTML=t.data.replace(/{{(.*?)}}/g,(t,e)=>`<circle-expr expr="[${e}]"></circle-expr>`);const i=t.parentNode;i.insertBefore(e,t),i.removeChild(t)})}}__webpack_exports__.a=CircleElement},function(t,e,i){"use strict";var s=i(0),r=i(1);class Databinding{constructor(t){this.elt=t,this.scope={}}initScope(){for(let t=0;t<this.elt.attributes.length;t++){const e=this.elt.attributes[t].name,i=this.elt.attributes[t].value;r.a.isTwoWays(i)?this.scope[e]=r.a.scope.TWO_WAYS:r.a.isOneWay(i)?this.scope[e]=r.a.scope.ONE_WAY:r.a.isEvent(i)?this.scope[e]=r.a.scope.EVENT:this.scope[e]=r.a.scope.LITTERAL}}getModelVar(t){return r.a.extractModelVar(this.elt.getAttribute(t))}connectedCallBack(){this.initScope();for(let t in this.scope){if(this.scope[t]===r.a.scope.LITTERAL){this.elt.setModel(Object(s.f)(t),this.elt.getAttribute(t));continue}if(this.scope[t]===r.a.scope.EVENT){this.elt.setEvent(Object(s.f)(t),r.a.extractEventExpr(this.elt.getAttribute(t)));continue}const e=this.getModelVar(t),i=this.elt.getParent();i&&i.bindKey(e,this.elt),this.elt.onDigest(e)}this.elt.askRendering()}onDigest(t){for(let e in this.scope)if(this.scope[e]!==r.a.scope.LITTERAL&&this.getModelVar(e)===t){const i=this.elt.getParent().getModel(t);this.elt.setModel(Object(s.f)(e),i)}this.elt.askRendering()}digest(t){if(t in this.scope&&(this.scope[t]===r.a.scope.LITTERAL&&this.elt.getAttribute(t)!==this.elt.getModel(Object(s.f)(t))&&this.elt.setAttribute(t,this.elt.getModel(Object(s.f)(t))),this.scope[t]===r.a.scope.TWO_WAYS)){const e=this.getModelVar(t);this.elt.getParent().setModel(e,this.elt.getModel(Object(s.f)(t)))}this.elt.askRendering()}}e.a=Databinding},function(t,e,i){"use strict";var s=i(0),r=i(1);class CircleBehavior{static get tag(){return Object(s.b)(this.name)}static get reg(){window.circle.behaviorRegistry[this.tag]=this}constructor(t){this.elt=t,this.host=t.getRootNode().host,this.key=this.getModelVar(this.constructor.tag),this.init(),console.log("behavior"),this.host.bindKey(this.key,this);let e=this.key;for(;e;)this.host.bindKey(e,this),e=Object(s.c)(e);this.onDigest(this.key)}init(){}getModelVar(t){return r.a.extractModelVar(this.elt.getAttribute(t))}onDigest(){}}e.a=CircleBehavior}]);
//# sourceMappingURL=circle.js.map