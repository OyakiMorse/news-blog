let projectFolder = 'dist'
let srcFolder = 'src'

let path = {
  build: {
    html: projectFolder + '/',
    css: projectFolder + '/css/',
    js: projectFolder + '/js/',
    img: projectFolder + '/img/',
    fonts: projectFolder + '/fonts',
  },
  src: {
    html: [srcFolder + '/*.html', '!' + srcFolder + '/_*.html'],
    css: srcFolder + '/scss/style.scss',
    js: srcFolder + '/js/index.js',
    img: srcFolder + '/img/**/*.*',
    fonts: srcFolder + '/fonts/*.ttf',
  },
  watch: {
    html: srcFolder + '/**/*.html',
    css: srcFolder + '/scss/**/*.scss',
    js: srcFolder + '/js/**/*.js',
    img: srcFolder + '/img/**/*.{jpg, png, svg, ico, gif, webp}',
  },
  clean: './' + projectFolder + '/',
}

let { src, dest } = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  fileinclude = require('gulp-file-include'),
  del = require('del'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  groupMedia = require('gulp-group-css-media-queries'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  uglifyJs = require('gulp-uglify-es').default,
  imagemin = require('gulp-imagemin'),
  webp = require('gulp-webp'),
  webphtml = require('gulp-webp-html')
// webpcss = require('gulp-webp-css'),
// ttf2woff2 = require('gulp-ttf2woff2'),
// ttf2woff = require('gulp-ttf2woff2'),
// svgSprite = require()

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: './' + projectFolder + '/',
    },
    port: 3000,
    notify: false,
  })
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(webphtml())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css() {
  return (
    src(path.src.css)
      .pipe(
        scss({
          outputStyle: 'expanded',
        })
      )
      .pipe(groupMedia())
      .pipe(
        autoprefixer({
          overrideBrowserslist: ['last 5 versions'],
          cascade: true,
        })
      )
      // .pipe(webpcss())
      .pipe(dest(path.build.css))
      .pipe(cleanCss())
      .pipe(
        rename({
          extname: '.min.css',
        })
      )
      .pipe(dest(path.build.css))
      .pipe(browsersync.stream())
  )
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(uglifyJs())
    .pipe(
      rename({
        extname: '.min.js',
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images() {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 70,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewbox: false }],
        interlaced: true,
        optimizationLevel: 3,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

// function fonts() {
//   src(path.src.fonts).pipe(ttf2woff()).pipe(dest.build.fonts)
//   return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest.build.fonts)
// }

// gulp.task('svgSprite', () => {
//   return gulp.src([srcFolder + '/iconsprite/*.svg'])
//   .pipe(svgSprite({
//     mode: {
//       stack: {
//         sprite: '../icons/iocns.svg'
//       }
//     },
//   }))
//   .pipe(dest(path.build.img))
// })

function watchFiles(params) {
  gulp.watch([path.watch.html], html)
  gulp.watch([path.watch.css], css)
  gulp.watch([path.watch.js], js)
  gulp.watch([path.watch.img], images)
}

function clean(params) {
  return del(path.clean)
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images))
let watch = gulp.parallel(build, watchFiles, browserSync)

// exports.fonts = fonts
exports.images = images
exports.js = js
exports.css = css
exports.html = html
exports.build = build
exports.watch = watch
exports.default = watch
