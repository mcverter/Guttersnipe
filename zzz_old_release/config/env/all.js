'use strict';

module.exports = {
  app: {
    title: 'Guttersnipe: Anarchocommunist Resource Sharing',
    description: 'Anarchocommunist resource sharing',
    keywords: 'Kropotkin'
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'MEAN',
  sessionCollection: 'sessions',
  assets: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.min.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.min.css'
      ],
      js: [
        'public/lib/jquery/dist/jquery.min.js',
        'public/lib/angular/angular.js',
        'public/lib/angular-cookies/angular-cookies.min.js',
        'public/lib/angular-animate/angular-animate.min.js',
        'public/lib/angular-touch/angular-touch.min.js',
        'public/lib/angular-resource/angular-resource.min.js',
        'public/lib/angular-sanitize/angular-sanitize.min.js',
        'public/lib/angular-ui-router/release/angular-ui-router.min.js',
        'public/lib/angular-ui-utils/ui-utils.min.js',
        'public/lib/angular-bootstrap/ui-bootstrap.min.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'public/lib/lodash/dist/lodash.min.js',
        'public/lib/angular-google-maps/dist/angular-google-maps.min.js',
        'public/lib/smartmenus/dist/jquery.smartmenus.min.js',
        '//maps.googleapis.com/maps/api/js?sensor=false',
        'public/lib/moment/moment.min.js',
        'public/lib/fullcalendar/fullcalendar.min.js',
        'public/lib/angular-ui-calendar/src/calendar.js',
        'public/lib/angular-wizard/dist/angular-wizard.min.js',
        'public/lib/uri.js/src/URI.min.js'
      ]
    },
    css: [
      'public/modules/**/css/*.css'
    ],
    js: [
      'public/config.js',
      'public/application.js',
      'public/modules/*/*.js',
      'public/modules/*/*[!tests]*/*.js',
      'public/modules/*/*[!tests]*/*/*.js',
      'public/modules/*/*[!tests]*/*/*/*.js'

    ],
    tests: [
      'public/lib/angular-mocks/angular-mocks.js',
      'public/modules/*/tests/*.js'
    ]
  }
};
