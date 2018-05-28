var mongoose = require('mongoose');
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

var TodoModel = mongoose.model('Todo',TodoSchema);

module.exports = {
    TodoModel
};
