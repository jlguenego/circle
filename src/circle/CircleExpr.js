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
CircleExpr.reg;
