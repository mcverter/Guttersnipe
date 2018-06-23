const fs = require('fs');
const {Client} = require('pg');
const dbConfig = require('../../config/dbConfig');
// NEED NODE_ENV
const client = new Client(dbConfig['dev']);

client.connect();
class KropotkinController {
  async selectRandomKropotkin() {
    const kropotkinRandomQueryFromFile = fs.readFileSync(__dirname + '/../../db/sql/KropotkinRandomQuery.sql', 'utf8');
    const kropotkinRandomQueryResult = await client.query(kropotkinRandomQueryFromFile);
    const kropotkinParagraph = kropotkinRandomQueryResult.rows[0].paragraph;
    return kropotkinParagraph;
  }
}

module.exports = KropotkinController;

/*
const kc = new KropotkinController();
kc.selectRandomKropotkin();
 */
