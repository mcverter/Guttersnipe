/*jshint ignore:start*/
(function (angular, app, _) {
  'use strict';

  app.controller('EnumeratedRangeSelectorCtrl', ['$log', '$debug', '$scope', '$element',
    function ($log, $debug, $scope, $element) {
      
      var control = $scope.control;
      var options = [];
      var optionIndex = {};
      var rangeStart, rangeEnd;
      
      if (control.state && control.state.options)
        initOptions();
      
      $scope.$watch('control.state.options', function(nv){
        if (nv)
          initOptions();
      });
      
      $scope.$watch('control.value', function(nv, ov){
        if (ov !== nv)
          initOptions();
      });
      
      initScope();
      
      control.label += ' between'
      
      function initOptions(){
        var i;
        
        options = _.cloneDeep(control.state.options);
        
        for (i in options)
          optionIndex[options[i].value] = parseInt(i);
        
        var start, end;

        for (i in options){
          if (options[i].selected){
            if (!start)
              start = options[i].value;
            else
              end = options[i].value;
          }
        }
        
        if (!start)
          start = options[0].value;
        if (!end)
          end = options[options.length - 1].value;
          
        updateValues(start, end);
      }

      function updateValues(start, end){
        if (optionIndex[start] > optionIndex[end]){
          rangeStart = end;
          rangeEnd = start;
        }
        else {
          rangeStart = start;
          rangeEnd = end;
        }
        
        while (control.value.shift());

        for (var i in options){
          var ndx = parseInt(i);
          if (ndx >= optionIndex[rangeStart] && ndx <= optionIndex[rangeEnd]){
            options[i].selected = true;
            control.value.push(options[i].value);
          }
          else
            options[i].selected = false;
        }
      }
      
      function initScope(){
        //use getters and setters to push properties up to common state object on view
        //to enable binding between controls
        Object.defineProperties($scope, {
          options: {
            enumerable: true,
            get: function getOptions() {
              return options;
            }
          },
          startValue: {
            enumerable: true,
            get: function getStartValue() {
              return rangeStart;
            },
            set: function setStartValue(val){
              updateValues(val, rangeEnd);
            }
          },
          endValue: {
            enumerable: true,
            get: function getEndValue() {
              return rangeEnd;
            },
            set: function setEndValue(val){
              updateValues(rangeStart, val);
            }
          }
        });
        
      }
      
    }])

})(window.angular, window.novantas, window._);
/*jshint ignore:end*/