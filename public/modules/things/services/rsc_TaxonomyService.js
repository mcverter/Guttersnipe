(function (angular, _) {
  'use strict';
  angular.module('resources')
    .factory('ResourceTaxonomyService', ['$log',
      function ($log) {

        var taxonomyFactory = [
          {
            type: 'food',
            subtypes:['Food Not Bombs', 'Free Communal Meal',
              'Food Donation', 'Dumpster']
          },
          {
            type: 'medical',
            subtypes: ['General Medicine (Western) ',
              'Emergency Medicine (Western) ',
              'Mental Health',
              'Holistic',
              'Herbal',
              'Non Western',
              'Health Clinic' ,
              'Drug Health / Abuse',
              'Sexual Health',
              'Sexual / Physical Abuse',
              'Trans*',
              'Women\'s'
            ]
          },
          {
            type: 'housing',
            subtypes: [
              'Existing Squat',
              'Start a Squat',
              'Free Communal House',
              'Shelter',
              'Other Housing'
            ]
          }
        ];

        return taxonomyFactory;
      }
    ]);
})(window.angular, window._);