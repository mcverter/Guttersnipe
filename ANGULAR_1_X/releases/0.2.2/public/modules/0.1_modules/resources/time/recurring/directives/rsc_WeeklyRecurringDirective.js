(function (angular, app) {
  'use strict';

  app.directive('scheduleRecurring', ['filePaths', function(filePaths) {
    var templateUrl = filePaths.resources_dir + 'time/recurring/' + filePaths.templates_subdir + 'rsc_WeeklyRecurringTemplate.html',
      controller = function($scope, $modal) {
        $scope.eventSources = [];
        $scope.recurringConfig = {
          calendar:{
            height: 450,
            editable: true,
            header:{
              left: '',
              center: 'title',
              right: 'today prev,next'
            },
            defaultView: 'agendaWeek',
            dayClick: function (start) {
              console.log(start);
              var end = angular.copy(start);
              end.setMinutes(start.getMinutes()+30);
              var modalInstance = $modal.open({
                templateUrl: filePaths.resources_dir + 'time/recurring/' + filePaths.templates_subdir + 'rsc_WeeklyRecurringEventDialog.html',
                controller: function($scope, $modalInstance) {
                  Object.defineProperties($scope, {
                    start : {
                      enumerable: true,
                      get: function() {
                        return start;
                      },
                      set: function(val) {
                        start = val;
                        console.log("End before", end);
                        end.setMinutes(start.getMinutes()+30);
                        console.log("End after", end);
                      }
                    },

                    end: {
                      enumerable: true,
                      get: function() {
                        return end;
                      },
                      set: function(val) {
                        end = val;
                      }
                    },
                    ok : {
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


