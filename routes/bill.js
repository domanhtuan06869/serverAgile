const express = require('express');
const router = express.Router();
const Bills = new require('../models/BillUser');

//push value bill from mobile to database
router.post("/",function(req,res){
    console.log(req.body.name);
   
    const {nameproduct,sumprice,color,fullname,email,numberphone,address,status,payment,datebuy,url}=req.body


    const  Bill =new Bills({nameproduct:nameproduct,sumprice:sumprice,color:color,fullname:fullname,email:email,numberphone:numberphone,address:address,status:status,payment:payment,datebuy:datebuy,url:url})
 
  Bill.save(function(err){
       console.log(Bill)

  })

res.send('')
})

//get value bill
router.get('/detail',function(req,res){
    var email=req.query.email;
    Bills.find({email:email}).then((docs)=>{
        console.log(docs)
res.send(docs)
    })
})

//delete bill
router.get('/delete',function(req,res){
    const Bill=new Bills({_id:req.query.id});
         Bill.remove();
         console.log(Bill)
     
      
         res.send(Bill)
    })
module.exports = router;