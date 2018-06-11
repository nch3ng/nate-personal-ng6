import * as gulp from 'gulp';
import * as del from 'del';
import * as ts from 'gulp-typescript';

const tsProject = ts.createProject('./src/server/tsconfig.json');
// const config = require('./build/config.json');

gulp.task('clean', () => {
    return del('dist/**', {force: true});
});

gulp.task('compile-ts', () => {

    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
});


// gulp.task('scripts', () => {
//     return gulp.src('src/assets/js/main.ts')
//     .pipe(ts.createProject({
//         declaration: true
//     })())
//     .pipe(gulp.dest(config.build_dir + '/' + config.main.build_dir + '/' + config.main.js.build_dir));
// });

// const sass_watcher = gulp.watch('src/assets/**/*.scss', gulp.parallel('styles'));
// sass_watcher.on('change', (path, stats) => {
//     console.log('File ' + path + ' was changed');
// });

// const html_watcher = gulp.watch('src/main/**/*.html', gulp.parallel('copy-html'));
// html_watcher.on('change', (path, stats) => {
//     console.log('File ' + path + ' was changed');
// });

// const js_watcher = gulp.watch('src/main/**/*.js', gulp.parallel('scripts'));
// js_watcher.on('change', (path, stats) => {
//     console.log('File ' + path + ' was changed');
// });

gulp.task('default', gulp.series('clean', gulp.parallel('compile-ts')));
