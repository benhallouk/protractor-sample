
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
  dest: './reports',
  filename: 'index.html',
  cleanDestination: false,
  reportTitle: null,
  showSummary: true,
  showQuickLinks: true,
  userCss: './reports/css/style.css'
});

exports.config = {  
  seleniumServerJar: './node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar',
  seleniumPort: null,  
  framework: 'jasmine2',
  specs: ['title-spec.js'],
  baseUrl: 'http://fbd-net/intranet/global/en/',
  beforeLaunch: function() {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },
  onPrepare: function() {
    jasmine.getEnv().addReporter(reporter);
  },
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve){
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  }
};