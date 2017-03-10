

module.exports = {
  'Create Page is navigable': function (client) {
    const create = client.page.create();

    create.navigate()
      .assert.elementPresent('@instruction_panel')
      .assert.elementPresent('@instruction_next_button')
      .click('@instruction_next_button')
      .assert.elementPresent('@consent_panel')
      .assert.elementPresent('@consent_negate')
      .assert.elementPresent('@consent_consent')
  }
}
