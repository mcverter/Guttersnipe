const gsnipeJSON = require('../data/01_guttersnipeOld.json')
const lodash = require('lodash');
const Kropotkin = require('./../controllers/Kropotkin');
const kropotkin = new Kropotkin();

exports.seed = function(knex, Promise) {
  return kropotkin.insertManyRecords(
    gsnipeJSON.find(el=>el.name==="kropotkin").records
  )
};