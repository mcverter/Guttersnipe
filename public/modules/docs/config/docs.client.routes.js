'use strict';

// Setting up route
angular.module('docs').config(['$stateProvider',
    function($stateProvider) {
        var DOC_DIR = 'modules/docs/views/',
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
            });
    }
]);