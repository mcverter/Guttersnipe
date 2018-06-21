const fs = require('fs');
const {Client } = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'guttersnipeSimple',
  password: 'postgres',
  port: 5432,
});

client.connect();

class KropotkinController {
  async selectRandomKropotkin() {
    const kropotkinRandomQueryFromFile = fs.readFileSync(__dirname + '/../../db/sql/KropotkinRandomQuery.sql', 'utf8');
    const kropotkinRandomQueryResult = await client.query(kropotkinRandomQueryFromFile);
    const kropotkinParagraph = kropotkinRandomQueryResult.rows[0].paragraph;
    console.log('k paragraph', kropotkinParagraph);
  }
}

module.exports = KropotkinController;

const kc = new KropotkinController();
kc.selectRandomKropotkin();
