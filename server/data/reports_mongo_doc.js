var reportSchema = mongoose.Schema({
    type: [ObjectId],
    details: [ObjectId],
    space: [ObjectId],
    time: [ObjectId],
    author: String,
    created_at: Date,
    updated_at: Date
});