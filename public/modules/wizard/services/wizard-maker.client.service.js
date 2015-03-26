(function () {
  'use strict';

//Resources service used for communicating with the resources REST endpoints
  angular.module('wizard').factory('WizardMaker',
    [
    function() {
      var stages = [];

      function Stage(data) {
        var self = this;
        self.data = data;

      }

      function Stages() {
        var self = this;
        self.sequence = stages;
      }

      var resourceCreateStages = [
        { sref:".agreement", name: "Agree"},
        { sref:".instructions", name: "Learn"},
        { sref:".summary", name: "Describe"},
        { sref:".type", name: "Classify"},
        { sref:".map", name: "Map"},
        { sref:".time", name: "Schedule"},
        { sref:".confirmation", name: "Confirm"}
      ];

      var presentationStages = [
        { sref:"CCNY.front", name: "Start"},
        { sref:"CCNY.objective", name: "Objective"},
        { sref:"CCNY.audience", name: "Audience"},
        { sref:"CCNY.consultations", name: "Consultations"},
        { sref:"CCNY.otherSites", name: "Other Sites"},
        { sref:"CCNY.questionOfMethod", name: "Q:Method"},
        { sref:"CCNY.answerOfMethod", name: "A:Method"},
        { sref:"CCNY.example", name: "Example"},
        { sref:"CCNY.report", name: "Report"},
        { sref:"CCNY.result", name: "Result"},
        { sref:"CCNY.research", name: "Research"},
        { sref:"CCNY.fin", name: "Fin"}
      ];




      Stage.prototype = Object.create(Object.prototype, {
        title: {
          enumerable: true,
          get: function getTitle() {
            var self = this;
            return self.data.title;
          }
        },


        sref: {
          enumerable: true,
          get: function getSref() {
            var self = this;
            return self.data.sref;
          }
        }
      });


      Stages.prototype = Object.create(Object.prototype, {
        current: {
          enumerable: true,
          get: function getCurrent() {
            var self = this;
            return self.current;
          }
        },

        next: {
          enumerable: true,
          get: function getNext() {
            var self = this,
              idx = _.find(stages, self);
            if (idx === stages.length -1) {
              return undefined;
            } else {
              return stages[idx+1];
            }
          }
        },
        prev: {
          enumerable: true,
          get: function getPrev() {
            var self = this,
              idx = _.find(stages, self);
            if (idx === 0) {
              return undefined;
            } else {
              return stages[idx-1];
            }
          }
        }
      });

    }]);
})();
