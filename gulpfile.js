const gulp = require('gulp');
const del = require('del');
const imagemin = require('gulp-imagemin');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function () {
  console.log("default task")
});

gulp.task('watch',['watch:index'], function () {})

gulp.task('watch:index', function () {
  return gulp
    .watch("index.styl", function () {
      gulp
        .src('index.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({compress: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'))
    })

})

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