(function () {
  'use strict';

  function CalendarReadController($scope) {
    var MS_PER_DAY = 86400000;

    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        }
      }
    };
    $scope.eventFunction = function eventFunction(start, end, timezone, callback) {
      var events = [];

      for(var date = start; date <= end; date.setTime( date.getTime() + MS_PER_DAY )){
        _.forEach($scope.calendar.repeating[date.getDay()], function(repeater){
          var repeaterStart = date.getTime() +
              repeater.start - new Date(repeater.start).setHours(0,0,0,0);  // just the time;
           events.push({
              _id: repeater.id,
              start:  new Date(repeaterStart),
              end: new Date(repeaterStart + repeater.duration),
              title: repeater.headline,
              url: '#/resources/' + repeater.id
          })
        })
      }
        if (callback) {
            callback(events.concat($scope.calendar.nonRepeating));
        } else {
            callback = timezone;                                    // not sure why the timezone function is null
            callback(events.concat($scope.calendar.nonRepeating));  // shouldn't need to concat here
        }
    }
    /* event sources array*/
    $scope.eventSources = [$scope.eventFunction];
    console.log('event sources', $scope.eventSources);
  }

  angular.module('times')
    .directive('resourcesCalendar', ['times_templates', function(templates) {
      var templateUrl = templates.main + 'resources-calendar.client.template.html';

      return {
          scope : {
            calendar: '='
          },
        restrict: 'E',
        templateUrl: templateUrl,
        controller:  CalendarReadController
      };
    }]
  )  ;
})();

