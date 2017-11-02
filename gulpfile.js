var gulp = require('gulp');
var connect = require('gulp-connect'); //构建本地Server服务的组件
var uglify = require('gulp-uglify'); // js压缩
var fs = require('fs'); //Node.js的文件系统的Api
var babel = require('gulp-babel');
var cleanCSS = require('gulp-clean-css');
var proxy = require('gulp-connect-proxy'); //跨域插件
var stripDebug = require('gulp-strip-debug');