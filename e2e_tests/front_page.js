module.exports = {
  'Front Page is visible': (client) => {
    client
      .url('http://localhost:3000')
      .assert.containsText('body', 'guttersnipe')
      .assert.elementPresent('.header')
      .assert.elementPresent('.front-pg')
      .assert.elementPresent('.btn.btn-lg')
      .assert.elementPresent('.strummer-quote')
      .assert.elementPresent('.piaf-img')
      .assert.elementPresent('.footer')
      .assert.elementPresent('.kropotkin-quote-outer')
      .end();
  }
};

