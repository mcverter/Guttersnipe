(function (angular, app) {
  'use strict';

  var BASE_ROUTE ='js/directives/templates/';
  app.directive('resourceDetails', function() {
    var linker = function(scope, element, attrs) {},
      templateUrl = BASE_ROUTE + 'TypePage.html',
      controller = function($scope){ };
    return {
      link: linker,
      restrict: 'E',
      templateUrl: templateUrl,
      controller: controller
    };
  });
})(window.angular, window.guttersnipe);
