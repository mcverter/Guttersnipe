(function (angular, app, _) {
  'use strict';

  app.controller('HeatMapCtrl', ['$log', '$debug', '$scope', '$geoJson', '$googleMaps', '$element',
    function ($log, $debug, $scope, $geoJson, $googleMaps, $element) {
      $googleMaps.then(function (maps) {
        var view = $scope.report.custom,
          options = view.options,
          map,
          tooltip = new maps.ext.Tooltip(),
          marketPolygons,
          marketMetrics,
          marketBenchmarks,
          metricLabels,

          parseColumns = function parseColumns(dt) {
            var columnMap = { metrics: {}, benchmarks: {} },
              columnCount = dt.getNumberOfColumns(),
              metricIds = _.keys(options.metricColumns),
              columnId,
              columnLabel,
              i;

            view.state.metrics = {};

            for (i = 0; i < columnCount; i++) {
              columnId = dt.getColumnId(i);
              columnLabel = dt.getColumnLabel(i);

              if (columnId === options.columns.shape) 
                columnMap.shape = i;
              else if (columnId === options.columns.macroCode)
                columnMap.marketCode = i;
              else if (columnId === options.columns.branchId)
                columnMap.branchId = i;
              else if (columnId === options.columns.branchName)
                columnMap.branchName = i;
              else if (columnId === options.columns.macroName)
                columnMap.marketName = i;
              else if (columnId === options.columns.lat)
                columnMap.lat = i;
              else if (columnId === options.columns.lng)
                columnMap.lng = i;
              else if (_.contains(metricIds, columnId)){
                columnMap.metrics[columnId] = i;
                view.state.metrics[columnId] = columnLabel;
              }
              else
                columnMap.benchmarks[columnId] = i;
            }
              return columnMap;
          },
          parsePolygons = function parsePolygons(dt, cols) {
            var polys = {},
              rowCount = dt.getNumberOfRows(),
              i,
              marketCode,
              marketName,
              branchId,
              branchName,
              lat,
              lng,
              shapeString,
              shapeJson,
              newPoly = function newPoly(json, marketCode, marketLabel) {
                var poly = $geoJson(shapeJson);
                
                poly.geoJson.properties = {
                  id: marketCode,
                  label: marketLabel,
                  branches: []
                };

                maps.event.addListener(poly, 'click', function () {
                  var bounds = poly.getBounds();
  
                  blurSelectedMacroMarket();
                  focusSelectedMacroMarket(poly);
  
                  $scope.$apply(function () {
                    $scope.map.fitBounds(bounds);
                    $scope.map.panToBounds(bounds);
                  });
                });

                maps.event.addListener(poly, 'mouseover', function (event) {
                  var bounds = poly.getBounds();

                  var selectedMetric = view.state.selectedMetric,
                    marketMetricValue = marketMetrics[marketCode][selectedMetric],
                    marketBenchmarkValue = marketBenchmarks[marketCode][view.state.selectedBenchmark];

                  tooltip.setOptions({
                    map: map,
                    position: bounds.getCenter(),
                    content: marketLabel + '<br/>Average ' + view.state.metrics[selectedMetric] + ': ' + marketMetricValue.toFixed(2) + '<br/>Benchmark: ' + marketBenchmarkValue.toFixed(2)
                  });
                });

                return poly;
              };

            for (i = 0; i < rowCount; i++) {
              marketCode = dt.getValue(i, cols.marketCode);
              marketName = dt.getValue(i, cols.marketName);
              branchId = dt.getValue(i, cols.branchId);
              branchName = dt.getValue(i, cols.branchName);
              lat = dt.getValue(i, cols.lat);
              lng = dt.getValue(i, cols.lng);
              
              if (!_.has(polys, marketCode)) {
                shapeString = dt.getValue(i, cols.shape);
                shapeString = shapeString.replace(/\\\"/g, '\"'); // fix extra escaping if there is any
                shapeJson = JSON.parse(shapeString);

                polys[marketCode] = newPoly(shapeJson, marketCode, marketName);
              }
 
              var branch = $geoJson({
                type: 'Point',
                coordinates: [lng, lat],
                  properties: {idx: i, id: branchId, name: branchName}
              });
              
                var branchMetricTooltip = function branchMetricTooltip (branch) {
                    maps.event.addListener(branch,  'click', function clickBranch(event) {
                        var branch_metric = dt.getValue(branch.geoJson.properties.idx,
							cols.metrics[view.state.selectedMetric]);
                        tooltip.setOptions({
                            map: map,
                            content: branch.geoJson.properties.name + '<br/>Branch ' + view.state.metrics[view.state.selectedMetric] + ': '  + branch_metric.toFixed(2)
                        });
                    });
                };

                branchMetricTooltip(branch);

              var icon = {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 6,
                strokeColor: '#000000',
                strokeWeight: 1,
                strokeOpacity: 0.8,
                fillOpacity: 1
              };

              icon.fillColor = '#CC9900';

              branch.setOptions({icon: icon});
              
              polys[marketCode].geoJson.properties.branches.push(branch);
            }

            marketPolygons = polys;
          },

          parseMetrics = function parseMetrics(dt, cols) {
            var metrics = {},
              benchmarks = {},
              m,
              b,
              i,
              rowCount = dt.getNumberOfRows(),
              marketCode,
              averageMetrics = function averageMetrics() {
                _.each(metrics, function (m, code) {
                  _.each(m, function (values, id) {
                    var total = _.reduce(values, function (sum, val) { return sum + val; }, 0),
                      count = values.length;
                    metrics[code][id] = total / count;
                  });
                });
              };
              
            /*jshint -W083 */
            for (i = 0; i < rowCount; i++) {
              marketCode = dt.getValue(i, cols.marketCode);

              if (!_.has(metrics, marketCode))
                metrics[marketCode] = {};

              m = metrics[marketCode];

              _.each(cols.metrics, function (metricCol, metricId) {
                if (!_.has(m, metricId)) 
                  m[metricId] = [];

                m[metricId].push(dt.getValue(i, metricCol));
              });

              if (!_.has(benchmarks, marketCode))
                benchmarks[marketCode] = {};

              b = benchmarks[marketCode];
              
              _.each(cols.benchmarks, function (benchmarkCol, benchmarkId) {
                b[benchmarkId] = dt.getValue(i, benchmarkCol);
              });
            }
            /*jshint +W083 */

            averageMetrics();

            marketMetrics = metrics;
            marketBenchmarks = benchmarks;
          },

          initializeColorRanges = function initializeColorRanges() {
            var selectedMetric = view.state.selectedMetric,
              selectedBenchmark = view.state.selectedBenchmark,
              benchmarkMultipliers = _.map(_.keys(marketMetrics), function (marketCode) {
                var marketValue = marketMetrics[marketCode][selectedMetric],
                  benchmarkValue = marketBenchmarks[marketCode][selectedBenchmark],
                  multiplier = (marketValue / benchmarkValue) * 100;
                return multiplier;
              }),
              min = _.min(benchmarkMultipliers),
              max = _.max(benchmarkMultipliers),
              rangeMin = Math.min(Math.floor(min), 0),
              rangeMax = Math.max(Math.ceil(max), 200),
              rangeLowerValue = Math.max(75, rangeMin),
              rangeUpperValue = Math.min(125, rangeMax);

            view.state.rangeMin = rangeMin;
            view.state.rangeMax = rangeMax;
            if (_.isUndefined(view.state.rangeValues))
              view.state.rangeValues = [rangeLowerValue, rangeUpperValue];
          },

          color = function color() {
            _.each(marketPolygons, function (polygon, marketCode) {
              colorMarket(polygon);
            });
          },

          colorMarket = function(macroMarket){
            var selectedMetric = view.state.selectedMetric,
              selectedBenchmark = view.state.selectedBenchmark,
              marketCode = macroMarket.geoJson.properties.id;

            var metricValue = marketMetrics[marketCode][selectedMetric],
              benchmarkValue = marketBenchmarks[marketCode][selectedBenchmark],
              multiplier = (metricValue / benchmarkValue) * 100,
              fillColor;

            if (multiplier <= view.state.rangeValues[0]) {
              fillColor = '#660000';
            } else if (multiplier > view.state.rangeValues[1]) {
              fillColor = '#006600'; 
            } else {
              fillColor = '#CC9900';
            }
 
            if ($scope.selectedMacroMarket === macroMarket){
              macroMarket.setOptions({
                fillOpacity: 0.05,
                strokeWeight: 5,
                fillColor: fillColor
              });


                                var dt = $scope.table;
                                var cols = parseColumns(dt);


                                _.each(macroMarket.geoJson.properties.branches,
                                    function colorBranches(branch){
                                        var oldColor = branch.icon.fillColor;

                                        var branch_metric = $scope.table.getValue(branch.geoJson.properties.idx,
                                            cols.metrics[view.state.selectedMetric]);
                                        var branch_multiplier = (branch_metric / benchmarkValue) * 100;
                                        if (branch_multiplier <= view.state.rangeValues[0]) {
                                            fillColor = '#660000';
                                        } else if (branch_multiplier > view.state.rangeValues[1]) {
                                            fillColor = '#006600';
                                        } else {
                                            fillColor = '#CC9900';
                                        }

                                        if (oldColor != fillColor) {
                                            branch.icon.fillColor = fillColor;
                                            branch.setMap(map);
                                        }
                                    });


            }
            else {
              macroMarket.setOptions({
                strokeWeight: 1,
                strokeOpacity: 1,
                fillOpacity: 0.4,
                zIndex: 1,
                fillColor: fillColor
              });
            }
          },
          
          draw = function draw(polys, show, delay) {
            var m = show ? map : null,
                partSize = Math.ceil(_.size(polys) * 0.2),
                f,
                r = polys,
                drawNext = function () {
                  f = _.take(r, partSize);
                  r = _.drop(r, partSize);

                  if (_.size(f) <= 0)
                    return;

                  _.each(f, function (p) {
                    p.setMap(m);
                  });

                  if (delay > 0)
                    setTimeout(drawNext, delay);
                  else
                    drawNext();
                };

            if (r)
              drawNext();
          },

          blurSelectedMacroMarket = function blurSelectedMacroMarket() {
            if (!$scope.selectedMacroMarket)
              return;
            
            var macroMarket = $scope.selectedMacroMarket,
                id = _.maybe(macroMarket, 'geoJson.properties.id'),
                clearBranches = function () {
                  draw(macroMarket.geoJson.properties.branches, false);
                };

            if (!id)
              return;

            $scope.selectedMacroMarket = null;
            colorMarket(macroMarket);
            clearBranches();
          },

          focusSelectedMacroMarket = function focusSelectedMacroMarket(macroMarket) {
            var id = _.maybe(macroMarket, 'geoJson.properties.id'),
                drawBranches = function () {
                  draw(macroMarket.geoJson.properties.branches, true);
                };

            if (!id) {
              return;
            }

            $scope.selectedMacroMarket = macroMarket;
            colorMarket(macroMarket);
            drawBranches();
            tooltip.setMap(null);
          },

//          loaded = false,
          loadData = function loadData(dt) {
//            if (loaded)
//              return;
            var cols = parseColumns(dt);

            draw(_.values(marketPolygons), false);
            
            try {
              parseMetrics(dt, cols);
              parsePolygons(dt, cols);
            }
            catch(ex){
              return;
            }
 
            // get or init selected metric
            view.state.selectedMetric = view.state.selectedMetric || _.first(_.keys(view.state.metrics));
            view.state.selectedBenchmarkCategory = view.state.selectedBenchmarkCategory || _.first(_.keys(view.options.macroMarketBenchmark));
            view.state.selectedBenchmark = options.metricColumns[view.state.selectedMetric][view.state.selectedBenchmarkCategory];
            
            initializeColorRanges();
            color();
            draw(_.values(marketPolygons), true);
            
//            loaded = true;
          };

        //TODO: find right "map" element
        maps.event.addListener($element, 'click', function(){
          blurSelectedMacroMarket();
        });
          
        Object.defineProperties($scope, {
          options: {
            enumerable: true,
            get: function getOptions() {
              var self = this;
              return self.report.custom.options;
            }
          },

          map: {
            enumerable: true,
            get: function getMap() {
              return map;
            }
          },

          initializeMap: {
            enumerable: true,
            value: function initializeMap(fn) {
              var self = this,
                mapOptions = {
                  center: new google.maps.LatLng(40.75502699708263, -73.97328615188599) //Novantas, NYC
                };

              map = fn(mapOptions);

              $scope.$watch('table', function (dt) {
                if (dt)
                  loadData(dt);
              });
            }
          }
          
          
        });

        $scope.$watch(function () { return _.maybe(view, 'state.selectedMetric'); }, function (nv) {
          if (!nv)
            return;
          view.state.selectedBenchmark = view.options.metricColumns[view.state.selectedMetric][view.state.selectedBenchmarkCategory];
          initializeColorRanges();
          color();
        });

        $scope.$watch(function () { return _.maybe(view, 'state.selectedBenchmarkCategory'); }, function (nv) {
          if (!nv)
            return;
          view.state.selectedBenchmark = view.options.metricColumns[view.state.selectedMetric][view.state.selectedBenchmarkCategory];
          initializeColorRanges();
          color();
        });
        
        $scope.$watch(function () { return _.maybe(view, 'state.rangeValues'); }, function () {
          color();
        }, true);

        view.state = view.state || {}; // ensure state, this will be used by any widgets for binding
 
      });
    }
  ])
  .controller('HeatMapMetricSelectorCtrl', ['$log', '$debug', '$scope',
    function ($log, $debug, $scope) {
      var view = $scope.report.custom;

      var _metrics = null,
        _categories = null;
      
      Object.defineProperties($scope, {
        metrics: {
          enumerable: true,
          get: function getMetrics() {
            if (_.isNull(_metrics)){
              var metrics = _.maybe(view, 'options.metricColumns');
              if (!metrics || !view.state|| !view.state.metrics)
                return [];

              _metrics = _.reduce(_.keys(metrics), function (acc, metricId) {
                acc.push({ id: metricId, label:view.state.metrics[metricId] });
                return acc;
              }, []);
            }
            return _metrics;
          }
        },
        benchmarkCategories: {
          enumerable: true,
          get: function getBenchmarkCategories() {
            if (_.isNull(_categories)){
              var categories = _.maybe(view, 'options.macroMarketBenchmark');
              if (!categories)
                return [];

              _categories = _.reduce(_.keys(categories), function (acc, catId) {
                acc.push({ id: catId, label:view.options.macroMarketBenchmark[catId] });
                return acc;
              }, []);
            }
            return _categories;
          }
        },
        selectedMetric: {
          enumerable: true,
          get: function getSelectedMetric() {
            return _.maybe(view, 'state.selectedMetric');
          },
          set: function setSelectedMetric(value) {
            view.state.selectedMetric = value;
          }
        },
        selectedBenchmarkCategory: {
          enumerable: true,
          get: function getSelectedBenchmarkCategory() {
            return _.maybe(view, 'state.selectedBenchmarkCategory');
          },
          set: function setSelectedBenchmarkCategory(value) {
            view.state.selectedBenchmarkCategory = value;
          }
        }
      });
    }])
  .controller('HeatMapColorRangeCtrl', ['$log', '$debug', '$scope',
    function ($log, $debug, $scope) {
      var view = $scope.report.custom;

      Object.defineProperties($scope, {
        min: {
          enumerable: true,
          get: function getMin() {
            return _.maybe(view, 'state.rangeMin');
          }
        },
        max: {
          enumerable: true,
          get: function getMax() {
            return _.maybe(view, 'state.rangeMax');
          }
        },
        step: {
          enumerable: true,
          get: function getStep() {
            return _.maybe(view, 'state.rangeStep') || 1;
          }
        },
        values: {
          enumerable: true,
          get: function getValues() {
            return _.maybe(view, 'state.rangeValues');
          },
          set: function setValues(value) {
            view.state.rangeValues = value;
          }
        }
      });
    }])
  .controller('HeatMapRelatedReportsCtrl', ['$log', '$debug', '$scope', '$nav', '$session',
    function ($log, $debug, $scope, $nav, $session) {
      var view = $scope.report.custom,
        getSelectedMetric = function getSelectedMetric() {
          return _.maybe(view, 'state.selectedMetric');
        },
        memoizedRelatedReports = _.memoize(function (selectedMetric) {
          var reportIds = view.options.relatedReports[selectedMetric];
          return _.map(reportIds, function (id) {
            // TODO: this is not the data we want, report information should be loaded from the current user... I think that might be $session
            return $session.properties.user.reportMetadata[id];
         });
        });

      Object.defineProperties($scope, {
        relatedReports: {
          enumerable: true,
          get: function getRelatedReport() {
            var self = this,
              selectedMetric = getSelectedMetric();

            if (!selectedMetric)
              return null;

            return memoizedRelatedReports(selectedMetric);
          }
        }
      });
    }]);

}) (window.angular, window.novantas, window._);