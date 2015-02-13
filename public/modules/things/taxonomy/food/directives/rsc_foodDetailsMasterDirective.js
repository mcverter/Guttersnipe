  'use strict';

  angular.module('things').directive('foodDetailsMaster', ['things_templates', function(templates) {
      var templateUrl = templates.food + 'rsc_FoodDetailsMasterTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


