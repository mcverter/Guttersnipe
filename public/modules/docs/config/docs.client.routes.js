(function (angular, _) {
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
        /*            .state('CCNY', {
         url: '/docs/presentation2013',
         templateUrl: PRESENTATION_DIR + 'presentation.html'
         })            */
        .state('CCNY_front', {
          url: '/docs/presentation2013/front',
          templateUrl: PRESENTATION_DIR + 'front.html'
        })
        .state('CCNY_objective', {
          url: '/docs/presentation2013/objective',
          templateUrl: PRESENTATION_DIR + 'objective.html'
        })

        .state('CCNY_audience', {
          url: '/docs/presentation2013/audience',
          templateUrl: PRESENTATION_DIR + 'audience.html'
        })

        .state('CCNY_consultations', {
          url: '/docs/presentation2013/consultations',
          templateUrl: PRESENTATION_DIR + 'consultations.html'
        })

        .state('CCNY_otherSites', {
          url: '/docs/presentation2013/otherSites',
          templateUrl: PRESENTATION_DIR + 'otherSites.html'
        })

        .state('CCNY_questionOfMethod', {
          url: '/docs/presentation2013/questionOfMethod',
          templateUrl: PRESENTATION_DIR + 'questionOfMethod.html'
        })

        .state('CCNY_answerOfMethod', {
          url: '/docs/presentation2013/answerOfMethod',
          templateUrl: PRESENTATION_DIR + 'answerOfMethod.html'
        })
        .state('CCNY_example', {
          url: '/docs/presentation2013/example',
          templateUrl: PRESENTATION_DIR + 'example.html'
        })
        .state('CCNY_report', {
          url: '/docs/presentation2013/report',
          templateUrl: PRESENTATION_DIR + 'report.html'
        })
        .state('CCNY_result', {
          url: '/docs/presentation2013/result',
          templateUrl: PRESENTATION_DIR + 'result.html'
        })
        .state('CCNY_research', {
          url: '/docs/presentation2013/research',
          templateUrl: PRESENTATION_DIR + 'research.html'
        })
        .state('CCNY_fin', {
          url: '/docs/presentation2013/fin',
          templateUrl: PRESENTATION_DIR + 'fin.html'
        });
    }
  ]);
})(window.angular, window._);