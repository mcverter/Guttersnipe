var mongoose = require('mongoose');
var SpaceSchema = require('../schemas/space');
var Space = mongoose.model('Space', SpaceSchema);
module.exports = Space;
