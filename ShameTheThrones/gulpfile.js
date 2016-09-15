
var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var requirejsOptimize = require('gulp-requirejs-optimize');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('compile-typescript-front-end', function () {
    var tsProject = ts.createProject('./Scripts/typescript/tsconfig.json', { sourceMap: true });
    var tsResult = tsProject.src() // instead of gulp.src(...)
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
    return tsResult.js.pipe(sourcemaps.write())
        .pipe(gulp.dest('./Scripts/typescript/shamethethrones/'));
});

gulp.task('optimize-scripts', function () {
    return gulp.src('Scripts/typescript/shamethethrones/Main.js')
        .pipe(sourcemaps.init())
        .pipe(requirejsOptimize({
            "baseurl": "Scripts/typescript/shamethethrones"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('Scripts/typescript/dist/shamethethrones'));
});

gulp.task('default', ['compile-typescript-front-end']);
gulp.task('optimize', ['optimize-scripts']);

gulp.task('build', ['compile-typescript-front-end', 'sass'], function () {
        gulp.run('optimize-scripts');
});
gulp.task('watch', ['compile-typescript-front-end', 'sass'], function () {
    gulp.watch('Scripts/typescript/shamethethrones/**/*.ts', ['compile-typescript-front-end']);
    gulp.watch('./Content/sass/**/*.scss', ['sass']);
});

var typedoc = require("gulp-typedoc");
gulp.task("typedoc", function () {
    return gulp
        .src(["Scripts/typescript/**/*.ts"])
        .pipe(typedoc({
            module: "amd",
            target: "es5",
            out: "docs/",
            name: "Shame The Thrones Front End Documentation"
        }))
    ;
});


gulp.task('sass', function () {
    return gulp.src('./Content/sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./Content/sass'));
});

