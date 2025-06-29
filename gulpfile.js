

// Gulp
import gulp from 'gulp'

const { src, dest, watch, series  } = gulp;

import sourmaps from "gulp-sourcemaps";
import cssnano from "cssnano";

// CSS y SASS
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

// Imagenes 
import imagemin from 'gulp-imagemin'
import webp from 'gulp-webp'
import avif from 'gulp-avif'


function css(done) {
    // compilar sass
    // 1.- identificar archivo
    // 2.- compilar el archivo
    // 3.- guardar el archivo generado

    // 1
    src('src/scss/app.scss')
        // 2
        .pipe(sourmaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourmaps.write('.'))
        // 3
        .pipe(dest('build/css'))


    done()
}

function imagenes(done) {
    src('src/img/**/*')
        // Aligerar imagenes
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'))
    done()
}

function versionWebp(done) {
    src('src/img/**/*.{png,jpg}')
        .pipe(avif())
        .pipe(dest('build/img'))
    done()
}

function versionAvif(done) {
    src('src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('build/img'))
    done()
}

function dev() {
    // watch('archivo pendiente a cambios, función que va a ejecutar)
    watch('src/scss/**/*.scss', css)
    watch('src/img/**/*', imagenes)
}

export {
    css,
    imagenes,
    versionWebp,
    versionAvif,
    dev
}
// series corre las tareas de una por usa hasta que termina cada tarea
// parallel corre multiples tareas al mismo tiempo
// export default para correr la tarea por defecto solo con el comando gulp 
export default series(imagenes, versionWebp, versionAvif, css, dev)