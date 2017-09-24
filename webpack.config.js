// const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		'circle': './src/circle/main.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist')
	},
	devtool: 'source-map',
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true,
			uglifyOptions: {
				ie8: false,
				ecma: 6,
				compress: {
					// keep_fnames: true,
					// keep_classnames: true,
				},
				mangle: {
					// reserved: ['CircleExpr'],
					properties: false,
					// keep_fnames: true,
					keep_classnames: true,
				},
				output: {
					beautify: false
				},
			}
		})
	]
};
