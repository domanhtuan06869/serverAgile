const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated} = require('../config/auth');
const Userlogin = new require('../models/userlogin');
const OderManager = new require('../models/OderManager');
const Schedule= new require('../models/Schedules');
router.get('/post',function(req,res){
  const  Od =new OderManager({nameKh:'đmt',address:'hà nội',phone:095654645,nameProduct:'sáp',idProduct:'fdgfdg',unitPrice:777,amount:4888675,quantity:22})
 
  Od.save(function(err){
      
res.send(Od)
  })
})
router.get('/',ensureAuthenticated , (req, res) =>{
  Userlogin.find({email:req.user.email}).then(docs=>{
    var user=JSON.parse(JSON.stringify(docs))
    var role=user[0].__v;
  if(role==1){
    OderManager.find({__v:0}).then(docs=>{
    
       res.render('examples/oderproduct',{user:req.user.email,item:docs,active:'activea'})
   
      })
  }else{
    res.render('examples/lookscreen')
  }
  })
    })

    /////////////////
    router.get('/success',ensureAuthenticated , (req, res) =>{
      Userlogin.find({email:req.user.email}).then(docs=>{
        var user=JSON.parse(JSON.stringify(docs))
        var role=user[0].__v;
      if(role==1){
        OderManager.find({__v:1}).then(docs=>{
          var oder=JSON.parse(JSON.stringify(docs))
           res.render('examples/oderproductsuccess',{user:req.user.email,item:oder,active:'activea'})
       
          })
      }else{
        res.render('examples/lookscreen')
      }
      })
        })
        ////////////////////
        router.get('/fail',ensureAuthenticated , (req, res) =>{
          Userlogin.find({email:req.user.email}).then(docs=>{
            var user=JSON.parse(JSON.stringify(docs))
            var role=user[0].__v;
          if(role==1){
            OderManager.find({__v:2}).then(docs=>{
              var oder=JSON.parse(JSON.stringify(docs))
               res.render('examples/oderproductfail',{user:req.user.email,item:oder,active:'activea'})
           
              })
          }else{
            res.render('examples/lookscreen')
          }
          })
            })
            ///////////////

            
         
 router.get('/datlich',function(req,res){
  
   Schedule.find({__v:0}).then(docs=>{
     res.render('examples/bocklich',{user:req.user.email,item:docs,active:'activec'})
    })
  })

  router.get('/datlichsuccess',function(req,res){
  
    Schedule.find({__v:1}).then(docs=>{
      res.render('examples/bocklichsuccess',{user:req.user.email,item:docs,active:'activec'})
     })
   })
 

   router.get('/datlichfail',function(req,res){
  
    Schedule.find({__v:2}).then(docs=>{
      res.render('examples/bocklichfail',{user:req.user.email,item:docs,active:'activec'})
     })
   })
 

router.post('/edituser',ensureAuthenticated,(req,res)=>{
  
   var itemEmail=(req.query.email);
   var itemRole=(req.body.roleedit);
   var itemId=(req.query.id);

OderManager.findOneAndUpdate({_id:itemId},{__v:itemRole[0]},{
  new: true,                    
  runValidators: true             
})
.then(doc => {
//console.log(doc)
res.redirect('/manager')
})
.catch(err => {
console.error(err)
})
 
    })
    router.post('/editbooklich',ensureAuthenticated,(req,res)=>{
      var itemRole=(req.body.roleedit);
      var itemId=(req.query.id);
   
   Schedule.findOneAndUpdate({_id:itemId},{__v:itemRole[0]},{
     new: true,                    
     runValidators: true             
   })
   .then(doc => {
   //console.log(doc)
   res.redirect('/manager/datlich')
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
module.exports = router;