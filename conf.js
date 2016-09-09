
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var getReportDestination = function(){
      const args = process.argv.slice(2)+"";
      const index = args.search(/--reporterDest=/);
      if(index>-1){
        const value = args.substr(index).split('=')[1];        
        return value;
      }
      return false;      
};

var reporter = new HtmlScreenshotReporter({
  dest: getReportDestination() || './reports',
  filename: 'index.html',
  cleanDestination: true,
  reportTitle: "Intranet functionality health check",
  showSummary: true,
  showQuickLinks: true,
  userCss: '../css/style.css'
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
      browser.ignoreSynchronization = true;
      global.browser = browser;
      jasmine.getEnv().addReporter(reporter);
  },
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve){
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  }
};