// const knex = require('knex');
const gsnipeJSON = require(__dirname + '/../data/json/01_guttersnipeOld.json')
const kropotkins = gsnipeJSON.find(el=>el.name==="kropotkin").records

exports.seed = function(knex, Promise) {
  kropotkins.forEach(kropotkin => {
    knex.raw(`
    SELECT SELECT_OR_INSERT_KROPOTKIN(
      paragraph := '${kropotkin.paragraph}');`)
      .then(shareable_response => {
        console.log('k_response', shareable_response.rows[0]['select_or_insert_kropotkin']);
      })
  });
}
