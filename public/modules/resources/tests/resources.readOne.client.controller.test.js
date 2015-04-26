(function() {
  describe('Resources ReadOne Controller', function() {

    var scope, ReadOneCtrl,
         rid, resourceAtRID, resourceMap;

    var mockResourceService;
    beforeEach(module('guttersnipe'));

    beforeEach(inject(function($q, $controller, $rootScope,
                               _$stateParams_, _Authentication_) {
      rid = '552fef942d97afec2a969c8b'
      resourceAtRID = {"_id":"552fef942d97afec2a969c8b","__v":0,"updated":"2015-04-16T17:21:24.400Z","created":"2015-04-16T17:21:24.400Z","time":{"notes":"8:45 when all the employees leave the store. Trash is collected between 10:30 p and 12:30a. One source says nothing is out on Saturdays.","schedules":[{"recurrenceType":true,"start":"2015-04-13T04:45:00.000Z","end":"2015-04-13T06:59:59.000Z","_id":"552fef942d97afec2a969c8c"}]},"place":{"address":"175 Remsen St Brooklyn, NY 11201","notes":"Remsen St across from Borough Hall, between Court and Clinton Sts, Brooklyn","coordinates":{"lat":40.693483,"lng":-73.991377}},"thing":{"taxonomy":{"type":"food","details":[],"subtypes":["dumpster"]},"description":{"summary":" Lots of locals count on finding greens and produce in particular. Fewer go thru the bags, which contain health bread, and often assorted packaged health foods, and small amounts of bulk foods (grains, beans, nuts, coffee) that can be gleaned from the not-quite-emptied heavy brown bags.","headline":"Perelandra","method":"Regular curbside bags, plus cardboard boxes set to the side with most of the produce (what foragers don’t take gets composted)."}},"comments":[]};
      resourceMap =  {"center":{"latitude":40.693483,"longitude":-73.991377},"marker":{"id":0,"coords":{"latitude":40.693483,"longitude":-73.991377},"options":{"draggable":false}},"zoom":16};

        var foo = { center : { latitude : 40.693483, longitude : -73.991377 }, marker : { id : 0, coords : { latitude : 40.693483, longitude : -73.991377 }, options : { draggable : false } }, zoom : 16 };
        var moo =  { center : { latitude : 40.693483, longitude : -73.991377 }, marker : { id : 0, coords : { latitude : 40.693483, longitude : -73.991377 }, options : { draggable : false } }, zoom : 16 }

        scope = $rootScope.$new();
      var $stateParams = _$stateParams_;
      $stateParams.resourceId = rid;

        var createPromise = function(returnData) {
            var deferred = $q.defer();
            deferred.resolve(returnData);
            return deferred.promise;
        };


      mockResourceService = {
        getOneResource : function(id) {
          if (id === rid) {
            return createPromise(resourceAtRID);
          }
        }
      };

      ReadOneCtrl = $controller("ResourcesReadOneController", {
        $scope: scope,
        $stateParams: $stateParams,
        Resources: mockResourceService,
        Authentication: _Authentication_
      });
        $rootScope.$apply();
    }));

    it('should read one resource', function(){
      expect(scope.resource).toEqual(resourceAtRID);
    });

      it('should set up a map correctly', function(){
          expect(scope.map.center).toEqual(resourceMap.center);
      });
  })
})();
