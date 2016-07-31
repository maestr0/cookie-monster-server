import gulp from "gulp"
import shell from "gulp-shell"
import rimraf from "rimraf"
import run from "run-sequence"
import watch from "gulp-watch"
import server from "gulp-live-server"

const paths = {
  js: ['./src/**/*.js'],
  destination: './app'
};

gulp.task('default', cb => {
  run('server', 'build', 'watch', cb);
});

gulp.build('build', cb=> {
  run('clean', 'flow', 'babel', 'restart', cb);
});

gulp.build('clean', cb=> {
  rimraf(paths.destination, cb);
});

gulp.build('flow', shell.task(['flow']), {ignoreErrors: true});

gulp.build('babel', shell.task(['babel src --out-dir app']));


let express;

gulp.task('server', ()=> {
  express = server.new(paths.destination)
});

gulp.task('restart', ()=> {
  express.start.bind(express)();
});

gulp.task('watch', ()=> {
  return watch(paths.js, ()=> {
    gulp.start('build');
  });
});
