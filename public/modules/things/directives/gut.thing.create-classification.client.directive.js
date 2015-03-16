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
            var type;
            Object.defineProperties($scope, {
              type : {
                enumerable:true,
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
              },
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
              removeSubtype: {
                enumerable: true,
                value: function addSubtype(subtype) {
                  console.log('adding subtype', subtype);
                  var subtypes = $scope.thing.taxonomy.subtypes;
                  var idx = _.findIndex(subtypes, subtype);
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
  /**
   * Subtypes Input
   */
    .directive('subtypesInput', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing.subtypes-input.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  )

  /**
   * Subtypes Result
   */

    .directive('subtypesResult', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing.subtypes-result.client.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }])

    .directive('subtype', ['things_templates', function(templates) {
      var templateUrl = templates.main + 'thing.subtype.client.template.html';
      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope : {
          value: '='
        }
      };
    }]
  )
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