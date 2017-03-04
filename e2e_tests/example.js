/*
 module.exports = {

 'Demo test Google' : function (browser) {
 browser
 .url('http://www.google.com')
 .waitForElementVisible('body', 1000)
 .setValue('input[type=text]', 'nightwatch')
 .waitForElementVisible('button[name=btnG]', 1000)
 .click('button[name=btnG]')
 .pause(1000)
 .assert.containsText('#main', 'Night Watch')
 .end();
 }
 };
 */

/*module.exports = {
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
 */

/*

 src_folders: ['tests'],
 page_objects_path = 'tests/pages',
 selenium: SELENIUM_CONFIG,
 test_steeings: Environment

 }

 */




/*




const webdriver = require('selenium-webdriver');
const driver = new webdriver.Builder()
  .forBrowser('firefox')
  .build();

driver.navigate().to('http://localhost:3000/');


const By = webdriver.By;
driver.navigate().to('http://localhost:3000')
  .then(() => driver.findElement(By.css('.autocomplete')))
  .then(element => element.getAttribute('value'))
  .then(value => console.log(value));


driver.navigate().to('http://localhost:3000')
  .then(() => driver.findElement(By.css('.autocomplete'))
    .getAttribute('value'))
  .then(value => console.log(value));

const until = webdriver.until;
driver.navigate().to('http://localhost:3000')
  .then(() => driver.findElement(By.css('.autocomplete'))
    .sendKeys('John'))
  .then(()=>driver.wait(until.elementLocated(By.css('.suggestion'))))
  .then(()=>driver.findElement(By.css('.suggestion')).click());


driver.navigate().to('http://www');
driver.findElement(By.css('autocomplete')).sendKeys('John');
driver.wait(until.elementLocated(By.css('.suggestion'))).click();

describe ('login form', () => {
  this.timeout(10000);

  before(function(done) {
    driver.navigate.to('http://www')
      .then(()=>done())
  });
  it ('autocompletes the name filed', function(done) {
    driver.findElement(By.css('.autocomplete')).sendKeys('JOhn')
    driver.findElement(By.css('autocomplete')).sendKeys('John')
    driver.wait(until.elementLocated(By.css('.suggestion'))).click()
      .then(()=>done())

  });

  after(function(done) {
    driver.quit()
      .then(()=>done())
  })
});
*/
