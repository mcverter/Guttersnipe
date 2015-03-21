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
                'public/lib/bootstrap/dist/css/bootstrap.css',
                'public/lib/bootstrap/dist/css/bootstrap-theme.css',
            ],
            js: [
              'foo.js',
              'public/lib/jquery/dist/jquery.js',
              'public/lib/angular/angular.js',
              'public/lib/angular-resource/angular-resource.js',
              'public/lib/angular-cookies/angular-cookies.js',
              'public/lib/angular-animate/angular-animate.js',
              'public/lib/angular-touch/angular-touch.js',
              'public/lib/angular-sanitize/angular-sanitize.js',
              'public/lib/angular-ui-router/release/angular-ui-router.js',
              'public/lib/angular-ui-utils/ui-utils.js',
                           'public/lib/angular-bootstrap/ui-bootstrap.js',
              'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
              'public/lib/lodash/dist/lodash.js',
              'public/lib/angular-google-maps/dist/angular-google-maps.js',
              'public/lib/smartmenus/dist/jquery.smartmenus.js',
             '//maps.googleapis.com/maps/api/js?sensor=false',
              'public/lib/moment/moment.js',
              'public/lib/fullcalendar/fullcalendar.js',
              'public/lib/angular-ui-calendar/src/calendar.js',
              'public/lib/angular-wizard/dist/angular-wizard.js'
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
