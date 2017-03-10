module.exports = {
  'Front Page is visible': function(client) {
    const front = client.page.front();

    front.navigate()
      .assert.containsText('@body', 'guttersnipe')
      .assert.elementPresent('@header')
      .assert.elementPresent('@front_page_container')
      .assert.elementPresent('@navigation_buttons')
      .assert.elementPresent('@strummer_quote')
      .assert.elementPresent('@piaf_image')
      .assert.elementPresent('@footer')
      .assert.elementPresent('@kropotkin_quote_outer')

  }
};

