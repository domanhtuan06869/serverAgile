const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
  url: {
    type: String
  }
 
});

const Slide = mongoose.model('slide',SlideSchema);

module.exports =  Slide;
