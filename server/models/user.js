
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var UserSchema = mongoose.Schema({
  email : {
    type: String,
    required: [true,'user email required'],
    minlength :1,
    trim : true,
    unique : true,
    validate : {
        validator : validator.isEmail,
        message : `{v} is not a valid email`
    }
  },
  password: {
    type: String,
    minlength : 6,
    required: [true , 'User password is required'],
  },
  tokens : [{
    access : {
      type: String,
      requried : true
    },
    token : {
      type: String,
      requried : true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject,['_id','email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id : user._id.toHexString(),access},'123ABC').toString();
  user.tokens = user.tokens.concat([{access,token}]);
  return user.save().then(() => {
    return token
  });
};

var UserModel = mongoose.model('User',UserSchema);

module.exports = {
  UserModel
}
