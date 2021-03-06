
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

UserSchema.statics.findByCredentials = function(email,password) {
   var userModel = this;
   return UserModel.findOne({email}).then((user) => {
    if(!user){
      return Promise.reject();
    }
    return new Promise((resolve,reject) => {
      bcrypt.compare(password,user.password,(err,res) => {
        if(res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.statics.findByToken = function(token) {
  var UserModel = this;
  var decoded;
  try {
    decoded = jwt.verify(token,'123ABC');
  } catch {
    return new Promise((resolve,reject) => {
      reject();
    });
  }
  return UserModel.findOne({
    'tokens.token' : token,
    '_id' : decoded._id,
    'tokens.access' : 'auth'
  });
};

UserSchema.pre('save',function(next) {
    var user = this;
    if(user.isModified('password')) {
      bcrypt.genSalt(10 ,(err, salt) => {
         bcrypt.hash(user.password,salt,(err,hash) => {
           console.log(hash);
            user.password = hash;
            next();
         });
      });
    } else {
      next();
    }
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
