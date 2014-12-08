var mongoose = require('mongoose');
var SpaceSchema = require('../schemas/spaceSchema');
var Space = mongoose.model('Space', SpaceSchema);
module.exports = Space;
