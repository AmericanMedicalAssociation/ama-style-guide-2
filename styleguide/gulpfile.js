var gulp = require('gulp');
var argv = require( 'argv' );
var browserSync = require('browser-sync');
var bump  = require('gulp-bump');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var del = require('del');
var ghPages = require('gulp-gh-pages-gift');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var minifycss  = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var shell = require('gulp-shell');
var stylelint = require('gulp-stylelint');
var tagversion = require('gulp-tag-version');
var uglify = require('gulp-uglify');

var config = require('./build.config.json');
var production;

/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del(config.assets.dest);
}

function cleanPublish() {
  return del('.publish');
}

// // Task: Handle SCSS
function styles() {
  return gulp.src(config.scss.files)
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulpif(production, minifycss()))
    .pipe(prefix('last 2 version'))
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(gulpif(production, rename({
      suffix: '.min'
    })))
    .pipe(gulp.dest(config.scss.dest))
    .pipe(browserSync.reload({stream:true}));
}


// Task: Sass Linting
function scssLint() {
  return gulp.src(config.scss.files)
    .pipe(stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
}

// Task: Handle scripts used by Drupal 8
function drupalScripts() {
  return gulp.src(config.scripts.drupalfiles, { sourcemaps: true })
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('styleguide-custom.js.js'))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(browserSync.reload({stream:true}));
}

// Task: Handle scripts used by PatternLab
function patternLabscripts() {
  return gulp.src(config.scripts.drupalfiles, { sourcemaps: true })
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(browserSync.reload({stream:true}));
}

// Task: Copy icon svg and convert them to twig files
var svg2twigconfig = {
  base: config.icons.base,
  src: config.icons.files,
  dest: "./source/_patterns/01-atoms/media/icons/"
};

function svg2twig() {
  return gulp.src(svg2twigconfig.src, { base: svg2twigconfig.base })
    .pipe(plumber())
    .pipe(rename({
      extname: ".twig"
    }))
    .pipe(gulp.dest(svg2twigconfig.dest));
}

// Task: Copy twig files from source and place in the public directory
function copyTwigFiles() {
  return gulp.src(config.twigsource.files)
    .pipe(plumber())
    .pipe(gulp.dest(config.twigsource.dest));
}

// // Task: patternlab
// Description: Build static Pattern Lab files via PHP script
function patternlab() {
  return gulp.src(' ', {read: false})
    .pipe(shell([
      'php core/console --generate'
    ]))
    .pipe(browserSync.reload({stream:true}));
}

function styleguide() {
  return gulp.src(config.patternlab.styleguide.files)
    .pipe(gulp.dest(config.patternlab.styleguide.dest));
}

function startBrowserSync() {
  browserSync({
   server: {
      baseDir: config.root
    },
    ghostMode: true,
    open: "local"
  });
}

function watch() {
  gulp.watch(config.scss.watch, styles);
  gulp.watch(config.scripts.watch, drupalScripts);
}

// Description: After code is pushed to master using master-deploy, tag it.
// Task: Publish static content
function publish() {
  return gulp.src(config.deployment.local.path)
    .pipe(ghPages({ branch: config.deployment.branch}));
}

// Function: Tagging deployed code
function tag() {
  return gulp.src(config.versioning.files)
  // Fetch master so that we can tag it.
    .pipe(shell(['git fetch origin master:master']))
    .pipe(bump({type:'patch'}))
    // Tag it.
    .pipe(tagversion({args: 'master'}))
    // Push tag.
    .pipe(shell(['git push origin --tags']));
}

function setMaster(callback) {
  // Change the deploy branch
  gutil.log('Setting branch to master.');
  config.deployment.branch = "master";
  callback();
}
/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.clean = clean;
exports.cleanPublish = cleanPublish;
exports.styles = styles;
exports.scssLint = scssLint;
exports.drupalScripts = drupalScripts;
exports.patternLabscripts = patternLabscripts;
exports.svg2twig = svg2twig;
exports.copyTwigFiles = copyTwigFiles;
exports.patternlab = patternlab;
exports.styleguide = styleguide;
exports.startBrowserSync = startBrowserSync;
exports.watch = watch;
exports.publish = publish;
exports.tag = tag;
exports.setMaster = setMaster;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(clean, patternlab, styleguide,
            gulp.parallel(styles,scssLint, drupalScripts, svg2twig, copyTwigFiles));

var local = gulp.parallel(watch, patternLabscripts, startBrowserSync);

/*
 * You can still use `gulp.task` to expose tasks
 */
gulp.task('build', build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', build);


gulp.task('serve', gulp.series(build, local), function () {
  production = false;
});

gulp.task('release', gulp.series(cleanPublish, publish, setMaster, tag), function(callback) {
  return setMaster(callback) ;
})
