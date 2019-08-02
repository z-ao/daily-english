const gulp = require('gulp');
const ts = require('gulp-typescript');

const config = require('../gulp.config.js');

const OUTPUT_PATH = config.output_path
const OPTION = config.typescript_option

gulp.task('typescript', function () {
    if (!OPTION.init) return;

    const tsProject = ts.createProject('../tsconfig.json');
    const tsResult = gulp.src(OPTION.TARGET_PATH) 
        .pipe(tsProject());
 
    return tsResult.js.pipe(gulp.dest(OUTPUT_PATH));
});