(function (angular, app) {
  'use strict';

  app.controller('AdhocCtrl', ['$log', '$debug', '$scope', '$routeParams', '$report',
    function ($log, $debug, $scope, $routeParams, $report) {
      var reportId = $routeParams.reportId,
        report;

      $report.onLoad(function () {
        $report.get(reportId).then(function (r) {
          report = r;
          $log.debug('AdhocCtrl, Loaded Report', r);
        }, function (error) {
          $log.error('Unable to load report,', error);
        });
      });

      Object.defineProperties($scope, {
        report: {
          enumerable: true,
          get: function getReport() {
            return report;
          }
        }
      });
    }]);

}) (window.angular, window.novantas);
