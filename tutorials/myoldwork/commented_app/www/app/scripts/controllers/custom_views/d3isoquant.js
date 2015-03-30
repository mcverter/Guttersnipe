/*jshint ignore:start*/
(function(angular, app, d3, _) {
  'use strict';

  app.controller('D3IsoquantCtrl',
          function($rootScope, $scope, $log, $api, $location, $sce, $element,$filter, $window, $q, $googleVisualization) {
            // debug.log('In D3IsoquantCtrl');
            var options = $scope.report.custom.options, competitorIndex;

            function initChart() {
              var chart = nv.models.multiChart().margin({top : 70, right : 60, bottom : 50, left : 90});
              chart.scatter1.onlyCircles(false);
              chart.xAxis.axisLabel(options.xAxisLabel).showMaxMin(false)
                  .tickFormat(d3.format(',.1f'));
              chart.yAxis1.axisLabel(options.yAxisLabel).showMaxMin(false)
                  .tickFormat(d3.format(',.0f'));
              chart.yAxis2.axisLabel(options.yAxisLabel).showMaxMin(false)
                  .tickFormat(d3.format(',.0f'));

              chart.showLegend(false);
              chart.tooltips(true)

              .tooltipContent(
                  function(key, x, y, e, g) {
                    var label, name, res = '', values;
                    if (g && g.point && g.point.x && g.point.y) {
                      var s = '';
                      s += g.point.label ? '<strong>' + breakString(g.point.label) + '</strong>' + '<br>' : '';
                      s += options.xAxisLabel + ': ' + $filter('number')(g.point.x, 2) + '<br>';
                      s += options.yAxisLabel + ': ' + $filter('number')(g.point.y, 2);
                      res += s;
                    }
                    return res;
                  });
              chart.enableXYTooltips(false);
              return chart;
            }

            function breakString(str, length) {
              var len = length ? length : 25;
              if (str.length <= len) {
                return str;
              }
              var res = '', arr = str.split(''), multilineStr = '';
              _.each(str.split(' '), function(s) {
                res += (s + ' ');
                if (res.length >= len) {
                  multilineStr += (res + '<br>');
                  res = '';
                }
              });
              multilineStr += res;
              return multilineStr;
            }

            function getData() {
              var dataTable = $scope.table, chartData = [], pts = [], mainChartData = [], numrows;

              if (dataTable) {
                numrows = dataTable.getNumberOfRows();

                var chartConfig = $scope.report.custom.options.chart, chartType = chartConfig.type ? chartConfig.type : 'scatter',
                    pointShape = chartConfig.pointShape ? chartConfig.pointShape : 'circle',
                    pointSize = chartConfig.pointSize ? chartConfig.pointSize : 1,
                    defaultPointColor = chartConfig.color,
                    toolTipEnabled = Boolean(chartConfig.tooltip),
                    chartName = chartConfig.name,
                    minXAxisValue = dataTable.getValue(0, dataTable.getColumnIndex(options.x)),
                    maxXAxisValue = dataTable.getValue(0, dataTable.getColumnIndex(options.x)),
                    minYAxisValue = dataTable.getValue(0, dataTable.getColumnIndex(options.y)),
                    maxYAxisValue = dataTable.getValue(0, dataTable.getColumnIndex(options.y));

                for (var i = 0; i < numrows; i++) {

                  var xVal = dataTable.getValue(i, dataTable.getColumnIndex(options.x)),
                    yVal = dataTable.getValue(i,dataTable.getColumnIndex(options.y)),
                    label = dataTable.getValue(i, dataTable.getColumnIndex(options.label));

                  minXAxisValue = Math.min(minXAxisValue, xVal);
                  maxXAxisValue = Math.max(maxXAxisValue, xVal);
                  minYAxisValue = Math.min(minYAxisValue, yVal);
                  maxYAxisValue = Math.max(maxYAxisValue, yVal);

                  var pt = {
                    x : xVal,
                    y : yVal,
                    shape : 'circle',
                    label : label,
                    tooltip : toolTipEnabled,
                    color : '#003366',
                    size : 4
                  };

                  mainChartData.push(pt);
                }

                chartData.push({
                  key : chartName ? chartName : 'Scatter Plot',
                  values : mainChartData,
                  type : 'scatter',
                  yAxis : 1,
                  xAxis : 1
                });

                var ds = options.isoquant, data = ds.data;

                var numrows = data.getNumberOfRows();

                if (numrows > 0) {
                  var isoquantNum = data.getValue(0, 0);
                }

                // hard code an isoquantNum here to test
                // var isoquantNum = 450;

                var xAxisLength = maxXAxisValue - minXAxisValue, 
                  isoquantXVal,
                  isoquantYVal,
                  numIsoquantCurves = 5,
                  isoquantCurves = [],
                  isoquantMultipliers = [1, 1.5, 2, 2.5, 3],
                  isoquantColors = ['#986828','#76b194','#c9681e','#003366','#dcab19'];

                for (var j = 0; j < numIsoquantCurves; j++) {
                  isoquantCurves[j] = [];
                  for (var i = 0; i < 100; i++) {
                    isoquantXVal = minXAxisValue + xAxisLength * (i / 100);
                    isoquantYVal = (isoquantNum * isoquantMultipliers[j]) / isoquantXVal;
                    if (minYAxisValue < isoquantYVal && isoquantYVal < maxYAxisValue) {
                      isoquantCurves[j].push({
                        label: isoquantMultipliers[j].toFixed(1) + 'x',
                        x : isoquantXVal,
                        y : isoquantYVal,
                        color : isoquantColors[j]
                      });
                    }
                  }
                }

                //push the 1x, 1.5x, 2.5x, 3.0x curves
                for (j = 0; j < numIsoquantCurves; j++) {
                  chartData.push({
                    key : 'Isoquant' + j,
                    values : isoquantCurves[j],
                    type : 'line',
                    yAxis : 1,
                    xAxis : 1,
                    color : isoquantColors[j]
                    //isDashed in an option currently in development by nvd3. if they ever release, we could use it
                    //,isDashed: true
                  });
                }
              }
              return chartData;
            }

            function drawChart() {
              nv.graphs.length = 0;
              nv.addGraph(function() {
                var chart = initChart();

                d3.selectAll('.nv-axislabel').attr("style", "font-size:14px;");

                chart.scatter1.useVoronoi(false);

                d3.select('svg')
                  .datum(getData)
                  .transition()
                  .duration(500)
                  .call(chart);
                
                //d3 has an option to add dashed lines, but it breaks the nvd3 hover animation
                /*d3.select('svg')
                  .attr("class", "line")
                  .style("stroke-dasharray", ("3, 3"));
                */
                
                //this transparency only gets applied to the aces, nvd3 overrides the lines1 chart
                d3.select('svg')
                  .append('path')
                  .attr('class', 'line')
                  .style('stroke-opacity', .1)
                  .style('fill-opacity', .1)

                nv.utils.windowResize(chart.update);

                // chart.enableXYtooltip = false;
                if (chart.update)
                  chart.update();

                return chart;
              });
            }

            function loadIsoquantValues() {
              return $q.all(
                  {
                    isoquantData : $api.jasper.cachedData(
                        options.isoquant.jasperUri).then(function(data) {
                      return $googleVisualization.then(function(gvis) {
                        return new gvis.DataTable(data);
                      });
                    })
                  }).then(function(result) {
                options.isoquant.data = result.isoquantData;
                return result;
              });
            }

            var debouncedDraw = _.debounce(function(reason) {
              $log.info("drawChart(): " + reason);
              drawChart();

              $window.renderComplete = true;
            }, 500);

            $scope
                .$watch(
                    '[showOtherBranches, competitors, showCurrentBranches, showHistoricalData, selectedOtherCompetitor, redrawChart]',
                    function(newValue, oldValue) {
                      var reason = '';
                      loadIsoquantValues().then(function() {
                        debouncedDraw(reason);
                      });
                    }, true);

            $scope.$watch('table', function(newValue, oldValue) {
              loadIsoquantValues().then(function() {
                debouncedDraw('table changed');
              });
            });

          });
})(window.angular, window.novantas, window.d3, window._);
/*jshint ignore:end*/