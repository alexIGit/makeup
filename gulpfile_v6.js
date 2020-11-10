
  , del = require('del')
  , clean = require('clean')
  // , sprite = require('gulp-sprite-generator')
;

lazyRequireTask('icons:league', './tasks/stylesSvg', {
  src: path.src.logo,
  dst: path.dst.img,
  prefix: 'logo',
  name: 'leagues_logo',
});
lazyRequireTask('icons:aspect', './tasks/stylesPng', {
  src: path.src.aspect,
  dst: path.dst.img,
  prefix: 'aspect',
  name: 'aspect',
  outputStyle: 'css',
});
lazyRequireTask('icons:soccer', './tasks/stylesPng', {
  src: path.src.teamSoccer,
  dst: path.dst.img,
  prefix: 'team',
  name: 'icons_soccer',
  outputStyle: 'css',
});
lazyRequireTask('icons:hockey', './tasks/stylesPng', {
  src: path.src.teamHockey,
  dst: path.dst.img,
  prefix: 'team',
  name: 'icons_hockey',
  outputStyle: 'css',
});
lazyRequireTask('icons:nations', './tasks/stylesPng', {
  src: path.src.teamNations,
  dst: path.dst.img,
  prefix: 'team',
  name: 'icons_nations',
  outputStyle: 'css',
});

gulp.task('icons',
  gulp.parallel(
    'icons:league',
    'icons:aspect',
    'icons:soccer',
    'icons:hockey',
    'icons:nations'
));

