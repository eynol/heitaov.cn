const gulp = require('gulp');
const del = require('del');
// const imagemin = require('gulp-imagemin');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('views:index', function buildHTML() {
  return gulp
    .src('index.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest('./dist'))
});
gulp.task('stylus:index', function () {
  return gulp
    .src('index.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({compress: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .pipe(reload({stream: true}))

})
gulp.task('watch:index', function () {
  gulp.watch("index.styl", ['stylus:index'])
  gulp.watch("index.pug", ['views:index'])
})
gulp.task('default', gulp.series(['views:index', 'stylus:index']));

gulp.task('watch', gulp.series(['watch:index']), function () {})



gulp.task('serve', gulp.series(['watch']), function () {

  browserSync.init({server: "./dist",port:7777});

  gulp
    .watch("dist/*.html")
    .on('change', reload);
});

gulp.task('clean:build', function () {
  return del(["dist"]).then(() => {
    console.log("finished clean build")
  })
})

gulp.task('imagemin', function () {

  return gulp
    .src('img/**')
    .pipe(gulp.dest('imgmin'))
})