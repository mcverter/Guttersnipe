  'use strict';

  angular.module('things')
      .directive('foodDetailsConfirmed', ['templates', function(templates) {
      var templateUrl = 'modules/things/taxonomy/food/templates/rsc_FoodDetailsConfirmedTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


