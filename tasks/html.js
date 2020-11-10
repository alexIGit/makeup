'use strict';

let gulp = require('gulp')
  , $ = require('gulp-load-plugins')()
  , combine = require('stream-combiner2').obj
;

const isProd = process.env.NODE_ENV === 'production'
  ,  isTest = process.env.NODE_ENV === 'test'
  ,  isDev = !process.env.NODE_ENV || !isProd && !isTest
;

// const config = {};

module.exports = function(options) {
  return function() {
    return combine(
        gulp.src(options.src),
        $.newer(options.src),



        $.fileInclude({
          prefix: '@@',
          basepath: '@file'
        }),

      $.htmlhint('.htmlhintrc'),
      $.htmlhint.reporter(),



        gulp.dest(options.dst),

        // $.if(isTest, combine(
        //   $.w3cHtmlValidator(),
        //   $.w3cHtmlValidator.reporter(),
        // ))

    ).on('error', $.notify.onError({
      message: 'Error: <%= error.message %>',
      title: 'HTML error'
    }));
  };
};
