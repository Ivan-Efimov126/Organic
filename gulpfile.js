const { src, dest, watch, parallel } = require('gulp');
const browser_sync = require('browser-sync').create();
const pug_to_html = require('gulp-pug');
const sass_to_css = require('gulp-sass');

function browsersync() {
    browser_sync.init({
        server: { baseDir: './app' }
    })
}
function pugtohtml() {
    return src('./dist/index.pug')
        .pipe(pug_to_html())
        .pipe(dest('./app'))
}
function sasstocss() {
    return src('./dist/style.sass')
        .pipe(sass_to_css())
        .pipe(dest('./app'))
}
function watching() {
    watch(['./dist/**/*.pug'], pugtohtml);
    watch(['./dist/**/*.sass'], sasstocss);
    watch(['./app/**/*.html']).on('change', browser_sync.reload);
    watch(['./app/**/*.js']).on('change', browser_sync.reload);
    watch(['./app/**/*.css'], function () {
    }).on('change', browser_sync.reload);
}

exports.default = parallel(browsersync, watching);