(function (angular, _) {
  'use strict';
  angular.module('times')
    .directive('scheduleSeasonal', [function() {
      console.log('in seasonal directive');
      var templateUrl = 'modules/times/seasonal/templates/rsc_SeasonalTemplate.html',
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
                  templateUrl: filePaths.resources_dir + 'time/' + filePaths.templates_subdir + 'seasonal/rsc_SeasonalDialogTemplate.html',
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
      };
    }]
  );
})(window.angular, window._);

