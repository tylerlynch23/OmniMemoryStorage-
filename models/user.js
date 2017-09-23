const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const config   = require('../config/database');

/* UserSchema
 * Definition of a User
 */
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create a model from the schema with Mongoose
const User = module.exports = mongoose.model('User', UserSchema);

/* getUserById
 * Finds and returns a user from the database based on their ID
 */
module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

/* getUserByUsername
 * Finds and returns a user from the database based on their username
 */
module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

/* addUser
 * Encrypts the user's password attempts to store the user in the database
 */
module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}
