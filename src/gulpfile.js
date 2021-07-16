var resolveUrl = require("resolve-url");
var urix = require("urix");

const {src, dest, watch, series} = require("gulp");
var browserSync = require("browser-sync").create();

var sass = require('gulp-dart-sass');
var autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
var cssmin = require("gulp-cssmin");
var rename = require('gulp-rename');
var minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
var tinypng = require('gulp-tinypng-compress');
const cwebp = require('gulp-cwebp');

var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );


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

      // .pipe(autoprefixer())

      .pipe(dest("./css/"))
      .pipe(browserSync.stream())
};

function minCSS(done) {
  src("./css/**/*.css")
  .pipe(autoprefixer())
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
  // []
  src("./js/**/*.min.js").pipe(dest('../dest/js/'))
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

function cWebp(done) {
  src(["../dest/img/**/*.jpg", "../dest/img/**/*.jpeg", "../dest/img/**/*.png", "!../dest/img/**/*.svg"])
  .pipe(cwebp())
  .pipe(dest('../dest/img/Webp/'))
  done();
}


function deployFTP(done) {
  var conn = ftp.create( {
    host:     'serhii-yakymenko.zzz.com.ua',
    user:     'serhii-yak',
    password: 'Web96541423#',
    parallel: 10,
    log:      gutil.log
  })

  var globs = [
          '../dest/**/**',
      ];

  src( globs, { base: '/serhii-yakymenko.zzz.com.ua/webs/repair-design-2/', buffer: false })


  // .pipe(dest('../dest/img/Webp/'))
  .pipe( conn.dest( '/serhii-yakymenko.zzz.com.ua/webs/repair-design-2/' ) );
  done();
}

// gulp.task( 'deploy', function () {
 
//   var conn = ftp.create( {
//       host:     'mywebsite.tld',
//       user:     'me',
//       password: 'mypass',
//       parallel: 10,
//       log:      gutil.log
//   } );

//   var globs = [
//       'src/**',
//       'css/**',
//       'js/**',
//       'fonts/**',
//       'index.html'
//   ];

//   // using base = '.' will transfer everything to /public_html correctly
//   // turn off buffering in gulp.src for best performance

//   return gulp.src( globs, { base: '.', buffer: false } )
//       .pipe( conn.newer( '/public_html' ) ) // only upload newer files
//       .pipe( conn.dest( '/public_html' ) );

// } );

exports.buildFiles = series(minCSS, minJS, minHTML, destPHP, destFonts, svgIMG, tinyImg, cWebp);
exports.serve = bs;
// exports.ftp = deployFTP;
