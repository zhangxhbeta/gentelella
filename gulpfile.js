var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var handlebars = require('gulp-compile-handlebars');

var DEST = 'build/';

gulp.task('scripts', function () {
    return gulp.src([
        'src/js/helpers/*.js',
        'src/js/*.js'])
        .pipe(concat('custom.js'))
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function () {
    return gulp.src('src/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions', '> 5%'))
        .pipe(concat('custom.css'))
        .pipe(gulp.dest(DEST + '/css'))
        .pipe(browserSync.stream());
});

gulp.task('build-sass', function () {
    return gulp.src('src/scss/app.scss').pipe(sass());
});

gulp.task('handlebars', function () {
    return gulp.src('./src/pages/*.html')
        .pipe(handlebars({}, {batch: ['./src/pages/templates']}))
        .pipe(gulp.dest('./production/'));
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: './production/index.html'
    });
});

gulp.task('watch', function () {
    // Watch .html files
    gulp.watch('src/pages/**/*.html', ['handlebars', browserSync.reload]);
    // Watch .js files
    gulp.watch('src/js/*.js', ['scripts']);
    // Watch .scss files
    gulp.watch('src/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('build', ['handlebars', 'scripts', 'sass']);

gulp.task('default', ['build', 'browser-sync', 'watch']);
