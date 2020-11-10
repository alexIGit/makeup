'use strict';

const $ = require('gulp-load-plugins')()
  , gulp = require('gulp')
  , combine = require('stream-combiner2').obj
  , linter = require('stylelint')
  // , scsslint = require('gulp-scss-lint')
  // , sassLint = require('sass-lint')
  // , listStream = require('list-stream').obj
;

// var scsslint = require('gulp-scss-lint');

const isProd = process.env.NODE_ENV === 'production'
  , isTest = process.env.NODE_ENV === 'test'
  , isDev = !process.env.NODE_ENV || !isProd && !isTest
;

module.exports = function(options) {
  let config = {
    sass: {
      // includePaths: [ process.cwd() + '/tmp/styles/'],
    },
    cssUrlAdjuster: {
      prependRelative: '../img/',
    },
  };

  return () => {
    return combine(
      gulp.src(options.src),

      $.if(!isProd, $.sourcemaps.init()),
      // $.sass(config.sass),

      $.if('*.scss', $.sass(config.sass)),


      // $.if(isTest, combine(
      //   $.csslint(config.csslint),
      //   $.csslint.formatter(),
      //   $.cssValidator(),
      // )),

      // $.cssValidator(),

      // $.groupCssMediaQueries(),
      $.cssUrlAdjuster(config.cssUrlAdjuster),

      // $.if(isTest, $.cssValidator()),
      $.if(!isProd, $.sourcemaps.write()),

      gulp.dest(options.dst)
    ).on('error', $.notify.onError((error) => {
      let msg = "Error styles: " + error.message;
      return msg;
    }));
    // );
  };

};
