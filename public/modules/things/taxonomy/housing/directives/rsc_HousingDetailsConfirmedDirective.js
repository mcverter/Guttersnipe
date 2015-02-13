  'use strict';

  angular.module('things').directive('housingDetailsConfirmed', ['things_templates', function(templates) {
      var templateUrl = templates.housing + 'rsc_HousingDetailsConfirmedTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


