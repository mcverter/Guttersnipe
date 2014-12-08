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
    type: [ObjectId],
    details: [ObjectId],
    space: [ObjectId],
    time: [ObjectId],
    author: String,
    created_at: Date,
    updated_at: Date,

    notes: String
});