  (function (angular, _) { 'use strict';

  angular.module('places')
      .directive('address', [function() {
      var templateUrl = 'modules/places/addresses/addressTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );


