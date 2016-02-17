// Karma configuration
// Generated on Tue Jan 26 2016 16:32:33 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        // angular source
        'client/lib/auth0.js/build/auth0.js',
        'client/lib/angular/angular.js',
        'client/lib/angular-mocks/angular-mocks.js',
        'client/lib/angular-route/angular-route.js',
        'client/lib/angular-ui-router/release/angular-ui-router.js',
        'client/lib/a0-angular-storage/dist/angular-storage.js',
        'client/lib/angular-animate/angular-animate.js',
        'client/lib/angular-bootstrap/ui-bootstrap.js',
        'client/lib/angular-cookies/angular-cookies.js',
        'client/lib/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js',
        'client/lib/angular-ui-calendar/src/calendar.js',
        'client/lib/angular-jwt/dist/angular-jwt.js',
        'client/lib/jquery/dist/jquery.js',
        'client/lib/auth0-angular/build/auth0-angular.js',
        'client/lib/auth0-lock/build/auth0-lock.js',

        // our app code
        'client/app/**/*.js',

        // our spec files
        'spec/client/**/*.js'
    ],
        
    // <script src='./lib/angular-animate/angular-animate.min.js'></script>

    // list of files to exclude
    exclude: [
        'karma.conf.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
