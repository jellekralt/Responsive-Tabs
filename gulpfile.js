var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var bump = require('gulp-bump');
var header = require('gulp-header');
var modRewrite = require('connect-modrewrite');
var qunit = require('node-qunit-phantomjs');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;

var config = {
	paths: {
		scripts: ['./js/jquery.responsiveTabs.js'],
		images: 'client/img/**/*'
	}
};

gulp.task('release', function(cb) {
    runSequence('bump', 'build', cb);
});

// Build
gulp.task('build', function() {
    var pkg = require('./package.json');
    var author = pkg.author.split(' <')[0];
    var banner = ['/**',
        ' * <%= pkg.name %>',
        ' * ',
        ' * <%= pkg.description %>',
        ' * ',
        ' * @author <%= author %>',
        ' * @version v<%= pkg.version %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''].join('\n');

	return gulp.src(config.paths.scripts)
		.pipe(uglify({
			preserveComments: 'some'
		}))
        .pipe(header(banner, { pkg: pkg, author: author } ))
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(gulp.dest('js/'));
});


// Bump
gulp.task('bump', function() {
    var bumpOpts = {};

    if ('v' in argv) {
        bumpOpts.type = argv.v;
    }

    return gulp.src(['./package.json'])
        .pipe(bump(bumpOpts))
        .pipe(gulp.dest('./'));
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

    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
