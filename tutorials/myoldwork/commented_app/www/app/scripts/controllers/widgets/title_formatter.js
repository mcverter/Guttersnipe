/*jshint ignore:start*/
/**
 * 
  */


(function (angular, app, _) {
  'use strict';

  app.controller('ReportTitleFormatterCtrl', ['$log', '$debug', '$scope', '$element', '$timeout', '$filter',
    function ($log, $debug, $scope, $element, $timeout, $filter) {
 
      var widget = $scope.widget;
      var options = widget.options;
      var template = options.template;
      var formattedText = $scope.report.title;

      if ($scope.parameters)
        updateFormattedText($scope.parameters);
      
      $scope.$watch('parameters', function(nv, ov){
        if (nv)
          updateFormattedText(nv);
      });

      $scope.$watch('filterApplied', function(nv, ov){
        updateFormattedText($scope.parameters);
      });
 
      initScope();

      function updateFormattedText(params){
        if (!$scope.filterApplied)
          return;
        
        var s = template;
        var re = /\{([^\}]*)\}/g;
        var match = re.exec(template);
        while (match){
          s = s.replace(match[0], getValue(params, match[1]));
          match = re.exec(template);
        }
        
        $scope.title = formattedText = s;
      }
      
      function getValue(params, key){
        if (!params || !params[key])
          return key;
        
        var val = params[key];
        
       if (_.isArray(val)){
          if (val.length > 1){
            val = _.map(val, function(v){ return expand(v);});
            
            val = _.without(val, 'Median');
            val = _.without(val, 'null');
            
            if (val.length > 5)
              return val.slice(0, 4).join(', ') + ' and ' + (val.length - 4) + ' others';

            return val.slice(0, val.length - 1).join(', ') + ' and ' + val[val.length - 1];
          }

          return expand(val[0]);
        }

        return expand(val);
      }
 
      function expand(s){
        if (s == 'All')
          return "fit any profile"

        if (/^\d{4}-\d{2}-\d{2}$/.test(s))
          return $filter('date')(s, 'MMMM, yyyy');
        
        return (s + '').replace(/Abt/g, 'About');
      }
 
      function initScope(){
        //use getters and setters to push properties up to common state object on view
        //to enable binding between controls
        Object.defineProperties($scope, {
          formattedText: {
            enumerable: true,
            get: function getFormattedText() {
              return formattedText;
            }
          }
        });
      }
      
    }])


})(window.angular, window.novantas, window._);
/*jshint ignore:end*/