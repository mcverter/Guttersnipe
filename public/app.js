(function (angular, app) {
  'use strict';

  var
    DOC_DIR =  'docs/',
    PRESENTATION_DIR = DOC_DIR + 'CCNYProposal/presentation/',

    MODULES_SUBDIR = 'modules/',

    KROPOTKIN_SUBDIR = 'kropotkin/',
    RESOURCES_SUBDIR = 'resources/',
    USERS_SUBDIR = 'users/',
    ADMIN_SUBDIR =  'admin/',
    RATINGS_SUBDIR = 'ratings/',
    COMMENTS_SUBDIR =  'comments/',

    VIEWS_SUBDIR =  'views/',

    CREATE_SUBDIR =  'create/', // POST
    READ_SUBDIR =  'read/',     // GET
    UPDATE_SUBDIR =  'update/', // PUT
    DELETE_SUBDIR =  'delete/', // DELETE

    WIZARD_SUBDIR =  'wizard/',

    KROPOTKIN_DIR = MODULES_SUBDIR + KROPOTKIN_SUBDIR,
    RESOURCES_DIR = MODULES_SUBDIR  + RESOURCES_SUBDIR,
  //  + VIEWS_SUBDIR,
  //   RESOURCE_CREATE_DIR = RESOURCES_DIR  + CREATE_SUBDIR  + WIZARD_SUBDIR,
    USERS_DIR = 'FOO',
    ADMIN_DIR = 'FOO',

    filePaths = {
       'resources_dir' : RESOURCES_DIR,
      'kropotkin' : KROPOTKIN_DIR
    };

  window.guttersnipe = app || angular.module('guttersnipe', [
    'ui.router',
    'leaflet-directive',
    'mgo-angular-wizard',
    'ui.calendar',
//        'ui.bootstrap',
    'debug',
    'bootstrap',
    'ngAnimate',

    //       ,'uiGmapgoogle-maps'
  ])

    .constant('filePaths', filePaths)
    .run(function($rootScope) {
//      debugStates($rootScope);
    })
    .config([ '$stateProvider', '$urlRouterProvider', '$httpProvider',
      function config(  $stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers
          .common['X-Requested-With'];



//        $urlRouterProvider.otherwise("/index");



        /*********
         * State Map
         *
         * @param $stateProvider
         */
        (function stateMap($stateProvider){
          $stateProvider
          /*************
           * index
           ************/
            .state('home', {
              url: '/',
              templateUrl: 'home.html',
              controller: 'HomeController'
            })


          /********************
           * RESOURCES: CREATE
           *******************/

            // route to show our basic form (/form)
            .state('resources_wizard', {
              url: '/resources/wizard',
              templateUrl: RESOURCES_DIR + 'main/rsc_wizardPage.html',
              controller: 'ResourceController'
            })
            .state('resources_wizard.start', {
              url: '/start',
              templateUrl: RESOURCES_DIR + 'main/rsc_StartPage.html'
            })
            .state('resources_wizard.summary', {
              url: '/summary',
              templateUrl: RESOURCES_DIR + 'thing/summary/rsc_SummaryPage.html'
            })
            .state('resources_wizard.agreement', {
              url: '/agreement',
              templateUrl: RESOURCES_DIR + 'agreement/rsc_AgreementPage.html'
            })
            .state('resources_wizard.instructions', {
              url: '/instructions',
              templateUrl: RESOURCES_DIR + 'instructions/rsc_InstructionsPage.html'
            })
            .state('resources_wizard.location', {
              url: '/location',
              templateUrl: RESOURCES_DIR + 'place/rsc_LocationSearchPage.html',
              controller: 'LocationController'
            })
            .state('resources_wizard.map', {
              url: '/map',
              templateUrl: RESOURCES_DIR + 'place/rsc_MapPage.html',
            })
            .state('resources_wizard.type', {
              url: '/type',
              templateUrl: RESOURCES_DIR + 'thing/taxonomy/common/rsc_TypePage.html',
              controller: 'ResourceController'
            })
            .state('resources_wizard.food_details', {
              url: '/food_details',
              templateUrl: RESOURCES_DIR + 'thing/taxonomy/food/rsc_FoodDetailsPage.html',
              controller: 'ResourceController'
            })
            .state('resources_wizard.housing_details', {
              url: '/housing_details',
              templateUrl: RESOURCES_DIR + 'thing/taxonomy/housing/rsc_HousingDetailsPage.html',
              controller: 'ResourceController'
            })
            .state('resources_wizard.medical_details', {
              url: '/medical_details',
              templateUrl: RESOURCES_DIR + 'thing/taxonomy/medical/rsc_MedicalDetailsPage.html',
              controller: 'ResourceController'
            })
            .state('resources_wizard.time', {
              url: '/time',
              templateUrl: RESOURCES_DIR + 'time/common/rsc_SchedulePage.html',
              controller: 'ScheduleController'
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
              //controller: 'SearchController'
            })
            /*
             .state('site{id}', {
             url: '/site{id}t',
             templateUrl: TEMPLATE_DIR + 'site.html',
             //controller: 'SiteController'
             })
             */
          /*************
           * USERS
           ************/
            .state('register', {
              url: '/register',
              templateUrl: USERS_DIR + 'register.html',
              //controller: 'RegistrationController'
            })
            .state('edit_profile', {
              url: '/edit_profile',
              templateUrl: USERS_DIR + 'edit_profile.html',
              //controller: 'EditProfileController'
            })
            .state('login', {
              url: '/login',
              templateUrl: USERS_DIR + 'login.html',
              //controller: 'LoginController'
            })
            .state('logout', {
              url: '/logout',
              templateUrl: USERS_DIR + 'logout.html',
              //controller: 'LogoutController'
            })

          /*********************
           * ADMIN: RESOURCES
           **
           * angular.module('upTimeApp', []).run(function($rootScope) {
$rootScope.appStarted = new Date();
});******************/

            .state('manage_data', {
              url: '/admin/manage_data',
              templateUrl: ADMIN_DIR + 'admin/manage_data.html',
              controller: 'ManageDataController'
            })
          /*********************
           * ADMIN: USERS
           ********************/
            .state('manage_users', {
              url: '/admin/manage_users',
              templateUrl: ADMIN_DIR + 'admin/manage_users.html',
              controller: 'ManageUsersController'
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
              url: '/kropotkin',
              templateUrl: KROPOTKIN_DIR + 'kropotkinPage.html',
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




function debugStates ($rootScope){
  console.log("Root Scope", $rootScope);
  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
    var toStateTo = toState.to;
    if (toStateTo === undefined) {
      console.log("ToState" , toState, "ToParams", toParams)
    }
    console.log('$stateChangeStart to '+toStateTo+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
  });
  $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
    console.log('$stateChangeError - fired when an error occurs during transition.');
    console.log(arguments);
  });
  $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
    console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
  });
  // $rootScope.$on('$viewContentLoading',function(event, viewConfig){
  //   // runs on individual scopes, so putting it in "run" doesn't work.
  //   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
  // });
  $rootScope.$on('$viewContentLoaded',function(event){
    console.log('$viewContentLoaded - fired after dom rendered',event);
  });
  $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
    console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
    console.log(unfoundState, fromState, fromParams);
  });
}



/*
 .state('create_report',{
 url: '/create_report',
 templateUrl: RESOURCE_CREATE_DIR + 'rsc_DetailsPage.html',
 controller: 'CreateReportController'
 })

 .state('resource_type',{
 url: '/resource_type',
 templateUrl: RESOURCE_CREATE_DIR + 'rsc_resource_typePage.html',
 controller: 'ResourceController'
 })
 .state('resource_details',{
 url: '/resource_details',
 templateUrl: RESOURCE_CREATE_DIR + 'rsc_resource_detailsPage.html',
 controller: 'ResourceController'
 })

 */
