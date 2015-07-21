var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var modRewrite = require('connect-modrewrite');
var qunit = require('node-qunit-phantomjs');
var gulp = require('gulp');

var config = {
	paths: {
		scripts: ['./js/jquery.responsiveTabs.js'],
		images: 'client/img/**/*'
	}
};

// Build
gulp.task('build', function() {
	return gulp.src(config.paths.scripts)
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(gulp.dest('js/'));
	});

// Lint
gulp.task('lint', function() {
	return gulp.src(config.paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Test
gulp.task('test', function() {
	qunit('./test/fixture.html');
});

// Watch
gulp.task('watch', function() {
	gulp.watch(config.paths.scripts, ['lint']);
});

// Serve
gulp.task('serve', ['watch'], function() {
    browserSync.init({
        server: {
            baseDir: './',
            middleware: [
				modRewrite([
					'^/$ /demo.html'
				])
			]
        }
    });
});

gulp.task('default', ['serve']);