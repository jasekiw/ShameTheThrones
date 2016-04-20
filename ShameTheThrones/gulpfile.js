﻿var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('compile-typescript-front-end', function () {
    var tsProject = ts.createProject('./Scripts/typescript/tsconfig.json', { sourceMap: true });
    var tsResult = tsProject.src() // instead of gulp.src(...)
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
    return tsResult.js.pipe(sourcemaps.write())
        .pipe(gulp.dest('./Scripts/typescript/shamethethrones/'));
});
gulp.task('default', ['compile-typescript-front-end']);