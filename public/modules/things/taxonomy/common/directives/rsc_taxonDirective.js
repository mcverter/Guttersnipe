(function (angular, _) {
  'use strict';

  angular.module('things')
    .directive('resourceTaxon', ['things_templates', function(templates) {
      var templateUrl = templates.common + 'rsc_TaxonTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,

        link: function (scope, element, attrs) {
          scope.name = attrs.name;
        }
      }
    }]
  );
})(window.angular, window._);

