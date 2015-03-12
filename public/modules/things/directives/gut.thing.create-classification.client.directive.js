(function (angular, _) {
  'use strict';

  angular.module('things').directive('thingCreateClassification',
    ['things_templates', 'TaxonomyService',
      function(templates, ResourceTaxonomy) {
      var templateUrl = templates.main + 'gut.thing.create-classification.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope: {
          thing: '='
        },
        controller: function ($scope) {
          $scope.masterTaxonomy = ResourceTaxonomy;
          var isClassificationSet = false,
            isTypeSet = false;
          
          Object.defineProperties($scope, {
            isTypeSet : {
              enumerable:true,
              set: function(val) {
                isTypeSet = val;
              },
              get: function() {
                return isTypeSet;
              }
            },
            isClassificationSet : {
              enumerable:true,
              set: function(val) {
                isClassificationSet = val;
              },
              get: function() {
                return isClassificationSet;
              }
            }
          })
        }
      };
    }]
  );
})(window.angular,  window._);


