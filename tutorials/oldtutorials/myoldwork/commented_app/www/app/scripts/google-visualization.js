(function (angular, $, _, google) {

  'use strict';

  angular.module('google-visualization', ['google-loader', 'app-config', 'debug'])
      .factory('$googleVisualization', ['$log', '$config', '$debug',
        function ($log, $config, $debug) {
          var version = $config.googleVisualization.version || '1',
              configure = function () {
                $log.info('Configuring Google Visualization SDK', google.visualization.Version);

                var oldDataTable = google.visualization.DataTable;

                function NewDataTable(data, columnMapping) {
                  $log.debug('NewDataTable.constructor', data, columnMapping);
                  var thisTable = this,
                    columnIndexes;

                  oldDataTable.call(thisTable, data);

                  thisTable.columnMapping = columnMapping;
                  thisTable.invertedColumnMapping = _.invert(thisTable.columnMapping);
                  thisTable.dataIndexes = {};

                  thisTable.rowType = function DataTableRowMap(rowIndex){
                    var thisRowMap = this;
                    thisRowMap.rowIndex = rowIndex;
                  };

                  columnIndexes = _.range(thisTable.getNumberOfColumns());
                  _(columnIndexes).each(thisTable.defineRowTypeProperties, thisTable);
                }

                NewDataTable.prototype = _.create(oldDataTable.prototype, {
                  constructor: NewDataTable,

                  defineRowTypeProperties: function defineRowTypeProperties(columnIndex) {
                    var thisTable = this,
                      columnId = thisTable.getColumnId(columnIndex),
                      propertyKeys = [columnId];

                    if (_.has(thisTable.columnMapping, columnId)) {
                      propertyKeys.push(thisTable.columnMapping[columnId]);
                    }

                    _(propertyKeys).each(function defineProperty(propertyKey) {
                      var propertyColumnIndex = columnIndex;

                      Object.defineProperty(thisTable.rowType.prototype, propertyKey, {
                        enumerable: true,
                        get: function getPropertyKey() {
                          var thisRowMap = this;
                          return thisTable.getValue(thisRowMap.rowIndex, propertyColumnIndex);
                        }
                      });
                    });
                  },

                  getColumnIndex: function getColumnIndex(targetColumnId) {
                    var thisTable = this,
                      columnRange = _.range(thisTable.getNumberOfColumns()),
                      altTargetColumnId = _.maybe(thisTable.invertedColumnMapping, [targetColumnId]);

                    return _(columnRange).find(function findColumnId(columnIndex) {
                      var currentColumnId = thisTable.getColumnId(columnIndex);
                      return targetColumnId === currentColumnId || altTargetColumnId === currentColumnId;
                    });
                  },

                  addDataIndex: function addDataIndex(column) {
                    if (!this.getNumberOfRows())
                      return {};
                    
                    var thisTable = this,
                      index = {},
                      columnIndex = _.isNumber(column) ? column : thisTable.getColumnIndex(column),
                      columnId = thisTable.getColumnId(columnIndex),
                      rowRange = _.range(thisTable.getNumberOfRows());

                    thisTable.dataIndexes[columnId] = index;
                    thisTable.indexData(rowRange);

                    return index;
                  },

                  indexData: function indexData(rowIndexes) {
                    var thisTable = this;

                    _(thisTable.dataIndexes).each(function reloadDataIndex(index, columnId) {
                      var columnIndex = thisTable.getColumnIndex(columnId);
                      _(rowIndexes).each(function indexDataInRow(rowIndex) {
                        var value = thisTable.getValue(rowIndex, columnIndex);

                        if (!_.has(index, value)) {
                          index[value] = [];
                        }
                        index[value].push(rowIndex);
                      });
                    });
                  },

                  getDataIndex: function getDataIndex(column) {
                    var thisTable = this,
                      columnIndex = _.isNumber(column) ? column : thisTable.getColumnIndex(column),
                      columnId = thisTable.getColumnId(columnIndex);
                    return thisTable.dataIndexes[columnId];
                  },

                  addRow: function newAddRow() {
                    var thisTable = this,
                      args = _.toArray(arguments),
                      newRowIndex = oldDataTable.prototype.addRow.apply(thisTable, args);

                    thisTable.indexData([newRowIndex]);

                    return newRowIndex;
                  },

                  addRows: function newAddRows() {
                    var thisTable = this,
                      args = _.toArray(arguments),
                      newRowIndexes = oldDataTable.prototype.addRows.apply(thisTable, args);

                    thisTable.indexData(newRowIndexes);

                    return newRowIndexes();
                  },

                  getRow: function getRow(rowIndex) {
                    var thisTable = this;
                    return new thisTable.rowType(rowIndex);
                  },

                  getRows: function getRows(rowIndexes) {
                    var thisTable = this,
                      rowIndexes = rowIndexes || _.range(thisTable.getNumberOfRows());
                    return _(rowIndexes).map(thisTable.getRow, thisTable).value();
                  }
                });

                $log.debug('Replaceing google.visualization.DataTable with NewDataTable');
                google.visualization.DataTable = NewDataTable;

                function StyleFormat(formatFn) {
                  var self = this;
                  self.formatFn = formatFn;
                };

                StyleFormat.prototype = Object.create(Object.prototype, {
                  format: {
                    enumerable: true,
                    value: function format(dataTable, columnIndex) {
                      var self = this,
                        i,
                        value,
                        properties,
                        style;

                      for (i = 0; i < dataTable.getNumberOfRows(); i ++) {
                        value = dataTable.getValue(i, columnIndex);
                        properties = dataTable.getProperties(i, columnIndex) || {};
                        style = self.formatFn(value, i, columnIndex);

                        if (_.isFunction(style)) {
                          style = style(value);
                        }

                        properties = _(properties).extend({style: style}).value();

                        if (properties) {
                          dataTable.setProperties(i, columnIndex, properties);
                        }
                      }
                    }
                  }
                });

                function ValueFormat(formatFn) {
                  this.formatFn = formatFn;
                };

                ValueFormat.prototype = Object.create(Object.prototype, {
                  format: {
                    enumerable: true,
                    value: function format(dataTable, columnIndex) {
                      var self = this,
                        i,
                        value,
                        properties,
                        style;

                      for (i = 0; i < dataTable.getNumberOfRows(); i ++) {
                        value = dataTable.getValue(i, columnIndex);
                        var formattedValue = this.formatFn(value, i, columnIndex);
                        if (!_.isUndefined(formattedValue))
                          dataTable.setFormattedValue(i, columnIndex, formattedValue);
                      }
                    }
                  }
                });

                google.visualization.ext = {
                  StyleFormat: StyleFormat,
                  ValueFormat: ValueFormat
                };
              },
              parameters = _.extend({
                callback: configure,
                packages: ['corechart', 'table']
              }, $config.googleVisualization.parameters),
              googleVisualization = google.load('visualization', version, parameters).then(function() { 
                $log.debug('Google Visualization SDK Loaded', version, parameters);
                return google.visualization;
              });

          $log.debug('Loading Google Visualization SDK', version, parameters);
          $debug.services.$googleVisualization = googleVisualization;
          return googleVisualization;
        }])
      .directive('googleChart', ['$log', '$googleVisualization', '$window', '$timeout',
        function ($log, $googleVisualization, $window, $timeout) {
          return {
            restrict: 'E',
            replace: false,
            scope: {
              chartType: '@googleChartType',
              chartReady: '&googleChartReady'
            },
            link: function (scope, element) {
              $googleVisualization.then(function () {
                $log.info('Initializing Google Chart', scope.chartType);

                var $element = $(element),
                    domElement = $element.get(0),
                    chartType = _(scope.chartType.split('.')).reduce(function (type, segment) {
                      if (_.isNull(type)) {
                        return null;
                      }
                      return type[segment];
                    }, $window),
                    /* jshint newcap: false */
                    chart = new chartType(domElement),
                    drawBase = chartType.prototype.draw,
                    debouncedDraw = _.debounce(function (data, options) {
                      chart.draw(data, options);
                    }, 500);

                Object.defineProperties(chartType.prototype, {
                  draw: {
                    enumerable: true,
                    value: _.debounce(function drawOverride(data, options) {
                      var self = this,
                        o = _.extend({
                          allowHtml: true,
                          width: $element.parent().width()
                        }, options);
                      $log.debug('chart draw override', o);
                      return _.bind(drawBase, self)(data, o);
                    }, 500)
                  }
                });

                //$(window).resize(function () {
                  // TODO: figure out how to automatically draw here
                  // debouncedDraw(data, options);
                //});

                scope.chartReady({ chart: chart });
                
                scope.$on('$destroy', function(){
                  $element.find('*').andSelf().off();
                });
              });
            }
          };
        }]);

}) (window.angular, window.jQuery, window._, window.google);