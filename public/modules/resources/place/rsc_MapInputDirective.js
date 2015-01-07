(function (angular, app) {
  'use strict';

  app.directive('mapInput', ['filePaths', function(filePaths) {
    var templateUrl = filePaths.resources_dir + "place/rsc_MapInputWidget.html";

    return {
      restrict: 'E',
      templateUrl: templateUrl
    }
  }]);
})(window.angular, window.guttersnipe);
