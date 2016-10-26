(function () {
  'use strict';

// Setting up route
  angular.module('docs').config(['$stateProvider',
    function($stateProvider) {
      var DOC_DIR = 'modules/docs/templates/',
        PRESENTATION_DIR = DOC_DIR + 'CCNYProposal/presentation/';


      // Articles state routing
      $stateProvider
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
    }
  ]);
})();
