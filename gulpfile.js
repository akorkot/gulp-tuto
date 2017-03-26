/* File: gulpfile.js */

// grab our packages
var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    pump = require('pump');
 
// define the default task and add the watch task to it
gulp.task('default', ['watch']);


// Build sass file
gulp.task('build-css', function() {
  return gulp.src('source/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/assets/stylesheets'));
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('source/javascript/functions.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Uglify js 
gulp.task('compress', function (cb) {
  pump([
        gulp.src('source/javascript/functions.js'),
        uglify(),
        gulp.dest('public/assets/js')
    ],
    cb
  );
});


// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('source/scss/**/*.scss', ['build-css']);
  gulp.watch('source/javascript/functions.js', ['jshint']);
  gulp.watch('source/javascript/functions.js', ['compress']);
});

