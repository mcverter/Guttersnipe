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
              subtypeChosen = [],
              details = [],
              isTaxonomySet=false,
              areDetailsSet=false;
            Object.defineProperties($scope, {
              taxonomy: {
                enumerable:true,
                get: function() {
                  return ResourceTaxonomy;
                }
              },
              isTaxonomySet: {
                enumerable:true,
                get: function() {
                  return isTaxonomySet;
                },
                set: function(val) {
                  isTaxonomySet = val;
                }
              },
              areDetailsSet: {
                enumerable:true,
                get: function() {
                  return areDetailsSet;
                },
                set: function(val) {
                  areDetailsSet = val;
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


              details : {
                enumerable:true,
                get: function() {
                  return details;
                },
                set: function(val) {
                  details = val;
                }
              },

              setType: {
                enumerable: true,
                value: function(type) {
                  $scope.thing.taxonomy.type = type;
                  $scope.type = type;
                  $scope.subtypeChoices =
                    _.find(ResourceTaxonomy, {type: type}).subtypes;
                }
              },
              unsetType: {
                enumerable: true,
                value: function(type) {
                  $scope.thing.taxonomy.type = '';
                  $scope.type = '';
                  $scope.subtypeChoices = [];
                  $scope.isTaxonomySet = false;
                }
              },
              addSubtype: {
                enumerable: true,
                value: function addSubtype(subtype) {
                  var idx = _.indexOf(subtypeChosen, subtype);
                  if (idx < 0) {
                    subtypeChosen.push(subtype);
                  }
                  $scope.thing.taxonomy.subtypes = subtypeChosen;
                }
              },
              removeSubtype: {
                enumerable: true,
                value: function removeSubtype(subtype) {
                  var idx= _.indexOf(subtypeChosen, subtype);;
                  if (idx >= 0) {
                    subtypeChosen.splice(idx, 1);
                  }
                  $scope.thing.subtypeChosen = subtypeChosen;
                }
              },
              addDetail : {
                enumerable: true,
                value: function addDetail(detail) {
                  if (_.indexOf(details, detail) < 0) {
                    details.push(detail);
                  }
                  $scope.thing.details = details;
                }
              },
              removeDetail : {
                enumerable: true,
                value: function removeDetail(detail) {
                  var idx= _.indexOf(details, detail);;
                  if (idx >= 0) {
                    details.splice(idx, 1);
                  }
                  $scope.thing.details = details;
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
