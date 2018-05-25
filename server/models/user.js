
var {UserSchema} = require('../db/mongoose');
var mongoose = require('mongoose');

var UserModel = mongoose.model('User',UserSchema);

module.exports = {
  UserModel
}
