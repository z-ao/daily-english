const gulp = require('gulp');
const config = require('../gulp.config.js');

const OUTPATH = config.output_path,
	DEV_PATH = config.target_path;

const OPTION = config.build_option

const IGNORE_PATH = OPTION.IGNORE_PATH.map(path => '!' + path)
const TARGET_PATH = OPTION.TARGET_PATH.concat(IGNORE_PATH)

gulp.task('build', function() {
	if (!OPTION.init) return;

    gulp
        .src(TARGET_PATH, { base: DEV_PATH } )
        .pipe(gulp.dest(OUTPATH));
});
