/*jshint ignore:start*/
(function (angular, app, d3) {
  'use strict';

  app.controller('D3ScatterLineChartCtrl', 
    function ($rootScope, $scope, $log, $api, $location, $sce, $element) {

      var chart;
      var options = $scope.report.custom.options;
      
      if ($scope.table)
        initChart(getData());
    
      $scope.$watch('table', function(nv, ov){
        if (nv)
          initChart(getData());
      });
      
      function getData() {
        var dataTable = $scope.table;

        var pts = [];
        var numrows = dataTable.getNumberOfRows();
      
        for (var i=0; i<numrows; i++){
          pts.push({
            x: dataTable.getValue(i, dataTable.getColumnIndex(options.x)), 
            y: dataTable.getValue(i, dataTable.getColumnIndex(options.y)),
            label: dataTable.getValue(i, dataTable.getColumnIndex(options.label)),
            size: 1,
            shape: 'diamond',
            color: 1
          });
        }

        return [{
          key: 'Macro Markets',
          values: pts,
          slope: 1,
          intercept: 0
        }];
      }
    
      function initChart(data){
        if (data.length == 0 || data[0].values.length == 0)
          return;
        
        nv.addGraph(function() {
          chart = nv.models.scatterPlusLineChart()
            .x(function(d) { return d.x })
            .y(function(d) { return d.y })
            .margin({top: 40, right: 20, bottom: 50, left: 100})
            .interactive(true)
            .tooltips(true)
            .tooltipContent(function(key, x, y, e, g) { return '<strong>' + g.point.label + '</strong>'; })
            .tooltipXContent(function(key, x) { return '<strong>' + x + '</strong>'; })
            .tooltipYContent(function(key, x, y) { return '<strong>' + y + '</strong>'; })
            .showControls(false)
            .showLegend(false);
      
          chart.scatter.useVoronoi(false);
          
          var dim = Math.ceil(getMax(data));
          chart
            .forceX([0, dim])
            .forceY([0, dim]);
       
          chart.yAxis
            .axisLabel(options.yAxisLabel)
            .tickFormat(d3.format(',.2f'))
            .showMaxMin(false);
  
          chart.xAxis
            .axisLabel(options.xAxisLabel)
            .tickFormat(d3.format(',.2f'))
            .showMaxMin(false);

          d3.select('svg')
            .datum(data)
            .transition().duration(500)
              .call(chart);
       
          nv.utils.windowResize(chart.update);
           
          chart.update();
     
          return chart;
        });
      }
      
      function getMax(data, prop){
        return _.reduce(data[0].values, function(m, d){
          return Math.max(Math.max(m, d.y), d.x);
        }, -1);
      }

    }
  );

})(window.angular, window.novantas, window.d3);
/*jshint ignore:end*/
