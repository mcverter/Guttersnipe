(function (angular, app) {
  'use strict';

  app.directive('scheduleInput', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + 'time/rsc_ScheduleInputWidget.html',
        controller = function($scope, $modal) {

          $scope.eventSources = [];
          $scope.punctualConfig = {
            calendar:{
              height: 450,
              editable: true,
              header:{
                left: 'month agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
              },
              defaultView: 'agendaWeek',
              dayClick: function (start) {
                start.setHours(12);
                console.log(start);
                var end = angular.copy(start);
                end.setMinutes(start.getMinutes()+30);
                var modalInstance = $modal.open({
                  templateUrl: filePaths.resources_dir + 'time/rsc_ScheduleDialogWidget.html',
                  controller: function($scope, $modalInstance) {
                    Object.defineProperties($scope, {
                      start: {
                        enumerable: true,
                        get: function () {
                          return start;
                        },
                        set: function (val) {
                          start = val;
                          console.log("End before", end);
                          end.setMinutes(start.getMinutes() + 30);
                          console.log("End after", end);
                        }
                      },
                      /**
                       * roadrunneratwast: $scope.$watch('myProperty', function (newValue, oldValue) { console.log(newValue); }
                       $scope.watch(end);
                       $scope.$watch(end);
                       $scope.watch(start);
                       $scope.$watch(start);

                       */

                      end: {
                        enumerable: true,
                        get: function () {
                          return end;
                        },
                        set: function (val) {
                          end = val;
                        }
                      },
                      ok: {
                        enumerable: true,
                        value: function () {
                          $modalInstance.close($scope.selected.item);
                        }
                      },
                      cancelSchedule: {
                        enumerable: true,
                        value: function (event) {
                          event.preventDefault();
                          $modalInstance.dismiss('cancel');
                        }
                      }
                    })

                  }
                });

                modalInstance.result.then(function (selectedItem) {
                  $scope.selected = selectedItem;
                }, function () {
                  console.log('Modal dismissed at: ' + new Date());
                });
              },

              eventDrop: $scope.alertOnDrop,
              eventResize: $scope.alertOnResize
            }
          }
        };


      return {
        restrict: 'E',
        templateUrl: templateUrl,
        controller: controller
      }
    }]
  );
})(window.angular, window.guttersnipe);


