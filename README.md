# End-2-end testing using Protractor

This is a simple guide to get started with end-2end testing using protractor and jasmine

## Instalation

First ensure you have Java Runtime Enviroment and that it is added to your path, [this will guide you to do that](https://docs.oracle.com/javase/tutorial/essential/environment/paths.html)


Next is to install all node modules using the command:

```sh
npm install
```

> **⚠** If you are running an old version of chrome for example 57, you need to install the webdriver that coresponde to your chrome version [details about versions can be found here](https://sites.google.com/a/chromium.org/chromedriver/downloads)

Here is the commands to update to version 2.28 for chrome 57
```sh
webdriver-manager update --versions.chrome=2.28
```

After that you need to start your selenium manually
```sh
webdriver-manager start --versions.chrome=2.28
```

Finally update your config.js to use the port instead of pulling the last selenium driver that crosponde to up todate chrome version
```js
exports.config = {  
  //seleniumServerJar: './node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar',
  //seleniumPort: null,
  seleniumPort: 4444,
```

> **⚠** If you are not using angular you may want ignore protractor from using angular so that you do not have an error, to do that add the following lines to your `conf.js` inside the `onPrepare` function in this way:

```js
 onPrepare: function() {
    browser.ignoreSynchronization = true;
    global.browser = browser;
    jasmine.getEnv().addReporter(reporter);
 }
```

> **⚠** If you need to run the test using IE, you will have to down load [the driver](http://selenium-release.storage.googleapis.com/index.html?path=2.53/) and to configure it in the following way

```js
//add the path to the download driver
seleniumArgs: ['-Dwebdriver.ie.driver=your-path/IEDriverServer.exe'],

// add browser capabilities
multiCapabilities: [
    {
        browserName: 'chrome'
    },
    {
        browserName: 'internet explorer'
    }
]
```

> **⚠ The IE require protected mode settings to be the same for all zones**

> **⚠ If you observe any performance issues consider switching the diriver from 64bit to 32bit**

## Run the testing

Just run regular node test command:

```sh
npm test
```

> **⚠** On windows if you recieve an alert about chrome extensions you can try to delete the string key 1 with value * from your registery
> `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome\ExtensionInstallBlacklist`

## Run the test aginst diffrent enviroments

In orther to run the scripts against other enviroments just run the command bellow passing the right base url 

```sh
npm test -- --baseUrl="http://xxxx"
```

## Run aginst specific browser

To test a specific browser run the command `npm test -- --browser="chrome" --multiCapabilities`

## Send reports to specific folder

To specify the folder of where the reports will be created `npm test -- --reporterDest="c:/report"`

> **⚠** `--reporterDest` must be set as the parameter when adding multiple parameters example `npm test -- --browser="chrome" --multiCapabilities --reporterDest="c:/report"`

## Best practices

Bellow is a simple guide to create recommended folder structor, and test scripts best practice

### Folder structor

This is the recommended folder structor

```dir
 |-- test
     |-- unit
     |-- e2e
         |-- home
             |-- home.pageObject.js
             |-- home.spec.js
         |-- news
             |-- news.pageObject.js
             |-- news.spec.js
         |-- news-archive
             |-- news-archive.pageObject.js
             |-- news-archive.spec.js
```

### Page object and spec

Bellow is an example of page object, and spec that uses page object

```js

  /* example of "news.pageObject.js" */

  var NewsPageObject = function() {
      this.title = element(by.className('title'));
      this.image = element(by.className('image'));
      this.body = element(by.className('body'));
      this.recentNews = element(by.className('recent-news'));
      this.searchField = element(by.className('news-search-field'));
      this.searchButton = element(by.className('news-search-button'));

      this.search = function(keyword) {
          this.searchField.sendKeys(keyword);
          this.searchButton.click();
      };
  };
  module.exports = NewsPageObject;


  /* example of "news.spec.js" */

  var NewsPageObject = require('./news.pageObject');

  describe("The news item page", function() {

      var newsPageObject = new NewsPageObject();

      beforeEach(function() {
          browser.get('/global/en/news-item/');
      });

      it('should have a title', function() {
          expect(newsPageObject.title.getText()).toBeDefined();
      });
  });
```

### Test isolation

Try to have `beforeAll` on each `describe` to reset any state

```js
       describe('when the user search for suggested keyword', function(){

           beforeAll(function(){
               searchPageObject.searchAreas.clickOn('All');
               searchPageObject.searchField.clear().sendKeys('restaurant menu');
               searchPageObject.searchButton.click();
           });

           it('should be displayed on sugested search results', function(){
               expect(searchPageObject.sugestedList.get(0)).toBeDefined();
           });
       });
```

### What to avoid

In order to write a clean test suits you should avoid the following cases:

- Avoid duplicated tests or configs, only single config and single test parametrised
- Avoid using [selectors](https://github.com/angular/protractor/blob/master/docs/locators.md) that are likely to change, use the most stable selector instead
- Avoid multiple page object per file, one page object must be used in one spec
- Avoid coupled tests, tests should be independent at file level
- Avoid testing on a dirty state, ensure that you navigate to the page under test before each test if possible
