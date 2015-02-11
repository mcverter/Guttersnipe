  'use strict';

  angular.module('things').directive('foodDetailsInput', ['templates', function(templates) {
      var templateUrl = 'modules/things/taxonomy/food/templates/rsc_FoodDetailsInputTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


