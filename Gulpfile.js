var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');

gulp.task('sass', function () {

  return gulp.src(['app/scss/**/*'])
    .pipe(sass())
    .pipe(gulp.dest('./app/css'))

});

gulp.task('serve', ['sass'], function () {

  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: './app'
    }
  });

  gulp.watch('./app/*.html').on('change', reload);
  gulp.watch('./app/js/*.js').on('change', reload);

  //gulp.watch('./app/**/**', [browserSync.reload]);

});


gulp.task('default', ['serve']);