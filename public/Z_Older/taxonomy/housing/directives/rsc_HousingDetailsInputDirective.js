(function (angular, _) {
  'use strict';

  angular.module('things').directive('housingDetailsInput', ['things_templates', function(templates) {
      var templateUrl = templates.housing + 'rsc_HousingDetailsInputTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular,  window._);



