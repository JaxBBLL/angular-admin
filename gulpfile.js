const gulp = require('gulp');
const connect = require('gulp-connect');
const uglify = require('gulp-uglify');
const fs = require('fs');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const Proxy = require('gulp-connect-proxy');
const stripDebug = require('gulp-strip-debug');
const changed = require('gulp-changed');
const less = require('gulp-less');
const del = require('del');

const watchDes = {
  root: './src',
  html: './src/**/*.html',
  js: './src/**/*.js',
  css: './src/**/*.css',
  less: './src/**/*.less'
}
const DES = 'dist';

gulp.task('html', () => {
  gulp.src(watchDes.html)
    .pipe(connect.reload());
});

gulp.task('js', () => {
  gulp.src(watchDes.js)
    .pipe(connect.reload());
});

gulp.task('css', () => {
  return gulp.src(watchDes.css)
    .pipe(connect.reload());
});

gulp.task('less', () => {
  gulp.src(watchDes.less)
    .pipe(less())
    .pipe(gulp.dest(watchDes.root));
});

gulp.task('watch', () => {
  gulp.watch(watchDes.html, ['html']);
  gulp.watch(watchDes.js, ['js']);
  gulp.watch(watchDes.css, ['css']);
  gulp.watch(watchDes.less, ['less']);
});

gulp.task('clean:file', cb => {
  del([
    './dist/**/*'
  ]);
});

gulp.task('copyJS', () =>
  gulp.src(['./src/**/*.js'])
  // .pipe(babel({
  //   presets: ['es2015']
  // }))
  .pipe(uglify())
  .pipe(stripDebug())
  .pipe(gulp.dest(DES))
);

gulp.task('copyCSS', () =>
  gulp.src(['./src/**/*.css'])
  .pipe(cleanCSS('style.css'))
  .pipe(gulp.dest(DES))
);

gulp.task('copyHtml', () =>
  gulp.src('./src/**/*.html')
  .pipe(gulp.dest(DES))
);

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

gulp.task('default', ['connect', 'less', 'watch']);

gulp.task('prod', ['less', 'copyJS', 'copyHtml', 'copyCSS']);
