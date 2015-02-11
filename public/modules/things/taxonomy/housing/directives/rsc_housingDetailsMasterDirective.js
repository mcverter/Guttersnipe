  'use strict';

    angular.module('things').directive('housingDetailsMaster', ['templates', function(templates) {
      var templateUrl = 'modules/things/taxonomy/housing/templates/rsc_HousingDetailsMasterTemplate.html';


      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


