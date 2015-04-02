(function () {
  'use strict';

    function ClassifyThingController($scope, ResourceTaxonomy) {

        $scope.type = '';
        $scope.subtypeChoices = [];
        $scope.subtypeChosen = '';
        $scope.details = [];
        $scope.isTaxonomySet=false;
        $scope.areDetailsSet=false;
        $scope.taxonomy = ResourceTaxonomy;
        $scope.setType = setType;
        $scope.unsetType = unsetType;
        $scope.addSubtype = addSubtype;
        $scope.addDetail = addDetail;
        $scope.removeSubtype = removeSubtype;
        $scope.removeDetail = removeDetail;


        function setType(type) {
            $scope.thing.taxonomy.type = type;
            $scope.type = type;
            $scope.subtypeChoices =
                _.find(ResourceTaxonomy, {type: type}).subtypes;
        }

        function unsetType (type) {
            $scope.thing.taxonomy.type = '';
            $scope.type = '';
            $scope.subtypeChoices = [];
            $scope.isTaxonomySet = false;
        }

        function addSubtype(subtype) {
            var idx = _.indexOf(subtypeChosen, subtype);
            if (idx < 0) {
                subtypeChosen.push(subtype);
            }
            $scope.thing.taxonomy.subtypes = subtypeChosen;
        }

        function removeSubtype(subtype) {
            var idx= _.indexOf(subtypeChosen, subtype);;
            if (idx >= 0) {
                subtypeChosen.splice(idx, 1);
            }
            $scope.thing.subtypeChosen = subtypeChosen;
        }

        function addDetail(detail) {
            if (_.indexOf(details, detail) < 0) {
                details.push(detail);
            }
            $scope.thing.details = details;
        }

        function removeDetail(detail) {
            var idx= _.indexOf(details, detail);;
            if (idx >= 0) {
                details.splice(idx, 1);
            }
            $scope.thing.details = details;
        }
    }



  angular.module('things')


    .directive('createClassification',
    ['things_templates',
      function(templates) {
        var templateUrl = templates.main + 'gut.thing.create-classification.client.template.html';

        return {
          restrict: 'E',
          templateUrl: templateUrl,
          scope : {
            thing: '='
          },

          controller: ['$scope', 'TaxonomyService',
              ClassifyThingController ($scope, TaxonomyService)]

        };
      }]
  )
    .directive('subtype', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing.subtype.client.template.html';
      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          name: '='
        }
      };
    }]
  )
})();
