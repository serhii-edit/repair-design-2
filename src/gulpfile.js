var gulp = require("gulp");
var browserSync = require("browser-sync").create();

var cssmin = require("gulp-cssmin");
var rename = require('gulp-rename');


gulp.task("hello", function(done) {
  console.log("Hello World!");

  done();
})

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });

  gulp.watch("./*.html").on('change', browserSync.reload);

});

gulp.task("min-css", function(done){
  gulp.src("./css/*.css")
  .pipe(cssmin())
  .pipe(rename({suffix: ".min"}))
  .pipe(gulp.dest("./../dist/css/"));
  done();
});