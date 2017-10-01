'use strict';

const express = require('express'); // charge ExpressJS
const serveIndex = require('serve-index');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();

webpackConfig.output.path = '/';
const compiler = webpack(webpackConfig);
app.use('/dist/', webpackDevMiddleware(compiler, {}));

app.use(express.static('.'));
app.use(serveIndex('.', { icons: true }));

app.use('/examples/13-o-route/', function (req, res, next) {
	res.sendFile('./examples/13-o-route/', { root: '.' });
});

app.use(function (req, res, next) {
	console.log('404: Page not Found', req.url);
	next();
});

app.listen(8000, function () {
	console.log('server started on port 8000');
});
