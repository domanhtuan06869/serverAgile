const express = require('express');
const router = express.Router();
const Category = require('../models/category');
router.post("/",function(req,res){
    console.log(req.body.name)
  var   Cate =new Category({name:req.body.name,type:req.body.type})
 
  Cate.save(function(err){

  })
  res.redirect('category')
})

router.get('/',function(req,res){
    Category.find({}).then(doc=>{
        res.render('category',{item:doc})
    })
  
})
module.exports = router;