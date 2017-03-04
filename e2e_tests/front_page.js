module.exports = {
  'Front Page is visible': (client) => {
    client
      .url('http://localhost:3000')
      .assert.containsText('body', 'guttersnipe')

      .end();
  }

}
