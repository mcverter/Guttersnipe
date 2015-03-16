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
   * * thing (Object)
   * * taxonomy (Object)
   * * type (String)
   *
   * Methods:
   * * addSubtype(subtype)
   * * setType(type)
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
            var type;
            Object.defineProperties($scope, {
              addSubtype: {
                enumerable: true,
                value: function addSubtype(subtype) {
                  console.log('adding subtype', subtype);
                  var subtypes = $scope.thing.taxonomy.subtypes;
                  var idx = _.findIndex(subtypes, subtype);
                  if (idx < 0) {
                    subtypes.push(subtype);
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

              setType: {
                enumerable: true,
                value: function(type) {
                  console.log('setting type');
                  $scope.type = type;
                  $scope.thing.taxonomy.type = type;
                  $scope.subtypechoices = _.find(ResourceTaxonomy, {type: type}).subtypes;
                }
              }
            });
          }
        };
      }]
  )

    .directive('subtypesInput', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing.subtypes-input.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          subtypes: '=',
          addArray: '='
        },
        controller: function($scope) {
        }
      }
    }]
  )

    .directive('subtypeChoice', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing.subtype-choice.client.template.html';
      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          value: '=',
          addArray: '='
        },
        controller: function($scope) {
        }
      };
    }]
  )
    .directive('subtypeChosen', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing.subtype-chosen.client.template.html';
      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          value: '=',
        }
      };
    }]
  )
    .directive('subtypesResult', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing.subtypes-result.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope: {
          subtypes: '='
        }
      }
    }
    ])

})(window.angular,  window._);


/*
 function ($scope) {


 var isClassificationSet = false,
 type = '',
 subtypechoices = [];

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
 $scope.subtypechoices = _.find(ResourceTaxonomy, {type: type}).subtypes;
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