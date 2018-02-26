// npm requirements
var gulp      = require('gulp'),
  bump        = require('gulp-bump'),
  clean       = require('gulp-clean'),
  concat      = require('gulp-concat'),
  browserSync = require('browser-sync'),
  filter      = require('gulp-filter'),
  git         = require('gulp-git'),
  gulpif      = require('gulp-if'),
  imagemin    = require('gulp-imagemin'),
  rename      = require('gulp-rename'),
  sass        = require('gulp-sass'),
  sassGlob    = require('gulp-sass-glob'),
  svgmin      = require('gulp-svgmin'),
  shell       = require('gulp-shell'),
  tagversion  = require('gulp-tag-version'),
  uglify      = require('gulp-uglify'),
  ghPages     = require('gulp-gh-pages'),
  runSequence = require('run-sequence'),
  glob        = require('glob'),
  sourcemaps  = require('gulp-sourcemaps'),
  prefix      = require('gulp-autoprefixer'),
  postcss     = require('gulp-postcss'),
  reporter    = require('postcss-reporter'),
  stylelint   = require('gulp-stylelint'),
  gutil       = require('gulp-util'),
  pWaitFor    = require('p-wait-for'),
  pathExists  = require('path-exists'),
  plumber     = require('gulp-plumber');

// Config
var config = require('./build.config.json');


// Trigger
var production;
// Task: Clean:before
// Description: Removing assets files before running other tasks
gulp.task('clean:before', function () {
  return gulp.src(
    config.assets.dest
  )
    .pipe(clean({
      force: true
    }))
});

// Task: Clean:publish
// Description: Removing temp dir from git deploy
gulp.task('clean:publish', function () {
  return gulp.src( '.publish' )
    .pipe(clean({ force: true }))
});

// Task: Handle scripts
gulp.task('scripts', function () {
  // Package up all of the custom stuff for Drupal to consume
  var ds = gulp.src(config.scripts.drupalfiles)
  // unminified for development
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('styleguide-custom.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scripts.dest));

  // Package up everything for use by Pattern Lab
  return gulp.src(config.scripts.files)
  // unminified for development
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scripts.dest))
    // also 'production-ready' js file even though we don't use it yet
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(browserSync.reload({
      stream:true,
      notify:false
    }));
});

// Task: Handle fonts
gulp.task('fonts', function () {
  return gulp.src(config.fonts.files)
    .pipe(plumber())
    .pipe(gulp.dest(
      config.fonts.dest
    ))
    .pipe(browserSync.reload({
      stream:true,
      notify:false
    }));
});

// Task: Handle media
gulp.task('images', function () {
  return gulp.src(config.images.files)
    .pipe(plumber())
    .pipe(gulpif(production, imagemin()))
    .pipe(gulp.dest(
      config.images.dest
    ))
    .pipe(browserSync.reload({
      stream:true,
      notify:false
    }));
});


// Task: Handle icons
// We have to do this in a few steps until
// https://github.com/filamentgroup/gulpicon/issues/1 is resolved
gulp.task('minifyIcons', function() {
  return gulp.src(config.icons.files)
    .pipe(plumber())
    .pipe(svgmin())
    .pipe(gulp.dest(config.icons.min));
});

gulp.task('sass', ['scss-lint'], function () {
  return gulp.src(config.scss.files)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass(gulpif(production, { outputStyle: 'compressed' })).on('error', sass.logError))
    .pipe(prefix({
      browsers: ['last 2 versions'],
      grid: true,
      cascade: false
    }))
    .pipe(gulpif(production, rename({
      suffix: '.min'
    })))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.scss.dest))
    .pipe(browserSync.reload({
      stream:true,
      notify:false
    }));
});

// Task: patternlab
// Description: Build static Pattern Lab files via PHP script
gulp.task('patternlab', function () {
  return gulp.src('', {read: false})
    .pipe(plumber())
    .pipe(shell([
      'php core/console --generate'
    ]))
    .pipe(browserSync.reload({
      stream:true,
      notify:false
    }));
});

// Task: styleguide
// Description: Copy Styleguide-Folder from core/ to public
gulp.task('styleguide', function() {
  return gulp.src(config.patternlab.styleguide.files)
    .pipe(plumber())
    .pipe(gulp.dest(config.patternlab.styleguide.dest));
});

// task: BrowserSync
// Description: Run BrowserSync server with disabled ghost mode
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: config.root
    },
    notify: false,
    ghostMode: true,
    open: "local"
  });
});

gulp.task('exit', function() {
  process.exit();
});

// Task: Sass Linting
// Description: lint sass files
gulp.task('scss-lint', function() {
  return gulp.src(config.scss.files)
    .pipe(stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});


// copy files settings
var svg2twig = {
  base: config.icons.base,
  src: config.icons.files,
  dest: "./source/_patterns/01-atoms/media/icons/"
};

/* copy files */
gulp.task("svg2twig", function() {
  return gulp.src(svg2twig.src, { base: svg2twig.base })
    .pipe(plumber())
    .pipe(rename({
      extname: ".twig"
    }))
    .pipe(gulp.dest(svg2twig.dest))
});

gulp.task('cleanTwig', ['clean:before'], function (callback) {
  runSequence(
    'patternlab',
    'copyTwigFiles',
    callback
  );
});

// Copy twig files from source
/* copy files */
gulp.task("copyTwigFiles", function() {
  return gulp.src(config.twigsource.files)
    .pipe(plumber())
    .pipe(gulp.dest(config.twigsource.dest))
});

// Run backstop to run tests
gulp.task( 'backstop', function () {
  return gulp.src('')
    .pipe(shell(['backstop test']))
});

// Task: Watch files
gulp.task('watch', function () {

  // Watch Pattern Lab files
  gulp.watch(
    config.patternlab.files,
    ['patternlab', 'default']
  );

  // Watch scripts
  gulp.watch(
    config.scripts.files,
    ['scripts']
  );

  // Watch media
  gulp.watch(
    config.images.files,
    ['images']
  );

  // Watch sass
  gulp.watch(
    config.scss.watch,
    ['sass']
  );

  // Watch fonts
  gulp.watch(
    config.fonts.files,
    ['fonts']
  );

  gulp.watch(
    config.twigsource.files,
    ['cleanTwig']
  );
});

// Task: Default
// Description: Build all stuff of the project once
gulp.task('default', ['clean:before'], function (callback) {
  production = false;

  // We need to re-run sass last to make sure the latest styles.css gets loaded
  runSequence(
    ['fonts', 'images'],
    'patternlab',
    'styleguide',
    'copyTwigFiles',
    'sass',
    'scripts',
    callback
  );
});

// gulp.task('default', runSequence(['scripts', 'fonts', 'images', 'sass', 'patternlab', 'styleguide']));

// Task: Start your production-process
// Description: Type 'gulp' in the terminal
gulp.task('serve', function () {
  production = false;

  runSequence(
    'default',
    'browser-sync',
    'watch'
  );
});

// Task: Start your production-process
// Description: Type 'gulp' in the terminal
gulp.task('test', function () {
  production = false;
  runSequence(
    'default',
    'browser-sync',
    'backstop',
    'exit'
  );
});

// Task: Publish static content
// Description: Publish static content using rsync shell command
gulp.task('publish', ['clean:publish'], function () {
  return gulp.src(config.deployment.local.path)
    .pipe(ghPages({ branch: config.deployment.branch}));
});

// Task: Deploy to GitHub pages
// Description: Build the public code and deploy it to GitHub pages
gulp.task('deploy', function () {
  // make sure to use the gulp from node_modules and not a different version
  runSequence = require('run-sequence').use(gulp);
  // run default to build the code and then publish it GitHub pages
  runSequence('default', 'publish');
});

// Task: Deploy to dev-assets branch
// Description: Build the public code and deploy it to be consumed by Drupal
gulp.task('drupal-deploy', function () {
  // make sure to use the gulp from node_modules and not a different version
  runSequence = require('run-sequence').use(gulp);
  // Change the deploy branch
  config.deployment.branch = "dev-assets";
  // run default to build the code and then publish it to our branch
  runSequence('default', 'publish');
});

// Function: Tagging deployed code
// Description: After code is pushed to master using master-deploy, tag it.
gulp.task('tag', function () {
  return gulp.src(config.versioning.files)
  // Fetch master so that we can tag it.
    .pipe(shell(['git fetch origin master:master']))

    // Tag it.
    .pipe(tagversion())
    // Push tag.
    .pipe(shell(['git push --tags']));
});

gulp.task('set-master', function (callback) {
  // Change the deploy branch
  gutil.log('Setting branch to master.');
  config.deployment.branch = "master";
  callback();
})

// Task: Release the code
// Description: Release runs deploy to build to gh-pages,
// pushes the same code to master, then tags master.
gulp.task('release', function (callback) {
  // make sure to use the gulp from node_modules and not a different version
  runSequence = require('run-sequence').use(gulp);
  // Build the style guide, publish to gh-pages, set the branch to master,
  // publish to master, then tag master.
  runSequence('default', 'publish', 'set-master', 'tag', callback);
});
