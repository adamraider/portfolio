var gulp = require('gulp'),
    util = require('gulp-util'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    webpack = require('gulp-webpack'),
    responsive = require('gulp-responsive'),
    watch = require('gulp-watch');

var SASS_SRC = './src/sass',
    CSS_DEST = './build/css',
    VIEW_SRC = './src/views',
    VIEW_DEST = './build',
    SCRIPT_SRC = './src/js',
    SCRIPT_DEST = './build/js',
    IMAGE_SRC = './src/img',
    IMAGE_DEST = './build/img';

var errorHandler = function (error) {
  console.log(error.message);
  this.emit('end');
}

gulp.task('default', ['styles', 'views', 'scripts', 'images']);

gulp.task('styles', function() {
  return gulp.src(SASS_SRC + '/application.sass')
    .pipe(plumber({ errorHandler: errorHandler }))
    .pipe(sass({ indentedSyntax: true }).on('error', util.log))
    .pipe(concat('application.css'))
    .pipe(autoprefixer())
    .pipe(gulp.dest(CSS_DEST))
    .pipe(browserSync.reload({ stream:true }))
});

gulp.task('views', function() {
  return gulp.src(VIEW_SRC + '/**/*.pug')
    .pipe(plumber())
    .pipe(pug({ pretty: true }).on('error', util.log))
    .pipe(gulp.dest(VIEW_DEST))
    .pipe(browserSync.reload({ stream:true }))
});

gulp.task('scripts', function () {
  return gulp.src(SCRIPT_SRC + '/application.js')
    .pipe(plumber())
    .pipe(webpack())
    .pipe(rename('application.js'))
    .pipe(gulp.dest(SCRIPT_DEST))
    .pipe(rename('application.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(SCRIPT_DEST))
    .pipe(browserSync.reload({ stream:true }))
});

gulp.task('images', function () {
  return gulp.src(IMAGE_SRC + '/*')
    .pipe(responsive({
      'hero.jpg': {
        width: 1400,
        compressionLevel: 0,
        withoutChromaSubsampling: true,
        quality: 100
      },
    },{
        // global quality for all images
        quality: 100,
        errorOnUnusedImage: false,
        passThroughUnused: true
      }
    ))
    .pipe(gulp.dest(IMAGE_DEST))
    .pipe(browserSync.reload({ stream:true }))
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });
  watch(SASS_SRC + '/**/**', function(){ gulp.start('styles'); });
  watch(VIEW_SRC + '/**/*.pug', function(){ gulp.start('views'); });
  watch(SCRIPT_SRC + '/**/*.js', function(){ gulp.start('scripts'); });
  watch(IMAGE_SRC + '/*', function(){ gulp.start('images'); });
});
