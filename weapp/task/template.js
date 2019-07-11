const gulp = require('gulp');
const rename = require('gulp-rename');

const config = require('../gulp.config.js');

const argv = process.argv;
const TEMPLATE_TYPE = argv.slice(-2, -1)[0].replace('--','');
const TEMPLATE_NAME = argv.slice(-1)[0];
const TEMPLATE_FILE = './template/' + TEMPLATE_TYPE + '/*';

const OUTPUT_PATH = config.target_path + '/' + TEMPLATE_TYPE + '/' + TEMPLATE_NAME;

gulp.task('template', function() {
	gulp
		.src(TEMPLATE_FILE)
		.pipe(
            rename({basename: TEMPLATE_NAME})
        )
        .pipe(gulp.dest(OUTPUT_PATH));
});