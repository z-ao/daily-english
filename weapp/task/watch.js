const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const config = require('../gulp.config.js');

const DEV_PATH = config.target_path;

gulp.task('watch', function() {
    gulp.watch( DEV_PATH + '/**', function () {
        gulpSequence('eslint', 'script', 'style', 'build')(function (err) {
            if (err) console.log(err)
        })
    });
});
