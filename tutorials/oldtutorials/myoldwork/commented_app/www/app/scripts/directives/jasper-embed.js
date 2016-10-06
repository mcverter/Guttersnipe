/**
* @class JasperEmbed (Directive):
*       Displays JasperServer within popup
         so users can view JasperReports
         available from Link objects (ui.Links)
*/
(function (angular, app, $, _, URI) {
  'use strict';

  app.directive('jasperEmbed', ['$log', '$timeout',
    function ($log, $timeout) {
      return {
        restrict: 'E',
        replace: false,
        scope: {
          report: '=report',
          parameters: '=parameters'
        },
        templateUrl: 'bower_components/novafoundation/app/views/directives/jasper-embed.html',
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

                  if (!self.report)
                    return;
 
                  parameters = {
                    '_flowId': 'viewReportFlow',
                    'standAlone': true,
                    'theme': 'embed',
                    'reportUnit': self.report.uri
                  };

                  // report parameters
                  _(self.parameters).each(function applyParameter(value, key) {
                    parameters[key] = value;
                  });

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

