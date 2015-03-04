'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PlaceSchema = new Schema ({
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
  name: {
    type: String,
    required: true
  },
  address : {
    type: String,
    required: true
  },
  notes : {
    type: String,
    required: false
  }
});

var Place = mongoose.model('Place', PlaceSchema);
