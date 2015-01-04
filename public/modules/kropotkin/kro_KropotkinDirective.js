(function (angular, app) {
  'use strict';


  app.directive('kropotkinQuote', ['filePaths',  function(filePaths) {
      var templateUrl =  filePaths.kropotkin + 'kropotkinWidget.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        controller: ['$scope', '$http', '$log',
          function ($scope, $http, $log) {
            $http.get(filePaths.kropotkin + 'kropotkinConquestBread.txt')
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

