'use strict';

// Kropotkins controller
angular.module('kropotkins').directive('kropotkinQuote', ['Kropotkins', function(Kropotkins) {
  var templateUrl =  'modules/kropotkins/views/kropotkinDirective.view.html';

  return {
    restrict: 'E',
    templateUrl: templateUrl,
    controller: ['$scope', '$http', '$log',
      function ($scope, $http, $log) {
        console.log("in kropotkin directive");
        var loadQuote = function loadQuote() {
          Kropotkins.get({
            kropotkinId: 'random'
          } , function(data) {
            $scope.quote = data;
            console.log($scope.quote);
          }, function(err) {
            console.err('Could not load quote')
          });
        };

        loadQuote();

        $scope.reloadQuote =  loadQuote;

        console.log('scope', $scope);

      }]
  };
}]);
