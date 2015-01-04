(function (angular, app) {
  'use strict';

  app.directive('resourceFoodDetailsInput', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + 'thing/taxonomy/food/rsc_FoodDetailsInputWidget.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


