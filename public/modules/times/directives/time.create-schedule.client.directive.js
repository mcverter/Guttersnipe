
(function () {
  'use strict';

  angular.module('times')
    .directive('createSchedule',['times_templates', function(templates) {
      var templateUrl = templates.main + 'time.schedule-input.client.template.html',
        MSEC_TO_30MIN = 1800000,
        eventSources = [],
        event = {};

      function CreateScheduleController($scope, $modal) {
        eventSources = [];
        event = {};
        $scope.calendarSources = [eventSources];
        $scope.time.schedules = eventSources;
        $scope.removeSchedule = removeSchedule;
        $scope.uiConfig = {
          calendar: {
            height: 450,
            firstHour: 14,
            editable: true,
            header: {
              left: 'month agendaWeek agendaDay',
              center: 'title',
              right: 'today prev,next'
            },
            defaultView: 'agendaWeek',
            allDaySlot: false,
            dayClick: function (start) {
              var modalInstance,
                end = new Date(start.getTime() + MSEC_TO_30MIN);

              event = {
                repeating: false,
                id: 1,
                allDay: false
              };

              Object.defineProperties(event, {
                start : {
                  enumerable: true,
                  get: function () {
                    return start;
                  },
                  set: function (val) {
                    start = val;
                    if (start.getTime() >= end.getTime()) {
                      end.setTime(start.getTime() + MSEC_TO_30MIN);
                    }
                  }
                },
                end: {
                  enumerable: true,
                  get: function () {
                    return end;
                  },
                  set: function (val) {
                    if (val.getTime() >= start.getTime() + MSEC_TO_30MIN) {
                      end = val;
                    }
                    else {
                      end.setTime(start.getTime() + MSEC_TO_30MIN);
                    }
                  }
                }
              });

              modalInstance = $modal.open({
                templateUrl: templates.main +
                  'time.schedule-dialog.client.template.html',
                controller: ScheduleModalController
              });

              modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
              }, function () {
                console.log('Modal dismissed at: ' + new Date());
              });
            }
          }
        }
        function removeSchedule(sked) {
          var idx = _.findIndex(eventSources, sked);
          eventSources.splice(idx, 1);
        }
      }
      return {
        restrict: 'E',
        templateUrl: templateUrl,
        controller: CreateScheduleController,
        scope : {
          confirmations: '=',
          time: '=',
          headline: '='
        }
      };
    }]
  );
})();
