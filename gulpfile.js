/**
 * Require and assign gulp
 * @type Module gulp|Module gulp
 */
var gulp = require('gulp');
/**
 * Require and assign gulp-rename
 * @type Module gulp-sass|Module gulp-sass
 */
var sass = require('gulp-sass');
/**
 * Require and assign gulp-rename
 * @type Module gulp-rename|Module gulp-rename
 */
var rename = require("gulp-rename");
/**
 * Require and assign gulp-clean-css
 * @type Module gulp-clean-css|Module gulp-clean-css
 */
var cleanCSS = require('gulp-clean-css');
/**
 * Require and assign gulp-delete-file
 * @type Module gulp-delete-file|Module gulp-delete-file
 */
var deletefile = require('gulp-delete-file');
/**
 * Require and assign gulp-autoprefixer
 * @type Module gulp-autoprefixer|Module gulp-autoprefixer
 */
var autoprefixer = require("gulp-autoprefixer");

var config = {
    /**
     * css destination folder
     * @type String
     */
    publicCssDir: './build/css',

    sourceSASSDir: './src/scss'
};

/**
 * Generation of css/bootstrap.css
 */
gulp.task('css', function() {
    return gulp.src(config.sourceSASSDir + '/app.scss')
        .pipe(sass({
        }))
        .pipe(autoprefixer({browsers: ['last 2 versions', '> 5%']}))
        .pipe(gulp.dest(config.publicCssDir));
});

/**
 * Deletion of minified files if exist
 */
gulp.task('delete-minified', function() {
    var regexp = /^.*\.(min.*)/;

    gulp.src(config.publicCssDir + '/*.css')
        .pipe(deletefile({
            reg: regexp,
            /**
             * true: delete file which match regexp
             * false: delete file which don't match regexp
             */
            deleteMatch: true
        }))
});

/**
 * Generation of *.min.css files
 */
gulp.task('minify-css', ['css', 'delete-minified'], function() {
    return gulp.src(config.publicCssDir + '/*css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.publicCssDir));
});

gulp.task('default', ['css', 'minify-css', 'delete-minified']);
