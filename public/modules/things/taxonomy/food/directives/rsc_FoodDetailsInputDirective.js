  'use strict';

  angular.module('things').directive('foodDetailsInput', ['things_templates', function(templates) {
      var templateUrl = templates.food + 'templates/rsc_FoodDetailsInputTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


