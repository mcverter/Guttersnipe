(function (angular, app, $, _, URI) {
  'use strict';

  app.directive('jasperAdhoc', ['$log', '$timeout',
    function ($log, $timeout) {
      return {
        restrict: 'E',
        replace: false,
        scope: {
          report: '=report'
        },
        templateUrl: 'bower_components/novafoundation/app/views/directives/jasper-embed.html',
        link: function (scope, element) {
          $log.debug('jasperEmbed.link', element);
        },
        controller: ['$log', '$scope', '$user', '$sce', '$config',
          function ($log, $scope, $user, $sce, $config) {
            $log.debug('jasperEmbed.controller');

            var memoizedResourceUrl = _.memoize(function memoizedResourceUrl(embedUri) {
                $log.debug('Jasper Embed iframe src', embedUri);
                return $sce.trustAsResourceUrl(embedUri);
              });

            Object.defineProperties($scope, {
              src: {
                enumerable: true,
                get: function getSrc() {
                  var self = this,
                    embedUri = URI($config.jasper.host),
                    parameters;

                  if (!self.report) {
                    return;
                  }

                  parameters = {
                    '_flowId': 'adhocFlow',
                    'theme': 'embed',
                    'resource': self.report.viewUri.toString()
                  };

                  embedUri.filename('flow.html').query(parameters);

                  // this is required otherwise angular will throw a security error and block the iframe from binding to this value
                  return memoizedResourceUrl(embedUri.toString());
                }
              }
            });
          }]
      };
    }]);

}) (window.angular, window.novantas, window.jQuery, window._, window.URI);

