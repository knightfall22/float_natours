let gulp = require('gulp'),
sass = require('gulp-sass'),
plumber = require('gulp-plumber'),
prefixer = require('gulp-autoprefixer'),
concat = require('gulp-concat'),
browserSync = require('browser-sync').create(),
reload = browserSync.reload;
cleanCss = require('gulp-clean-css') ;


gulp.task('build',function(){
  gulp.src('sass/main.scss')
  .pipe(plumber())
  .pipe(sass({
  outputStyle:'compressed'
  }))
  .pipe(prefixer('last 10 versions'))
  .pipe(gulp.dest('css'))
});

gulp.task('concat',function(){
   gulp.src(['css/main.css','css/icon-font.css'])
   .pipe(plumber())
   .pipe(concat('style.css'))
   .pipe(cleanCss())
   .pipe(gulp.dest('css'))
});

gulp.task('serve',function(){
   browserSync.init({
     server:"./"
   });
});

gulp.task('watch',function(){
  gulp.watch('sass/*/*.scss' , ['build','concat'])
  gulp.watch('sass/*/*.scss').on('change',reload)
  
});

gulp.task('default', ['build','watch','concat','serve']);