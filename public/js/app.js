(function (angular, app) {
  'use strict';

//REST  post put get delete
// CRUD create read update delete
  var
    DOC_DIR =  'docs/',
    PRESENTATION_DIR = DOC_DIR + 'CCNYProposal/presentation/',

    TEMPLATE_SUBDIRDIR = 'templates/',
    PAGES_SUBDIR = 'pages/',
    WIDGETS_SUBDIR = 'widgets/',

    CREATE_SUBDIR =  'create/',
    READ_SUBDIR =  'read/',
    UPDATE_SUBDIR =  'update/',
    DELETE_SUBDIR =  'delete/',
    WIZARD_SUBDIR =  'wizard/',

    RESOURCES_SUBDIR = 'resources/',
    USERS_SUBDIR = 'users/',
    ADMIN_SUBDIR =  'admin/',

    filePaths = {
      'templates' : TEMPLATE_SUBDIRDIR ,
      'pages' : PAGES_SUBDIR,
      'widgets' : WIDGETS_SUBDIR,
      'create' : CREATE_SUBDIR,
      'read' : READ_SUBDIR,
      'update' : UPDATE_SUBDIR,
      'delete' : DELETE_SUBDIR,
      'wizard' : WIZARD_SUBDIR,
      'resources' : RESOURCES_SUBDIR,
      'users' : USERS_SUBDIR,
      'admin' : ADMIN_SUBDIR,
    };

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

    .constant('filePaths', filePaths)
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
      function config($stateProvider, $urlRouterProvider, $httpProvider) {
        //   $urlRouterProvider.otherwise("/home");

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers
          .common['X-Requested-With'];
        /*********
         * State Map
         *
         * @param $stateProvider
         */
        (function stateMap($stateProvider){
          $stateProvider
          /*************
           * HOME
           ************/
            .state('home', {
              url: '/',
              templateUrl: TEMPLATE_DIR + 'home.html',
              controller: 'HomeCtrl'
            })


          /********************
           * RESOURCES: CREATE
           *******************/

            /*
             .state('create_report',{
             url: '/create_report',
             templateUrl: RESOURCE_CREATE_DIR + 'rsc_DetailsPage.html',
             controller: 'CreateReportCtrl'
             })

             .state('resource_type',{
             url: '/resource_type',
             templateUrl: RESOURCE_CREATE_DIR + 'rsc_resource_typePage.html',
             controller: 'ResourceCtrl'
             })
             .state('resource_details',{
             url: '/resource_details',
             templateUrl: RESOURCE_CREATE_DIR + 'rsc_resource_detailsPage.html',
             controller: 'ResourceCtrl'
             })

             */
            // route to show our basic form (/form)
            .state('resources_wizard', {
              url: '/resources/wizard',
              templateUrl: RESOURCES_DIR + 'rsc_wizardPage.html',
              controller: ''
            })
            .state('resources_wizard.start', {
              url: '/start',
              templateUrl: RESOURCE_CREATE_DIR + 'rsc_StartPage.html'
            })

            .state('resources_wizard.agreement', {
              url: '/agreement',
              templateUrl: RESOURCE_CREATE_DIR + 'rsc_AgreementPage.html'
            })


            .state('resources_wizard.instructions', {
              url: '/instructions',
              templateUrl: RESOURCE_CREATE_DIR + 'rsc_InstructionsPage.html'
            })
            .state('resources_wizard.location', {
              url: '/location',
              templateUrl: RESOURCE_CREATE_DIR + 'rsc_LocationSearchPage.html',
              controller: 'LocationCtrl'
            })
            .state('resources_wizard.map', {
              url: '/map',
              templateUrl: RESOURCE_CREATE_DIR + 'rsc_MapPage.html',
              controller: 'MapCtrl'
            })
            .state('resources_wizard.type', {
              url: '/type',
              templateUrl: RESOURCE_CREATE_DIR + 'rsc_TypePage.html',
              controller: 'ResourceCtrl'
            })
            .state('resources_wizard.details', {
              url: '/details',
              templateUrl: RESOURCE_CREATE_DIR + 'rsc_DetailsPage.html',
              controller: 'ResourceCtrl'
            })
            .state('resources_wizard.time', {
              url: '/time',
              templateUrl: RESOURCE_CREATE_DIR + 'rsc_SchedulePage.html',
              controller: 'ScheduleCtrl'
            })
            .state('resources_wizard.confirmation', {
              url: '/confirmation',
              templateUrl: RESOURCES_DIR + 'CreationPage.html'
            })


          /*********************
           * RESOURCES: SEARCH
           ********************/

            .state('search', {
              url: '/search',
              templateUrl: RESOURCES_DIR + 'search.html'
              //controller: 'SearchCtrl'
            })
            /*
             .state('site{id}', {
             url: '/site{id}t',
             templateUrl: TEMPLATE_DIR + 'site.html',
             //controller: 'SiteCtrl'
             })
             */
          /*************
           * USERS
           ************/
            .state('register', {
              url: '/register',
              templateUrl: USERS_DIR + 'register.html',
              //controller: 'RegistrationCtrl'
            })
            .state('edit_profile', {
              url: '/edit_profile',
              templateUrl: USERS_DIR + 'edit_profile.html',
              //controller: 'EditProfileCtrl'
            })
            .state('login', {
              url: '/login',
              templateUrl: USERS_DIR + 'login.html',
              //controller: 'LoginCtrl'
            })
            .state('logout', {
              url: '/logout',
              templateUrl: USERS_DIR + 'logout.html',
              //controller: 'LogoutCtrl'
            })

          /*********************
           * ADMIN: RESOURCES
           ********************/

            .state('manage_data', {
              url: '/admin/manage_data',
              templateUrl: ADMIN_DIR + 'admin/manage_data.html',
              controller: 'ManageDataCtrl'
            })
          /*********************
           * ADMIN: USERS
           ********************/
            .state('manage_users', {
              url: '/admin/manage_users',
              templateUrl: ADMIN_DIR + 'admin/manage_users.html',
              controller: 'ManageUsersCtrl'
            })
          /*********************
           * ADMIN: COMMENTS
           ********************/

          /*************
           * DOCS
           ************/
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
            });
        })($stateProvider);
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