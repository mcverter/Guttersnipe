

var mongoose = require('mongoose'),
  db = 'mongodb://localhost/guttersnipe-dev',
  model_dir = '../../server/models/',
  Place = require(model_dir + 'place.server.model'),
  Kropotkin = require(model_dir + 'kropotkin.server.model'),
  Thing = require(model_dir + 'thing.server.model'),
  Time = require(model_dir + 'time.server.model'),
  Resource = require(model_dir + 'resource.server.model');

mongoose.connect(db);


module.exports = {
  mongoose: mongoose,
  Place : Place,
  Kropotkin: Kropotkin,
  Thing: Thing,
  Time: Time,
  Resource: Resource
};;
