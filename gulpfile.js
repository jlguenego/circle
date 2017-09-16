const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');
const eslint = require('gulp-eslint');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const uglifyjs = require('uglify-es');
const minify = require('gulp-uglify/composer')(uglifyjs, console);
const pump = require('pump');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const fs = require('fs');
const path = require('path');

gulp.task('default', ['uglify']);

const cfg = {
	html: ['./src/circle.html'],
	src: 'src',
	lint: ['**/*.js', '!node_modules/**/*', '!**/*.min.js'],
	circle: './src/test.js',
	minified: 'circle.min.js',
	deploy: ['./**/*', '!./node_modules/**/*', '!package*', '!*.js'],
	dist: 'dist',
};

gulp.task('clean', function () {
	return del(cfg.dist);
});

gulp.task('js', function (cb) {
	let code = '';
	code += fs.readFileSync(path.resolve(cfg.src, 'circle', 'functions.js'), 'utf8');
	code += fs.readFileSync(path.resolve(cfg.src, 'circle', 'DBNotation.js'), 'utf8');
	code += fs.readFileSync(path.resolve(cfg.src, 'circle', 'Databinding.js'), 'utf8');
	code += fs.readFileSync(path.resolve(cfg.src, 'circle', 'CircleElement.js'), 'utf8');
	code += fs.readFileSync(path.resolve(cfg.src, 'circle', 'CircleBehavior.js'), 'utf8');
	code += fs.readFileSync(path.resolve(cfg.src, 'circle', 'Circle.js'), 'utf8');
	code += fs.readFileSync(path.resolve(cfg.src, 'circle', 'main.js'), 'utf8');
	code += fs.readFileSync(path.resolve(cfg.src, 'circle', 'CircleExpr.js'), 'utf8');
	const iife = `(function() {"use strict"; 
${code}
})();`;
	fs.writeFileSync(path.resolve(cfg.dist, 'circle.js'), iife, 'utf8');
	cb();
});

gulp.task('html', function () {
	return gulp.src(cfg.html).pipe(gulp.dest(cfg.dist));
});

gulp.task('build', ['html', 'uglify']);

gulp.task('uglify', ['js'], function (cb) {
	// the same options as described above
	const options = {
		compress: {
			toplevel: true,
			dead_code: true,
		},
		mangle: {
			toplevel: true,
			properties: false,
			eval: true
		},
		output: {
			beautify: false,
		},
	};

	pump([
		gulp.src(cfg.circle),
		sourcemaps.init(),
		minify(options),
		rename(cfg.minified),
		sourcemaps.write('.'),
		gulp.dest(cfg.dist)
	],
		cb
	);
});


gulp.task('eslint', function () {
	return gulp.src(cfg.lint)
		.pipe(debug())
		.pipe(eslint())
		.pipe(eslint.formatEach())
		.pipe(eslint.failAfterError());
});

function isFixed(file) {
	return file.eslint != null && file.eslint.fixed;
}

gulp.task('eslint-fix', function () {
	return gulp.src(cfg.lint)
		.pipe(eslint({
			fix: true
		}))
		.pipe(eslint.formatEach())
		.pipe(gulpIf(isFixed, gulp.dest('.')));
});

gulp.task('deploy', function () {
	return gulp.src(cfg.deploy)
		.pipe(ghPages({ cacheDir: '../.publish_circle' }));
});

gulp.task('watch', function () {
	const watcher = gulp.watch('src/**/*', ['uglify']);
	watcher.on('change', function (event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});


