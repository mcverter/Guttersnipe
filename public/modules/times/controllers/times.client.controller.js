'use strict';

// Times controller
angular.module('times').controller('TimesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Times',
    function($scope, $stateParams, $location, Authentication, Times) {

        $scope.time = {
            isScheduled : false
        }


        $scope.authentication = Authentication;


            // Create new Time
        $scope.create = function() {
            // Create new Time object
            var time = new Times ({
                name: this.name
            });

            // Redirect after save
            time.$save(function(response) {
                $location.path('times/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Time
        $scope.remove = function(time) {
            if ( time ) {
                time.$remove();

                for (var i in $scope.times) {
                    if ($scope.times [i] === time) {
                        $scope.times.splice(i, 1);
                    }
                }
            } else {
                $scope.time.$remove(function() {
                    $location.path('times');
                });
            }
        };

        // Update existing Time
        $scope.update = function() {
            var time = $scope.time;

            time.$update(function() {
                $location.path('times/' + time._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Times
        $scope.find = function() {
            $scope.times = Times.query();
        };

        // Find existing Time
        $scope.findOne = function() {
            $scope.time = Times.get({
                timeId: $stateParams.timeId
            });
        };
    }
]);