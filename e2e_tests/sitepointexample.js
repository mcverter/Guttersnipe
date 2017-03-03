module.exports = {
  'login test': function (client) {
    client
      .url('http://localhost:3000')
      .setValue('input[name=email]', 'foo@bar.com')
      .click('button[type="submit"]')
      .assert.containsText('main', 'News feed')
      .end();
  }
}

const foo = {
  url: () => {return this.api.launch_url + 'login'},
  elements: {
    emailField :'input[name="email"',
    passwordField: 'input[name="email"',
    submitButton: 'button[type="submit"]'
  }
}

const boo = {
  'login test': (client) => {
    const page = client.page.login();

    page.navigate()
      .setValue('@emailField', 'foo@bar.com')
      .setValue('@passwordField', 'passw')
      .click('@submitButton')
      .assert.containsText('main', 'News feed');

    client.end();
  }
}


    /*

     src_folders: ['tests'],
     page_objects_path = 'tests/pages',
     selenium: SELENIUM_CONFIG,
     test_steeings: Environment

     }

     */

