const BaseController = require('./BaseController');
var knex = require('../knex');
const Promise = require('bluebird');
const TABLES = require('./tables');

class Kropotkin extends BaseController {
  insertOneRecord(recordJSON) {
    const {paragraph} = recordJSON;
    return knex(TABLES.KROPOTKINS)
      .insert({paragraph})
  }
  insertManyRecords(manyRecordsJSON) {
    return Promise.map(manyRecordsJSON, record=>{
      return this.insertOneRecord(record);
    })
  }

  selectRandomRecord()
  {
    return knex.raw("SELECT paragraph FROM kropotkins OFFSET floor(random()*(select count(*) from kropotkins)) LIMIT 1;")
  }

  /* GET users listing.
  router.get('/', function(req, res, next) {

    const query="SELECT paragraph FROM kropotkin OFFSET floor(random()*(select count(*) from kropotkin)) LIMIT 1;"
    sequelize.query(query)
      .then(result => {
        res.send(JSON.stringify(result[0][0])).status(200);
      })
      .catch(error => {
        console.log(error);
        res.send('respond with an error');
      });
  });
*/
  createDBTable(knex, Promise) {
    return knex.schema.createTable('kropotkin', table=>{
      table.increments('id').primary();
      table.text('paragraph').notNullable();
    });
  }

  dropDBTable(knex, Promise) {
    return knex.schema.dropTable('kropotkin')
  }

  clearAllRecords() {}
}


module.exports = Kropotkin;
