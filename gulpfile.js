var gulp = require('gulp');
var del = require('del');
const imagemin = require('gulp-imagemin');

gulp.task('default', function () {
  console.log("default task")
});

gulp.task('clean:build',function(){
  del(["build"]).then(()=>{
    console.log("finished clean build")
  })
})

gulp.task('imagemin', function () {
  gulp
    .src('img/**')
    .pipe(imagemin())
    .pipe(gulp.dest('imgmin'))
})