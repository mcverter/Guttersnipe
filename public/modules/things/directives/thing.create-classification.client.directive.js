(function () {
    'use strict';

    function ClassifyThingController($scope, ResourceTaxonomy) {

        $scope.type = '';
        $scope.subtypeChoices = [];
        $scope.subtypeChosen = [];
        $scope.details = [];
        $scope.areDetailsSet = false;
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

        function unsetType(type) {
            $scope.thing.taxonomy.type = '';
            $scope.type = '';
            $scope.subtypeChoices = [];
            $scope.isTaxonomySet = false;
        }

        function addSubtype(subtype) {
            var idx = _.indexOf($scope.subtypeChoices, subtype);
            $scope.subtypeChoices.splice(idx, 1);
            $scope.subtypeChosen.push(subtype);
            $scope.thing.taxonomy.subtypes = $scope.subtypeChosen;
        }

        function removeSubtype(subtype) {
            if (!$scope.confirmations.isCreateClassificationConfirmed) {
                var idx = _.indexOf($scope.subtypeChosen, subtype);
                $scope.subtypeChosen.splice(idx, 1);
                $scope.subtypeChoices.push(subtype);
                $scope.thing.subtypeChosen = $scope.subtypeChosen;
            }
        }

        function addDetail(detail) {
            if (_.indexOf($scope.details, detail) < 0) {
                $scope.details.push(detail);
            }
            $scope.detail = '';
            $scope.thing.details = $scope.details;
        }

        function removeDetail(detail) {
            if (!$scope.confirmations.isCreateClassificationConfirmed) {
                var idx = _.indexOf($scope.details, detail);
                if (idx >= 0) {
                    $scope.details.splice(idx, 1);
                }
                $scope.thing.details = $scope.details;
            }
        }
    }



    angular.module('things')


        .directive('createClassification',
        ['things_templates',
            function(templates) {
                var templateUrl = templates.main + 'thing.create-classification.client.template.html';

                return {
                    restrict: 'E',
                    templateUrl: templateUrl,
                    scope : {
                        thing: '=',
                        confirmations: '='
                    },

                    controller: ['$scope', 'TaxonomyService', ClassifyThingController]

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
