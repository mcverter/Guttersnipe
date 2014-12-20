
(function (angular, app, _) {
  'use strict';
  app.factory('kropotkinService', ['$http', '$q', 'filePaths',
    function ($http, $q, filePaths) {
      return {
        getQuote: function() {
          var deferred = $q.defer();
          $http.get(filePaths.kropotkin + 'kropotkinConquestBread.txt')
            .success(function(data, status, headers, config){
              console.log("Success");
              var paragraphs = data.split("\n"),
                paraNum = Math.floor(Math.random() * paragraphs.length);
              deferred.resolve({
                quote: paragraphs[paraNum]
              });
            })
            .error(function(data, status, headers, config) {
              deferred.reject(status);
            });
          return deferred.promise;
        }
      }
    }]
  );
})(window.angular, window.guttersnipe, window._);


/*


 eventsApp.factory('eventData', function ($resource, $q) {
 var resource = $resource('/data/event/:id', {id: '@id'});
 return {
 getEvent: function () {
 var deferred = $q.defer();
 resource.get({id: 1},
 function (event) {
 deferred.resolve(event);
 },
 function (response) {
 deferred.reject(response);
 });

 return deferred.promise;
 },
 save: function(event) {
 var deferred = $q.defer();
 event.id = 999;
 resource.save(event,
 function(response) { deferred.resolve(response);},
 function(response) { deferred.reject(response);}
 );
 return deferred.promise;
 }
 };
 });



 $http.get('webtest.json').success(function(data) {
 deferred.resolve(data);
 });

      // return object
      var geocoder = {};

      // return object
      geocoder = Object.create(Object.prototype, {});

      var address = "73 St Pauls Place Brooklyn NY";
      var request = {
        method: 'GET',
        url: "http://www.google.com" //"rpc.geocoder.us/service/csv?address=" + address
      };



      $http.get("https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderService_V04_01.asmx")
        .success(function Response (response) {
          console.log("Response");
          console.log(response)
        });

      return geocoder;
    */
