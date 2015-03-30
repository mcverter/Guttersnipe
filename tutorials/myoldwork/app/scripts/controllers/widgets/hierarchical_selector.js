/*jshint ignore:start*/
(function (angular, app, _) {
  'use strict';

  app.controller('HierarchicalSelectorCtrl', ['$log', '$debug', '$scope', '$element', '$timeout',
    function ($log, $debug, $scope, $element, $timeout) {
      var isDropped = false,
        preventNextDrop = false;
      
      initScope();
      
      $scope.value = '';
      $scope.selectedIndex = -1;
      $scope.filteredValues = [];

      $($element).find('.combo').on('show.bs.dropdown', function (evt) {
        if (preventNextDrop) {
          evt.preventDefault();
          
          //need to debounce bootstrap -- seems to send multiple dropdown events for some reason
          $timeout(function(){
            preventNextDrop = false;
          }, 10);
        }
        else
          isDropped = true;
      });

      $($element).find('.combo').on('hide.bs.dropdown', function () {
        isDropped = false;
      });
      
      $scope.setControlValue = function(ndx){
        $scope.selectedIndex = ndx;
        $scope.value = $scope.filteredValues[ndx];
      }

      //called when button is clicked
      $scope.dropdown = function(el){
        if ($scope.value) {
          $scope.value = null;
          preventNextDrop = true;
        }
        else {
          $scope.selectedIndex = -1;
          $scope.filteredValues = $scope.values;
          _.each($scope.filteredValues, function(item, ndx){
            if (item == $scope.value)
              $scope.selectedIndex = ndx;
          });
        }
      }
      
      $scope.onBlur = function(){
        if (!_.contains($scope.values, $scope.value))
          $scope.value = '';
      }
      
      $scope.onKeyDown = function(e){
        switch(e.keyCode) {
          case 38: // up arrow
            if (isDropped && $scope.selectedIndex)
              $scope.selectedIndex--;
            break;
          case 40: // down arrow
            if (!isDropped)
              showDropdown(true);
            else if ($scope.selectedIndex < $scope.filteredValues.length - 1)
              $scope.selectedIndex++;
            break;
          default:
            return;
        }

        e.stopPropagation();
        e.preventDefault();
      }
      
      $scope.onKeyUp = function(e){
        switch(e.keyCode) {
          case 38: // up arrow
          case 40: // down arrow
          case 39: // right arrow
          case 37: // left arrow
          case 36: // home
          case 35: // end
          case 16: // shift
          case 17: // ctrl
          case 18: // alt
            break;
   
          case 9: // tab
          case 13: // enter
            if (!isDropped)
              return;
            if ($scope.selectedIndex >= 0)
              $scope.value = $scope.filteredValues[$scope.selectedIndex];
            showDropdown(false);
            break;
   
          case 27: // escape
            showDropdown(false);
            break;
   
          default:
            updateValues();
            showDropdown(true);
            break;
         }
   
         e.stopPropagation();
         e.preventDefault();
      }

      function initScope(){
        var view = $scope.report.custom;
        var col = $scope.groupColumn;
        
        //use getters and setters to push properties up to common state object on view
        //to enable binding between controls
        Object.defineProperties($scope, {
          value: {
            enumerable: true,
            get: function getValue() {
              return view.state.filter[col.id];
            },
            set: function setValue(val){
              view.state.filter[col.id] = val;
            }
          },
          values: {
            enumerable: true,
            get: function getValues() {
              return view.state.filterOptions[col.id];
            }
          }
        });
        
      }
      
      function showDropdown(show){
        if ((show && !isDropped && $scope.filteredValues.length) || (!show && isDropped))
          $($element).find('.dropdown-menu').dropdown('toggle');
      }
      
      function updateValues(){
        $scope.filteredValues = _.filter($scope.values, function(item){
          return item.toLowerCase().indexOf($scope.value.toLowerCase()) != -1 || !$scope.value;
        });

        $scope.selectedIndex = $scope.filteredValues.length && $scope.value?0:-1;
      }
      
      updateValues();
    }])
  .controller('HierarchicalSelectorGroupCtrl', ['$log', '$debug', '$scope', '$element',
    function ($log, $debug, $scope, $element) {
      
      var view = $scope.report.custom;
      var columns = {};
      var initialized = false;
      
      initScope();
      
      $scope.groupingLevel = view.options.default_group_level;
      
      $scope.$watch('table', function(nv){
        if (nv && !initialized)
          initColumns();
      });

      function initScope(){
        //initialize state
        if (!view.state)
          view.state = {};
        view.state.filter = {};
        view.state.filterOptions = {};
        
        _.each(view.options.group_columns, function(col){
          view.state.filter[col] = '';
          view.state.filterOptions[col] = [];
        });
        
        //use getters and setters to push properties up to common state object on view
        //to enable binding between controls
        Object.defineProperties($scope, {
          groupingLevel: {
            enumerable: true,
            get: function getGroupingLevel() {
              return view.state.filter.groupingLevel || 0;
            },
            set: function setGroupingLevel(val){
              view.state.filter.groupingLevel = val;
            }
          },
          selectedMetric: {
            enumerable: true,
            get: function getSelectedMetric() {
              return _.maybe(view, 'state.selectedMetric');
            },
            set: function setSelectedMetric(val){
              view.state.selectedMetric = val;
            }
          }
        });
        
      }

      function initColumns(){
        var dt = $scope.table,
          columnCount = dt.getNumberOfColumns(),
          columnId,
          columnLabel,
          i;
        
        for (i = 0; i < columnCount; i++) {
          columns[dt.getColumnId(i)] = {
            id: dt.getColumnId(i),
            ndx: i,
            label: dt.getColumnLabel(i)
          };
        }
        
        $scope.groupColumns = _.reduce(view.options.group_columns, function(acc, item){
          acc.push(columns[item]);
          return acc;
        }, []);

        $scope.metricColumns = _.reduce(view.options.metric_columns, function(acc, item){
          acc.push(columns[item.id]);
          return acc;
        }, []);
        
        $scope.selectedMetric = $scope.metricColumns[0].id;
        
        initialized = true;
      }
      
    }])

})(window.angular, window.novantas, window._);
/*jshint ignore:end*/