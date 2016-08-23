(function (angular, $, _, google) {

  'use strict';

  angular.module('google-visualization', ['google-loader', 'app-config'])
      .factory('$googleVisualization', ['$log', '$config',
        function ($log, $config) {
          var version = $config.googleVisualization.version || '1',
              configure = function () {
                $log.info('Configuring Google Vizualization SDK', google.visualization.Version);
              },
              parameters = _.extend({
                callback: configure,
                packages: ['corechart', 'table']
              }, $config.googleVisualization.parameters);

          return google.load('visualization', version, parameters)
              .then(function() { return google.visualization; });
        }])
      .directive('googleChart', ['$log', '$googleVisualization', '$window', '$timeout',
        function ($log, $googleVisualization, $window, $timeout) {
          return {
            restrict: 'E',
            replace: false,
            scope: {
              type: '@type',
              table: '=table',
              options: '=options'
            },
            link: function (scope, element) {
              $googleVisualization.then(function () {
                $log.info('Initializing Google Chart', scope.type);

                var $element = $(element),
                    domElement = $element.get(0),
                    type = scope.type,
                    chartType = _.reduce(type.split('.'), function (type, segment) {
                      if (_.isNull(type)) {
                        return null;
                      }
                      return type[segment];
                    }, $window),
                    /* jshint newcap: false */
                    chart = new chartType(domElement),
                    drawChart = _.debounce(function () {
                      var table = scope.table,
                          options = scope.options || {};

                      $log.debug('Drawing Google Chart', table);
                      if (table)
                        chart.draw(table, options);
                    }, 100),
                    resizeChart = function (oldHeight, oldWidth) {
                      var newHeight = $element.height(),
                          newWidth = $element.width(),
                          displayed = $element.css('display') !== 'none',
                          heightChanged = oldHeight !== newHeight,
                          widthChanged = oldWidth !== newWidth,
                          sizeChanged = heightChanged || widthChanged;

                      if (displayed && sizeChanged) {
                        scope.$apply(function(){
                          $log.debug('New Size Detected', {
                            height: { old: oldHeight, new: newHeight },
                            width: { old: oldWidth, new: newWidth }
                          });

                          drawChart();
                        });
                      }

                      setTimeout(_.partial(resizeChart, newHeight, newWidth), 100);
                    },
                    height = $element.height(),
                    width = $element.width();
                    
                setTimeout(_.partial(resizeChart, height, width), 100);

                scope.$watch('table', function (newValue, oldValue) {
                  if (newValue !== oldValue) {
                    drawChart();
                  }
                });
              });
            }
          };
        }]);

}) (window.angular, window.jQuery, window._, window.google);