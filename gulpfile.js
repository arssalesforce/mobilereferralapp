var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var replace = require('replace');
var replaceFiles = ['./www/js/app.js'];

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('add-proxy', function() {
  return replace({
    regex: "https://recovery--staging.cs95.my.salesforce.com/services/apexrest/GetAccountProfile/",
    replacement: "http://localhost:8100/salesforceapi",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
})

gulp.task('remove-proxy', function() {
  return replace({
    regex: "http://localhost:8100/salesforceapi",
    replacement: "https://recovery--staging.cs95.my.salesforce.com/services/apexrest/GetAccountProfile/",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
})

gulp.task('add-second-proxy', function() {
  return replace({
    regex: "https://reqres.in/api/users?page=2",
    replacement: "http://localhost:8100/newssapi",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
})

gulp.task('remove-second-proxy', function() {
  return replace({
    regex: "http://localhost:8100/newssapi",
    replacement: "https://reqres.in/api/users?page=2",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
})