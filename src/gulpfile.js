var gulp = require("gulp");
var browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");

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

gulp.task("minify-css", function(done) {
  return gulp.src("./css/*.css")
  done();
});