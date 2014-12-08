/**
 * Schema for Reports Document
 *
 * type: FKey to Type Document
 * details: FKey to Details Document,
 * space: FKey to Space Document,
 * time: FKey to Time Document,
 * author: username of author,
 * created_at: Date Created,
 * updated_at: Date Updated
 */
var reportSchema = mongoose.Schema({
  resource_data: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo'
  },
  space:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space'
  },
  time:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Time'
  },

  author: String,
  created_at: Date,  // do we need this?
  updated_at: Date,

  note: String,
  rating: Number,

  comments:  [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space'
  }]
});