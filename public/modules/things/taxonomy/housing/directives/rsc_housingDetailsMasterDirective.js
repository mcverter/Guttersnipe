  (function (angular, _) { 'use strict';

    angular.module('things').directive('housingDetailsMaster', ['things_templates', function(templates) {
      var templateUrl = templates.housing + 'rsc_HousingDetailsMasterTemplate.html';


      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


