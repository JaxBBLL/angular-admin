const gulp = require('gulp');
const connect = require('gulp-connect');
const uglify = require('gulp-uglify');
const fs = require('fs');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const Proxy = require('gulp-connect-proxy');
const stripDebug = require('gulp-strip-debug');
const changed = require('gulp-changed');

const watchDes = {
  html: './src/**/*.html',
  js: './src/**/*.js',
  css: './src/**/*.css'
}
const DES = 'dist';

gulp.task('connect', () => {
  connect.server({
    root: 'src',
    port: 3000,
    livereload: true
      // ,middleware: function(connect, opt) {
      //     opt.route = '/proxy';
      //     var proxy = new Proxy(opt);
      //     return [proxy];
      // }
  });
});

gulp.task('html', () => {
  gulp.src(watchDes.html)
    .pipe(connect.reload());
});

gulp.task('js', () => {
  gulp.src(watchDes.js)
    .pipe(connect.reload());
});

gulp.task('css', () => {
  gulp.src(watchDes.css)
    .pipe(connect.reload());
});

gulp.task('watch', () => {
  gulp.watch([watchDes.html, watchDes.js, watchDes.css], ['html', 'js']);
});

gulp.task('copyJS', () =>
  gulp.src('./src/**/*.js')
  .pipe(uglify())
  .pipe(stripDebug())
  .pipe(gulp.dest(DES))
);

gulp.task('copyCSS', () =>
  gulp.src('./src/**/*.css')
  .pipe(cleanCSS('style.css'))
  .pipe(gulp.dest(DES))
);

gulp.task('copyHtml', () =>
  gulp.src('./src/**/*.html')
  .pipe(gulp.dest(DES))
);

gulp.task('default', ['connect', 'watch']);

gulp.task('prod', ['copyJS','copyHtml','copyCSS']);
