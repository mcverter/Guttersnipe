
(function () {
    'use strict';


    angular.module('times')
        .directive('createSchedule',['times_templates', function(templates) {
            var templateUrl = templates.main + 'time.schedule-input.client.template.html',
                MSEC_TO_30MIN = 60 * 30 * 1000,
                eventSources = [];



            function ScheduleModalController ($scope, $modalInstance) {
                $scope.start;
                $scope.repeating = false;
                $scope.addSchedule = addSchedule;
                $scope.ok = okSchedule;
                $scope.cancelSchedule = cancelSchedule

                function okSchedule() {
                    $modalInstance.close($scope.selected.item);
                }

                function addSchedule(e, start, end, repeating) {
                    e.preventDefault();
                    eventSources.push({
                        title: 'event2',
                        start: start,
                        end: end,
                        repeating: repeating
                    });
                    $modalInstance.dismiss('added');
                }

                function cancelSchedule (event) {
                    event.preventDefault();
                    $modalInstance.dismiss('cancel');
                }
            }

            function CreateScheduleController($scope, $modal) {
                $scope.eventSources = eventSources;
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
                        dayClick: function (start) {
                            start.setHours(12);
                            console.log(start);
                            var end = angular.copy(start);
                            var repeating = false;
                            end.setTime(start.getTime() + MSEC_TO_30MIN);

                            var modalInstance = $modal.open({
                                templateUrl: templates.main + 'time.schedule-dialog.client.template.html',
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
