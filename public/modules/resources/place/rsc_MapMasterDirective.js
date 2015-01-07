(function (angular, app) {
  'use strict';

  app.directive('mapMaster', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + "place/rsc_MapMasterWidget.html";

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


