const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');
const eslint = require('gulp-eslint');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const uglifyjs = require('uglify-es');
const minify = require('gulp-uglify/composer')(uglifyjs, console);
const pump = require('pump');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const iife = require('gulp-iife');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

gulp.task('default', ['build']);

const cfg = {
	html: ['./src/circle.html'],
	src: 'src',
	lint: ['**/*.js', '!node_modules/**/*', '!**/*.min.js'],
	circle: {
		input: [
			'./src/circle/functions.js',
			'./src/circle/DBNotation.js',
			'./src/circle/Databinding.js',
			'./src/circle/CircleElement.js',
			'./src/circle/CircleBehavior.js',
			'./src/circle/Circle.js',
			'./src/circle/main.js',
			'./src/circle/CircleExpr.js',
		],
		output: 'circle.js',
	},
	minified: 'circle.min.js',
	deploy: ['./**/*', '!./node_modules/**/*', '!package*', '!*.js'],
	dist: 'dist',
};

gulp.task('clean', function () {
	return del(cfg.dist);
});


gulp.task('build', ['html', 'uglify']);

gulp.task('html', function () {
	return gulp.src(cfg.html).pipe(gulp.dest(cfg.dist));
});


gulp.task('uglify', function (cb) {
	// the same options as described above
	const options = {
		compress: {
			toplevel: true,
			dead_code: true,
		},
		mangle: {
			toplevel: true,
			properties: false,
			eval: true,
			reserved : ['CircleExpr']
		},
		output: {
			beautify: true,
		},
	};

	pump([
		gulp.src(cfg.circle.input),
		sourcemaps.init(),
		concat(cfg.circle.output),
		iife(),
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


