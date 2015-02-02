'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var ThingSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Thing name',
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

mongoose.model('Thing', ThingSchema);