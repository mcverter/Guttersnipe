(function (angular, app) {
  'use strict';

  app.directive('foodDetailsConfirmed', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + "thing/taxonomy/food/" + filePaths.templates_subdir + "rsc_FoodDetailsConfirmedTemplate.html";

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);

