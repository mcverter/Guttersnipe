  'use strict';

  angular.module('things')
      .directive('resourceTaxon', ['templates', function(templates) {
      var templateUrl = 'modules/things/taxonomy/common/templates/rsc_TaxonTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,

        link: function (scope, element, attrs) {
          scope.name = attrs.name;
        }
      }
    }]
  );


