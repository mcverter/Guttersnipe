(function (angular, app) {
  'use strict';


  app.directive('kropotkinQuote', ['filePaths',  function(filePaths) {
      var templateUrl =  filePaths.kropotkin + 'kro_KropotkinWidget.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        controller: ['$scope', '$http', '$log',
          function ($scope, $http, $log) {
            $http.get(filePaths.kropotkin + 'kro_KropotkinConquestBread.txt')
              .success(function(data, status, headers, config){
                console.log("Success");
                var paragraphs = data.split("\n"),
                  paraNum = Math.floor(Math.random() * paragraphs.length);
                  $scope.quote = paragraphs[paraNum];
              })
          }]
          };
    }]
  );
})(window.angular, window.guttersnipe);

