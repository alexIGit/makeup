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
  let config = {
    imgName: options.name + '.png',
    // cssName: '_' + options.name + '.scss',
    cssName: options.name + '.css',
    // cssFormat: 'scss',
    cssFormat: options.outputStyle == 'css' ? 'css' : 'scss_maps',
    algorithm: 'top-down',
    cssOpts: {
      functions: true,
      cssSelector: function(sprite) {
        return sprite.name = '.' + options.prefix + '--' + sprite.name
      }
    },
    padding: 10,
};

  return function() {
    return combine(
      // $.if(!isTest,
        gulp.src(options.src),
        spritesGeterator(config),
        $.if(isProd, $.imagemin()),
        $.if('*.{css, scss}', gulp.dest(options.dst_styles), gulp.dest(options.dst_img))
      // )
    ).on('error', $.notify.onError());
  };
};
