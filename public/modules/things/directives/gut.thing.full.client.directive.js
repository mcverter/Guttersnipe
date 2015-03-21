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

  angular.module('resources').directive('gutThingFull', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing-full.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          thing: '='
        }
      };
    }]
  );
})(window.angular, window._);

