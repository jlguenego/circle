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
export class DBNotation {
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