var gulp = require('gulp');
var util = require('gulp-util');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var coffee = require('gulp-coffee');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var ghPages = require('gulp-gh-pages');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('default', ['jade', 'sass', 'image', 'js', 'serve']);

gulp.task('sass', function() {
  gulp.src('./src/sass/application.sass')
    .pipe(sass({indentedSyntax: true}).on('error', util.log))
    .pipe(gulp.dest('./build/css/'))
    .pipe(reload({stream: true}));
});

gulp.task('jade', function() {
	gulp.src('./src/jade/*.jade')
  	.pipe(jade({pretty: true}).on('error', util.log))
  	.pipe(gulp.dest('./build/'))
  	.pipe(reload({stream: true}));
});

gulp.task('image', function () {
 gulp.src('./src/img/*')
  .pipe(imagemin().on('error', util.log))
  .pipe(gulp.dest('./build/img/'))
  .pipe(reload({stream: true}));
});

gulp.task('js', function () {
  gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('coffee', function() {
  gulp.src('./src/coffee/*.coffee')
    .pipe(coffee().on('error', util.log))
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'))
    .pipe(reload({stream: true}));
});

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./build/"
    }
  });
  gulp.watch('./src/sass/**/*.sass', ['sass']);
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/jade/**/*.jade', ['jade']);
  gulp.watch('./src/img/**/**', ['image']);
  gulp.watch('./src/js/**/*.js', ['js']);
});
