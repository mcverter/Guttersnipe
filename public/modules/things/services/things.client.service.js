
(function (angular, _) {
  'use strict';

  angular.module('things').factory('Things',
    [
      function() {

        console.log('in thing service');
        var thingFactory;

        var emptyThing = {
          description: {
            summary: '',
            notes: ''
          },
          taxonomy: {
            type: '',
            subtypes: [],
            details: []
          }
        };

        function Thing(description, taxonomy) {
          var self = this;
          if (!description || !description.summary) {
            console.error('Error:  No thing summary');
          }
          if (!taxonomy || !taxonomy.type) {
            console.error('Error:  No thing type');
          }
          self.description = description;
          self.taxonomy = taxonomy;
        }


        Thing.prototype = Object.create(Object.prototype, {
        });

        thingFactory = Object.create(Object.prototype, {
          emptyThing: {
            enumerable: true,
            get: function getEmptyThing() {
              return _.cloneDeep(emptyThing);
            }
          }
        });

        return thingFactory;
      }]
  );
})(window.angular, window._);

