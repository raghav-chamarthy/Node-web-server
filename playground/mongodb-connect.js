//const mongoClient = require('mongodb').MongoClient;
const { MongoClient:mongoClient , ObjectID } = require('mongodb');

const obj = new ObjectID();
console.log(obj);

mongoClient.connect('mongodb://localhost:27017/TodoApp',{
  useMongoClient: true
  })
  .then((client) => {
    console.log('DB Connected');
    const db = client.db();
    db.collection('Users').deleteMany({
      name: 'Purnima'
    }).then((result) => {
      console.log(JSON.stringify(result,null,2));
    })
    })
  .catch((err) => {
    console.log(err);
});
