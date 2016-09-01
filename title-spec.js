describe('home page', function() {
  it('should have a title', function() {    
    browser.get(browser.baseUrl);    
    expect(browser.getTitle()).toBeDefined();
  });
});