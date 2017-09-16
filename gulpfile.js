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

gulp.task('default', ['build']);

const pathCfg = {
	lint: ['**/*.js', '!node_modules/**/*', '!**/*.min.js'],
	circle: './src/circle.js',
	deploy: ['./**/*', '!./node_modules/**/*', '!package*', '!*.js'],
	dist: 'dist',
};

gulp.task('clean', function () {
	return del(pathCfg.dist);
});

gulp.task('copy', function () {
	return gulp.src(['./src/circle.js', './src/circle.html']).pipe(gulp.dest('dist'));
});

gulp.task('uglify', ['copy'], function (cb) {
	// the same options as described above
	const options = {};

	pump([
		gulp.src('./src/circle.js'),
		sourcemaps.init(),
		minify(options),
		rename('circle.min.js'),
		sourcemaps.write('.'),
		gulp.dest('dist')
	],
		cb
	);
});


gulp.task('eslint', function () {
	return gulp.src(pathCfg.lint)
		.pipe(debug())
		.pipe(eslint())
		.pipe(eslint.formatEach())
		.pipe(eslint.failAfterError());
});

function isFixed(file) {
	return file.eslint != null && file.eslint.fixed;
}

gulp.task('eslint-fix', function () {
	return gulp.src(pathCfg.lint)
		.pipe(eslint({
			fix: true
		}))
		.pipe(eslint.formatEach())
		.pipe(gulpIf(isFixed, gulp.dest('.')));
});

gulp.task('deploy', function () {
	return gulp.src(pathCfg.deploy)
		.pipe(ghPages({ cacheDir: '../.publish_circle' }));
});


