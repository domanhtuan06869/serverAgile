const mongoose = require('mongoose');

const OderSchema = new mongoose.Schema({
  fullName: {
    type: String,
 
  },
   address: {
    type: String,
  
  }, 
  phoneNumber:{
    type:String
  },
  nameProduct:{
    type:String
  },
  __id:{
    type:String
  },
  priceProduct:{
      type:String
  },
  amountProduct:{
      type:String
  },

});

const Oders = mongoose.model('order',OderSchema);

module.exports =  Oders;
