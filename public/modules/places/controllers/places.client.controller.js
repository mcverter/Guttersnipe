(function (angular, _) {
  'use strict';

// Places controller
  angular.module('places').controller('PlacesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Places',
    function($scope, $stateParams, $location, Authentication, Places) {




      $scope.authentication = Authentication;
    }
  ]);
})(window.angular, window._);