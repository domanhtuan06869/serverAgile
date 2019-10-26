const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    fullName: {
    type: String,
 
  },
  phoneNumber: {
    type: String,
  
  }, 
  day:{
    type:String
  },
  time:{
    type:String
  },
  place:{
    type:String
  }
});

const  Schedule= mongoose.model('schedule', ScheduleSchema);

module.exports = Schedule
