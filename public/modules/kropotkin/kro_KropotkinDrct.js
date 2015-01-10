(function (angular, app) {
  'use strict';


  app.directive('kropotkinQuote', ['filePaths',  function(filePaths) {
      var templateUrl =  filePaths.kropotkin + 'kro_KropotkinWidget.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        controller: ['$scope', '$http', '$log',
          function ($scope, $http, $log) {
            console.log("in kropotkin directive");
            var loadQuote = function loadQuote() {
              console.log("loading quote")
              $http.get(filePaths.kropotkin + 'kro_KropotkinConquestBread.txt')
                .success(function (data, status, headers, config) {
                  console.log("Success");
                  var paragraphs = data.split("\n"),
                    paraNum = Math.floor(Math.random() * paragraphs.length);
                  $scope.quote = paragraphs[paraNum];
                })
            };

            loadQuote();

            $scope.reloadQuote =  loadQuote;

            console.log('scope', $scope);

          }]
          };
    }]
  );
})(window.angular, window.guttersnipe);

