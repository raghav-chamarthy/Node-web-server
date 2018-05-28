const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

var password = 'adnkjsankdndnskndans';
var hasedPassword;

bcrypt.genSalt(10 , (err, salt) => {
   bcrypt.hash(password,salt,(err,hash) => {
     console.log(hash);
   })
});

bcrypt.compare(password,hasedPassword,(err,result) => {
  console.log(result);
});
