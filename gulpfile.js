const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function style() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

function script() {
    return gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}

function image() {
    return gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
}

function serve() {
    browserSync.init({
        server: './dist'
    });

    gulp.watch('src/scss/**/*.scss', style);
    gulp.watch('src/js/**/*.js', script);
    gulp.watch('src/images/**/*', image);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
}

exports.style = style;
exports.script = script;
exports.image = image;
exports.serve = serve;
exports.default = gulp.series(style, script, image, serve);