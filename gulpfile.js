const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();
const del = require('del');

const html = () => {
   return src('./src/html/*.html')
      .pipe(htmlmin({
         collapseWhitespace: true
      }))
      .pipe(dest('./dist'))
}

const img = () => {
   return src('./src/img/*/*.*')
      .pipe(dest('./dist/img'))
}

const scss = () => {
   return src('./src/scss/*.scss')
      .pipe(sass())
      .pipe(autoprefixer({
         cascade: false
      }))
      .pipe(csso())
      .pipe(concat('index.css'))
      .pipe(dest('dist'))
}

const js = () => {
   return src('./src/js/*.js')
      .pipe(dest('./dist/js'))
}

const serve = () => {
   browserSync.init({
      server: "./dist"
   })
   watch('./src/html/*.html', series(html)).on('change', browserSync.reload)
   watch('src/scss/*.scss', series(scss)).on('change', browserSync.reload)
   watch('./src/img/**/*.*', series(img)).on('change', browserSync.reload)
   watch('./src/js/*.js', series(js)).on('change', browserSync.reload)
}

const clear = () => {
   return del('./dist')
}

exports.serve = series(clear, html, img, scss, js, serve);