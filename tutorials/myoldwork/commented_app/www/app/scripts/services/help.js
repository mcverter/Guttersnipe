/**
 * @class Help (Factory):
      For populating user help pages
 * Returns an object in ui.HelpTopics
 *
 * Private
 * --------
 * @field helpTopics:
 * @field return:
 *
 * Extern
 * ------
 * $api.onLogin():  
*       Handler for initializing factory on login
 * $api.onLogout(): 
*       Handler for erasing factory on logout
 * $api.help.onUpdate()  
         Trigger for reinitializing factory from the server
 *

 *
 */
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