var mongoose = require('mongoose');
var TimeSchema = require('../schemas/timeSchema');
var Time = mongoose.model('Time', TimeSchema);
module.exports = Time;
