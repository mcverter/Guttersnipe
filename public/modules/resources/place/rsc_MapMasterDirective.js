(function (angular, app) {
  'use strict';

  app.directive('mapMaster', ['filePaths', function(filePaths) {
      var template =
        '        <div ng-if="!isLocationSet">' +
        '           <map-input></map-input>' +
        '        </div>' +
        '        <div ng-if="isLocationSet">' +
        '           <map-confirmed></map-confirmed>' +
        '        </div>';

      return {
        restrict: 'E',
        template: template
      }
    }]
  );
})(window.angular, window.guttersnipe);


