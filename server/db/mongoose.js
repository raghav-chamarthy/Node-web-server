var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

var UserSchema = mongoose.Schema({
  email : {
    type: String,
    required: true,
    minlength :1,
    trim : true
  }
});

var TodoSchema = mongoose.Schema({
  text : {
    type : String,
    required : true ,
    minlength : true ,
    trim : true
  },
  completed : {
    type : Boolean,
    default : false
  },
  completedAt : {
    type: Number ,
    default : null
  }
});

module.exports = {
  mongoose,
  UserSchema,
  TodoSchema
};
