/**
 *
 * Schema for Users Document
 *
 * username: Required,
 * password: Required,
 * email: Optional,
 * expiration: Date the account expires. *             Only admins can have permanent accounts,
    * role: For administrative roles
*        Content admin vs. User Admin.
    */
var mongoose = require('mongoose'),
  UserSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
    },
    expiration: {
      type: Date
    },
    role: {
      type: String
    }
  });
module.exports = UserSchema;