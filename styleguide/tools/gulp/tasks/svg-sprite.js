var gulp           = require("gulp"),
    quench         = require("../quench.js"),
    svgmin         = require("gulp-svgmin"),
    svgstore       = require("gulp-svgstore"),
    rename         = require("gulp-rename"),
    debug          = require("gulp-debug");

/**
 * Usage: put svg-icons's in svg-icons.src directory.  eg. /img/svg-icons-sprite/my-icon.svg-icons
 *        They will be compiled into svg-icons.filename. eg. /img/svg-icons-sprite.svg-icons
 *
 * In html: <svg-icons><use xlink:href="/img/svg-icons-sprite.svg-icons#my-icon"></use></svg-icons>
 *
 * In css: svg-icons { fill: BlanchedAlmond; }
 */

module.exports = function svgSpriteTask(config, env){

    // svg-icons config
    var svg = {
        src   : config.root + "/images/svg-icons-sprite/**/*.svg",
        dest  : config.dest + "/images",
        filename : "svg-icons-sprite.svg",
        svgmin: {},
        svgstore: {
            inlineSvg: false
        }
    };

    // register the watch
    quench.registerWatcher("svg-icons-sprite", [
        config.root + "/images/svg-icons-sprite/**/*.svg"
    ]);

    // generate svg-icons sprite
    gulp.task("svg-icons-sprite", function(){

        return gulp.src(svg.src)
            .pipe(quench.drano())
            .pipe(env.production( svgmin(svg.svgmin) ))
            .pipe(svgstore(svg.svgstore))
            .pipe(rename(svg.filename))
            .pipe(gulp.dest(svg.dest))
            .pipe(debug({title: "svg-icons-sprite:"}));
    });
};
