import { camel2Spinal, dirname } from './functions.js';
import { DBNotation } from './DBNotation.js';

export class CircleBehavior {
    static get tag() {
        return camel2Spinal(this.name);
    }
    static reg() {
        window.circle.behaviorRegistry[this.tag] = this;
        return this;
    }

    constructor(elt) {
        this.elt = elt;
        this.host = elt.getRootNode().host;
        this.key = this.getModelVar(this.constructor.tag);
        this.init();

        this.host.bindKey(this.key, this);
        let k = this.key;
        while (k) {
            this.host.bindKey(k, this);
            k = dirname(k);
        }
        this.onDigest(this.key);
    }

    init() { }

    getModelVar(attr) {
        return DBNotation.extractModelVar(this.elt.getAttribute(attr));
    }

    onDigest() { }
}