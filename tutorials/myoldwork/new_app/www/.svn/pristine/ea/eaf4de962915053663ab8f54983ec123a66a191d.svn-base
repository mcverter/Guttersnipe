/*jshint ignore:start*/
(function (angular, app, d3) {
  'use strict';

  app.controller('D3BarChartCtrl', 
    function ($rootScope, $scope, $log, $api, $location, $sce, $element) {

      var chart;
      var options = $scope.report.custom.options;
      var aggregateFunctions = {};
      
      _.each(options.metric_columns, function(item){
        aggregateFunctions[item.id] = item.agg;
      });
      
      initScope();

      if ($scope.table)
        initChart(getData());
    
      $scope.$watch('table', function(nv, ov){
        if (nv)
          initChart(getData());
      });
      
      $scope.$watch('selectedMetric', function(nv, ov){
        updateChartData();
      });
      
      $scope.$watch('filter', function(nv, ov){
        updateChartData();
      }, true);
      
      function updateChartData(){
        if (!chart)
          return;
        
        var data = getData();
        
        d3.select('svg')
          .style('height', data[0].values.length * 40 + 75 + 'px')
          .datum(data);
        chart.update();
      }

      function getData() {
        var dataTable = $scope.table;
        var data = [];
        
        var filter = $scope.filter;
        
        var filterOptions = {};
        
        var pts = [];
        var rows = {};
        var numrows = dataTable.getNumberOfRows();
        for (var i=0; i<numrows; i++){
          if (!matchesFilter(filter, dataTable, i))
            continue;
          
          addFilterOptions(filterOptions, dataTable, i);
          
          var groupLabel = getGroupLabel(filter, dataTable, i);
          if (!rows[groupLabel]){
            rows[groupLabel] = [];

            pts.push({
              label: groupLabel,
              size: 1,
              shape: 'diamond',
              color: 1
            });
          }
          rows[groupLabel].push(dataTable.getValue(i, dataTable.getColumnIndex($scope.selectedMetric)));
        }

        _.each(pts, function(item){
          item.value = _.reduce(rows[item.label], function(acc, num){
            return acc + num;
          }, 0);
          
          //supports avg and sum right now
          if (aggregateFunctions[$scope.selectedMetric] == 'avg')
            item.value /= rows[item.label].length;
        });
        
        for (var key in filterOptions)
          $scope.filterOptions[key] = _.keys(filterOptions[key]).sort();
        
        data.push({
          key: 'Values',
          values: pts
        });
  
        return data;
      }
  
      function addFilterOptions(filterOptions, dt, i){
        for (var f=0; f < options.group_columns.length; f++){
          var groupColumn = options.group_columns[f];

          if (!filterOptions[groupColumn])
            filterOptions[groupColumn] = {};

          var ndx = dt.getColumnIndex(groupColumn);
          if (ndx == -1)
            continue;

          var val = dt.getValue(i, ndx);
          if (val)
            filterOptions[groupColumn][val] = true;
        }
      }
      
      function matchesFilter(filter, dt, i){
        for (var f=0; f < filter.groupingLevel; f++){
          var groupColumn = options.group_columns[f];
          var ndx = dt.getColumnIndex(groupColumn);
          if (ndx == -1)
            return false;
          
          if (!filter[groupColumn])
            continue;
          
          if (filter[groupColumn] != dt.getValue(i, ndx))
            return false;
        }
        
        return true;
      }

      function getGroupLabel(filter, dt, i){
        var parts = [];
        
        for (var f=filter.groupingLevel; f <= filter.groupingLevel; f++){
          var groupColumn = options.group_columns[f];
          var ndx = dt.getColumnIndex(groupColumn);
          if (ndx == -1)
            continue;
          
          parts.push(dt.getValue(i, ndx))
        }
        
        return parts.join(' - ');
      }
    
      function initChart(data){
        nv.addGraph(function() {
          chart = nv.models.multiBarHorizontalChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .margin({top: 30, right: 20, bottom: 50, left: 175})
            .showValues(true)
            .tooltips(true)
            .showControls(false)
            .showLegend(false);
       
          chart.yAxis
            .tickFormat(d3.format(',.2f'));
  
          chart.yAxis
            .showMaxMin(false);
       
          d3.select('svg')
            .style('height', data[0].values.length * 40 + 75 + 'px')
            .datum(data)
            .transition().duration(500)
              .call(chart);
       
          nv.utils.windowResize(chart.update);
           
          chart.update();
     
          return chart;
        });
      }

      function initScope(){
        var view = $scope.report.custom;
        
        if (!view.state)
          view.state = {};
        
        //use getters and setters to push properties up to common state object on view
        //to enable binding between controls
        Object.defineProperties($scope, {
          selectedMetric: {
            enumerable: true,
            get: function getSelectedMetric() {
              return _.maybe(view, 'state.selectedMetric');
            }
          },
          filter: {
            enumerable: true,
            get: function getFilter() {
              return _.maybe(view, 'state.filter');
            }
          },
          filterOptions: {
            enumerable: true,
            get: function getFilterOptions() {
              return _.maybe(view, 'state.filterOptions');
            }
          }
        });
      }

    }
  );

})(window.angular, window.novantas, window.d3);
/*jshint ignore:end*/
