import { camel2Spinal, spinal2Camel, dirname, basename, isFirefox, isEdge } from './functions.js';
import { Databinding } from './Databinding.js';

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
export class CircleElement extends HTMLElement {
    static get tag() {
        return camel2Spinal(this.name);
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
        this.setModel(spinal2Camel(attr), newValue);
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

        this.event = {};
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
        const k = dirname(absoluteKey);
        if (k && (typeof this.getModel(k) !== 'object')) {
            this.setModel(k, {});
        }
        const prefix = (absoluteKey.startsWith('[')) ? 'this.model' : 'this.model.';
        const str = prefix + absoluteKey;
        return eval(str);
    }

    hasModel(absoluteKey) {
        const k = dirname(absoluteKey);
        const b = basename(absoluteKey);
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