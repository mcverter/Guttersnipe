(function (angular, app, _, URI, moment) {

  'use strict';

  app.factory('$help', ['$log', '$debug', '$api',
    function ($log, $debug, $api) {
      var helpTopics;

      $api.onLogin(function () {
        $api.help.topics().then(function(data){
          helpTopics = _(data).reduce(function(acc, item){
            acc[item.topic] = item;
            return acc;
          }, {});
        });
      });

      $api.onLogout(function $postLogoutHandler() {
        helpTopics = null;
      });
      
      return {
        topics: function(){
          return helpTopics;
        }
      };
    }]);

})(window.angular, window.novantas, window._, window.URI, window.moment);