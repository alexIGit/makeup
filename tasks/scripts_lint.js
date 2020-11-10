'use strict';

const $ = require('gulp-load-plugins')()
  , gulp = require('gulp')
  , combine = require('stream-combiner2').obj
;

module.exports = function(options) {
  let config = {
  };

  return () => {
    return combine(
      gulp.src(options.src),

      $.eslint(),
      $.eslint.format()

    ).on('error', $.notify.onError((error) => {
      let msg = "Error linting styles: " + error.message;
      return msg;
    }));
  };
};
