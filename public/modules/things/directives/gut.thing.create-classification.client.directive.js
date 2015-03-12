(function (angular, _) {
  'use strict';

  angular.module('things').directive('createClassification',
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
              addDetail : {
                enumerable: true,
                value: function addDetail(detail) {
                  console.log("adding detail", detail);
                  console.log('thing', $scope.thing);
                  if (_.findIndex($scope.thing.details, detail < 0)) {
                    $scope.thing.details.push(detail);
                  }
                }
              },
              toggleSubtype : {
                enumerable: true,
                value: function(subtype) {

                  console.log("toggling subtype");
                  var idx = _.findIndex($scope.thing.taxonomy.subtypes, subtype);

                  console.log('found index', idx);
                  if (idx < 0) {
                    console.log('adding to subtypes ', subtype);
                    $scope.thing.taxonomy.subtypes.push(subtype);
                  } else {
                    console.log('removing from subtypes: ', subtype);
                    $scope.thing.taxonomy.subtypes.splice(idx, 1);
                  }
                }
              },
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


