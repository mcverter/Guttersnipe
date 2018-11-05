const Shareable = require('../controllers/Shareable'),
  Kropotkin = require('../controllers/Kropotkin');

shareable = new Shareable();
kropotkin = new Kropotkin();

exports.up = function(knex, Promise) {
  return Promise.all([
    shareable.createDBTable(knex, Promise),
    kropotkin.createDBTable(knex, Promise),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    shareable.dropDBTable(knex, Promise),
    kropotkin.dropDBTable(knex, Promise)
  ]);
};
