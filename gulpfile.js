const gulp = require('gulp');
const connect = require('gulp-connect');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const Proxy = require('gulp-connect-proxy');
const stripDebug = require('gulp-strip-debug');
const less = require('gulp-less');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');

const watchDes = {
    root: './src',
    html: './src/**/*.html',
    js: './src/**/*.js',
    css: './src/**/*.css',
    less: './src/**/*.less'
  }
  //定义css、js源文件路径
const cssSrc = 'src/css/**/*.css';
const jsSrc = 'src/js/**/*.js';
// 定义发布路径
const DES = 'dist';
const DES_HTML = 'dist/views';
const DES_CSS = 'dist/css';
const DES_JS = 'dist/js';

gulp.task("clean", () => {
  return gulp.src(DES)
    .pipe(clean());
})

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

gulp.task('JS:prod', () =>
  gulp.src(['./src/**/*.js'])
  // .pipe(babel({
  //   presets: ['es2015']
  // }))
  .pipe(uglify())
  .pipe(stripDebug())
  .pipe(gulp.dest(DES))
);

gulp.task('CSS:prod', () =>
  gulp.src(['./src/**/*.css'])
  .pipe(cleanCSS('style.css'))
  .pipe(gulp.dest(DES))
);

// gulp.task('html:prod', () =>
//   gulp.src('./src/**/*.html')
//   .pipe(gulp.dest(DES))
// );

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', () => {
  return gulp.src(cssSrc)
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/css'));
});

//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', () => {
  return gulp.src(jsSrc)
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/js'));
});

//Html替换css、js文件版本
gulp.task('revHtml', () => {
  return gulp.src(['rev/**/*.json', 'src/**/*.html'])
    .pipe(revCollector())
    .pipe(gulp.dest(DES));
});

//html发布
gulp.task('html:prod', done => {
  runSequence(
    ['revCss'], ['revJs'], ['revHtml'],
    done);
});


gulp.task('dev', ['less', 'connect', 'watch']);

gulp.task('prod', ['clean'], () => {
  gulp.start('less', 'CSS:prod', 'JS:prod', 'html:prod');
});

gulp.task('default', ['dev']);
