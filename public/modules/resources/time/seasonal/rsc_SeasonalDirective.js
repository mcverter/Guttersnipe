(function (angular, app) {
  'use strict';

  app.directive('scheduleSeasonal', ['filePaths', function(filePaths) {
      console.log('in seasonal directive');
      var templateUrl = filePaths.resources_dir + 'time/seasonal/rsc_SeasonalWidget.html',
        controller = function($scope, $modal) {
          $scope.eventSources = [];
          $scope.seasonalConfig = {
            calendar:{
              height: 450,
              editable: true,
              header:{
                left: 'month agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
              },
              dayClick: function (start) {
                console.log(start);
                var end = angular.copy(start);
                var modalInstance = $modal.open({
                  templateUrl: filePaths.resources_dir + 'time/seasonal/rsc_SeasonalDialogWidget.html',
                  controller: function($scope, $modalInstance) {
                    Object.defineProperties($scope, {
                      start: {
                        enumerable: true,
                        get: function () {
                          return start;
                        }
                      },

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
              }


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


