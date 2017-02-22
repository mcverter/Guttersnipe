const webdriver = require('selenium-webdriver');
const driver = new webdriver.Builder()
  .forBrowser('firefox')
  .build();

driver.navigate().to('http://localhost:3000/')


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
  .then(()=>driver.findElement(By.css('.suggestion')).click())


driver.navigate.to('http://www')
driver.findElement(By.css('autocomplete')).sendKeys('John')
driver.wait(until.elementLocated(By.css('.suggestion'))).cllick()




describe ('login form', () => {
  this.timeout(10000)

  before(function(done) {
    driver.navigate.to('http://www')
      .then(()=>done())
  })
  it ('autocompletes the name filed', function(done) {
    driver.findElement(By.css('.autocomplete')).sendKeys('JOhn')
    driver.findElement(By.css('autocomplete')).sendKeys('John')
    driver.wait(until.elementLocated(By.css('.suggestion'))).click()
      .then(()=>done())

  })

  after(function(done) {
    driver.quit()
      .then(()=>done())
  })

})
