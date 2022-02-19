// package vars
var pkg = require("./package.json");

// gulp
var gulp = require("gulp");

// load all plugins in "devDependencies" into the variable $
var $ = require("gulp-load-plugins")({
  pattern: ["*"],
  scope: ["devDependencies"],
});

var onError = (err) => {
  console.log(err);
};

var banner = [
  "/**",
  " * @project        <%= pkg.name %>",
  " * @author         <%= pkg.author %>",
  " * @build          " + $.moment().format("llll") + " ET",
  //" * @release        " + $.gitRevSync.long() + " [" + $.gitRevSync.branch() + "]",
  " * @copyright      Copyright (c) " +
    $.moment().format("YYYY") +
    ", <%= pkg.copyright %>",
  " *",
  " */",
  "",
].join("\n");

//TODO upgrade this task with belows
gulp.task("scripts", function (cb) {
  $.pump(
    [
      gulp.src(["src/js/*.js"]),
    //  $.eslint(),
    //  $.eslint.format(),
      $.if(["*.js", "!*.min.js"], $.babel({ presets: ["es2015"] })),
    //  $.if(["*.js", "!*.min.js"], $.uglify()),
      $.concat("main.js"),
      $.size({ gzip: true, showFiles: true }),
      gulp.dest("web/dist/js", { mode: 0777 }),
    ],
    cb
  );
  $.pump([
    gulp.src(["src/js/vendor/*.js"]),
    $.concat("libs.js"),
    $.size({ gzip: true, showFiles: true }),
    gulp.dest("web/dist/js", { mode: 0777 } ),
  ]);
});

/*** Javascript ***/
//TODO implement and remove scripts task

// babel js task - transpile our Javascript into the build directory
gulp.task("js-babel", () => {
  $.fancyLog("-> Transpiling Javascript via Babel...");
  return gulp
    .src(pkg.globs.babelJs)
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.newer({ dest: pkg.paths.build.js }))
    .pipe($.babel())
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(pkg.paths.build.js, { mode: 0777 }));
});

// inline js task - minimize the inline Javascript into _inlinejs in the templates path
gulp.task("js-inline", () => {
  $.fancyLog("-> Copying inline js");
  return gulp
    .src(pkg.globs.inlineJs)
    .pipe($.plumber({ errorHandler: onError }))
    .pipe(
      $.if(
        ["*.js", "!*.min.js"],
        $.newer({ dest: pkg.paths.templates + "_inlinejs", ext: ".min.js" }),
        $.newer({ dest: pkg.paths.templates + "_inlinejs" })
      )
    )
    .pipe($.if(["*.js", "!*.min.js"], $.uglify()))
    .pipe($.if(["*.js", "!*.min.js"], $.rename({ suffix: ".min" })))
 //   .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(pkg.paths.templates + "_inlinejs"));
});

// js task - minimize any distribution Javascript into the public js folder, and add our banner to it
gulp.task("js", ["js-babel"], () => {
  $.fancyLog("-> Building js");
  return gulp
    .src(pkg.globs.distJs)
    .pipe($.plumber({ errorHandler: onError }))
    .pipe(
      $.if(
        ["*.js", "!*.min.js"],
        $.newer({ dest: pkg.paths.dist.js, ext: ".min.js" }),
        $.newer({ dest: pkg.paths.dist.js })
      )
    )
    .pipe($.if(["*.js", "!*.min.js"], $.uglify()))
    .pipe($.if(["*.js", "!*.min.js"], $.rename({ suffix: ".min" })))
    .pipe($.header(banner, { pkg: pkg }))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(pkg.paths.dist.js, { mode: 0777 }))
    .pipe($.filter("**/*.js"))
    .pipe($.livereload());
});

/*** CSS ***/

// scss - build the scss to the build folder, including the required paths, and writing out a sourcemap
gulp.task("scss", () => {
  $.fancyLog("-> Compiling scss");

  //redactor
  gulp
    .src(pkg.paths.src.redactor)
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe(
      $.sass({
        includePaths: pkg.paths.scss,
      }).on("error", $.sass.logError)
    )
    .pipe($.cached("sass_compile"))
    .pipe($.autoprefixer())
    .pipe(
      $.cssnano({
        discardComments: {
          removeAll: true,
        },
        discardDuplicates: true,
        discardEmpty: true,
        minifyFontValues: true,
        minifySelectors: true,
      })
    )
    .pipe($.sourcemaps.write("./"))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(pkg.paths.dist.redactor, { mode: 0777 }));
  

  gulp
    .src(pkg.paths.src.scss + "publication_pdf.scss")
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe(
      $.sass({
        includePaths: pkg.paths.scss,
      }).on("error", $.sass.logError)
    )
    .pipe($.cached("sass_compile"))
    .pipe($.autoprefixer())
    .pipe(
      $.cssnano({
        discardComments: {
          removeAll: true,
        },
        discardDuplicates: true,
        discardEmpty: true,
        minifyFontValues: true,
        minifySelectors: true,
      })
    )
    .pipe($.sourcemaps.write("./"))
    .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(pkg.paths.dist.css, { mode: 0777 }));
  // end specialty css files

  // main file
  return gulp
    .src(pkg.paths.src.scss + pkg.vars.scssName)
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe(
      $.sass({
        includePaths: pkg.paths.scss,
      }).on("error", $.sass.logError)
    )
    .pipe($.cached("sass_compile"))
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write("./"))
  //  .pipe($.size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(pkg.paths.build.css, { mode: 0777 }));
});

// css task - combine & minimize any distribution CSS into the public css folder, and add our banner to it
gulp.task("css", ["scss"], () => {
  $.fancyLog("-> Building css");
  return (
    gulp
      .src(pkg.globs.distCss)
      .pipe($.ignore.exclude("publication_pdf.css"))
      //.pipe($.scssLint())
      .pipe($.plumber({ errorHandler: onError }))
      .pipe($.newer({ dest: pkg.paths.dist.css + pkg.vars.siteCssName }))
      //.pipe($.print())
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.concat(pkg.vars.siteCssName))
      .pipe(
        $.cssnano({
          discardComments: {
            removeAll: true,
          },
          discardDuplicates: true,
          discardEmpty: true,
          minifyFontValues: true,
          minifySelectors: true,
        })
      )
      .pipe($.header(banner, { pkg: pkg }))
      .pipe($.sourcemaps.write("./"))
      .pipe($.size({ gzip: true, showFiles: true }))
      .pipe(gulp.dest(pkg.paths.dist.css, { mode: 0777 }))
      .pipe($.filter("**/*.css"))
      .pipe($.livereload())
  );
});

gulp.task("default", ["css", "scripts"], function () {
  $.livereload.listen();
  gulp.watch([pkg.paths.src.scss + "**/*.scss"], ["css"]);
 // gulp.watch([pkg.paths.src.css + "**/*.css"], ["css"]);
  gulp.watch([pkg.paths.src.js + "**/*.js"], ["scripts"]);
});
