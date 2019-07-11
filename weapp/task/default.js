const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');

gulp.task('default', gulpSequence('eslint', 'script', 'style', 'build'));
