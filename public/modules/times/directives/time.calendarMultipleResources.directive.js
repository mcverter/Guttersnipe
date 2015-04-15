(function () {
  'use strict';

  function CalendarExampleController($scope,$compile) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var MS_PER_DAY = 86400000;

    console.log('calendar example is ', $scope.calendar);

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

      $scope.events = [
          {title: 'All Day Event',start: new Date(y, m, 1)},
          {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
          {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
          {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
          {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
          {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
      ];

    $scope.eventFunction = function eventFunction(start, end, timezone, callback) {
      var events = [];




        console.log('start', start, 'end', end, 'timezone', timezone, 'callback', callback);
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
//          events = $scope.events;
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
        controller:  CalendarExampleController
      };
    }]
  )  ;
})();

