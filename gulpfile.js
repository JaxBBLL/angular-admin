var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var fs = require('fs');
var babel = require('gulp-babel');
var cleanCSS = require('gulp-clean-css');
var Proxy = require('gulp-connect-proxy');
var stripDebug = require('gulp-strip-debug');

var watchDes = {
  html: './src/**/*.html',
  js: './src/**/*.js',
  css: './src/**/*.css'
}

gulp.task('connect', function() {
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

gulp.task('html', function() {
  gulp.src(watchDes.html)
    .pipe(connect.reload());
});

gulp.task('js', function() {
  gulp.src(watchDes.js)
    .pipe(connect.reload());
});

gulp.task('css', function() {
  gulp.src(watchDes.css)
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch([watchDes.html, watchDes.js, watchDes.css], ['html', 'js']);
});


gulp.task('default', ['connect', 'watch']);
