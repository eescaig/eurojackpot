"use strict";

var gulp = require('gulp');
var Server = require('karma').Server;
var babel = require('gulp-babel');
var jasmine = require('gulp-jasmine');
var browserSync = require('browser-sync').create();

gulp.task('es6', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['es6'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('karma', ['es6'], function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', ['es6', 'karma'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch(['index.html', 'src/**/*.js'], ['js-watch']);
});
