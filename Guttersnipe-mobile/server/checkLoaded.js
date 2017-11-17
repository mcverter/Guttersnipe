/*
  We check for a complete page load by verifying that
  * document.readyState is complete
  * No XHR requests are open

  One remaining issue: The code does not check to see whether all fetch()
  promises are fulfilled.
 */

'use strict';

(function checkForCompletePageLoad(next) {
  var originalXHROpen = XMLHttpRequest.prototype.open,
    ajaxOpened = 0;

  /* override to maintain count of open AJAX requests */
  XMLHttpRequest.prototype.open = function ajaxWithIncrement(method,url,async,uname,pswd) {
    var self = this;
    ajaxOpened++;
    this.onreadystatechange(function ajaxDecrement(){
      if (self.readyState === 4) {
        ajaxOpened--;
      }
    });
    originalXHROpen.call(this, method,url,async,uname,pswd);
  };

  var interval = setInterval(function() {
    if((document.readyState === 'complete') && ajaxOpened === 0) {
      clearInterval(interval);
      XMLHttpRequest.prototype.open = originalXHROpen;
      next();
    }
  }, 500);
})(next);

function next(){
  console.log('next called');
}

