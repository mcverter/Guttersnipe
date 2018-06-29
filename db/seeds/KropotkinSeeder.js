// const knex = require('knex');
const gsnipeJSON = require(__dirname + '/../data/json/older/01_guttersnipeOld.json');
const kropotkins = gsnipeJSON.find(el=>el.name==="kropotkin").records;
const {Client} = require('pg');

const defaultClient = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'guttersnipeTest',
  password: 'postgres',
  port: 5432,
});


class KropotkinSeeder {
  constructor(client) {
    if (client) {
      this.client = client;
    } else {
      defaultClient.connect();
      this.client = defaultClient;
    }}

  seedKropotkins() {
    console.log('wanna seed mr seedy')
    kropotkins.forEach(kropotkin => {
      let kropotkinInsertStatement = `
          SELECT SELECT_OR_INSERT_KROPOTKIN(
            k_paragraph := '${kropotkin.paragraph}');
            `;
      console.log('kropotkinInsertStatement', kropotkinInsertStatement);
      this.client.query(kropotkinInsertStatement)
        .then(shareable_response => {
          console.log('k_response', shareable_response.rows[0]['select_or_insert_kropotkin']);
        })
        .catch(error=>{
          console.error('KROPOTKIN INSERT ERROR:', error)
        })
    });
  }
}
module.exports = KropotkinSeeder;
