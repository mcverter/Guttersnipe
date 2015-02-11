  'use strict';

  angular.module('things').directive('foodDetailsMaster', ['templates', function(templates) {
      var templateUrl = 'modules/things/taxonomy/food/templates/rsc_FoodDetailsMasterTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


