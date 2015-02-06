'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
  function($locationProvider) {
   // $locationProvider.html5Mode(true);
  }
]);

/*********
 * State Map
 *
 * @param $stateProvider
 */
function stateMap($stateProvider) {
  /*************
   * index
   ***********
    .state('home', {
      url: '/',
      templateUrl: 'home.html',
      controller: 'HomeController'
    })


   filePaths = {
      'resources_dir' : RESOURCES_DIR,
      'kropotkin' : KROPOTKIN_DIR,
      'templates_subdir' : TEMPLATES_SUBDIR
    };

   window.guttersnipe = app || angular.module('guttersnipe', [
   'ui.router',
   'leaflet-directive',
   'mgo-angular-wizard',
   'ui.calendar',
   'ui.bootstrap',
   'debug',
   'ngAnimate',
   ])
   .constant('filePaths', filePaths)


   */
  var
    DEBUG = false,
    DOC_DIR =  '/modules/doc/views/',
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
    TEMPLATES_SUBDIR = 'templates/',

    KROPOTKIN_DIR = MODULES_SUBDIR + KROPOTKIN_SUBDIR,
    RESOURCES_DIR = MODULES_SUBDIR  + RESOURCES_SUBDIR,
  //  + VIEWS_SUBDIR,
  //   RESOURCE_CREATE_DIR = RESOURCES_DIR  + CREATE_SUBDIR  + WIZARD_SUBDIR,
    USERS_DIR = 'FOO',
    ADMIN_DIR = 'FOO';

  $stateProvider

  /********************
   * RESOURCES: CREATE
   * *******************/
/*
    // route to show our basic form (/form)
    .state('resources_wizard', {
      url: '/resources/wizard',
      templateUrl: RESOURCES_DIR + 'main/rsc_wizardPage.html',
      controller: 'CreateResourceController'
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
    .state('resources_wizard.map', {
      url: '/map',
      templateUrl: RESOURCES_DIR + 'place/rsc_MapPage.html'
    })
    .state('resources_wizard.type', {
      url: '/type',
      templateUrl: RESOURCES_DIR + 'thing/taxonomy/type/rsc_TypePage.html',
    })
    .state('resources_wizard.time', {
      url: '/time',
      templateUrl: RESOURCES_DIR + 'time/rsc_SchedulePage.html'
      // ,controller: 'ScheduleController'
    })
    .state('resources_wizard.punctual', {
      url: '/time/punctual',
      templateUrl: RESOURCES_DIR + 'time/punctual/rsc_PunctualPage.html',
    })
    .state('resources_wizard.recurring', {
      url: '/time/recurring',
      templateUrl: RESOURCES_DIR + 'time/recurring/rsc_WeeklyRecurringPage.html',
    })
    .state('resources_wizard.seasonal', {
      url: '/time/seasonal',
      templateUrl: RESOURCES_DIR + 'time/seasonal/rsc_SeasonalPage.html',
    })
    .state('resources_wizard.confirmation', {
      url: '/confirmation',
      templateUrl: RESOURCES_DIR + 'confirm/rsc_createPage.html'
    })
*/

  /*********************
   * RESOURCES: SEARCH
   ********************/
/*
    .state('search', {
      url: '/search',
      templateUrl: RESOURCES_DIR + 'search.html'
      //controller: 'SearchController'
    })

     .state('site{id}', {
     url: '/site{id}t',
     templateUrl: TEMPLATE_DIR + 'site.html',
     //controller: 'SiteController'
     })
     */
  /*************
   * USERS
   ************/
    /*
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
     */

  /*********************
   * ADMIN: RESOURCES
   **
   * angular.module('upTimeApp', []).run(function($rootScope) {
$rootScope.appStarted = new Date();
});******************/
/*
    .state('manage_data', {
      url: '/admin/manage_data',
      templateUrl: ADMIN_DIR + 'admin/manage_data.html',
      controller: 'ManageDataController'
    })

  */

  /*********************
   * ADMIN: USERS
   ********************/
    /*
    .state('manage_users', {
      url: '/admin/manage_users',
      templateUrl: ADMIN_DIR + 'admin/manage_users.html',
      controller: 'ManageUsersController'
    })
  */
  /*********************
   * ADMIN: COMMENTS
   ********************/

  /*************
   * DOCS
   *         /faq.client.view.html' class='navbar-brand'>FAQ</a>

   ************/
    .state('illlegal', {
      url: '/docs/illlegal',
      templateUrl: DOC_DIR + 'illlegal.client.view.html'
    })

    .state('documentation', {
      url: '/docs/documentation',
      templateUrl: DOC_DIR + 'documentation.client.view.html'
    })

    .state('faq', {
      url: '/docs/faq',
      templateUrl: DOC_DIR + 'faq.client.view.html'
    })

    .state('mission', {
      url: '/docs/mission',
      templateUrl: DOC_DIR + 'mission.client.view.html'
    })

    .state('about', {
      url: '/docs/about',
      templateUrl: DOC_DIR + 'about.client.view.html'
    })

    .state('contact', {
      url: '/docs/contact',
      templateUrl: DOC_DIR + 'contact.client.view.html'
    })
/*
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
      templateUrl: KROPOTKIN_DIR + 'kro_KropotkinPg.html',
      controller: ''
    });
    */
};

angular.module(ApplicationConfiguration.applicationModuleName).config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
  function config($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers
      .common['X-Requested-With'];
    stateMap($stateProvider);
  }]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_') window.location.hash = '#!';

  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});