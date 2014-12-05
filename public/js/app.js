(function (angular, app) {
    'use strict';

    var BASE_DIR = 'js/templates/';

    var RESOURCE_WIZARD_DIR = BASE_DIR + 'resources/wizard/';
    var DOC_DIR = BASE_DIR + 'docs/';
    var PRESENTATION_DIR = DOC_DIR + 'CCNYProposal/presentation/';

    window.guttersnipe = app || angular.module('guttersnipe', [
        'ui.router',
       'leaflet-directive',
        'mgo-angular-wizard',
        'ui.calendar',
//        'ui.bootstrap',
        'debug',
        'bootstrap',
        'ngAnimate'
 //       ,'uiGmapgoogle-maps'
    ])

        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
            function config($stateProvider, $urlRouterProvider, $httpProvider) {
                //   $urlRouterProvider.otherwise("/home");

                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers
                    .common['X-Requested-With'];

                $stateProvider
                    .state('CCNY', {
                        url: '/docs/presentation2013',
                        templateUrl: DOC_DIR + 'CCNYProposal/presentation.html',
                    })

                    .state('CCNY.front', {
                        url: '/front',
                        templateUrl: PRESENTATION_DIR + 'front.html'
                    })

                    .state('CCNY.objective', {
                        url: '/objective',
                        templateUrl: PRESENTATION_DIR + 'objective.html'
                    })

                    .state('CCNY.audience', {
                        url: '/audience',
                        templateUrl: PRESENTATION_DIR + 'audience.html'
                    })

                    .state('CCNY.consultations', {
                        url: '/consultations',
                        templateUrl: PRESENTATION_DIR + 'consultations.html'
                    })

                    .state('CCNY.otherSites', {
                        url: '/otherSites',
                        templateUrl: PRESENTATION_DIR + 'otherSites.html'
                    })

                    .state('CCNY.questionOfMethod', {
                        url: '/questionOfMethod',
                        templateUrl: PRESENTATION_DIR + 'questionOfMethod.html'
                    })

                    .state('CCNY.answerOfMethod', {
                        url: '/answerOfMethod',
                        templateUrl: PRESENTATION_DIR + 'answerOfMethod.html'
                    })
                    .state('CCNY.example', {
                        url: '/example',
                        templateUrl: PRESENTATION_DIR + 'example.html'
                    })
                    .state('CCNY.report', {
                        url: '/report',
                        templateUrl: PRESENTATION_DIR + 'report.html'
                    })
                    .state('CCNY.result', {
                        url: '/result',
                        templateUrl: PRESENTATION_DIR + 'result.html'
                    })
                    .state('CCNY.research', {
                        url: '/research',
                        templateUrl: PRESENTATION_DIR + 'research.html'
                    })
                    .state('CCNY.fin', {
                        url: '/fin',
                        templateUrl: PRESENTATION_DIR + 'fin.html'
                    })

                    .state('kropotkin', {
                        url: '/docs/kropotkin',
                        templateUrl: DOC_DIR + 'KropotkinQuote.html',
                        controller: ''
                    })
                    // route to show our basic form (/form)
                    .state('resources_wizard', {
                        url: '/resources/wizard',
                        templateUrl: BASE_DIR + 'resources/wizard.html',
                        controller: ''
                    })
                    .state('resources_wizard.start', {
                        url: '/start',
                        templateUrl: RESOURCE_WIZARD_DIR + 'ResourceCreateAgreement.html'
                    })

                    .state('resources_wizard.agreement', {
                        url: '/agreement',
                        templateUrl: RESOURCE_WIZARD_DIR + 'ResourceCreateAgreement.html'
                    })


                    .state('resources_wizard.instructions', {
                        url: '/instructions',
                        templateUrl: RESOURCE_WIZARD_DIR + 'ResourceCreateInstructions.html'
                    })
                    .state('resources_wizard.location', {
                        url: '/location',
                        templateUrl: RESOURCE_WIZARD_DIR + 'LocationSearch.html',
                        controller: 'LocationCtrl'
                    })
                    .state('resources_wizard.map', {
                        url: '/map',
                        templateUrl: RESOURCE_WIZARD_DIR + 'MapConfirm.html',
                        controller: 'MapCtrl'
                    })
                    .state('resources_wizard.type', {
                        url: '/type',
                        templateUrl: RESOURCE_WIZARD_DIR + 'ResourceGeneral.html'
                    })
                    .state('resources_wizard.details', {
                        url: '/details',
                        templateUrl: RESOURCE_WIZARD_DIR + 'ResourceSpecific.html'
                    })
                    .state('resources_wizard.time', {
                        url: '/time',
                        templateUrl: RESOURCE_WIZARD_DIR + 'Schedule.html',
                        controller: 'ScheduleCtrl'
                    })
                    .state('resources_wizard.confirmation', {
                        url: '/confirmation',
                        templateUrl: RESOURCE_WIZARD_DIR + ''
                    })

                    .state('home', {
                        url: '/',
                        templateUrl: BASE_DIR + 'home.html',
                        controller: 'HomeCtrl'
                    })
                    .state( 'wizard', {
                        url:'/wizard',
                        templateUrl: BASE_DIR + 'wizard.html',
                        controller: 'WizardCtrl'
                    })
                    .state('wizard2', {
                        url: '/wizard2',
                        templateUrl: BASE_DIR + 'wizard2.html',
                        controller: 'Wizard2Ctrl'
                    })
                    .state('register',{
                        url: '/register',
                        templateUrl: BASE_DIR + 'register.html',
                        controller: 'RegistrationCtrl'
                    })
                    .state('edit_profile',{
                        url: '/edit_profile',
                        templateUrl: BASE_DIR + 'edit_profile.html',
                        controller: 'EditProfileCtrl'
                    })
                    .state('create_report',{
                        url: '/create_report',
                        templateUrl: BASE_DIR + 'create_report.html',
                        controller: 'CreateReportCtrl'
                    })

                    .state('resource_type',{
                        url: '/resource_type',
                        templateUrl: BASE_DIR + 'resource_type.html',
                        controller: 'ResourceCtrl'
                    })
                    .state('resource_details',{
                        url: '/resource_details',
                        templateUrl: BASE_DIR + 'resource_details.html',
                        controller: 'ResourceCtrl'
                    })

                    .state('login',{
                        url: '/login',
                        templateUrl: BASE_DIR + 'login.html',
                        controller: 'LoginCtrl'
                    })
                    .state('logout',{
                        url: '/logout',
                        templateUrl: BASE_DIR + 'logout.html',
                        controller: 'LogoutCtrl'
                    })
                    .state('search',{
                        url: '/search',
                        templateUrl: BASE_DIR + 'search.html',
                        controller: 'SearchCtrl'
                    })
                    .state('site{id}',{
                        url: '/site{id}t',
                        templateUrl: BASE_DIR + 'site.html',
                        controller: 'SiteCtrl'
                    })
                    .state('manage_data',{
                        url: '/admin/manage_data',
                        templateUrl: BASE_DIR + 'admin/manage_data.html',
                        controller: 'ManageDataCtrl'
                    })
                    .state('manage_users',{
                        url: '/admin/manage_users',
                        templateUrl: BASE_DIR + 'admin/manage_users.html',
                        controller: 'ManageUsersCtrl'
                    })

                ;
            }]);

    app = window.guttersnipe;


})(window.angular, window.guttersnipe);



/*
 var authRequiredFilter = ['$log', '$user',
 function checkAuth($log, $user) {
 $log.debug('Checking Authorization', $user.current);

 if (!$user.current) {
 return $user.$login();
 }
 }],
 secureRoute = function secureRoute(props) {
 var def = {
 resolve: { authFilter: authRequiredFilter },
 reloadOnSearch: false,
 secure: true
 };

 return _.extend(def, props);
 };
 */

/*
 .provider('authResponseInterceptor', function authResponseInterceptor() {
 var self = this;
 self.$get = ['$log', '$injector', '$location', '$q',
 function $get($log, $injector, $location, $q) {
 return {
 responseError: function responseError(rejection) {
 // using $injector to avoid circular dependency authResponseInterceptor > $http > $api > $http
 return $injector.invoke(['$api',
 function ($api) {
 if (rejection.status === 401 && $location.path() !== loginPath) {
 $log.warn('Not Authorized (HTTP 401), clearing session and returning to login page');
 $api.$logout().then(function redirectAfter401() {
 var returnTo = $location.search('returnTo', null).url();
 $location.search('returnTo', returnTo).path('/security/login');
 });
 }

 return $q.reject(rejection);
 }]);
 }
 };
 }];
 })*/