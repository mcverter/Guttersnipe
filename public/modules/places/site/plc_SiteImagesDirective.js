  (function (angular, _) { 'use strict';
angular.module('places')
.directive('address', [function() {
      var templateUrl =  'modules/places/site/plc_SiteImagesTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


