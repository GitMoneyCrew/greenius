var gulp      = require('gulp'),
    nodemon   = require('gulp-nodemon'),
    jshint    = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    // bs        = require('browser-sync'),
    // reload    = bs.reload,
    when      = require('gulp-if'),
    shell     = require('gulp-shell'),
    gulpSqlite3 = require('gulp-sqlite3'),
    Server = require('karma').Server;


// the paths to our app files
var paths = {
  scripts: ['./client/lib/angular/angular.min.js',
      './client/lib/angular-animate/angular-animate.min.js',
      './client/lib/angular-bootstrap/ui-bootstrap.min.js',
      './client/lib/angular-route/angular-route.min.js',
      './client/lib/angular-ui-router/release/angular-ui-router.min.js',
      './client/lib/bootstrap/dist/js/bootstrap.min.js',
      './client/lib/jquery/dist/jquery.min.js', 
      './client/app/**/*.js'],
  html: ['./client/index.html', './client/app/*.html'],
  styles: ['./client/assets/style.css'],
  test: ['./specs/*.js']
};

gulp.task('jshint', function() {
  gulp.src(['./client/app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('start', ['serve'],function () {
  // bs({
  //   notify: true,
  //   // address for server,
  //   injectChanges: true,
  //   files: paths.scripts.concat(paths.html, paths.styles)
  //   // proxy: 'localhost:3000'
  // });
});

gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});


// Initialize DB // TODO: Implement database backup with gulp
// gulp.task('addSpeciesData', function() {
//   return gulp.src('./server/db/data.csv')
//     .pipe(gulpSqlite3('db.sqlite'));
// });

// start our node server using nodemon
gulp.task('serve', function() {
  nodemon({script: './server/server.js', ignore: 'node_modules/**/*.js'});
});

gulp.task('default', ['start']);
