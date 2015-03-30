(function (angular) {

  'use strict';

  angular.module('app-config', ['debug'])
    .constant('$config', {
      apiHost: 'http://localhost:5020/',
      jasper: {
        host: 'http://reportsdev01.novantas.com:8080/reports/'
      },
      features: {
        customReports: true
      },
      googleMaps: {
        version: '3',
        parameters: {
          'other_params': {
            sensor: false,
            language: 'en'
          }
        }
      },
      googleVisualization: {
        version: '1',
        parameters: {}
      },
      appKey: 'nova'
    })
    .run(['$log', '$debug', '$config',
      function ($log, $debug, $config) {
        $debug.$config = $config;
      }])
    .config(['$provide', '$logProvider',
      function ($provide, $logProvider) {
        $provide.decorator('$sniffer', function ($delegate) {
          $delegate.history = false;
          return $delegate;
        });

        $logProvider.debugEnabled(true);
      }]);

})(window.angular);
