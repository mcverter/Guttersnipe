(function (angular, app) {
  'use strict';

  app.controller('KropotkinController', ['$scope', 'kropotkinService', function ($scope, kropotkinService) {
    console.log(kropotkinService);
    $scope.quote = kropotkinService.getQuote();
  }]);
})(window.angular, window.guttersnipe);

