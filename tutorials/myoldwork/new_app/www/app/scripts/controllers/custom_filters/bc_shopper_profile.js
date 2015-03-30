/*jshint ignore:start*/
(function (angular, app, _) {
  'use strict';

  app.controller('BCShopperProfileSelectorCtrl', ['$log', '$debug', '$scope', '$element', '$api',
    function ($log, $debug, $scope, $element, $api) {
      
      var control = $scope.control;
      var preferenceOptions, behaviorOptions, choiceOptions;
      var preferenceValue, behaviorValue, choiceValue, allValue;
      var profileSegments;
      
      if (control.state && control.state.options)
        initOptions();
        
        
      var options = $scope.report.filters[control.id].options;

      if (options && options.source){
        $api.jasper.cachedData(options.source).then(function(data){
          profileSegments = {};
          var i;
          var colIndex = {};
          for (i in data.cols)
            colIndex[data.cols[i].id] = i;
            
          for (i in data.rows){
            var row = data.rows[i].c;
            profileSegments[row[colIndex[options.optionColumn]].v] = row[colIndex[options.segmentColumn]].v;
          } 

          initOptions();
        });
      }
      
      $scope.$watch('control.state.options', function(nv){
        if (nv)
          initOptions();
      });
      
      $('[data-toggle="tooltip"]').tooltip({});
      
      $scope.$watch('selectedProfile', function(nv){
        if (nv == 'preference')
          control.value[0] = preferenceValue;
        else if (nv == 'behavior')
          control.value[0] = behaviorValue;
        else if (nv == 'choice')
          control.value[0] = choiceValue;
        else if (nv == 'all')
          control.value[0] = allValue;
      });
      
      $scope.$watch('control.value', function(nv, ov){
        if (nv !== ov){
          $log.debug('control.value changed -- reloading values');
          initOptions();
        }
      });
      
      initScope();
      
      function initOptions(){
        preferenceOptions = [];
        behaviorOptions = [];
        choiceOptions = [];
        
        if (!profileSegments || !control.state.options)
          return;
        
        for (var i in control.state.options){
          var opt = control.state.options[i];
          
          if (opt.value == '~NOTHING~')
            continue;
          
          if (isAll(opt.value)){
            allValue = opt.value;
            if (control.value[0] == opt.value)
              $scope.selectedProfile = 'all';
          }
          else if (isChoice(opt.value)){
            choiceOptions.push(opt);
            if (control.value[0] == opt.value){
              $scope.selectedProfile = 'choice';
              choiceValue = opt.value;
            }
          }
          else if (isBehavior(opt.value)){
            behaviorOptions.push(opt);
            if (control.value[0] == opt.value){
              $scope.selectedProfile = 'behavior';
              behaviorValue = opt.value;
            }
          }
          else {
            preferenceOptions.push(opt);
            if (control.value[0] == opt.value){
              $scope.selectedProfile = 'preference';
              preferenceValue = opt.value;
            }
          }
        }
      }
      
      function isChoice(v){
        return profileSegments[v] == 3;
      }

      function isAll(v){
        var reAll = /all$/i;
        return reAll.test(v);
      }

      function isBehavior(v){
        return profileSegments[v] == 2;
      }

      function initScope(){
 
        Object.defineProperties($scope, {
          preferenceOptions: {
            enumerable: true,
            get: function getPreferenceOptions() {
              return preferenceOptions;
            }
          },
          behaviorOptions: {
            enumerable: true,
            get: function getBehaviorOptions() {
              return behaviorOptions;
            }
          },
          choiceOptions: {
            enumerable: true,
            get: function getChoiceOptions() {
              return choiceOptions;
            }
          },
          preferenceValue: {
            enumerable: true,
            get: function getPreferenceValue() {
              if (preferenceValue)
                return preferenceValue;
              
              return preferenceValue = preferenceOptions.length?preferenceOptions[0].value:'';
            },
            set: function setPreferenceValue(val){
              control.value[0] = preferenceValue = val;
            }
          },
          behaviorValue: {
            enumerable: true,
            get: function getBehaviorValue() {
              if (behaviorValue)
                return behaviorValue;
              
              return behaviorValue = behaviorOptions.length?behaviorOptions[0].value:'';
            },
            set: function setBehaviorValue(val){
              control.value[0] = behaviorValue = val;
            }
          },
          choiceValue: {
            enumerable: true,
            get: function getChoiceValue() {
              if (choiceValue)
                return choiceValue;
              
              return choiceValue = choiceOptions.length?choiceOptions[0].value:'';
            },
            set: function setChoiceValue(val){
              control.value[0] = choiceValue = val;
            }
          },
          allValue: {
            enumerable: true,
            get: function getAllValue() {
              return allValue;
            }
          }
        });
        
      }
      
    }])

})(window.angular, window.novantas, window._);
/*jshint ignore:end*/