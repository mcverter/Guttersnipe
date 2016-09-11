

var mongoose = require('mongoose'),
  db = 'mongodb://localhost/guttersnipe-dev',
  model_dir = '../../server/models/',
  Kropotkin = require(model_dir + 'kropotkin.server.model'),
  Resource = require(model_dir + 'resource.server.model');

mongoose.connect(db);

mongoose.set('debug', true);

module.exports = {
  mongoose: mongoose,
  Kropotkin: Kropotkin,
  Resource: Resource
};;
