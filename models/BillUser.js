const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  nameproduct: {
    type: String,
  },
  sumprice: {
    type: Number
  
  }, 
  color:{
   type :String
  },
  fullname:{
    type:String
  },
  email:{
    type:String
  },
  numberphone:{
      type:String
  },
  address:{
      type:String
  },
  status:{
      type:String
  },
  payment:{
      type:String
  },
  datebuy:{
      type:String
  },
  url:{
    type:String
  }
});

const Bill = mongoose.model('bill',BillSchema);

module.exports =  Bill;
