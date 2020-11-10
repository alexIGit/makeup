'use strict';

const $ = require('gulp-load-plugins')()
  , gulp = require('gulp')
  , combine = require('stream-combiner2').obj
;

module.exports = function(options) {
  let config = {
    stylelint: {
      reporters: [
        {formatter: 'string', console: true}
      ],
      debug: true
    }
  };

  return () => {
    return combine(
      gulp.src(options.src),

      $.if('!fonts.scss',
          $.if('!aspect.scss',
        // todo: redo one if
        $.if('!dev.scss',
          $.if('!normalize.scss',
              $.if('!styles.scss',
                $.stylelint(config.stylelint)
              )
          )
        )
          )
      )
    ).on('error', $.notify.onError((error) => {
      let msg = "Error linting styles: " + error.message;
      return msg;
    }));
    // );
  };
};
