(function() {
  describe('Resources ReadOne Controller', function() {

    var scope, ReadOneCtrl, resourceAtRID, rid;

    var mockResourceService;
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    beforeEach(module('resources'));

    beforeEach(inject(function($controller, $rootScope,
                               _$stateParams_, _Authentication_) {
      rid = '552fef942d97afec2a969c8b'
      resourceAtRID = {"_id":"552fef942d97afec2a969c8b","__v":0,"updated":"2015-04-16T17:21:24.400Z","created":"2015-04-16T17:21:24.400Z","time":{"notes":"8:45 when all the employees leave the store. Trash is collected between 10:30 p and 12:30a. One source says nothing is out on Saturdays.","schedules":[{"recurrenceType":true,"start":"2015-04-13T04:45:00.000Z","end":"2015-04-13T06:59:59.000Z","_id":"552fef942d97afec2a969c8c"}]},"place":{"address":"175 Remsen St Brooklyn, NY 11201","notes":"Remsen St across from Borough Hall, between Court and Clinton Sts, Brooklyn","coordinates":{"lat":40.693483,"lng":-73.991377}},"thing":{"taxonomy":{"type":"food","details":[],"subtypes":["dumpster"]},"description":{"summary":" Lots of locals count on finding greens and produce in particular. Fewer go thru the bags, which contain health bread, and often assorted packaged health foods, and small amounts of bulk foods (grains, beans, nuts, coffee) that can be gleaned from the not-quite-emptied heavy brown bags.","headline":"Perelandra","method":"Regular curbside bags, plus cardboard boxes set to the side with most of the produce (what foragers don’t take gets composted)."}},"comments":[]}
      scope = $rootScope.$new();
      $stateParams = _$stateParams_;
      $stateParams.resourceId = rid;

      mockResourceService = {
        getOneResource : function(id) {
          if (id === rid) {
            return resourceAtRID;
          }
        }
      };
      $controllerProvider = $controller;
      ReadOneCtrl = $controller("ResourcesReadOneController", {
        $scope: scope,
        $stateParams: $stateParams,
        Resources: mockResourceService,
        Authentication: _Authentication_
      });
    }));

    it('should read one resource', function(){
      expect(scope.resource).toBe(resourceAtRID);
    });
  })
})()


/*
 'use strict';

 describe('EventListController', function() {
 var scope, $controllerProvider, mockEventData, ctrl;

 beforeEach(module("eventsApp"));

 beforeEach(inject(function($controller, $rootScope) {
 scope = $rootScope.$new();
 mockEventData = sinon.stub({getAllEvents: function() {}});
 $controllerProvider = $controller;
 }));

 it('should set the scope events to the result of eventData.getAllEvents', function() {
 mockEventData.getAllEvents.returns(35);

 ctrl = $controllerProvider("EventListController", {$scope: scope, $location: {}, eventData: mockEventData});

 expect(scope.events).toBe(35);
 });

 it('should navigate to the correct url when navigateToDetails is called', function() {
 var mocklocation = sinon.stub({url: function() {}});
 ctrl = $controllerProvider("EventListController", {$scope: scope, $location: mocklocation, eventData: mockEventData});
 var event = {id: 23};

 scope.navigateToDetails(event);

 expect(mocklocation.url.calledWith("/event/23")).toBe(true);
 })

 });
 */