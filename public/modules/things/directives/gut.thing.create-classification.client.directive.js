(function (angular, _) {
  'use strict';

  angular.module('things').directive('thingCreateClassification ',
    ['things_templates', 'ResourceTaxonomyService',
      function(templates, ResourceTaxonomy) {
      var templateUrl = templates.main + 'gut.thing.create-taxonomy.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope: {
          thing: '='
        },
        controller: function (scope) {
          scope.masterTaxonomy = ResourceTaxonomy;
        }
      };
    }]
  );
})(window.angular,  window._);


