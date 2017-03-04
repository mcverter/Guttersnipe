/**
 * Created by mitchell on 2/24/17.
 */
module.exports = {
  'Test dev deployment' : function (browser) {
    browser
      .url('http://localhost:3000')
      .end();
  }
};
