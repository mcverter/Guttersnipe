'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Place Schema
 */
var PlaceSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Place name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Place', PlaceSchema);