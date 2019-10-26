const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  imageProduct: {
    type: String,
 
  },
   nameProduct: {
    type: String,
  
  }, 
  priceProduct:{
    type:String
  },
  typeProduct:{
    type:String
  },
  descriptionProduct:{
    type:String
  }
});

const Product = mongoose.model('product',ProductSchema);

module.exports =  Product;
