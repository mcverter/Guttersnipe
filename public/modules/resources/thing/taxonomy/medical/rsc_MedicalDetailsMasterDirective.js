(function (angular, app) {
  'use strict';

  app.directive('medicalDetailsMaster', ['filePaths', function(filePaths) {
      var template =
        '      <div ng-if="!areDetailsSet">' +
        '        <medical-details-input></medical-details-input>' +
        '      </div>' +
        '      <div ng-if="areDetailsSet">' +
        '        <medical-details-confirmed></medical-details-confirmed>' +
        '      </div>';


      return {
        restrict: 'E',
        template: template
      }
    }]
  );
})(window.angular, window.guttersnipe);


