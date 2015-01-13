(function (angular, app) {
  'use strict';

  app.directive('foodDetailsInput', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + "thing/taxonomy/food/rsc_FoodDetailsInputTemplate.html";

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


