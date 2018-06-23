const Helpers = require("./helpers/dbHelper");

describe('Database', function () {
  it('is populated', function(

  ){});
  describe('Gristedes', function () {
    it('is in DB', function () {});
    it('has a subcategory', function () {});
    it('has a category', function(){});
    it('has a name', function(){});
    it('may have a description', function(){});
    it('has an address', function(){});
    it('has a geolocation', function(){});
    it('may have a time', function(){});
    it('may have an icalendar', function(){});
    it ('has three comments', function () {});
  });
  describe ('User', function () {
    it('has a name', function(){});
    it('may have an email', function(){});
    it('may have an expiration', function(){});
    it('may have an role', function(){});
  });
  describe('Comments', function(){
    it('has a title', function(){});
    it('has a text', function(){});
    it('has a posting date', function(){});
    it('references a Shareable', function(){});
    it('references a User', function(){});
  });
  describe('Kropotkin', function () {
    it('has a paragraph', function(){});
  });
  describe('CategorySubcategory', function () {
    it ('can retrieve a category for a given subcategory', function(){});
    it ('can retrieve a list of subcategories for a given category', function(){});
    it ('matches all categories with subcategories and vica versa', function(){})

  })
});
