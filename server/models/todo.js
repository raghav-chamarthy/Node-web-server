var {TodoSchema} = require('../db/mongoose');
var mongoose = require('mongoose');

var TodoModel = mongoose.model('Todo',TodoSchema);

module.exports = {
    TodoModel
};
