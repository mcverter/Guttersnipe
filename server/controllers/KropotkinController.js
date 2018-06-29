const fs = require('fs');
const {Client} = require('pg');
const dbConfig = require('../../config/dbConfig');
// NEED NODE_ENV
const client = new Client(dbConfig['test']);

client.connect();
class KropotkinController {
  async selectRandomKropotkin() {
    const kropotkinRandomQueryFromFile = fs.readFileSync(__dirname + '/../../db/sql/KropotkinRandomQuery.sql', 'utf8');
    const kropotkinRandomQueryResult = await client.query(kropotkinRandomQueryFromFile);
    return kropotkinRandomQueryResult && kropotkinRandomQueryResult.rows
      && kropotkinRandomQueryResult.rows[0] && kropotkinRandomQueryResult.rows[0].paragraph;
  }
}

module.exports = KropotkinController;

/*
const kc = new KropotkinController();
kc.selectRandomKropotkin();
 */
