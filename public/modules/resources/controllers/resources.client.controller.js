
(function (angular, _) { 'use strict';

    angular.module('resources').controller('ResourcesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Resources',
        function($scope, $stateParams, $location, Authentication, Resources) {
            $scope.resource = Resources.getEmptyResource;
            $scope.resource.eventSources = [];
            $scope.Authentication = Authentication;
            $scope.create =  createResource;
            $scope.remove = deleteResource;
            $scope.update = updateResource;
            $scope.find = findAllResources;
            $scope.findOne = findOneResource;
            $scope.isCreateAgreed  = false;
            $scope.isCreateValid = false;
            $scope.isCreatePlaceConfirmed = false;
            $scope.isCreateTimeConfirmed = false;
            $scope.isCreateSummaryConfirmed = false;
            $scope.isCreateClassificationConfirmed = false;

            $scope.addTime  = function(){};
            $scope.addPlace  = function(){};
            $scope.addThingSummary  = function(){};
            $scope.addThingTaxonomy  = function(){};
            $scope.updateTime  = function(){};
            $scope.updatePlace  = function(){};
            $scope.updateThingSummary  = function(){};
            $scope.updateThingTaxonomy  = function(){};



            function createResource() {
                var resource = new Resources({
                    resource: this.resource
                });
                resource.$save(function (response) {
                    $location.path('resources/' + response._id);

                    $scope.resource = {};
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            }


            function deleteResource (resource) {
                if (resource) {
                    resource.$remove();

                    for (var i in $scope.resources) {
                        if ($scope.resources[i] === resource) {
                            $scope.resources.splice(i, 1);
                        }
                    }
                } else {
                    $scope.resource.$remove(function() {
                        $location.path('resources');
                    });
                }
            }


            function updateResource() {
                var resource = $scope.resource;

                resource.$update(function() {
                    $location.path('resources/' + resource._id);
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            }

            function findAllResources() {
                $scope.resources = Resources.query();
            }

            function findOneResource() {
                Resources.get({
                    resourceId: $stateParams.resourceId
                }).$promise.then(function(rsc) {
                        $scope.resource = rsc;
                        $scope.options = {scrollwheel: false};
                        var coordinates = $scope.resource.place.coordinates;

                        $scope.map = {
                            center: {
                                latitude: coordinates.lat,
                                longitude: coordinates.lng
                            },
                            marker : {
                                id: 0,
                                coords: {
                                    latitude: coordinates.lat,
                                    longitude: coordinates.lng
                                },
                                options: { draggable: false }
                            },
                            zoom: 16
                        }
                    });
            };
        }
    ]);
})(window.angular, window._);


/*
 $scope.addTime = function(){};
 $scope.addPlace = function(){};
 $scope.addThingSummary = function(){};
 $scope.addThingTaxonomy = function(){};

 $scope.updateTime = function(){};
 $scope.updatePlace = function(){};
 $scope.updateThingSummary = function(){};
 $scope.updateThingTaxonomy = function(){};

 $scope.deleteResource = function(){};
 $scope.createResource = function(){};
 $scope.updateResource = function(){};
 $scope.findResource = function(){};


 */


/**
 * Create Classification Directive
 *
 * SCOPE
 *
 * Attributes:
 *
 * * thing (Object):  resource.thing
 * * taxonomy (Object): TaxonomyService
 * * type (String): resource.thing.type
 *
 * Methods:
 * * setType(type)
 * * addSubtype(subtype)
 * * removeSubtype(subtype)
 *
 *
 *
 @name name - the name of the ngdoc document
 @param {type} name description - describes a parameter of a function
 @returns {type} description - describes what a function returns
 @requires - normally indicates that a JavaScript module is required; in an Angular service it is used to describe what other services this service relies on
 @property - describes a property of an object
 @description - used to provide a description of a component in markdown
 @link - specifies a link to a URL or a type in the API reference. NOTE: to link to ng.$rootScope.Scope#$on insert methods_ between # and the actual method name: {@link ng.$rootScope.Scope#methods_$on listen}. Same goes for properties and events.
 @example - specifies an example that will be formatted as a code block
 @deprecated - specifies that the following code is deprecated and should not be used
 @this - specifies what this refers to in the context of a documented function
 @ngdoc - specifies the type of thing being documented. See below for more detail.
 @scope - specifies that the documented directive will create a new scope
 @priority - specifies the documented directive's priority
 @animations - specifies the animations that the documented directive supports
 @restrict - specifies how directives should be shown in the usage section. For example, for [E]lement, [A]ttribute, and [C]lass, use @restrict ECA
 @methodOf type - links a method to the object/service where it is defined
 @propertyOf type - links a property to the object/service where it is defined
 @eventOf type - links a method to the object/service where it is defined
 @eventType emit|broadcast - specifies whether the event is emitted or broadcast

 overview - Give an overview of the file/module being documented
 interface - Describe the interface of an object or service, specified by the @name directive. (abstract: use @object or @service instead)
 service - Describe an AngularJS service, such as $compile or $http, for instance.
 object - Describe a well defined object (often exposed as a service)
 function - Describe a function that will be available to other methods (such as a helper function within the ng module)
 method - Describe a method on an object/service
 property - Describe a property on an object/service
 event - Describe an AngularJS event that will propagate through the $scope tree.
 directive - Describe an AngularJS directive
 filter - Describe an AngularJS filter
 inputType - Describe a specific type of AngularJS input directive (such as text, email or checkbox)
 error - Describe a minErr error message

 Currently the @ngdoc tag can contain one of the following values:

 error - only used for minerr documentation
 function - generally used for global functions but sometimes "misused" for a service or method
 property - generally used for properties on services but also used for angular.version
 overview - generally used for modules and ngdocs but also used for ng.$rootElement and angular.mock (should be objects?)
 object - generally used for services that are not straight functions
 method - used for methods on services and types (such as angular.Module, etc)
 interface - only used for angular.Module in angular-load.js
 service - used only occasionally for some angular services
 directive - used for angular directives
 inputType - used for input element specific directives (such as input[checkbox])
 event - used for events on objects (mostly services)
 filter - used for angular filters (although there may be one or two that use function)

 We ought to consolidate to:

 function - for global functions
 object - for global objects
 interface - for global interfaces
 type - for constructors
 module - instead of overview for modules
 service - instead of object/function for angular services
 serviceProvider - instead of function/object for angular service providers
 directive - as-is (but also include inputTypes, e.g input[checkbox])
 filter - as-is
 method - as-is
 property - as-is (but change angular.version to object)
 event - as-is
 Anything else is just a descriptive name for the content, such as error, guide, tutorial, etc.



 */
