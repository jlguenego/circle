import { Circle } from './Circle.js';

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
Object.setPrototypeOf(window.o, new Circle());
window.circle = window.o;

/**
 * CircleExpr is the component that allows displaying expressions.
 * 
 * @class CircleExpr
 * @extends {circle.Element}
 */
class OExpr extends o.Element {
    render() {
        let str = (this.model.expr === undefined) ? '' : this.model.expr;
        str = (typeof str === 'object') ? JSON.stringify(str) : str;
        this.root.innerHTML = str;
    }
}
OExpr.reg();
