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
            } else if (DBNotation.isEvent(value)) {
                this.scope[key] = DBNotation.scope.EVENT;
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

            if (this.scope[attr] === DBNotation.scope.EVENT) {
                this.elt.setEvent(spinal2Camel(attr), DBNotation.extractEventExpr(this.elt.getAttribute(attr)));
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
                if (this.elt.getAttribute(key) !== this.elt.getModel(spinal2Camel(key))) {
                    this.elt.setAttribute(key, this.elt.getModel(spinal2Camel(key)));
                }
            }
            if (this.scope[key] === DBNotation.scope.TWO_WAYS) {
                const modelVar = this.getModelVar(key);
                this.elt.getParent().setModel(modelVar, this.elt.getModel(spinal2Camel(key)));
            }
        }
        this.elt.askRendering();
    }
}