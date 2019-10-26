const express = require('express');
const router = express.Router();
const Userlogin = new require('../models/userlogin');




const { ensureAuthenticated, forwardAuthenticated} = require('../config/auth');
const MongoClient = require('mongodb').MongoClient;
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));
// Dashboard
router.get('/dashboard',ensureAuthenticated , (req, res) =>{
 
res.redirect('product')
})
module.exports = router;
