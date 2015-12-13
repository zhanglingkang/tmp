var gulp = require('gulp')
var webpack = require('gulp-webpack')
var fs = require('fs')
var uglify = require('gulp-uglify')
var filter = require('gulp-filter')
var clean = require('gulp-clean')
var argv = require('optimist').argv
var livereload = require('gulp-livereload')
var path = require('path')
var htmlmin = require('gulp-htmlmin')
var gulpif = require('gulp-if')
var rev = require('gulp-rev')
var revCollector = require('gulp-rev-collector')
var gulpSequence = require('gulp-sequence').use(gulp)
var replace = require('gulp-replace')
var webpackConfig = require('./webpack.config')
var production = false
if (argv.p) {
    production = true
}
gulp.task('webpack', function (cb) {
    gulp.src('src/app.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulpif(production, uglify()))
        .pipe(gulpif(production, rev()))
        .pipe(gulp.dest('dist/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/'))
        .on('finish', function () {
            gulp.src(['dist/**/*.json', 'dist/app.html'])
                .pipe(revCollector({
                    replaceReved: true
                }))
                .pipe(gulp.dest('dist/'))
                .on('finish', cb)
        })
})
gulp.task('vendor', function (cb) {
    var unCompressJsFilter = filter('**/dist/**/*.js', {restore: true})
    gulp.src([
            'node_modules/{react,react-dom,bootstrap,jquery,fixed-data-table}/dist/**/*.*',
            'node_modules/react-bootstrap-datetimepicker/css/**/*.*'
        ], {
            base: 'node_modules'
        })
        .pipe(unCompressJsFilter)
        .pipe(gulpif(production, uglify()))
        .pipe(unCompressJsFilter.restore)
        .pipe(gulp.dest('dist/vendor'))
        .on('finish', cb)
})
gulp.task('htmls', function (cb) {
    gulp.src('src/**/*.html')
        .pipe(gulpif(production, htmlmin({
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        })))
        .pipe(gulpif(production, replace(/\.min(?=\.(js|css))/g, '')))
        .pipe(gulpif(production, replace(/(dist\/[^">]+)\.js/g, '$1.min.js')))
        .pipe(gulpif(production, replace(/(<link[^>]+)\.css/g, '$1.min.css')))
        .pipe(gulp.dest('dist'))
        .on('finish', cb)
})
gulp.task('clean', function (cb) {
    if (fs.existsSync('dist')) {
        gulp.src('dist', {read: false})
            .pipe(clean({force: true}))
            .on('finish', function () {
                fs.mkdirSync('dist')
                cb()
            })
    } else {
        fs.mkdirSync('dist')
        cb()
    }

})
gulp.task('watch', function () {
    //处理未捕获的异常，防止watch退出
    process.on('uncaughtException', function (err) {
        console.log(err)
        console.log(err.stack)
    })
    livereload({
        start: true
    })
    webpackConfig.watch = true
    gulp.src('src/app.html')
        .pipe(gulp.dest('dist/'))
    gulp.src('src/app.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist/'))
        .on('finish', function () {

        })
    gulp.watch('src/**/*.html', function () {
        gulp.run('htmls')
    })
    gulp.watch('dist/**/*.*', function (event) {
        livereload.changed(path.join(__dirname, event.path))
    })

})
gulp.task('default', function (cb) {
    gulpSequence('clean', 'htmls', 'webpack', ['vendor'], cb)
})
gulp.task('help', function (cb) {
    console.log('gulp:执行构建(开发环境)')
    console.log('gulp watch:开发环境使用，配合livereload可以实现实时刷新页面')
    console.log('gulp -p:执行构建(生产环境)')
    cb()
})