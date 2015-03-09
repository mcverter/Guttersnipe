(function (angular, _) {
  'use strict';
/*
 GET http://localhost:3000/modules/docs/templates/CCNYProposal/presentation/CCNYProposal/presentation.html 404 (Not Found)
 GET http://localhost:3000/modules/docs/templates/CCNYProposal/presentation.html 404 (Not Found) */
// Setting up route
  angular.module('docs').config(['$stateProvider',
    function($stateProvider) {
      var PRESENTATION_DIR = 'modules/docs/templates/CCNYProposal/presentation/';


      // Articles state routing
      $stateProvider
        .state('CCNY', {
          url: '/docs/presentation2013',
          templateUrl: PRESENTATION_DIR + 'presentation.html'
        })
        .state('CCNY.front', {
          url: '/docs/presentation2013/front',
          templateUrl: PRESENTATION_DIR + 'front.html'
        })
        .state('CCNY.objective', {
          url: '/docs/presentation2013/objective',
          templateUrl: PRESENTATION_DIR + 'objective.html'
        })
        .state('CCNY.audience', {
          url: '/docs/presentation2013/audience',
          templateUrl: PRESENTATION_DIR + 'audience.html'
        })
        .state('CCNY.consultations', {
          url: '/docs/presentation2013/consultations',
          templateUrl: PRESENTATION_DIR + 'consultations.html'
        })
        .state('CCNY.otherSites', {
          url: '/docs/presentation2013/otherSites',
          templateUrl: PRESENTATION_DIR + 'otherSites.html'
        })
        .state('CCNY.questionOfMethod', {
          url: '/docs/presentation2013/questionOfMethod',
          templateUrl: PRESENTATION_DIR + 'questionOfMethod.html'
        })
        .state('CCNY.answerOfMethod', {
          url: '/docs/presentation2013/answerOfMethod',
          templateUrl: PRESENTATION_DIR + 'answerOfMethod.html'
        })
        .state('CCNY.example', {
          url: '/docs/presentation2013/example',
          templateUrl: PRESENTATION_DIR + 'example.html'
        })
        .state('CCNY.report', {
          url: '/docs/presentation2013/report',
          templateUrl: PRESENTATION_DIR + 'report.html'
        })
        .state('CCNY.result', {
          url: '/docs/presentation2013/result',
          templateUrl: PRESENTATION_DIR + 'result.html'
        })
        .state('CCNY.research', {
          url: '/docs/presentation2013/research',
          templateUrl: PRESENTATION_DIR + 'research.html'
        })
        .state('CCNY.fin', {
          url: '/docs/presentation2013/fin',
          templateUrl: PRESENTATION_DIR + 'fin.html'
        });
    }]);
})(window.angular, window._);

/**
             .state('CCNY', {
         url: '/docs/presentation2013',
         templateUrl: PRESENTATION_DIR + 'presentation.html'
         })
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
*/