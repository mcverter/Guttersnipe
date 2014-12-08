var mongoose = require('mongoose');
var TimeSchema = require('../schemas/time');
var Time = mongoose.model('Time', TimeSchema);
module.exports = Time;
