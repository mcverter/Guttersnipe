(function (angular, app) {
  'use strict';

  app.directive('scheduleInput', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + 'time/rsc_ScheduleInputWidget.html',
        MSEC_TO_30MIN = 60 * 30 * 1000,
        eventSources = [],
        controller = function($scope, $modal) {
          $scope.eventSources = eventSources;
          $scope.punctualConfig = {
            calendar:{
              height: 450,
              editable: true,
              header:{
                left: 'month agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
              },
              dayClick: function (start) {
                start.setHours(12);
                console.log(start);
                var end = angular.copy(start);
                var repeating = false;
                end.setTime(start.getTime()+MSEC_TO_30MIN);
                var modalInstance = $modal.open({
                  templateUrl: filePaths.resources_dir + 'time/punctual/rsc_PunctualDialogWidget.html',
                  controller: function($scope, $modalInstance) {
                    Object.defineProperties($scope, {
                      start: {
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
                      repeating: {
                        enumerable: true,
                        get: function () {
                          return repeating;
                        },
                        set: function (val) {
                          repeating = val;
                        }
                      },
                      /**
                       * roadrunneratwast: $scope.$watch('myProperty', function (newValue, oldValue) { console.log(newValue); }
                       $scope.watch(end);
                       $scope.$watch(end);
                       $scope.watch(start);
                       $scope.$watch(start);

                       */
                      updateEnd : {
                        enumerable: true,
                        value: function(start) {
                          console.log('in update Time');
                        }
                      },

                      addSchedule : {
                        enumerable: true,
                        value: function(e, start, end, repeating) {
                          e.preventDefault();
                          eventSources.push({
                            title  : 'event2',
                            start  : start,
                            end    : end,
                              repeating: repeating
                          });

                          $modalInstance.dismiss('added');
                        }
                      },

                      invalidTimes: {
                        enumerable: true,
                        value: function() {
                          return start.getTime() >= end.getTime();
                        }
                      },
                      end: {
                        enumerable: true,
                        get: function () {
                          return end;
                        },
                        set: function (val) {
                          if (val.getTime() >= start.getTime()+MSEC_TO_30MIN) {
                            end = val;
                          }
                          else {
                            end.setTime(start.getTime() + MSEC_TO_30MIN);
                          }
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


