'use strict';

const gulp = require('gulp');

let path = {
  dst: {
    build: './build',
    styles: 'build/styles/',
    scripts: 'build/scripts/',
    img: 'build/img/',
    sprites: 'tmp/',
    // uncss: 'build/*.html',
    // urlAdjuster: '../img/',
  },
  src: {
    html: 'src/templates/*.html',
    styles: 'src/styles/*.*css',
    // styles_css: 'src/styles/*.css',
    stylelint: 'src/styles/**/*.scss',
    scripts: 'src/scripts/*.js',
    img: 'src/img/**/*.*',
    sprites: {
      img: 'tmp/img/*.*',
      styles: 'tmp/styles/*.css',
    },
    // logo: 'src/styles/leagues_logo/*.svg',
    aspect: 'src/additional/aspect/*.png',
    // teamSoccer: 'src/styles/icons_soccer/*.png',
    // teamHockey: 'src/styles/icons_hockey/*.png',
    // teamNations: 'src/styles/icons_nations/*.png',
  },
  watch: {
    html: 'src/**/*.html',
    scripts: 'src/scripts/**/*.js',
    styles: 'src/styles/**/*.scss',
    browserSync: 'build/**/*.*',
  },
  manifest: {
    // dest: 'manifest',
    // css: 'manifest/css.json'
  }
};

function lazyRequireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);
    return task(callback);
  });
}

lazyRequireTask('clean', './tasks/clean', {
  dst: path.dst.build
});

lazyRequireTask('html', './tasks/html', {
  src: path.src.html,
  dst: path.dst.build
});

lazyRequireTask('styles', './tasks/styles', {
  src: path.src.styles,
  dst: path.dst.styles,
  srcStylelint: path.src.stylelint,
  // uncss: path.dst.uncss,
  // manifest: path.manifest.dest,
  // urlAdjuster: path.dst.urlAdjuster,
});
// lazyRequireTask('styles:css', './tasks/styles', {
//   src: path.src.styles_css,
//   dst: path.dst.styles,
//   srcStylelint: path.src.stylelint,
// });

lazyRequireTask('styles:lint', './tasks/styles_lint', {
  src: path.src.stylelint
});

lazyRequireTask('scripts', './tasks/scripts', {
  src: path.src.scripts,
  dst: path.dst.scripts
});

lazyRequireTask('scripts:lint', './tasks/scripts_lint', {
  src: path.src.scripts,
});

lazyRequireTask('img', './tasks/img', {
  src: path.src.img,
  dst: path.dst.img
});

lazyRequireTask('icons:aspect', './tasks/spritesPng', {
  src: path.src.aspect,
  dst_img: path.dst.sprites + 'img/',
  dst_styles: path.dst.sprites + 'styles/',
  prefix: 'aspect',
  name: 'aspect',
  outputStyle: 'css',
});

lazyRequireTask('moveSprites:img', './tasks/moveSprites', {
  src: path.src.sprites.img,
  dst: path.dst.img,
});

lazyRequireTask('moveSprites:styles', './tasks/moveSprites', {
  src: path.src.sprites.styles,
  dst: path.dst.styles,
});

gulp.task('watch', function() {
  gulp.watch([path.watch.styles, 'tmp/styles/*.*'], gulp.series('styles'));
  gulp.watch(path.watch.styles, gulp.series('styles:lint'));
  gulp.watch(path.watch.html, gulp.series('html'));
  // gulp.watch(path.src.img, gulp.series('img'));
  // gulp.watch(path.watch.scripts, gulp.series('scripts'));
  // gulp.watch(path.watch.scripts, gulp.series('scripts:lint'));


  // gulp.watch(path.src.logo, gulp.series('icons:league'));
  // gulp.watch(path.src.aspect, gulp.series('icons:aspect'));
  // gulp.watch(path.src.teamSoccer, gulp.series('icons:soccer'));
  // gulp.watch(path.src.teamHockey, gulp.series('icons:hockey'));
  // gulp.watch(path.src.teamNations, gulp.series('icons:nations'));
});



lazyRequireTask('serve', './tasks/serve', {
  dst: path.dst.build,
  watch: path.watch.browserSync
});

gulp.task('build',
    gulp.series('clean',
        gulp.parallel('html'),
      // gulp.parallel('styles', 'img', 'scripts', 'moveSprites:img', 'moveSprites:styles')
    gulp.parallel('styles', 'img', 'scripts')
));

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve'))
);
