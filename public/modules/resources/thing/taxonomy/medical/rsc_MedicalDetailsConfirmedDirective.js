(function (angular, app) {
  'use strict';

  app.directive('medicalDetailsConfirmed', ['filePaths', function(filePaths) {

      var template =
        '        <div>' +
        '          <div>' +
        '            <div ng-repeat="category in details">' +
        '                {{category}}' +
        '              <div ng-repeat="detail in details.category">' +
        '                {{detail}}' +
        '              </div>' +
        '            </div>' +
        '            <a class="btn btn-warning" href="#" role="button" ng-click="isSummarySet=false">Edit</a>' +
        '          </div>' +
        '        </div>';

      return {
        restrict: 'E',
        template: template
      }
    }]
  );
})(window.angular, window.guttersnipe);


