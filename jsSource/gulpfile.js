'use strict';
const gulp = require('gulp');
// const clean = require('gulp-rimraf');
const stylus = require('gulp-stylus');
const babel = require('gulp-babel');
const insert = require('gulp-insert');
// const rename = require('gulp-rename');
// const merge = require('merge-stream');
const requirejsOptimize = require('gulp-requirejs-optimize');
const fs = require('fs');
const path = require('path');
const projectPath = path.join(process.cwd(), '../');
const sourcePath = path.join(projectPath, 'jsSource');
const jsPath = path.join(sourcePath, 'js');
const connectLivereload = require('connect-livereload');
const livereload = require('gulp-livereload');
const util = require('gulp-util');

gulp.task('es6', function() {
  return gulp
    .src(
      ['js/**/*.es6'],
      {base: jsPath}
    )
    .pipe(
      babel({
        presets: ['es2015'],
        plugins: ['transform-es2015-modules-amd']
      })
    )
    .pipe(
      gulp.dest('js')
    );
});

gulp.task('js', ['es6'], function() {
  return gulp
    .src(
      ['js/index.js'],
      {base: jsPath}
    )
    .pipe(
      requirejsOptimize({
        baseUrl: jsPath,
        optimize: "none",
        // optimize: "uglify2",
        preserveLicenseComments: false,
        paths: {
          'jquery': 'lib/jquery-2.1.4.min',
          'underscore': 'lib/underscore.min',
          'backbone': 'lib/backbone.min',
          'bootstrap': 'lib/bootstrap/bootstrap.min',
          'datepicker': 'lib/bootstrap/datepicker',
          'timepicker': 'lib/bootstrap/timepicker',
          'moment': 'lib/moment.min'
        },
        shim: {
          'bootstrap': {
            'deps': ['jquery']
          },
          'datepicker': {
            'deps': ['bootstrap']
          }
        }
      })
    )
    .pipe(
      insert.transform(function(contents, file) {
        const requireJS = fs.readFileSync(path.join(sourcePath, 'require.min.js'));
        return requireJS + '\n\n' + contents + `\nrequire(['${file.basename}']);`;
      })
    )
    .pipe(
      gulp.dest('../js')
    )
    .pipe(
      livereload()
    );
});


gulp.task('default', ['js', 'watch']);

gulp.task('watch', ['server'], function() {
  livereload.listen({silent: true});
  gulp.watch(['js/**/*.es6'], ['js']);
});

gulp.task('server', function() {
  const http = require('http');
  const path = require('path');
  const connect = require('connect');
  const serveStatic = require('serve-static');
  const app = connect();

  app.use(connectLivereload());
  app.use(serveStatic(path.join(process.cwd(), '../')));
  app.listen(3000);
  util.log(util.colors.bold.inverse('Listening on port ' + 3000));
});
