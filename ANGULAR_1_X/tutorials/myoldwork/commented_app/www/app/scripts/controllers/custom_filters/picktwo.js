/*jshint ignore:start*/
(function (angular, app, _) {
  'use strict';

  app.controller('PickTwoMultiSelectorCtrl', ['$log', '$debug', '$scope', '$element',
    function ($log, $debug, $scope, $element) {
      
      var control = $scope.control;
      var comparisonOptions;
      var primaryOptions;
      
      if (control.state && control.state.options)
        initComparisonOptions();
      
      $scope.$watch('control.state.options', function(nv){
        if (nv)
          initComparisonOptions();
      });
      
      $scope.$watch('control.value', function(nv, ov){
        if (ov !== nv)
          initComparisonOptions();
      });
      
      initScope();
      
      function initComparisonOptions(){
        comparisonOptions = _.cloneDeep(control.state.options);
        primaryOptions = _.cloneDeep(control.state.options);
        
        var i;
        
        for (i in comparisonOptions)
          comparisonOptions[i].selected = false;
        for (i in primaryOptions)
          primaryOptions[i].selected = false;

        var selectedCount = 0;
        for (i in control.state.options){
          if (control.state.options[i].selected){
            selectedCount++;
            if (selectedCount == 1)
              primaryOptions[i].selected = true;
            if (selectedCount == 2)
              comparisonOptions[i].selected = true;
          }
        }
        
        comparisonOptions.unshift({label:'None', selected:false, value:''});
      }

      function initScope(){
        //use getters and setters to push properties up to common state object on view
        //to enable binding between controls
        Object.defineProperties($scope, {
          primaryOptions: {
            enumerable: true,
            get: function getPrimaryOptions() {
              return primaryOptions;
            }
          },
          comparisonOptions: {
            enumerable: true,
            get: function getComparisonOptions() {
              return comparisonOptions;
            }
          },
          primaryValue: {
            enumerable: true,
            get: function getPrimaryValue() {
              if (control.value && control.value.length > 0)
                return control.value[0];
              
              return control.value[0] = control.state.options[0].value;
            },
            set: function setPrimaryValue(val){
              control.value[0] = val;
            }
          },
          comparisonValue: {
            enumerable: true,
            get: function getComparisonValue() {
              if (control.value && control.value.length > 1)
                return control.value[1];
              return comparisonOptions[0].value;
            },
            set: function setComparisonValue(val){
              if (val){
                if (!control.value[0])
                  control.value[0] = control.state.options[0].value;
                control.value[1] = val;
              }
              else if (control.value && control.value.length > 1)
                control.value.pop();
            }
          }
        });
        
      }
      
    }])

})(window.angular, window.novantas, window._);
/*jshint ignore:end*/