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

