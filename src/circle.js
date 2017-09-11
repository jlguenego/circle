(function () {
	'use strict';

	// Firefox and Edge does not understand well currentScript after init.
	// So we keep this pointer for later.
	const doc = document.currentScript.ownerDocument;

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

	function dirname(absoluteKey) {
		if (absoluteKey.match(/\[/)) {
			return absoluteKey.replace(/^(.*)\[[^[]+?\]$/, '$1');
		}
		return undefined;
	}

	/**
	 * Transforms hello.world[3].foo.bar in hello['world'][3]['foo']['bar']
	 * 
	 * 
	 * @param {any} key 
	 * @returns 
	 */
	function parseAbsoluteKey(key) {
		const result = key.replace(/\.([^.]+)/g, '[\'$1\']');
		return result;
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

	/**
	 * We want the user be able to easily insert expression like in AngularJS.
	 * But internally, the {{myModelVar}} must be converted to <circle-expr expr="[myModelVar]"></circle-expr>
	 * 
	 * @param {any} elt 
	 */
	function parseExpr(elt) {
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

	function parseBehavior(rootElt) {
		for (let tag in window.circle.behaviorRegistry) {
			rootElt.querySelectorAll(`[${tag}]`).forEach(elt => {
				new window.circle.behaviorRegistry[tag](elt);
			});
		}
	}

	/**
	 * Class in charge of managing the databinding notation:
	 * [] for one way databinding
	 * [[]] for two way databinding
	 * For internal scope notation (Angular like: '@' for litteral, '<' for simple DB,
	 * '=' for 2 way DB)
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

		static get scope() {
			return {
				TWO_WAYS: '=',
				ONE_WAY: '<',
				LITTERAL: '@'
			};
		}
	}

	class Databinding {
		constructor(circleElement) {
			this.elt = circleElement;
			this.scope = {};
		}

		initScope() {
			for (let i = 0; i < this.elt.attributes.length; i++) {
				const key = this.elt.attributes[i].name;
				const value = this.elt.attributes[i].value;
				if (DBNotation.isTwoWays(value)) {
					this.scope[key] = DBNotation.scope.TWO_WAYS;
				} else if (DBNotation.isOneWay(value)) {
					this.scope[key] = DBNotation.scope.ONE_WAY;
				} else {
					this.scope[key] = DBNotation.scope.LITTERAL;
				}
			}
		}

		getModelVar(attr) {
			return DBNotation.extractModelVar(this.elt.getAttribute(attr));
		}

		connectedCallBack() {
			this.initScope();
			for (let attr in this.scope) {
				if (this.scope[attr] === DBNotation.scope.LITTERAL) {
					this.elt.setModel(spinal2Camel(attr), this.elt.getAttribute(attr));
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
				if (this.scope[attr] === DBNotation.scope.LITTERAL) {
					continue;
				}
				const modelVar = this.getModelVar(attr);
				if (modelVar === key) {
					const parentModelValue = this.elt.getParent().getModel(key);
					this.elt.setModel(spinal2Camel(attr), parentModelValue);
				}
			}
			this.elt.askRendering();
		}

		digest(key) {
			if (key in this.scope) {
				if (this.scope[key] === DBNotation.scope.LITTERAL) {
					this.elt.setAttribute(key, this.elt.getModel(spinal2Camel(key)));
				}
				if (this.scope[key] === DBNotation.scope.TWO_WAYS) {
					const modelVar = this.getModelVar(key);
					this.elt.getParent().setModel(modelVar, this.elt.getModel(spinal2Camel(key)));
				}
			}
			this.elt.askRendering();
		}
	}

	class CircleProxyType { }

	/**
	 * A component in circle must extends the circle.Element class
	 * which is a pointer on the CircleElement class.
	 * 
	 * @class CircleElement
	 * @extends {HTMLElement}
	 */
	class CircleElement extends HTMLElement {
		static get tag() {
			return camel2Spinal(this.name);
		}
		static register() {
			window.customElements.define(this.tag, this);
		}
		constructor() {
			super();
			const self = this;

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
						// 	circle.digestId, self.constructor.name, absoluteKey, value, circle.stackTrace());
						let k = absoluteKey;
						while (k) {
							self.digest(k);
							k = dirname(k);
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

			this.model = new Proxy({}, handler());
			this.digestRegistry = {};
			this.templateSelector = '#' + this.constructor.tag;
			this.databinding = new Databinding(this);
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
			this.myDoc = (isFirefox() || isEdge() || (document.currentScript === null)) ?
				doc : document.currentScript.ownerDocument;

			const t = this.myDoc.querySelector(this.templateSelector);
			if (t) {
				const clone = document.importNode(t.content, true);
				parseExpr(clone);
				this.root.innerHTML = '';
				this.root.appendChild(clone);
				parseBehavior(this.root);
			}
			this.databinding.connectedCallBack();
		}

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
			const k = dirname(absoluteKey);
			if (k && (typeof this.getModel(k) !== 'object')) {
				this.setModel(k, {});
			}
			const str = 'this.model.' + absoluteKey;
			// console.log('getModel str', str);
			const result = eval(str);
			return result;
		}

		setModel(absoluteKey, value) {
			if (this.getModel(absoluteKey) === value) {
				return;
			}
			const str = 'this.model.' + absoluteKey + ' = value';
			eval(str);
		}
	}

	class CircleBehavior {
		static get tag() {
			return camel2Spinal(this.name);
		}
		static register() {
			window.circle.behaviorRegistry[this.tag] = this;
		}

		constructor(elt) {
			this.elt = elt;
			this.host = elt.getRootNode().host;
			this.key = this.getModelVar(this.constructor.tag);
			this.host.bindKey(this.key, this);
			let k = this.key;
			while (k) {
				this.host.bindKey(k, this);
				k = dirname(k);
			}
			this.onDigest(this.key);
		}

		getModelVar(attr) {
			return DBNotation.extractModelVar(this.elt.getAttribute(attr));
		}

		onDigest() { }
	}

	/**
	 * The Circle class is the exposed class of the library.
	 * The circle.js produces a global variable window.circle which is the hook
	 * to all functionalities of this library.
	 * 
	 * @class Circle
	 */
	class Circle {
		constructor() {
			this.Element = CircleElement;
			this.Behavior = CircleBehavior;
			this.digestId = 0;
			this.serviceMap = {};
			this.behaviorRegistry = {};
		}

		stackTrace() {
			var err = new Error();
			return err.stack;
		}

		wc(element, tag) {
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
		}

		set(str, service) { this.serviceMap[str] = service; }

		get(str) { return this.serviceMap[str]; }
	}
	window.circle = new Circle();
	window.o = window.circle.wc;

	/**
	 * CircleExpr is the component that allows displaying expressions.
	 * 
	 * @class CircleExpr
	 * @extends {circle.Element}
	 */
	class CircleExpr extends CircleElement {
		render() {
			let str = (this.model.expr === undefined) ? '' : this.model.expr;
			str = (typeof str === 'object') ? JSON.stringify(str) : str;
			this.root.innerHTML = str;
		}
	}
	CircleExpr.register();
})();
