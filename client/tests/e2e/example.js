const webdriver = require('selenium-webdriver');
const driver = new webdriver.Builder()
.forBrowser('firefox')
.build();

driver.navigate().to('http://localhost:3000/')
