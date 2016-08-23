/**
* @class CategoryCtrl (Controller): 
     Puts data on the $scope for ../views/category.html
     This creates all pages corresponding
       to Categories (ui.Categories).
    These are the same as top-level Links.
    In the UI, they are visible in the top nav bar 
*/
(function (angular, app, _) {
  'use strict';

  app.controller('CategoryCtrl', ['$scope', '$log', '$routeParams', '$category', '$debug', '$sce',
      function ($scope, $log, $routeParams, $category, $debug, $sce) {
        var categoryId = $routeParams.categoryId,
          currentLink,
          activeFilter,
          filteredLink,
          filterChildren = function filterChildren(link, filter) {
            var children = _.clone(link.children);
            Object.defineProperty(link, 'children', {
              enumerable: true,
              get: _.memoize(_.partial(doFilterChidren, children, filter))
            });
          },
          doFilterChidren = function doFilterChildren(children, filter) {
            filter = filter.toLowerCase();

            return _.reduce(children, function (acc, child) {
              var name = (child.name || '').toLowerCase(),
                  description = (child.description || '').toLowerCase();

              if (name.indexOf(filter) !== -1 || description.indexOf(filter) !== -1) {
                // if search if found in current link, show all children.  That way you can search for sub categories.
                acc.push(child);
              } else {
                filterChildren(child, filter);
                if (!_.isEmpty(child.children)) {
                  acc.push(child);
                }
              }

              return acc;
            }, []);
          };

        $category.onLoad(function categoryLoaded() {
          currentLink = $category.link(categoryId);
        });

        Object.defineProperties($scope, {
          categoryId: {
            enumerable: true,
            get: function getCategoryId() {
              return categoryId;
            }
          },

          currentLink: {
            enumerable: true,
            get: function getCurrentLink() {
              return filteredLink || currentLink;
            }
          },

          filter: {
            enumerable: true,
            value: function filter(query) {
              if (!query || query.length <= 0) {
                // clear query
                activeFilter = null;
                filteredLink = null;
              } else {
                activeFilter = query;
                filteredLink = currentLink.clone();
                filterChildren(filteredLink, activeFilter);
              }
            }
          },

          highlight: {
            enumerable: true,
            value: function highlight(value) {
              if (!activeFilter) {
                return $sce.trustAsHtml(value);
              }

              if (!value) {
                return value;
              }

              var filterLower = activeFilter.toLowerCase(),
                  filterLength = filterLower.length,
                  doHighlight = function doHighlight(rest) {

                    var restLower = rest.toLowerCase(),
                        startIndex = restLower.indexOf(filterLower),
                        prefix,
                        emphasis;

                    if (startIndex === -1) {
                      return rest;
                    }

                    prefix = rest.substring(0, startIndex);
                    emphasis = rest.substring(startIndex, startIndex + filterLength);
                    rest = rest.substring(startIndex + filterLength);

                    return prefix + '<strong class="highlight">' + emphasis + '</strong>' + doHighlight(rest);
                  };

              return $sce.trustAsHtml(doHighlight(value));
            }
          }
        });
      }]);

}) (window.angular, window.novantas, window._);
