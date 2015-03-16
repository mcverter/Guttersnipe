(function (angular, _) {
  'use strict';

// Things controller
  angular.module('things').controller('ThingsController',
    ['$scope', 'Things', 'TaxonomyService',
      function($scope, Things, TaxonomyService) {
        Object.defineProperties($scope, {
          taxonomy: {
            enumerable: true,
            value: TaxonomyService
          },
          removeSubtype: {
            enumerable: true,
            value: function (subtype) {
              console.log('removing subtype', subtype);
              var subtypes = $scope.thing.taxonomy.subtypes;
              var idx = _.findIndex(subtypes, subtype);
              if (idx >= 0) {
                subtypes.splice(idx,1);
              }
            }
          }
        });
      }]);
})(window.angular, window._);