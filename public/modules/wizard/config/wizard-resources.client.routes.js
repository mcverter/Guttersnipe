(function () {
  'use strict';

//Setting up route
  angular.module('docs').config(['$stateProvider', function($stateProvider) {
    var RESOURCES_DIR = '';

    // Resource Creation Form
    $stateProvider
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
        templateUrl: RESOURCES_DIR + 'thing/taxonomy/type/rsc_TypePage.html'
      })
      .state('resources_wizard.time', {
        url: '/time',
        templateUrl: RESOURCES_DIR + 'time/rsc_SchedulePage.html'
        // ,controller: 'ScheduleController'
      })
      .state('resources_wizard.punctual', {
        url: '/time/punctual',
        templateUrl: RESOURCES_DIR + 'time/punctual/rsc_PunctualPage.html'
      })
      .state('resources_wizard.recurring', {
        url: '/time/recurring',
        templateUrl: RESOURCES_DIR + 'time/recurring/rsc_WeeklyRecurringPage.html'
      })
      .state('resources_wizard.seasonal', {
        url: '/time/seasonal',
        templateUrl: RESOURCES_DIR + 'time/seasonal/rsc_SeasonalPage.html'
      })
      .state('resources_wizard.confirmation', {
        url: '/confirmation',
        templateUrl: RESOURCES_DIR + 'confirm/rsc_createPage.html'
      });

  }
  ]);
})();

