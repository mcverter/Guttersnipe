
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;


module.exports = function (driver) {
  const elements_page1 = {
    instructionsPanel: By.css('.instructions-for-create'),
    consentForCreatePanel: By.css('.consent-for-create-panel'),
    negateButton: By.css('negate-button'),
    consentButton: By.css('consent0button'),
    shareableCreateStartPanel: By.css('shareable-create-start-panel'),
    headlineInput: By.css('#headline-input'),
    summaryInput: By.css('#summary-input')
  };
  /*
  url: () => {return this.api.launch_url + '/shareables/create';},
  steps: {
    consent_1 : consent_1,
    instructions_2 : instructions_2,
    headline_3 : headline_3,
    thing_4 : thing_4,
    space_5 : space_5,
    time_6 : time_6,
    confirm_7: confirm_7
  }*/
};
