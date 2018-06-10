const seedData = require('../data/02_gutter_record.json');
const Shareable = require('./../controllers/Shareable');
const shareable = new Shareable();

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return shareable.insertManyRecords(seedData);
};


