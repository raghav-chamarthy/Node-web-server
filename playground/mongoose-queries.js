var {mongoose} = require('./../server/db/mongoose');
var {TodoModel} = require('./../server/models/todo');
var {UserModel} = require('./../server/mdoels/user');

const {ObjectID} = require('mongodb');

var id = '5b0027b53fc410c0ccb85c0411';
if(ObjectID.isValid(id)){
  TodoModel.find({
    _id : id
  }).then((todos) => {
    console.log('Todos' , todos);
  }).catch((e) => {
    console.log('error' ,e)
  });
} else {
  console.log('ObjectID is not valid');
};

if(ObjectID.isValid(id)){
  TodoModel.findOne({
    _id : id
  }).then((todo) => {
    if(!todo) {
      console.log('No todo matching the id');
    } else {
      console.log('todo',todo);
    }
  }).catch((e) => {
    console.log('error' ,e)
  });
} else {
  console.log('ObjectID is not valid');
};


if(ObjectID.isValid(id)){
  TodoModel.findById({
    _id :id
  }).then((todo) => {
    console.log('Todo',todo);
  }).catch((e) => {
    console.log('error' ,e)
  });
} else {
  console.log('ObjectID is not valid');
};
