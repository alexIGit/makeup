'use strict';

const $ = require('gulp-load-plugins')()
    , gulp = require('gulp')
    , combine = require('stream-combiner2').obj
    , spritesGeterator = require('gulp.spritesmith')
;

const isProd = process.env.NODE_ENV === 'production'
    ,  isTest = process.env.NODE_ENV === 'test'
    ,  isDev = !process.env.NODE_ENV || !isProd && !isTest
;

module.exports = function(options) {
    return function() {
        return combine(
            gulp.src(options.src),
            gulp.dest(options.dst)
        ).on('error', $.notify.onError());
    };
};
