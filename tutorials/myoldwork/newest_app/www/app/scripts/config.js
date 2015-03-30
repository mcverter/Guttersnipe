(function (angular) {

  'use strict';

  angular.module('app-config', ['debug'])
    .constant('$config', {
      apiHost: 'http://localhost:5020/',
      jasper: {
        host: 'http://localhost:8080/jasperserver-pro/'
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
