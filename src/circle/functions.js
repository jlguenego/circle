/**
 * Translate a string from CamelCase to spinal-case.
 * Note: works well with SPECIALCamelCase as well.
 * 
 * @param {string} str - CamelCase string
 * @returns spinal-case equivalent string.
 */
export function camel2Spinal(str) {
	// handle case like JLGStars becoming jlg-stars
	str = str.replace(/^([A-Z]+)([A-Z][a-z])/g, '$1-$2');
	// then do the traditional conversion to spinal case.
	return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function spinal2Camel(str) {
	return str.replace(/(-[a-z])/g, function($1) { return $1.toUpperCase().replace('-', ''); });
}

function key2Array(key) {
	return key.substring(2, key.length - 2).split(/'\]\['/);
}

function array2Key(array) {
	return array.map(n => `['${n}']`).join('');
}

/**
 * Returns the parent key
 * Ex: 
 * ['hello']['world']['toto'] becomes ['hello']['world']
 * ['hello']['world'] becomes ['hello']
 * ['hello'] becomes undefined
 * 
 * @param {any} absoluteKey 
 * @returns 
 */
export function dirname(absoluteKey) {
	const array = key2Array(absoluteKey);
	array.pop();
	const result = array2Key(array);
	return result;
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
export function basename(absoluteKey) {
	const array = key2Array(absoluteKey);
	return array.pop();
}



/**
 * check if the user agent is Firefox
 * 
 * @returns true if user agent is Firefox, false otherwise.
 */
export function isFirefox() {
	return navigator.userAgent.match(/Firefox/) !== null;
}

/**
 * check if the user agent is Microsoft Edge
 * 
 * @returns true if user agent is Edge, false otherwise.
 */
export function isEdge() {
	return navigator.userAgent.match(/Edge/) !== null;
}

/**
 * Transforms hello.world[3].foo.bar['a.\'b'] in ['hello']['world']['3']['foo']['bar']['a.\'b']
 * 
 * 
 * @param {any} key 
 * @returns 
 */
export function normalizeKey(key) {
	const array = key.split(/(\.|\['|'\])/);
	let mode = 0; // 0 is dot notation, 1 is inside [].
	const result = array.reduce((acc, n) => {
		if (mode === 0) {
			if (n === '') {
				return acc;
			}
			if (n === '[\'') {
				mode = 1;
				return acc + n;
			}
			if (n === '.') {
				return acc;
			}
			return acc + `['${n}']`;
		}
		if (n === '\']') {
			mode = 0;
		}
		return acc + n;
	}, '');
	return result;
}
