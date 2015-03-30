/*jshint ignore:start*/
(function (angular, app, _) {
  'use strict';

  app.controller('PickManyPlusOneSelectorCtrl', ['$log', '$debug', '$scope', '$element', '$api',
    function ($log, $debug, $scope, $element, $api) {
      
      var control = $scope.control;
      var requiredValue = null;
      var medianValue = null;
      var allowMultiple = true;
      var options = [];
      var singleValue = null;
      var multipleValues = [];
      
      if (control.state && control.state.options)
        initOptions();
        
      var filterOptions = $scope.report.filters[control.id].options;

      if (filterOptions && filterOptions.medianValue)
        medianValue = filterOptions.medianValue;

      if (filterOptions && filterOptions.singleSelect)
        allowMultiple = false;
      
      if (filterOptions && filterOptions.source){
        $api.jasper.cachedData(filterOptions.source).then(function(data){
          var colIndex = {}, i;
          for (i in data.cols)
            colIndex[data.cols[i].id] = i;
            
          if (data.rows.length)
            requiredValue = data.rows[0].c[colIndex[filterOptions.optionColumn]].v;
            
          initOptions();
        });
      }
      
      $scope.$watch('control.state.options', function(nv){
        if (nv)
          initOptions();
      });
      
      $scope.$watch('control.value', function(nv, ov){
        updateOptions();
      });
      
      initScope();
      
      function initOptions(){
        if (!requiredValue || !control.state.options)
          return;

        options = [];
        
        for (var i in control.state.options){
          var opt = control.state.options[i];

          if (opt.value == '~NOTHING~' || opt.value == requiredValue || opt.value == medianValue)
            continue;

          if (opt.selected){
            if (allowMultiple)
              multipleValues.push(opt.value);
            else
              singleValue = opt.value;
          }

          options.push(_(opt).clone());
        }
        
        if (!control.value)
          control.value = [];
          
        if (!_.contains(control.value, requiredValue)){
          control.value.unshift(requiredValue);
          
          $scope.updateParameters();
        }
      }
      
      function updateOptions(){
        multipleValues = [];
        
        for (var i in control.value){
          var val = control.value[i];
          
          if (val == requiredValue || val == medianValue)
            continue;
          
          singleValue = val;
          multipleValues.push(val);
        }
        
        if (!_.contains(control.value, requiredValue))
          control.value.unshift(requiredValue);
      }
      
      function initScope(){
 
        Object.defineProperties($scope, {
          options: {
            enumerable: true,
            get: function getPreferenceOptions() {
              return options;
            }
          },
          allowMultiple: {
            enumerable: true,
            get: function getAllowMultiple() {
              return allowMultiple;
            }
          },
          enableShowMedian: {
            enumerable: true,
            get: function getEnableShowMedian() {
              return _.toBoolean(medianValue);
            }
          },
          value: {
            enumerable: true,
            get: function getValue() {
              if (allowMultiple)
                return multipleValues;
              else
                return singleValue;
            },
            set: function setValue(val){
              var showMedian;
              if (medianValue)
                showMedian = _.contains(control.value, medianValue);
                
              if (allowMultiple){
                multipleValues = _.clone(val);
                control.value = val;
              }
              else {
                singleValue = val;
                control.value = [val];
              }

              //add in the required value and media value if set
              control.value.unshift(requiredValue);
              if (medianValue && showMedian)
                control.value.unshift(medianValue);

            }
          },
          showMedian: {
            enumerable: true,
            get: function getShowMedian() {
              return _.contains(control.value, medianValue);
            },
            set: function setShowMedian(val){
              erase(control.value, medianValue);
              if (val)
                control.value.unshift(medianValue);
            }
          }
        });
        
      }
      
      function erase(arr, item){
        for (var i in arr)
          if (arr[i] == item){
            arr.splice(i, 1);
            break;
          }
      }
      
    }])

})(window.angular, window.novantas, window._);
/*jshint ignore:end*/