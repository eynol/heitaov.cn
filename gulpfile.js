const gulp = require('gulp');
const del = require('del');
const imagemin = require('gulp-imagemin');
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
    .pipe(gulp.dest('./build'))
});
gulp.task('stylus:index', function () {
  return gulp
    .src('index.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({compress: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build'))
    .pipe(reload({stream: true}))

})
gulp.task('default', ['views:index', 'stylus:index']);

gulp.task('watch', ['watch:index'], function () {})

gulp.task('watch:index', function () {
  gulp.watch("index.styl", ['stylus:index'])
  gulp.watch("index.pug", ['views:index'])
})

gulp.task('serve', ['watch'], function () {

  browserSync.init({server: "./build",port:7777});

  gulp
    .watch("build/*.html")
    .on('change', reload);
});

gulp.task('clean:build', function () {
  return del(["build"]).then(() => {
    console.log("finished clean build")
  })
})

gulp.task('imagemin', function () {

  return gulp
    .src('img/**')
    .pipe(imagemin())
    .pipe(gulp.dest('imgmin'))
})