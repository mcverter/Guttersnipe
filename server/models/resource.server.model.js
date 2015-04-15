'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// node add-freegan-bk.js 
var recurrenceTypeEnum = ['A', '1', '2', '3', '4', 'L'];


var ResourceSchema = new Schema({
    thing: {
        description: {
            headline : {
                type: String,
                required: true
            },
            summary : {
                type: String,
                required: true
            },
            method: {
                type: String,
                required: false
            },
            notes : {
                type: String,
                required: false
            }
        },
        taxonomy : {
            type : {
                type: String,
                required: true
            },
            subtypes : [String],
            details : [String]
        }
    },
    place: {
        address : {
            type: String,
            required: true
        },
        coordinates : {
            lat : {
                type: Number,
                required: true
            },
            lng : {
                type: Number,
                required: true
            }
        },
        description : {
            type: String,
            required: false
        },
        notes : {
            type: String,
            required: false
        }
    },


    time: {
        schedules : [
            {
                recurrenceType: {
                    type: Boolean,
                    enum: recurrenceTypeEnum
                },
                start : {
                    type: Date,
                    required: true
                },
                end : {
                    type: Date,
                    required: true
                }
            }
        ],
        notes : {
            type: String,
            required: false
        }
    },


    created: {
        type: Date,
        default: Date.now
    },

    updated: {
        type: Date,
        default: Date.now
    },

    createdBy: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Resource', ResourceSchema);
