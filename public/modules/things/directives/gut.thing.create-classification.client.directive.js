(function (angular, _) {
  'use strict';

  angular.module('things')

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
   */

    .directive('createClassification',
    ['things_templates', 'TaxonomyService',
      function(templates, ResourceTaxonomy) {
        var templateUrl = templates.main + 'gut.thing.create-classification.client.template.html';

        return {
          restrict: 'E',
          templateUrl: templateUrl,
          scope : {
            thing: '='
          },

          controller: function($scope) {
            var type,
              subtypeChoices = [],
              subtypeChosen = [];
            Object.defineProperties($scope, {
              taxonomy: {
                enumerable:true,
                get: function() {
                  return ResourceTaxonomy;
                }
              },
              type : {
                enumerable:true,
                get: function() {
                  return type;
                },
                set: function(val) {
                  type = val;
                }
              },

              subtypeChoices : {
                enumerable:true,
                get: function() {
                  return subtypeChoices;
                },
                set: function(val) {
                  subtypeChoices = val;
                }
              },

              subtypeChosen : {
                enumerable:true,
                get: function() {
                  return subtypeChosen;
                },
                set: function(val) {
                  subtypeChosen = val;
                }
              },

              setType: {
                enumerable: true,
                value: function(type) {
                  console.log('setting type');
                  $scope.thing.taxonomy.type = type;
                  $scope.type = type;
                  $scope.subtypeChoices =
                    _.find(ResourceTaxonomy, {type: type}).subtypes;
                }
              },
              addSubtype: {
                enumerable: true,
                value: function addSubtype(subtype) {
                  console.log('adding subtype', subtype);
                  var idx = _.indexOf(subtypeChosen, subtype);
                  console.log('subtype idx', idx)
                  if (idx < 0) {
                    subtypeChosen.push(subtype);
                  }
                  console.log('chosen subtypes are', subtypeChosen)

                  $scope.thing.taxonomy.subtypes = subtypeChosen;
                }
              },
              removeSubtype: {
                enumerable: true,
                value: function addSubtype(subtype) {
                  console.log('adding subtype', subtype);
                  var subtypes = $scope.thing.taxonomy.subtypes;
                  var idx = _.indexOf(subtypes, subtype);
                  if (idx < 0) {
                    subtypes.push(subtype);
                  }
                }
              }
            });
          }
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
})(window.angular,  window._);


/*
 function ($scope) {


 var isClassificationSet = false,
 type = '',
 subtypeChoices = [];

 Object.defineProperties($scope, {
 toggleSubtype : {
 enumerable: true,
 value: function(subtype) {

 var idx = _.findIndex($scope.thing.taxonomy.subtypes, subtype);
 if (idx < 0) {
 $scope.thing.taxonomy.subtypes.push(subtype);
 } else {
 $scope.thing.taxonomy.subtypes.splice(idx, 1);
 }
 }
 },
 type : {
 enumerable:true,
 set: function(val) {
 type = val;
 },
 get: function() {
 return type;
 }
 },
 isClassificationSet : {
 enumerable:true,
 set: function(val) {
 isClassificationSet = val;
 },
 get: function() {
 return isClassificationSet;
 }
 },
 setType: {
 enumerable: true,
 value: function(type) {
 $scope.type = type;
 $scope.thing.taxonomy.type = type;
 $scope.subtypeChoices = _.find(ResourceTaxonomy, {type: type}).subtypes;
 }
 },
 unsetType: {
 enumerable: true,
 value: function(type) {
 }
 },
 addDetail: {
 enumerable: true,
 value: function(details) {

 }
 }

 })
 }
 */