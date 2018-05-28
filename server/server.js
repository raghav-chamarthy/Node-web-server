var express = require('express');
var bodyparser = require('body-parser');
const _ = require('lodash');
var {authenticate} = require('./middleware/authenticate')

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {UserModel} = require('./models/user');
var {TodoModel} = require('./models/todo');

var PORT = process.env.PORT || 3000;

var app = express();

app.use(bodyparser.json())


app.get('/todos',(req,res) => {
  TodoModel.find().then((todos) => {
    res.send({todos});
  }).catch((e) => {
     res.send(e);
  });
});


app.get('/users/me',authenticate,(req,res) => {
  res.send(req.user);
})


app.post('/users',(req,res) => {
  var body = _.pick(req.body,['email','password']);
  var user = new UserModel(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
      res.header('x-auth',token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/todos/:id',(req,res) => {
  if(ObjectID.isValid(req.params.id)) {
    TodoModel.findById(req.params.id).then((todo) => {
      if(!todo) {
        res.status(404).send('Id not found');
      }
       res.send(todo);
    }).catch((e) => {
      console.log('error',e);
    });
  } else {
    res.status(400).send('Id not valid');
  }
});


app.post('/todos',(req,res) => {
   var todo = new TodoModel({
      text : req.body.text
   });

   todo.save().then((doc) => {
     res.send(doc);
   }).catch((e) => {
     res.send(e);
   })
});

app.listen(PORT , () => {
  console.log(`App running and listening on port ${PORT}`)
});
