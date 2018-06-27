// const knex = require('knex');
const gsnipeJSON = require(__dirname + '/../data/json/older/01_guttersnipeOld.json');
const kropotkins = gsnipeJSON.find(el=>el.name==="kropotkin").records;

function seedKropotkins(knex, Promise) {
  console.log('wanna seed mr seedy')
  kropotkins.forEach(kropotkin => {
   /* console.log('inserting'); */
    knex.raw(`
    SELECT SELECT_OR_INSERT_KROPOTKIN(
      k_paragraph := '${kropotkin.paragraph}');`)
      .then(shareable_response => {
/*        console.log('k_response', shareable_response.rows[0]['select_or_insert_kropotkin']); */
      })
  });
}



var knex = require('knex')({
  client: 'postgres',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgres',
    database : 'guttersnipeTest'
  }
});

exports.seed = seedKropotkins;

seedKropotkins(knex);
