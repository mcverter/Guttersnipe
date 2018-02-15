const seedData = require('../../tutorials/db-sequelize/seeders/seed-data');
const Shareable = require('./../controllers/Shareable');
const shareable = new Shareable();

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return shareable.insertManyRecords(seedData);
};


