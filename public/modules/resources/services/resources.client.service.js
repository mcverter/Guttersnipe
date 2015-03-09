(function (angular, _) {
  'use strict';

//Resources service used for communicating with the resources REST endpoints
  angular.module('resources').factory('Resources', ['$resource',
    function($resource) {

      function transformSchedules(schedules) {
        _.forEach(schedules, function(sked){
          console.log ('Sked', sked);
          var startTime = Number(sked.startTime);

          if(startTime < 1200 ) {
            startTime = startTime + ' AM';
          } else {
            if (startTime > 1300) {
              startTime -= 1200;
            }
            startTime = startTime + ' PM';
          }
          sked.startTime = startTime;

          switch(sked.recurringDay) {
            case "all":
              sked.recurringDay = "day";
              break;
            case "mon":
              sked.recurringDay = "Monday";
              break;
            case "tue":
              sked.recurringDay = "Tuesday";
              break;
            case "wed":
              sked.recurringDay = "Wednesday";
              break;
            case "thu":
              sked.recurringDay = "Thursday";
              break;
            case "fri":
              sked.recurringDay = "Friday";
              break;
            case "sat":
              sked.recurringDay = "Saturday";
              break;
            case "sun":
              sked.recurringDay = "Sunday";
              break;
          }

          switch(sked.recurrenceType) {
            case "A":
              sked.recurrenceType = "Every";
              break;
            case "1":
              sked.recurrenceType = "First";
              break;
            case "2":
              sked.recurrenceType = "Second";
              break;
            case "3":
              sked.recurrenceType = "Third";
              break;
            case "4":
              sked.recurrenceType = "Fourth";
              break;
            case "L":
              sked.recurrenceType = "Last";
              break;

          }
        });
      }
/* LAKA-SHAKA-BOOM [{"_id":"54fb431401944afce2dfc3ac","headline":"Isaac's Bake Shop","__v":0,"updated":"2015-03-07T18:27:32.066Z","created":"2015-03-07T18:27:32.066Z","time":{"schedules":[{"recurringDay":"fri","recurrenceType":"A","startTime":2100,"duration":120,"_id":"54fb431401944afce2dfc3ad"}]},"place":{"address":"1419 Avenue J Brooklyn, NY 11230","coordinates":{"lat":40.62539,"lng":-73.961645}},"thing":{"taxonomy":{"type":"food","details":[],"subtypes":["dumpster"]},"description":{"summary":"Bags on the street of bread and pastries, particularly on Friday evening. "}}},{"_id":"54fb431401944afce2dfc3aa","headline":"New Banana King","__v":0,"updated":"2015-03-07T18:27:32.065Z","created":"2015-03-07T18:27:32.065Z","time":{"schedules":[{"recurringDay":"all","recurrenceType":"A","startTime":2300,"duration":120,"_id":"54fb431401944afce2dfc3ab"}]},"place":{"address":"1123 Avenue J Brooklyn, NY 11230","coordinates":{"lat":40.625042,"lng":-73.964342}},"thing":{"taxonomy":{"type":"food","details":[],"subtypes":["dumpster"]},"description":{"summary":"As late at night as you can stand, on E 12th Street, big black plastic bags. This store stays open very late and some of the managers will diligently shoo you away. They throw out huge quantities of produce, seemingly entire cases of stuff not up to their standard. My partner and I have made gallons of cider from a single night’s pickup of apples and pears, for instance. Other typical mass dumps include bananas and tomatoes. Be prepared to can, dry, freeze or ferment. "}}},{"_id":"54fb431401944afce2dfc3a8","headline":" Associated Supermarket","__v":0,"updated":"2015-03-07T18:27:32.064Z","created":"2015-03-07T18:27:32.064Z","time":{"notes":"As early as 7pm, but later means less hassle.","schedules":[{"recurringDay":"all","recurrenceType":"A","startTime":1900,"duration":120,"_id":"54fb431401944afce2dfc3a9"}]},"place":{"address":"1413 Avenue J Brooklyn, NY 11230","coordinates":{"lat":40.6253213,"lng":-73.9618105}},"thing":{"taxonomy":{"type":"food","details":[],"subtypes":["dumpster"]},"description":{"summary":" Loads of black bags of fruit and vegetables There’s also generally 1 very heavy bag of raw meat that’s been taken out of the packages. The managers are generally friendly but customers sometimes complain, so try to come after dark and be fairly discreet."}}},{"_id":"54fb431401944afce2dfc3a1","headline":"Union Market","__v":0,"updated":"2015-03-07T18:27:32.059Z","created":"2015-03-07T18:27:32.059Z","time":{"schedules":[{"recurringDay":"mon","recurrenceType":"A","startTime":2100,"duration":120,"_id":"54fb431401944afce2dfc3a7"},{"recurringDay":"tue","recurrenceType":"A","startTime":2100,"duration":120,"_id":"54fb431401944afce2dfc3a6"},{"recurringDay":"wed","recurrenceType":"A","startTime":2100,"duration":120,"_id":"54fb431401944afce2dfc3a5"},{"recurringDay":"thu","recurrenceType":"A","startTime":2100,"duration":120,"_id":"54fb431401944afce2dfc3a4"},{"recurringDay":"fri","recurrenceType":"A","startTime":2100,"duration":120,"_id":"54fb431401944afce2dfc3a3"},{"recurringDay":"sun","recurrenceType":"A","startTime":2100,"duration":120,"_id":"54fb431401944afce2dfc3a2"}]},"place":{"address":"288 Court St Brooklyn, NY 11231","notes":"Black plastic garbage bags on the curb.","coordinates":{"lat":40.684389,"lng":-73.995308}},"thing":{"taxonomy":{"type":"food","details":[],"subtypes":["dumpster"]},"description":{"summary":"For those on bicycle or who don’t mind a little walk, this is a great alternative to the Trader Joe’s at Atlantic and Court. It’s a high-end supermarket mini-chain that is just far enough from other stores that it gets few dumpster divers. Finds have included loads of packaged and unpackaged bread, produce, dairy products, quarts of prepared soup (generally not vegetarian), fancy desserts, fancy fresh pasta. "}}},{"_id":"54fb431401944afce2dfc39a","headline":"Caputo's Bakery","__v":0,"updated":"2015-03-07T18:27:32.054Z","created":"2015-03-07T18:27:32.054Z","time":{"schedules":[{"recurringDay":"mon","recurrenceType":"A","startTime":2200,"duration":120,"_id":"54fb431401944afce2dfc3a0"},{"recurringDay":"tue","recurrenceType":"A","startTime":2200,"duration":120,"_id":"54fb431401944afce2dfc39f"},{"recurringDay":"wed","recurrenceType":"A","startTime":2200,"duration":120,"_id":"54fb431401944afce2dfc39e"},{"recurringDay":"thu","recurrenceType":"A","startTime":2200,"duration":120,"_id":"54fb431401944afce2dfc39d"},{"recurringDay":"fri","recurrenceType":"A","startTime":2200,"duration":120,"_id":"54fb431401944afce2dfc39c"},{"recurringDay":"sun","recurrenceType":"A","startTime":2200,"duration":120,"_id":"54fb431401944afce2dfc39b"}]},"place":{"address":"329 Court St Brooklyn, NY 11231","notes":"Four garbage cans.","coordinates":{"lat":40.682846,"lng":-73.99549}},"thing":{"taxonomy":{"type":"food","details":[],"subtypes":["dumpster"]},"description":{"summary":"Italian Bakery.  Excellent bread and cookies. Baker is on site all night long; move fast. Also, vegetarians beware the sausage bread. "}}},{"_id":"54fb431401944afce2dfc398","headline":"Gristedes","notes":"Clear garbage bags out front.","__v":0,"updated":"2015-03-07T18:27:32.053Z","created":"2015-03-07T18:27:32.053Z","time":{"notes":"After 9:30p","schedules":[{"recurringDay":"all","recurrenceType":"A","startTime":2130,"duration":120,"_id":"54fb431401944afce2dfc399"}]},"place":{"address":"101 Clark St Brooklyn, NY 11201","coordinates":{"lat":40.6975689,"lng":-73.9926592}},"thing":{"taxonomy":{"type":"food","details":[],"subtypes":["dumpster"]},"description":{"summary":"Routinely hit or miss, but the hits can be great: dozens of eggs, bags of chocolate chips, cheese. "}}},{"_id":"54fb431401944afce2dfc391","headline":"Garden of Eden Gourmet","method":"Three dumpsters on the curb plus “compost” mini dumpsters.","__v":0,"updated":"2015-03-07T18:27:32.052Z","created":"2015-03-07T18:27:32.052Z","time":{"schedules":[{"recurringDay":"mon","recurrenceType":"A","startTime":2200,"duration":120,"_id":"54fb431401944afce2dfc397"},{"recurringDay":"tue","recurrenceType":"A","startTime":2200,"duration":120,"_id":"54fb431401944afce2dfc396"},{"recurringDay":"wed","recurrenceType":"A","startTime":2200,"duration":120,"_id":"54fb431401944afce2dfc395"},{"recurringDay":"thu","recurrenceType":"A","startTime":2200,"duration":120,"_id":"54fb431401944afce2dfc394"},{"recurringDay":"fri","recurrenceType":"A","startTime":2200,"duration":120,"_id":"54fb431401944afce2dfc393"},{"recurringDay":"sun","recurrenceType":"A","startTime":2200,"duration":120,"_id":"54fb431401944afce2dfc392"}]},"place":{"address":"180 Montague St #1 Brooklyn, NY 11201 ","coordinates":{"lat":40.693922,"lng":-73.991764}},"thing":{"taxonomy":{"type":"food","details":[],"subtypes":["dumpster"]},"description":{"summary":"Messy and hit-or-miss, but can yield a surprising amount of fresh vegetables,  prepared foods, yogurts and so forth. The “compost” bins are well worth digging down a ways, as they’ve yielded lots of whole fruit and veg."}}},{"_id":"54fb431401944afce2dfc38f","headline":"Trader Joe's","method":"On the south side of Atlantic Avenue near Court St in big dumpsters.","notes":"Be forewarned, the initial reaction of this store’s management was to have the police ticket dumpster divers for trespass or littering","__v":0,"updated":"2015-03-07T18:27:32.049Z","created":"2015-03-07T18:27:32.049Z","time":{"notes":"time. *When:* Lately (fall 2012), usually not until about midnight; sometimes earlier.","schedules":[]},"place":{"address":"  130 Court St  Brooklyn, NY 11201","notes":"On the south side of Atlantic Avenue near Court St in big dumpsters.","coordinates":{"lat":40.689613,"lng":-73.99243}},"thing":{"taxonomy":{"type":"food","details":[],"subtypes":["dumpster"]},"description":{"summary":" Dumpster divers from all 4 boroughs have been known to make the trip. On some nights TJs puts out upwards of 6 dumpsters, at least half of which are filled top to bottom with quality food. Sometimes the scene gets weirdly competitive, with dumpster divers seeming to forget that the area is packed with other wasteful stores.Lots of locals count on finding greens and produce in particular. Fewer go thru the bags, which contain health bread, and often assorted packaged health foods, and small amounts of bulk foods (grains, beans, nuts, coffee) that can be gleaned from the not-quite-emptied heavy brown bags."}}},{"_id":"54fb431401944afce2dfc388","headline":"Perelandra","method":"Regular curbside bags, plus cardboard boxes set to the side with most of the produce (what foragers don’t take gets composted).","__v":0,"updated":"2015-03-07T18:27:32.043Z","created":"2015-03-07T18:27:32.039Z","time":{"notes":"8:45 when all the employees leave the store. Trash is collected between 10:30 p and 12:30a. One source says nothing is out on Saturdays.","schedules":[{"recurringDay":"mon","recurrenceType":"A","startTime":2045,"duration":120,"_id":"54fb431401944afce2dfc38e"},{"recurringDay":"tue","recurrenceType":"A","startTime":2045,"duration":120,"_id":"54fb431401944afce2dfc38d"},{"recurringDay":"wed","recurrenceType":"A","startTime":2045,"duration":120,"_id":"54fb431401944afce2dfc38c"},{"recurringDay":"thu","recurrenceType":"A","startTime":2045,"duration":120,"_id":"54fb431401944afce2dfc38b"},{"recurringDay":"fri","recurrenceType":"A","startTime":2045,"duration":120,"_id":"54fb431401944afce2dfc38a"},{"recurringDay":"sun","recurrenceType":"A","startTime":2045,"duration":120,"_id":"54fb431401944afce2dfc389"}]},"place":{"address":"175 Remsen St    Brooklyn, NY 11201","notes":"Remsen St across from Borough Hall, between Court and Clinton Sts, Brooklyn","coordinates":{"lat":40.693483,"lng":-73.991377}},"thing":{"taxonomy":{"type":"food","details":[],"subtypes":["dumpster"]},"description":{"summary":" Lots of locals count on finding greens and produce in particular. Fewer go thru the bags, which contain health bread, and often assorted packaged health foods, and small amounts of bulk foods (grains, beans, nuts, coffee) that can be gleaned from the not-quite-emptied heavy brown bags."}}}] */
      var transformResponseList = function(data){
        data = angular.fromJson(data);
        _.forEach(data, function(rsc){
          console.log('rsc is ', rsc);
          transformSchedules(rsc.time.schedules);
        });
        return data;
      };

/*     BOOM-SHAKA-LAKA {"_id":"54fb431401944afce2dfc3aa","headline":"New Banana King","__v":0,"updated":"2015-03-07T18:27:32.065Z","created":"2015-03-07T18:27:32.065Z","time":{"schedules":[{"recurringDay":"all","recurrenceType":"A","startTime":2300,"duration":120,"_id":"54fb431401944afce2dfc3ab"}]},"place":{"address":"1123 Avenue J Brooklyn, NY 11230","coordinates":{"lat":40.625042,"lng":-73.964342}},"thing":{"taxonomy":{"type":"food","details":[],"subtypes":["dumpster"]},"description":{"summary":"As late at night as you can stand, on E 12th Street, big black plastic bags. This store stays open very late and some of the managers will diligently shoo you away. They throw out huge quantities of produce, seemingly entire cases of stuff not up to their standard. My partner and I have made gallons of cider from a single night’s pickup of apples and pears, for instance. Other typical mass dumps include bananas and tomatoes. Be prepared to can, dry, freeze or ferment. "}}} */
      var transformResponseSingle = function(data, headers) {
        data = angular.fromJson(data);
        transformSchedules(data.time.schedules);
        return data;
      };

      function Resource (data) {
        var self = this;
        self.headline = data.headline || '';
        self.notes = data.headline || '';
        self.method = data.method || '';
        self.place = new Place(data.place);
        self.time = new Time(data.time);
        self.thing = new Thing(data.thing);

      }
      var foo =  $resource(
        'resources/:resourceId',
        {
          resourceId: '@_id'
        },
        {
          query: {
            isArray: true,
            method: 'GET'
            ,transformResponse: transformResponseList
          },
          get: {
            method: 'GET',
            transformResponse: transformResponseSingle
          },
          update: {
            method: 'PUT'
          }
        });
      console.log ("Response from query is ", foo);

      return foo;
    }
  ]);
})(window.angular,  window._);




/***************************************************
 angular.module('itemServices', ['ngResource'])
 .factory('Item', ['$resource',
 function ($resource) {
      return $resource('items/:id',
        {id: '@id'},
 {
   query: {
     isArray: true,
     method: 'GET',
     params: {},
     transformResponse: function (data) {
       return angular.fromJson(data).body.rows
     }
   },
   get: {method: 'GET', params: {id: '@id'}},
 save: {method: 'POST'},
 update: {method: 'PUT', params: {id: '@id'}},
 delete: { method: 'DELETE', params: {} }
 });
 }]);

 ***********************************************
 ***********************************************
 ***********************************************

 angular.module('services', ['ngResource']).
 factory("someService", function ($resource) {
    return $resource(
      '/', {}, {
        get: {
          method: 'GET',
          transformResponse: function(data, headers){
            //MESS WITH THE DATA
            data = {};
            data.coolThing = 'BOOM-SHAKA-LAKA';
            return data;
          }
        }
      }

    );
  });

 var app = angular.module('myApp', ['ngResource', 'services']);


 app.controller('MainController', ['$scope', 'someService', function ($scope, svc) {

  $scope.title = 'Transform Test';

  svc.get(function (data) {
    console.log(data.coolThing);
  }, function () {
    console.log('FAILURE');
  });

}]);



 **************************************
 *
 *
 var ResourceSchema = new Schema({
  method: {
    type: String,
    required: false
  },
  notes:  {
    type: String,
    required: false
  },
  headline : {
    type: String,
    required: true
  },
  thing: {
    description: {
      summary : {
        type: String,
        required: true
      },
      notes : {
        type: String,
        required: false
      }
    },
    taxonomy : {
      type : {
        type: String,
        required: true
      },
      subtypes : [String],
      details : [String]
    }
  },
  place: {
    coordinates : {
      lat : {
        type: Number,
        required: true
      },
      lng : {
        type: Number,
        required: true
      }
    },
    name: {
      type: String
    },
    address : {
      type: String,
      required: true
    },
    notes : {
      type: String,
      required: false
    }
  },


  time: {
    schedules : [
      {
        punctualDate: {
          type: Date
        },
        recurringDay : {
          type: String,
          enum: weekdayEnum
        },
        recurrenceType: {
          type: String,
          enum: recurrenceTypeEnum
        },
        startTime : {
          type: Number,
          required: true
        },
        duration : {
          type: Number,
          required: true
        }
      }
    ],
    notes : {
      type: String,
      required: false
    }
  },


  created: {
    type: Date,
    default: Date.now
  },

  updated: {
    type: Date,
    default: Date.now
  },

  createdBy: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  updatedBy: {
    type: Schema.ObjectId,
    ref: 'User'
  }

}
 */
