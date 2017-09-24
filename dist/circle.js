/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = camel2Spinal;
/* harmony export (immutable) */ __webpack_exports__["f"] = spinal2Camel;
/* harmony export (immutable) */ __webpack_exports__["c"] = dirname;
/* harmony export (immutable) */ __webpack_exports__["a"] = basename;
/* harmony export (immutable) */ __webpack_exports__["e"] = isFirefox;
/* harmony export (immutable) */ __webpack_exports__["d"] = isEdge;
/**
 * Translate a string from CamelCase to spinal-case.
 * Note: works well with SPECIALCamelCase as well.
 * 
 * @param {string} str - CamelCase string
 * @returns spinal-case equivalent string.
 */
function camel2Spinal(str) {
    // handle case like JLGStars becoming jlg-stars
    str = str.replace(/^([A-Z]+)([A-Z][a-z])/g, '$1-$2');
    // then do the traditional conversion to spinal case.
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function spinal2Camel(str) {
    return str.replace(/(-[a-z])/g, function ($1) { return $1.toUpperCase().replace('-', ''); });
}

/**
 * Returns the parent key
 * Ex: 
 * hello['world']['toto'] becomes hello['world']
 * hello['world'] becomes hello
 * hello becomes undefined
 * 
 * @param {any} absoluteKey 
 * @returns 
 */
function dirname(absoluteKey) {
    if (absoluteKey.match(/\[/)) {
        return absoluteKey.replace(/^(.*)\[[^[]+?\]$/, '$1');
    }
    return undefined;
}

/**
 * Return the last key
 * Ex: 
 * hello['world']['toto'] becomes toto
 * hello['world'] becomes world
 * hello becomes hello
 * 
 * @param {any} absoluteKey 
 * @returns 
 */
function basename(absoluteKey) {
    if (absoluteKey.match(/\[/)) {
        return absoluteKey.replace(/^.*\['([^']+)'\]$/, '$1');
    }
    return absoluteKey;
}



/**
 * check if the user agent is Firefox
 * 
 * @returns true if user agent is Firefox, false otherwise.
 */
function isFirefox() {
    return navigator.userAgent.match(/Firefox/) !== null;
}

/**
 * check if the user agent is Microsoft Edge
 * 
 * @returns true if user agent is Edge, false otherwise.
 */
function isEdge() {
    return navigator.userAgent.match(/Edge/) !== null;
}





/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Transforms hello.world[3].foo.bar in hello['world'][3]['foo']['bar']
 * 
 * 
 * @param {any} key 
 * @returns 
 */
function parseAbsoluteKey(key) {
    return key.replace(/\.([^.]+)/g, '[\'$1\']');
}

/**
 * Class in charge of managing the databinding notation:
 * [] for one way databinding
 * [[]] for two way databinding
 * & for event databinding
 * For internal scope notation (Angular like: '@' for litteral, '<' for simple DB,
 * '=' for 2 way DB, '&' for event DB)
 * 
 * @class DBNotation
 */
class DBNotation {
    /**
     * Tests if the notation is a 2 ways data binding.
     * Notation is for the time being: [[...]]
     * 
     * @param {any} value 
     * @returns 
     */
    static isTwoWays(value) {
        return value.match(/^\[\[.*\]\]$/);
    }

    /**
     * Tests if the notation is a 1 way data binding.
     * Notation is for the time being: [...]
     * 
     * @param {any} value 
     * @returns 
     */
    static isOneWay(value) {
        return value.match(/^\[.*\]$/);
    }

    /**
     * Test if the notation is a event databinding
     * Notation is for the time being: &...
     * 
     * @static
     * @param {any} value 
     * @returns 
     * @memberof DBNotation
     */
    static isEvent(value) {
        return value.match(/^&/);
    }

    /**
     * removes the [] or [[]].
     * 
     * @static
     * @param {any} value 
     * @returns 
     * @memberof DBNotation
     */
    static extractModelVar(value) {
        let expr = value.replace(/^\[(.*?)\]$/g, '$1').replace(/^\[(.*?)\]$/g, '$1');
        expr = parseAbsoluteKey(expr);
        return expr;
    }

    /**
     * Removes the starting &.
     * 
     * @static
     * @param {any} value 
     * @returns 
     * @memberof DBNotation
     */
    static extractEventExpr(value) {
        return value.substring(1);
    }

    static get scope() {
        return {
            TWO_WAYS: '=',
            ONE_WAY: '<',
            LITTERAL: '@',
            EVENT: '&'
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DBNotation;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Circle_js__ = __webpack_require__(3);


console.log('circle start');

if (window.circle) { console.warning('circle already loaded'); }



window.o = function (element, tag) {
    if (tag === undefined) {
        return element.getRootNode().host;
    }
    let host = element.getRootNode().host;
    while (host.constructor.tag !== tag) {
        host = host.getRootNode().host;
        if (!host) {
            throw new Error('circle.wc: cannot find a component with tag ' + tag);
        }
    }
    return host;
};
Object.setPrototypeOf(window.o, new __WEBPACK_IMPORTED_MODULE_0__Circle_js__["a" /* Circle */]());
window.circle = window.o;


/**
 * CircleExpr is the component that allows displaying expressions.
 * 
 * @class CircleExpr
 * @extends {circle.Element}
 */
class CircleExpr extends o.Element {
    render() {
        let str = (this.model.expr === undefined) ? '' : this.model.expr;
        str = (typeof str === 'object') ? JSON.stringify(str) : str;
        this.root.innerHTML = str;
    }
}
CircleExpr.reg;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CircleElement_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CircleBehavior_js__ = __webpack_require__(6);



/**
 * The Circle class is the exposed class of the library.
 * The circle.js produces a global variable window.circle which is the hook
 * to all functionalities of this library.
 * 
 * @class Circle
 */
class Circle {
    constructor() {
        this.Element = __WEBPACK_IMPORTED_MODULE_0__CircleElement_js__["a" /* CircleElement */];
        this.Behavior = __WEBPACK_IMPORTED_MODULE_1__CircleBehavior_js__["a" /* CircleBehavior */];
        this.digestId = 0;
        this.dependancyInjectionRegistry = {};
        this.behaviorRegistry = {};
    }

    stackTrace() {
        var err = new Error();
        return err.stack;
    }

    di(str, di) {
        if (arguments.length > 1) {
            this.dependancyInjectionRegistry[str] = di;
        }
        return this.dependancyInjectionRegistry[str];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Circle;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functions_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Databinding_js__ = __webpack_require__(5);



function parseBehavior(rootElt) {
    for (let tag in window.circle.behaviorRegistry) {
        rootElt.querySelectorAll(`[${tag}]`).forEach(elt => {
            new window.circle.behaviorRegistry[tag](elt);
        });
    }
}

// Firefox and Edge does not understand well currentScript after init.
// So we keep this pointer for later.
const doc = document.currentScript.ownerDocument;

/**
 * A component in circle must extends the circle.Element class
 * which is a pointer on the CircleElement class.
 * 
 * @class CircleElement
 * @extends {HTMLElement}
 */
class CircleElement extends HTMLElement {
    static get tag() {
        return Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__["b" /* camel2Spinal */])(this.name);
    }
    static get reg() {
        window.customElements.define(this.tag, this);
    }

    static get observedAttributes() {
        return this._oa;
    }

    static set oa(value) {
        this._oa = value;
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        this.setModel(Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__["f" /* spinal2Camel */])(attr), newValue);
    }
    constructor() {
        super();
        const self = this;

        class CircleProxyType { }

        function handler(parentKey) {
            return {
                set(target, key, value) {
                    const absoluteKey = (parentKey) ? `${parentKey}['${key}']` : key;
                    if (Array.isArray(target)) {
                        if (key === 'length') {
                            return true;
                        }
                    }
                    if (value !== null && typeof value === 'object' && !(value instanceof CircleProxyType)) {
                        target[key] = new Proxy(value, handler(absoluteKey));
                    } else {
                        target[key] = value;
                    }
                    circle.digestId++;
                    // console.log('%d: %s: update %s to %s',
                    //     circle.digestId, self.constructor.name, absoluteKey, value, circle.stackTrace());
                    let k = absoluteKey;
                    while (k) {
                        self.digest(k);
                        k = Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__["c" /* dirname */])(k);
                    }
                    return true;
                },

                deleteProperty(target, key) {
                    delete target[key];
                    if (Array.isArray(target)) {
                        target.length--;
                    }
                    circle.digestId++;
                    // console.log('%d: %s: delete %s',
                    // 	circle.digestId, self.constructor.name, absoluteKey, circle.stackTrace());
                    self.digest(parentKey);
                    return true;
                },

                getPrototypeOf: function (key) {
                    return CircleProxyType.prototype;
                }
            };
        }

        this.event = {};
        this.model = new Proxy({}, handler());
        this.digestRegistry = {};
        this.templateSelector = '#' + this.constructor.tag;
        this.databinding = new __WEBPACK_IMPORTED_MODULE_1__Databinding_js__["a" /* Databinding */](this);
        this.isRenderingAsked = false;
    }

    getParent() {
        return this.getRootNode().host;
    }

    connectedCallback() {
        this.root = this.root || this.attachShadow({
            // see https://developers.google.com/web/fundamentals/architecture/building-components/shadowdom
            // Eric B. explain why it is better to use open mode.
            mode: 'open'
        });
        this.myDoc = (Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__["e" /* isFirefox */])() || Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__["d" /* isEdge */])() || (document.currentScript === null)) ?
            doc : document.currentScript.ownerDocument;

        const t = this.myDoc.querySelector(this.templateSelector);
        if (t) {
            const clone = document.importNode(t.content, true);
            this.parseExpr(clone);
            this.root.innerHTML = '';
            this.root.appendChild(clone);
            parseBehavior(this.root);
        }
        this.databinding.connectedCallBack();
        this.init();
    }

    init() { }

    askRendering() {
        if (!this.isRenderingAsked) {
            this.isRenderingAsked = true;
            setTimeout(() => {
                this.render();
                this.isRenderingAsked = false;
            }, 0);
        }
    }

    render() { }

    onDigest(key) {
        this.databinding.onDigest(key);
    }
    bindKey(key, elt) {
        const digestRegistry = this.digestRegistry;
        if (digestRegistry[key] === undefined) {
            digestRegistry[key] = [elt];
        } else {
            digestRegistry[key].push(elt);
        }
    }

    digest(key) {
        if (this.digestRegistry[key]) {
            this.digestRegistry[key].forEach((elt, index) => {
                elt.onDigest(key);
            });
        }
        this.databinding.digest(key);
    }

    getModel(absoluteKey) {
        const k = Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__["c" /* dirname */])(absoluteKey);
        if (k && (typeof this.getModel(k) !== 'object')) {
            this.setModel(k, {});
        }
        const prefix = (absoluteKey.startsWith('[')) ? 'this.model' : 'this.model.';
        const str = prefix + absoluteKey;
        return eval(str);
    }

    hasModel(absoluteKey) {
        const k = Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__["c" /* dirname */])(absoluteKey);
        const b = Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__["a" /* basename */])(absoluteKey);
        if (k) {
            return this.hasModel(k) && (b in this.getModel(k));
        }
        return b in this.model;
    }

    setModel(absoluteKey, value) {
        if (this.getModel(absoluteKey) === value) {
            return;
        }
        const str = 'this.model.' + absoluteKey + ' = value';
        eval(str);
    }

    setEvent(attr, value) {
        this.event[attr] = () => eval(value);
    }


    /**
     * We want the user be able to easily insert expression like in AngularJS.
     * But internally, the {{myModelVar}} must be converted to <circle-expr expr="[myModelVar]"></circle-expr>
     * 
     * @param {any} elt 
     * @memberof CircleElement
     */
    parseExpr(elt) {
        const walk = document.createTreeWalker(elt, NodeFilter.SHOW_TEXT, null, false);
        let array = [];
        for (let node = walk.nextNode(); node !== null; node = walk.nextNode()) {
            if (node.data.match(/{{(.*?)}}/g)) {
                array.push(node);
            }
        }
        array.forEach((node) => {
            const replacementNode = document.createElement('span');
            replacementNode.innerHTML = node.data.replace(/{{(.*?)}}/g, (match, name) => {
                return `<circle-expr expr="[${name}]"></circle-expr>`;
            });
            const parentNode = node.parentNode;
            parentNode.insertBefore(replacementNode, node);
            parentNode.removeChild(node);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CircleElement;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functions_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DBNotation_js__ = __webpack_require__(1);




class Databinding {
    constructor(circleElement) {
        this.elt = circleElement;
        this.scope = {};
    }

    initScope() {
        for (let i = 0; i < this.elt.attributes.length; i++) {
            const key = this.elt.attributes[i].name;
            const value = this.elt.attributes[i].value;
            if (__WEBPACK_IMPORTED_MODULE_1__DBNotation_js__["a" /* DBNotation */].isTwoWays(value)) {
                this.scope[key] = __WEBPACK_IMPORTED_MODULE_1__DBNotation_js__["a" /* DBNotation */].scope.TWO_WAYS;
            } else if (__WEBPACK_IMPORTED_MODULE_1__DBNotation_js__["a" /* DBNotation */].isOneWay(value)) {
                this.scope[key] = __WEBPACK_IMPORTED_MODULE_1__DBNotation_js__["a" /* DBNotation */].scope.ONE_WAY;
            } else if (__WEBPACK_IMPORTED_MODULE_1__DBNotation_js__["a" /* DBNotation */].isEvent(value)) {
                this.scope[key] = __WEBPACK_IMPORTED_MODULE_1__DBNotation_js__["a" /* DBNotation */].scope.EVENT;
            } else {
                this.scope[key] = __WEBPACK_IMPORTED_MODULE_1__DBNotation_js__["a" /* DBNotation */].scope.LITTERAL;
            }
        }
    }

    getModelVar(attr) {
        return __WEBPACK_IMPORTED_MODULE_1__DBNotation_js__["a" /* DBNotation */].extractModelVar(this.elt.getAttribute(attr));
    }

    connectedCallBack() {
        this.initScope();
        for (let attr in this.scope) {
            if (this.scope[attr] === __WEBPACK_IMPORTED_MODULE_1__DBNotation_js__["a" /* DBNotation */].scope.LITTERAL) {
                this.elt.setModel(Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__["f" /* spinal2Camel */])(attr), this.elt.getAttribute(attr));
                continue;
            }

            if (this.scope[attr] === __WEBPACK_IMPORTED_MODULE_1__DBNotation_js__["a" /* DBNotation */].scope.EVENT) {
                this.elt.setEvent(Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__["f" /* spinal2Camel */])(attr), __WEBPACK_IMPORTED_MODULE_1__DBNotation_js__["a" /* DBNotation */].extractEventExpr(this.elt.getAttribute(attr)));
                continue;
            }

            const modelVar = this.getModelVar(attr);
            const parent = this.elt.getParent();
            if (parent) {
                parent.bindKey(modelVar, this.elt);
            }
            this.elt.onDigest(modelVar);
        }
        this.elt.askRendering();
    }

    onDigest(key) {
        for (let attr in this.scope) {
            if (this.scope[attr] === __WEBPACK_IMPORTED_MODULE_1__DBNotation_js__["a" /* DBNotation */].scope.LITTERAL) {
                continue;
            }
            const modelVar = this.getModelVar(attr);
            if (modelVar === key) {
                const parentModelValue = this.elt.getParent().getModel(key);
                this.elt.setModel(Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__["f" /* spinal2Camel */])(attr), parentModelValue);
            }
        }
        this.elt.askRendering();
    }

    digest(key) {
        if (key in this.scope) {
            if (this.scope[key] === __WEBPACK_IMPORTED_MODULE_1__DBNotation_js__["a" /* DBNotation */].scope.LITTERAL) {
                if (this.elt.getAttribute(key) !== this.elt.getModel(Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__["f" /* spinal2Camel */])(key))) {
                    this.elt.setAttribute(key, this.elt.getModel(Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__["f" /* spinal2Camel */])(key)));
                }
            }
            if (this.scope[key] === __WEBPACK_IMPORTED_MODULE_1__DBNotation_js__["a" /* DBNotation */].scope.TWO_WAYS) {
                const modelVar = this.getModelVar(key);
                this.elt.getParent().setModel(modelVar, this.elt.getModel(Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__["f" /* spinal2Camel */])(key)));
            }
        }
        this.elt.askRendering();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Databinding;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functions_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DBNotation_js__ = __webpack_require__(1);



class CircleBehavior {
    static get tag() {
        return Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__["b" /* camel2Spinal */])(this.name);
    }
    static get reg() {
        window.circle.behaviorRegistry[this.tag] = this;
    }

    constructor(elt) {
        this.elt = elt;
        this.host = elt.getRootNode().host;
        this.key = this.getModelVar(this.constructor.tag);
        this.init();
        console.log('behavior');

        this.host.bindKey(this.key, this);
        let k = this.key;
        while (k) {
            this.host.bindKey(k, this);
            k = Object(__WEBPACK_IMPORTED_MODULE_0__functions_js__["c" /* dirname */])(k);
        }
        this.onDigest(this.key);
    }

    init() { }

    getModelVar(attr) {
        return __WEBPACK_IMPORTED_MODULE_1__DBNotation_js__["a" /* DBNotation */].extractModelVar(this.elt.getAttribute(attr));
    }

    onDigest() { }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CircleBehavior;


/***/ })
/******/ ]);
//# sourceMappingURL=circle.js.map