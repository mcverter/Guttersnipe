var expect = require('chai').expect; //actually call the function
const {client} = require("./helpers/dbHelper");

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
        console.info("SELECT RESULTS", results);
        expect(results.rows.length).to.be.above(0);
        done()
      })
      .catch(error=>{console.error("SELECT ERROR", error);})
  });

  describe('Gristedes', function () {
    it('is in DB', function () {
      client.query("SELECT * FROM shareable WHERE name='Gristedes'")
        .then(results => {
          console.info("SELECT RESULTS", results);
          gristedesId = results.rows[0].id;
          console.log('Gristedes ID', gristedesId);
          expect(results.rows.length).to.be.above(0);
          done()
        })
        .catch(error=>{
          console.error("SELECT ERROR", error);
          expect(1).to.equal(0);
        })
    });
    it('has a subcategory', function () {
      try {
//        let query =
        client.query(`SELECT subcategory FROM shareable WHERE id='${gristedesId}'`)
          .then(results => {
            console.info("SELECT RESULTS", results);
            expect(results.rows.length).to.be.above(0);
            done()
          })
          .catch(error=>{console.error("SELECT ERROR", error);})
      }
      catch (error) {
        console.error(console.error("SELECT ERROR", error));
      }
     });
    it('has a category', function () {
      client.query(`SELECT category FROM shareable WHERE id='${gristedesId}'`)
        .then(results => {
          console.info("SELECT RESULTS", results);
          expect(results.rows.length).to.be.above(0);
          done()
        })
        .catch(error=>{console.error("SELECT ERROR", error);})

    });
    it('has a name', function () {
      client.query(`SELECT name FROM shareable WHERE id='${gristedesId}'`)
        .then(results => {
          console.info("SELECT RESULTS", results);
          expect(results.rows.length).to.be.above(0);
          done()
        })
        .catch(error=>{console.error("SELECT ERROR", error);})

    });
    it('may have a description', function () {
      client.query(`SELECT description FROM shareable WHERE id='${gristedesId}'`)
        .then(results => {
          console.info("SELECT RESULTS", results);
          // expect(results.rows.length).to.be.above(0);
          done()
        })
        .catch(error=>{console.error("SELECT ERROR", error);})
    });
    it('has an address', function () {
      client.query(`SELECT address FROM shareable WHERE id='${gristedesId}'`)
        .then(results => {
          console.info("SELECT RESULTS", results);
          expect(results.rows.length).to.be.above(0);
          done()
        })
        .catch(error=>{console.error("SELECT ERROR", error);})
    });
    it('has a geolocation', function () {
      client.query(`SELECT geolocation FROM shareable WHERE id='${gristedesId}'`)
        .then(results => {
          console.info("SELECT RESULTS", results);
          expect(results.rows.length).to.be.above(0);
          done()
        })
        .catch(error=>{console.error("SELECT ERROR", error);})

    });
    it('may have a time', function () {
      client.query(`SELECT time FROM shareable WHERE id='${gristedesId}'`)
        .then(results => {
          console.info("SELECT RESULTS", results);
          // expect(results.rows.length).to.be.above(0);
          done()
        })
        .catch(error=>{console.error("SELECT ERROR", error);})
    });
    it('may have an icalendar', function () {
      client.query(`SELECT ical FROM shareable WHERE id='${gristedesId}'`)
        .then(results => {
          console.info("SELECT RESULTS", results);
          // expect(results.rows.length).to.be.above(0);
          done()
        })
        .catch(error=>{console.error("SELECT ERROR", error);})
    });
    it('has three comments', function () {
      client.query(`SELECT comments FROM shareable WHERE id='${gristedesId}'`)
        .then(results => {
          console.info("SELECT RESULTS", results);
          expect(results.rows.length).to.equal(3);
          done()
        })
        .catch(error=>{console.error("SELECT ERROR", error);})
    });
  });
  describe('User', function () {
    it('has a name', function () {
    });
    it('may have an email', function () {
    });
    it('may have an expiration', function () {
    });
    it('may have an role', function () {
    });
  });
  describe('Comments', function () {
    it('has a title', function () {
    });
    it('has a text', function () {
    });
    it('has a posting date', function () {
    });
    it('references a Shareable', function () {
    });
    it('references a User', function () {
    });
  });
  describe('Kropotkin', function () {
    it('has a paragraph', function () {
    });
  });
  describe('CategorySubcategory', function () {
    it('can retrieve a category for a given subcategory', function () {
    });
    it('can retrieve a list of subcategories for a given category', function () {
    });
    it('matches all categories with subcategories and vica versa', function () {
    })

  })
});
