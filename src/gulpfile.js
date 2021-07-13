// var urix = require("urix");
var {series, src, dest, watch} = require("gulp");
var sass = require('gulp-dart-sass');
var browserSync = require("browser-sync").create();

const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
var cssmin = require("gulp-cssmin");
var rename = require('gulp-rename');
var minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
var tinypng = require('gulp-tinypng-compress');


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
  
  watch("./sass/**/*.scss").on('change', browserSync.reload);
  
  watch("./js/*.js").on('change', browserSync.reload);


};

// Compile sass into CSS & auto-inject into browsers
function serveSass() {
  return src("./sass/**/*.scss")
      .pipe(sass())

      .pipe(autoprefixer())

      .pipe(dest("./css/"))
      .pipe(browserSync.stream())
};

function minCSS(done) {
  src("./css/**/*.css")
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(dest('../dest/css/'))

  src("./css/**/style.css")
  // .pipe(cssmin())
  .pipe(rename({suffix: "-clean"}))
  .pipe(dest('../dest/css/'))
  done();
}

function minJS(done) {
  src(["./js/**/*.js", "!./js/**/*.min.js"])
  .pipe(minify({
    ext:{
      src:'-clean.js',
      min:'.js',
  }
  }))
  .pipe(dest('../dest/js/'))

  src(["./js/**/*.min.js"]).pipe(dest('../dest/js/'))
  done();
}

function minHTML(done) {
  src("./**.html")
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(dest('../dest/'))
  done();
}

function destPHP(done) {
  src("./**.php")
  .pipe(dest('../dest/'))

  src("./PHPMailer/**/**")
  .pipe(dest('../dest/PHPMailer/'))
  done();
}

function destFonts(done) {
  src("./fonts/**/**")
  .pipe(dest('../dest/fonts/'))
  done();
}

function tinyImg(done) {
  src(["./img/**/*.jpg", "./img/**/*.jpeg", "./img/**/*.png"])
  .pipe(tinypng({
    key: '7fp3ZGtHDZ7N3yb0hj2tXlyThL4N69WZ',
    // sigFile: 'images/.tinypng-sigs',
    log: true
}))
  .pipe(dest('../dest/img/'))
  done();
}

function svgIMG(done) {
  src("./img/**/*.svg")
  .pipe(imagemin([
    // imagemin.gifsicle({interlaced: true}),
    // imagemin.mozjpeg({quality: 70, progressive: true}),
    // imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
]))
  .pipe(dest("../dest/img/"))
  done();
}

exports.buildFiles = series(minCSS, minJS, minHTML, destPHP, destFonts, svgIMG, tinyImg);
exports.serve = bs;

// gulp.task("min-css", function(done){
//   gulp.src("./css/*.css")
//   .pipe(cssmin())
//   .pipe(rename({suffix: ".min"}))
//   .pipe(gulp.dest("./../dist/css/"));
//   done();
// });