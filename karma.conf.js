module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    //list of files to load in browser, pay attn to order
    files: [
      //source files
      './client/lib/angular/angular.min.js',
      './client/lib/angular-animate/angular-animate.min.js'
      './client/lib/angular-bootstrap/ui-bootstrap.min.js'
      './client/lib/angular-route/angular-route.min.js',
      './client/lib/angular-ui-router/release/angular-ui-router.min.js',
      './client/lib/bootstrap/dist/js/bootstrap.min.js',
      './client/lib/jquery/dist/jquery.min.js',

      //app code
      './client/app/**/*.js',

      //spec files
      './spec/*.js'
    ],

    exclude: [
      './karma.conf.js'
    ],

    plugins: [
          'nyan',
          'unicorn'
    ],
    // preprocessors: {

    // },

    reporters: ['nyan','unicorn'],

    port: 3000,

    colors: true,

    logLevel: config.LOG_INFO,

    browsers: ['Chrome'],

    singleRun: true
  })
}
