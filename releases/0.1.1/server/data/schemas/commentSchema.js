var mongoose = require('mongoose'),
  CommentSchema = new mongoose.Schema({
    author: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  });

module.exports = CommentSchema;