  'use strict';

  angular.module('things').directive('housingDetailsInput', ['templates', function(templates) {
      var templateUrl = 'modules/things/taxonomy/housing/templates/rsc_HousingDetailsInputTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


