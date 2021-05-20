var {src, dest, watch} = require("gulp");
var sass = require('gulp-dart-sass');
var browserSync = require("browser-sync").create();

// var cssmin = require("gulp-cssmin");
// var rename = require('gulp-rename');

// Static server
function bs() {
  serveSass();
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });

  watch("./*.html").on('change', browserSync.reload);
  watch("./sass/**/*.scss", serveSass);
  watch("./js/*.js").on('change', browserSync.reload);


};

// Compile sass into CSS & auto-inject into browsers
function serveSass() {
  return src("./sass/*.scss")
      .pipe(sass())
      .pipe(dest("./css/"))
      .pipe(browserSync.stream());
};

exports.serve = bs;

// gulp.task("min-css", function(done){
//   gulp.src("./css/*.css")
//   .pipe(cssmin())
//   .pipe(rename({suffix: ".min"}))
//   .pipe(gulp.dest("./../dist/css/"));
//   done();
// });