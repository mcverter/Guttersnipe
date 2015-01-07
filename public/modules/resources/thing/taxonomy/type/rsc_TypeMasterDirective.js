(function (angular, app) {
  'use strict';

  app.directive('resourceType', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + "thing/taxonomy/type/rsc_TypeMasterWidget.html";

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


