const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const imageMin = require('gulp-imagemin');

function style() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        compatibility: 'ie8',
      })
    )
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function template() {
  return gulp
    .src('./src/pug/*.pug')
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

gulp.task(`img-compress`, () => {
  return gulp
    .src('./src/assets/**')
    .pipe(
      imageMin({
        progressive: true,
      })
    )
    .pipe(gulp.dist('dist/img/'));
});

async function build() {
  await style();
  await template();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'index.html',
    },
  });
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('./src/pug/*.pug', template);
}

exports.style = style;
exports.template = template;
exports.build = build;
exports.watch = watch;
exports.default = build;
