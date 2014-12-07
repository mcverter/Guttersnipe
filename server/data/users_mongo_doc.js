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

var userSchema =mongoose.Schema([{
    username: String,
    email: String,
    password: String,
    expiration: Date,
    role: String
    }]);