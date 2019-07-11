const gulp = require('gulp');
const eslint = require('gulp-eslint');
const friendlyFormatter = require("eslint-friendly-formatter");
const config = require('../gulp.config.js');

const OPTION = config.eslint_option;

const TARGET_PATH = OPTION.TARGET_PATH.concat(OPTION.IGNORE_PATH.map(i => '!' + i))
const configFile = OPTION.configFile

gulp.task('eslint', () => {
	if (!OPTION.init) return;
	
    gulp.src(TARGET_PATH)
        .pipe(eslint({
            configFile: configFile
        }))
        .pipe(eslint.format(friendlyFormatter));
});
