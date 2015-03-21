/**
 * Create Classification Directive
 *
 * SCOPE
 *
 * Attributes:
 *
 * * thing (Object):  resource.thing
 * * taxonomy (Object): TaxonomyService
 * * type (String): resource.thing.type
 *
 * Methods:
 * * setType(type)
 * * addSubtype(subtype)
 * * removeSubtype(subtype)
 *
 */
(function (angular, _) {
  'use strict';

  angular.module('things')
    .directive('createDescription', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'gut.thing.create-description.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          thing: '='
        },
        controller: function ($scope) {
          var isDescriptionSet = false;
          Object.defineProperties($scope, {
            isDescriptionSet : {
              enumerable:true,
              set: function(val) {
                 isDescriptionSet = val;
              },
              get: function() {
                return isDescriptionSet;
              }
            }
          });
        }
      };
    }]
  );
})(window.angular,  window._);



