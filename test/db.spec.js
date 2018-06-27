var expect = require('chai').expect; //actually call the function
const {client} = require("./helpers/dbHelper");

function printError(error) {
  console.error("SELECT ERROR", error);
  expect(1).to.equal(0);
}

function printResults (results) {
  console.info("SELECT RESULTS", results);
}

class UUID {
  constructor() {
    this._uuid = null;
  }
  get uuid () {
    return this._uuid;

  }
  set uuid (val) {
    this._uuid = val;
  }
}

let gristedesId = new UUID(); //

describe('Database', function () {
  it('is populated', function (done) {
    client.query("SELECT * FROM shareable")
      .then(results => {
        printResults(results);
        expect(results.rows.length).to.be.above(0);
        done()
      })
      .catch(error=>{
        printError(error);
      })
  });

  describe('Gristedes', function () {
    it('is in DB', function (done) {
      client.query("SELECT * FROM shareable WHERE name='Gristedes'")
        .then(results => {
          printResults(results);
          gristedesId = results.rows[0].id;
          console.log('Gristedes ID', gristedesId);
          expect(results.rows.length).to.be.above(0);
          done()
        })
        .catch(error=>{
          printError(error);
        })
    });
    it('has a subcategory', function (done) {
      try {
//        let query =
        client.query(`SELECT subcategory FROM shareable WHERE id='${gristedesId}'`)
          .then(results => {
            printResults(results);
            expect(results.rows.length).to.be.above(0);
            done()
          })
          .catch(error=>{
            printError(error);
          })
      }
      catch (error) {
        console.error(console.error("SELECT ERROR", error));
        expect(1).to.equal(0);
      }
    });
    it('has a category', function (done) {
      client.query(`
        SELECT category 
        FROM category_subcategory 
         JOIN shareable 
         ON shareable.subcategory = category_subcategory.subcategory
         AND shareable.id ='${gristedesId}'`)
        .then(results => {
          printResults(results);
          expect(results.rows.length).to.be.above(0);
          done()
        })
        .catch(error=>{
          printError(error);
        })

    });
    it('has a name', function (done) {
      client.query(`SELECT name FROM shareable WHERE id='${gristedesId}'`)
        .then(results => {
          printResults(results);
          expect(results.rows.length).to.be.above(0);
          done()
        })
        .catch(error=>{
          printError(error);
        })

    });
    it('may have a description', function (done) {
      client.query(`SELECT description FROM shareable WHERE id='${gristedesId}'`)
        .then(results => {
          printResults(results);
          // expect(results.rows.length).to.be.above(0);
          done()
        })
        .catch(error=>{
          printError(error);
        })
    });
    it('has an address', function (done) {
      client.query(`SELECT address FROM shareable WHERE id='${gristedesId}'`)
        .then(results => {
          printResults(results);
          expect(results.rows.length).to.be.above(0);
          done()
        })
        .catch(error=>{
          printError(error);
        })
    });

    it('has a geolocation', function (done) {
      client.query(`SELECT geolocation FROM shareable WHERE id='${gristedesId}'`)
        .then(results => {
          printResults(results);
          expect(results.rows.length).to.be.above(0);
          done()
        })
        .catch(error=>{
          printError(error);
        })

    });
    it('may have a time', function (done) {
      client.query(`SELECT time FROM shareable WHERE id='${gristedesId}'`)
        .then(results => {
          printResults(results);
          // expect(results.rows.length).to.be.above(0);
          done()
        })
        .catch(error=>{
          printError(error);
        })
    });
    it('may have an icalendar', function (done) {
      client.query(`SELECT icalendar FROM shareable WHERE id='${gristedesId}'`)
        .then(results => {
          printResults(results);
          // expect(results.rows.length).to.be.above(0);
          done()
        })
        .catch(error=>{
          printError(error);
        })
    });
    it('has three comments', function (done) {
      client.query(`
      SELECT * FROM shareable_comment
       JOIN shareable 
       ON shareable.id = shareable_comment.shareable_id 
       AND shareable.id='${gristedesId}'`)
        .then(results => {
          printResults(results);
          expect(results.rows.length).to.equal(3);
          done()
        })
        .catch(error=>{
          printError(error);
        })
    });
  });
  /*
  describe('User', function (done) {
    it('has a name', function (done) {
    });
    it('may have an email', function (done) {
    });
    it('may have an expiration', function (done) {
    });
    it('may have an role', function (done) {
    });
  });
  describe('Comments', function (done) {
    it('has a title', function (done) {
    });
    it('has a text', function (done) {
    });
    it('has a posting date', function (done) {
    });
    it('references a Shareable', function (done) {
    });
    it('references a User', function (done) {
    });
  });
  describe('Kropotkin', function (done) {
    it('has a paragraph', function (done) {
    });
  });
  describe('CategorySubcategory', function (done) {
    it('can retrieve a category for a given subcategory', function (done) {
    });
    it('can retrieve a list of subcategories for a given category', function (done) {
    });
    it('matches all categories with subcategories and vica versa', function (done) {
    })
  })*/
});
