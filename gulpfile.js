var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', () =>
  gulp
    .src('./src/server/**/*.ts')
    .pipe(babel())
    .pipe(gulp.dest('./dist/'))
)