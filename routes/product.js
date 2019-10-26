const express = require('express');
const router = express.Router();
const Product = new require('../models/product');
const { ensureAuthenticated, forwardAuthenticated} = require('../config/auth');
const Userlogin = new require('../models/userlogin');
const Slide = new require('../models/slide');
const Order= new require('../models/OderManager');
const Schedule= new require('../models/Schedules');

router.get('/',ensureAuthenticated,(req,res)=>{
  Userlogin.find({email:req.user.email}).then(docs=>{
    var user=JSON.parse(JSON.stringify(docs))
    var role=user[0].__v;
    if(role==1){
      var search = {}
      if(req.query.search != undefined){
        search = {nameProduct: {'$regex':req.query.search}}
      }
    //  console.log(search)
      Product.find(search).then(docs=>{
        res.render('examples/product',{user:req.user.email,item:docs,active:'activeb'})
      })
    }else{
      res.render('examples/lookscreen')
    }
  })
})
router.get('/mobile',function(req,res){
 
Product.find({}).then(docs=>{
  console.log(docs)
res.send(docs)
})
})
router.get('/mobile/search',function(req,res){
  var category=(req.query.category)
  Product.find({category: category}).then(docs=>{
    console.log(category)
  res.send(docs)
  })
})
router.get('/mobile/search/nameproduct',function(req,res){
  var name=(req.query.name)
  Product.find({name: {'$regex':name}}).then(docs=>{
    console.log(docs)
  res.send(docs)
  })
})

router.get('/mobile/slide',function(req,res){
  Slide.find({}).then(docs=>{
    console.log(docs)
  res.send(docs)
  })
})
router.post("/",function(req,res){
   
    var name=(req.body.name);
    var category=(req.body.category);
    var price =(req.body.price);
    var urlimage=(req.body.imgurl);
    var description=(req.body.description);

    const  Prd =new Product({nameProduct:name,typeProduct:category,priceProduct:price,imageProduct:urlimage,descriptionProduct:description})
 
  Prd.save(function(err){
       console.log(Prd)

  })
  req.flash(
    'success',
    'save'
  );
  
  res.redirect('/product')
})
router.get('/delete',function(req,res){
const Prd=new Product({_id:req.query.id});
     Prd.remove();
     console.log(Prd)
     req.flash(
      'success',
      'delete'
    );
  
     res.redirect('/product')
})
router.get('/edit',function(req,res){

 const {id}=req.query;
 Product.findOne({_id:id}).then(docs=>{
  res.render('examples/productedit',{user:req.user.email,item:docs,active:'activeb'})

})
   
  })
  router.get('/editproduct',function(req,res){

    const {id,name,category,price,urlimage,description}=req.query;
    Product.findOneAndUpdate({_id:id},{nameProduct:name,typeProduct:category,priceProduct:price,imageProduct:urlimage,descriptionProduct:description},{
      new: true,                    
      runValidators: true             
    })
    .then(doc => {
    console.log(doc)
    req.flash(
      'success',
      'edit'
    );
  
    res.redirect('/product')
    }) 
    .catch(err => {
    console.error(err)
    })



    


 
  })
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
  router.get('/aac',function(req,res){
    Product.find({}).then((doc)=>{
      res.send(doc)
    })
  })



  router.get('/Thongke',function(req,res){
    var sumamout=0;
    var sumrevenue=0
    var sumbook=0;
    Order.find({__v:1}).then(docs=>{
    
     for(let i=0;i<docs.length;i++){
       var sum=Number(docs[i].amountProduct);
       var sumprice=Number(docs[i].priceProduct);
       sumamout+=sum
       sumrevenue+=sumprice
     
     }
  
     Schedule.find({__v:1}).then(doc=>{
      for(let i=0;i<doc.length;i++){

        sumbook++
  
      
      }

      res.render('examples/Thongke',{user:req.user.email,active:'actived',sumamout:sumamout,sumrevenue:sumrevenue,sumbook:sumbook})
     })
    })
   
  })


module.exports = router;