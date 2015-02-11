  'use strict';

  angular.module('things').directive('housingDetailsConfirmed', ['templates', function(templates) {
      var templateUrl = 'modules/things/taxonomy/housing/templates/rsc_HousingDetailsConfirmedTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


