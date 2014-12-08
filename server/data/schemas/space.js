/**
 *
 * @type {{address: (String|*|Function), location: {lng: (Number|*|Function), lat: (Number|*|Function)}, notes: (String|*|Function)}[]}
 */
var mongoose = require('mongoose'),
  SpaceSchema = new mongoose.Schema({
  address: String,
  location: {
    lng: Number,
    lat: Number
  },
  notes: String
});

module.exports = SpaceSchema;
