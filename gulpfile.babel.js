import gulb from "gulp"
import shell from "gulp-shell"
import rimraf from "rimraf"
import run from "run-sequence"
import watch from "gulp-watch"
import server from "gulp-live-server"

const paths = {
  js: ['./src/**/*.js'],
  destination: './app'
}

gulp.task('default')
