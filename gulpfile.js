'use strict';
let {
    src,
    dest,
    parallel,
    watch
} = require('gulp');
let sass = require('gulp-sass')(require('sass'));
let del = require('del');
let gulpRename = require("gulp-rename");
let include = require('gulp-file-include');
let browserSync = require('browser-sync');
let uglifyUglify = require('gulp-uglify');
let minify = require('gulp-minify');
const imgmin = require('gulp-imagemin');
const webp = require('gulp-webp');



let project_folder = 'dist';
let source__folder = 'src';

let path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + "/img/",
        fonts: project_folder + '/fonts/'
    },
    src: {
        html: [source__folder + '/*.html', '!' + source__folder + '/_*.html'],
        scss: source__folder + "/scss/**/*.scss",
        js: source__folder + "/js/*.js",
        img: source__folder + "/img/**/*",
        fonts: source__folder + "/fonts/**/*"
    }
}

function liveServer() {
    browserSync.init({
        server: {
            baseDir: project_folder + '/'
        },
        notify: false,
        online: true,
        open: true,
        cors: true,
        ui: false
    });
}

function compileCss() {
    return src(path.src.scss)
        .pipe(sass({
            outputStyle: "compressed"
        }).on('error', sass.logError))
        .pipe(
            gulpRename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream());
}

function buildCss() {
    return src(path.src.scss)
        .pipe(sass({
            outputStyle: "compressed"
        }).on('error', sass.logError))
        .pipe(
            gulpRename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
}


function html() {
    return src(path.src.html)
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest(project_folder))
        .pipe(browserSync.reload({
            stream: true
        }));
}

function buildHtml() {
    return src(path.src.html)
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest(project_folder))
}

function img() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(
            imgmin({
                progressive: true,
                svgoPlugins: [{
                    removeViewBox: false
                }],
                interlaced: true,
                optimizationLevel: 3
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream())
}

function buildImg() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(
            imgmin({
                progressive: true,
                svgoPlugins: [{
                    removeViewBox: false
                }],
                interlaced: true,
                optimizationLevel: 3
            })
        )
        .pipe(dest(path.build.img))
}

function js() {
    return src(path.src.js)
    .pipe(minify())
    .pipe(dest(path.build.js))
        .pipe(browserSync.reload({
            stream: true
        }));

}

function buildJs() {
    return src(path.src.js)
    .pipe(minify())
    .pipe(dest(path.build.js))

}

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.reload({
            stream: true
        }));
}

function buildFonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
}

function cleanDir() {
    return del.sync(project_folder);
}

function watchFiles() {
    watch(path.src.scss, parallel(compileCss));
    watch(source__folder + '/**/*.html', parallel(html));
    watch(path.src.js, parallel(js));
    watch(path.src.img, parallel(img));
    watch(path.src.fonts, parallel(fonts));
}

exports.build = parallel(buildCss, buildHtml, buildJs, buildFonts, buildImg);

exports.clean = cleanDir;
exports.default = parallel(compileCss, watchFiles, liveServer, html, js, fonts, img);