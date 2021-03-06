const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp
    .src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed'}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp
    .src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
});

// Static Server & watching scss/js/html files
gulp.task('serve', gulp.series('sass', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch('src/js/*.js', gulp.series('js'));
}));

gulp.task('default', gulp.series('sass', 'js', 'serve'));


