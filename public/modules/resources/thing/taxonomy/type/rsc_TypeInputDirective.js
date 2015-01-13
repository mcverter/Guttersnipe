(function (angular, app) {
  'use strict';

  app.directive('resourceTypeInput', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + "thing/taxonomy/type/rsc_TypeInputTemplate.html";

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


