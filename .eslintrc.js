module.exports = {
	extends: ['google', 'eslint:recommended'],
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
	},
	rules: {
		'no-var': 0,
		'no-console': 0,
		'prefer-rest-params': 0,
		'max-len': ['error', 120],
		'comma-dangle': 0,
		'require-jsdoc': 0,
		'padded-blocks': 0,
		'prefer-spread': 0,
		'no-use-before-define': 'error',
		'no-undef-init': 'error',
		'semi': ['error', 'always'],
		'quotes': ['error', 'single'],
	},
	env: {
		browser: true,
		node: true,
		jasmine: true,
	},
	globals: {
		circle: true,
		Promise: true,
		Proxy: true,
		d3: true,
	}
};
