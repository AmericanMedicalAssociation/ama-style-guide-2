var gulp          = require("gulp"),
    quench        = require("../quench.js"),
    sass          = require("gulp-sass"),
    autoprefixer  = require("gulp-autoprefixer"),
    pixrem        = require("gulp-pixrem"),
    rename        = require("gulp-rename"),
    debug         = require("gulp-debug"),
    header        = require("gulp-header"),
    sassGlob      = require('gulp-sass-glob'),
    sourcemaps    = require("gulp-sourcemaps")

module.exports = function cssTask(config, env){

    var path = ['styles'];


    // css settings
    var cssConfig = {
        src: config.root + "/scss/*.scss",
        dest: config.dest + "/css/",
        filename: "index.css",

        sass: {
            outputStyle: env.development() ? "nested" : "compressed",
            includePaths: path
        },

        autoprefixer: {
            browsers: ["> 1%", "last 3 versions", "Firefox ESR", "Opera 12.1", "ie >= 9"]
        }
    };

    // register the watch
    quench.registerWatcher("css", [
      config.base + "/_patterns/**/*.scss"
    ]);

    /* css task */
    gulp.task("css", function() {

        var gulpCss = gulp.src(cssConfig.src)
            .pipe(sassGlob())
            .pipe(quench.drano())
            .pipe(sourcemaps.init())
            .pipe(sass(cssConfig.sass))
            .pipe(autoprefixer(cssConfig.autoprefixer))
            .pipe(pixrem("16px",{atrules: true, html: true}))
            .pipe(rename({
                suffix: "-generated"
            }));

        // only add the header text if this css isn't compressed
        if (cssConfig.sass && cssConfig.sass.outputStyle !== "compressed"){
            gulpCss.pipe(header("/* This file is generated.  DO NOT EDIT. */ \n"));
        }

        return gulpCss
            .pipe(sourcemaps.write("./"))
            .pipe(gulp.dest(cssConfig.dest))
            .pipe(debug({title: "css:"}));
    });
};
