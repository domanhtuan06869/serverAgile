const MongoClient = require('mongodb').MongoClient;
module.exports = {
  
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Vui lòng đăng nhập để tiếp tục');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    
    if (!req.isAuthenticated()) {
      return next();
    }
res.redirect('/dashboard')
       
  }
};
