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
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

//定义css、js源文件路径
const source = {
    root: './src',
    html: './src/**/*.html',
    js: './src/**/*.js',
    css: './src/**/*.css',
    plugin: './src/plugin/**/*.*',
    config: './src/config/*.js'
  }
  // 需编译处理的路径
const cssSrc = './src/css/**/*.css';
const jsSrc = './src/js/**/*.js';
const lessSrc = './src/less/**/*.less';
// 定义发布路径
const DES = 'dist';
const DES_HTML = 'dist/views';
const DES_CSS = 'dist/css';
const DES_JS = 'dist/js';
const DES_PLUGIN = 'dist/plugin';

gulp.task("clean", () => {
  return gulp.src(DES)
    .pipe(clean());
})

gulp.task('html', () => {
  return gulp.src(source.html)
    .pipe(connect.reload());
});

gulp.task('js', () => {
  return gulp.src(source.js)
    .pipe(connect.reload());
});

gulp.task('css', () => {
  return gulp.src(source.css)
    .pipe(connect.reload());
});

// less编译
gulp.task('less', () => {
  return gulp.src(lessSrc)
    // .pipe(sourcemaps.init())
    .pipe(less())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/css'));
});

gulp.task('config', () => {
    gulp.src(['./src/config/var.js', './src/config/!(init).js', './src/config/init.js'])
      .pipe(concat('style.js'))
      .pipe(gulp.dest('./src/js'))
  })
  // js压缩并发布
gulp.task('JS:prod', () =>
  gulp.src([jsSrc])
  // .pipe(babel({
  //   presets: ['es2015']
  // }))
  .pipe(uglify())
  .pipe(stripDebug())
  .pipe(gulp.dest(DES_JS))
);

gulp.task('CSS:prod', () =>
  gulp.src([cssSrc])
  .pipe(cleanCSS())
  .pipe(gulp.dest(DES_CSS))
);

gulp.task('plugin:prod', () =>
  gulp.src([source.plugin])
  .pipe(gulp.dest(DES_PLUGIN))
);

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', () => {
  return gulp.src(cssSrc)
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rev/css'));
});

//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', () => {
  return gulp.src(jsSrc)
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rev/js'));
});

//Html替换css、js文件版本
gulp.task('revHtml', () => {
  return gulp.src(['rev/**/*.json', 'src/**/*.html', '!' + source.plugin])
    .pipe(revCollector())
    .pipe(gulp.dest(DES));
});

//html发布
gulp.task('html:prod', done => {
  runSequence(
    ['revCss'], ['revJs'], ['revHtml'],
    done);
});

gulp.task('connect', () => {
  connect.server({
    root: source.root,
    port: 3000,
    livereload: true
      // ,middleware: function(connect, opt) {
      //     opt.route = '/proxy';
      //     var proxy = new Proxy(opt);
      //     return [proxy];
      // }
  });
});

gulp.task('watch', () => {
  gulp.watch(source.html, ['html']);
  gulp.watch(source.js, ['js']);
  gulp.watch(source.css, ['css']);
  gulp.watch(lessSrc, ['less']);
  gulp.watch(source.config, ['config']);
});

gulp.task('dev', ['config', 'less', 'connect', 'watch']);

//  发布前先清空dist目录和less编译，然后压缩文件并copy至dist目录
gulp.task('prod', ['clean', 'less', 'config'], () => {
  gulp.start('html:prod', 'CSS:prod', 'JS:prod', 'plugin:prod');
});

gulp.task('default', ['dev']);
