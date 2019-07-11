const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
// const postcss = require('gulp-postcss'); // 小程序自动补全
// const autoprefixer = require('autoprefixer');
const cssnano = require('gulp-cssnano');
const config = require('../gulp.config.js');

const DEV_PATH = config.target_path
const OUTPUT_PATH = config.output_path

const OPTION = config.style_option

const IGNORE_PATH = OPTION.IGNORE_PATH.map(i => '!' + i)
const TARGET_PATH = OPTION.TARGET_PATH.concat(IGNORE_PATH)

gulp.task('style', function() {
    if (!OPTION.init) return;
    
    gulp
        .src(TARGET_PATH, { base: DEV_PATH })
        .pipe(less())
        // .pipe(postcss([autoprefixer(['iOS >= 8', 'Android >= 4.1'])]))
        .pipe(
            cssnano({
                zindex: false, //不计算zinde值
                autoprefixer: false, //不删除前缀
                discardComments: { removeAll: true } //移除注释
            })
        )
        .pipe(
            rename(function(path) {
                path.extname = '.wxss';
            })
        )
        .pipe(gulp.dest(OUTPUT_PATH));
});
