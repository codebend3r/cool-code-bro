var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('serve', function () {

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