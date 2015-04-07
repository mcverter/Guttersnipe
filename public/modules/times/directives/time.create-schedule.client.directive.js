
(function () {
  'use strict';


  angular.module('times')
    .directive('createSchedule',['times_templates', function(templates) {
      var templateUrl = templates.main + 'time.schedule-input.client.template.html',
        MSEC_TO_30MIN = 60 * 30 * 1000,
        eventSources = [], gutEvent;



      function ScheduleModalController ($scope, $modalInstance) {
        $scope.addSchedule = addSchedule;
        $scope.ok = okSchedule;
        $scope.cancelSchedule = cancelSchedule;
        $scope.gutEvent = gutEvent;

        function okSchedule() {
          $modalInstance.close($scope.selected.item);
        }

        function addSchedule(e, gutEvent) {
          e.preventDefault();
          eventSources.push(gutEvent);
          $modalInstance.dismiss('added');
        }

        function cancelSchedule (event) {
          event.preventDefault();
          $modalInstance.dismiss('cancel');
        }
      }

      function CreateScheduleController($scope, $modal) {
        $scope.time.schedules = eventSources;
        $scope.punctualConfig = {
          calendar: {
            height: 450,
            editable: true,
            header: {
              left: 'month agendaWeek agendaDay',
              center: 'title',
              right: 'today prev,next'
            },
            defaultView: 'agendaWeek',
            dayClick: function (clickedTime) {
              var modalInstance;

              clickedTime.setHours(12);
              gutEvent = {
                start: clickedTime,
                end: new Date(clickedTime.getTime() + MSEC_TO_30MIN),
                repeating: false
              }

              console.log('gut Event is', gutEvent);

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
      }
      return {
        restrict: 'E',
        templateUrl: templateUrl,
        controller: CreateScheduleController,
        scope : {
          confirmations: '=',
          time: '='
        }
      };
    }]
  );
})();
