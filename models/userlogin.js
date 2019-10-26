const mongoose = require('mongoose');

const UserLogin = new mongoose.Schema({
  name: {
    type: String,
  
  },
  email: {
    type: String,

  },
  password: {
    type: String,

  },
  date: {
    type: String,

  },
  __v:{
    type:Number
  }
});

const userLogin = mongoose.model('user', UserLogin);

module.exports = userLogin;
