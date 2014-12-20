(function (angular, app) {
  'use strict';


  app.directive('kropotkinQuote', ['filePaths',  function(filePaths) {
      //var templateUrl =  filePaths.kropotkin + 'kropotkinWidget.html';

      return {
        restrict: 'E',
        template: '<blockquote>{{quote}}</blockquote>',
        controller: ['$scope', '$http', '$log',
          function ($scope, $http, $log) {
            $log.debug('jasperEmbed.controller');
            $log.debug($scope.quote);
            $http.get(filePaths.kropotkin + 'kropotkinConquestBread.txt')
              .success(function(data, status, headers, config){
                console.log("Success");
                var paragraphs = data.split("\n"),
                  paraNum = Math.floor(Math.random() * paragraphs.length);
                  $scope.quote = paragraphs[paraNum];
              })
          }]
          };
    }]
  );
})(window.angular, window.guttersnipe);

/**
 *
 *         controller: ['$log', '$scope', '$user', '$sce', '$config',
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

 */