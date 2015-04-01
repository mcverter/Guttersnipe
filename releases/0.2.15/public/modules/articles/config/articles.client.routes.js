(function (angular, _) { 'use strict';

// Setting up route
  angular.module('docs').config(['$stateProvider',
    function($stateProvider) {
      // Articles state routing
      $stateProvider.
        state('listArticles', {
          url: '/articles',
          templateUrl: 'modules/articles/templates/list-articles.client.view.html'
        }).
        state('createArticle', {
          url: '/articles/create',
          templateUrl: 'modules/articles/templates/create-article.client.view.html'
        }).
        state('viewArticle', {
          url: '/articles/:articleId',
          templateUrl: 'modules/articles/templates/view-article.client.view.html'
        }).
        state('editArticle', {
          url: '/articles/:articleId/edit',
          templateUrl: 'modules/articles/templates/edit-article.client.view.html'
        });
    }
  ]);
})(window.angular, window._);