import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';
import htmlmin from 'gulp-htmlmin';

const sass = gulpSass(dartSass);
const bs = browserSync.create();

async function style() {
    const imagemin = (await import('gulp-imagemin')).default;

    return gulp.src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(bs.stream());
}

async function script() {
    const imagemin = (await import('gulp-imagemin')).default;

    return gulp.src('src/js/**/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(bs.stream());
}

async function image() {
    const imagemin = (await import('gulp-imagemin')).default;

    return gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
}

function html() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
        .pipe(bs.stream());
}

function serve() {
    bs.init({
        server: './dist'
    });

    gulp.watch('src/scss/**/*.scss', style);
    gulp.watch('src/js/**/*.js', script);
    gulp.watch('src/images/**/*', image);
    gulp.watch('src/*.html', html);
    gulp.watch('dist/*.html').on('change', bs.reload);
}

export { style, script, image, html, serve };
export default gulp.series(style, script, image, html, serve);
