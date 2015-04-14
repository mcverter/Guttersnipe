
(function () {
    'use strict';


    angular.module('times')
        .directive('createSchedule',['times_templates', function(templates) {
            var templateUrl = templates.main + 'time.schedule-input.client.template.html',
                MSEC_TO_30MIN = 60 * 30 * 1000,
                eventSources = [],
                event = {};



            function ScheduleModalController ($scope, $modalInstance) {
                $scope.addSchedule = addSchedule;
                $scope.ok = okSchedule;
                $scope.cancelSchedule = cancelSchedule;
                $scope.event = event;

                function okSchedule() {
                    $modalInstance.close($scope.selected.item);
                }

                function addSchedule(e, event) {
                  e.preventDefault();
                  var idx = _.findIndex(eventSources, event);
                  if (idx === -1) {
                    event.title = 'Event';
                    eventSources.push(event);
                    $modalInstance.dismiss('added');
                  }
                  else {
                    $modalInstance.dismiss('already added');
                  }
                }

                function cancelSchedule (event) {
                    event.preventDefault();
                    $modalInstance.dismiss('cancel');
                }
            }

            function CreateScheduleController($scope, $modal) {
                $scope.calendarSources = [eventSources];
                $scope.time.schedules = eventSources;
                $scope.removeSchedule = removeSchedule;
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
