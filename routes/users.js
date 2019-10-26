const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');
// Load User model
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));
// index page
router.get('/index', forwardAuthenticated, (req, res) => res.render('nguoidung'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;

  console.log(req.body )
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Vui lòng nhập vào các trường' });
  }

  if (password != password2) {
    errors.push({ msg: 'Mật khẩu chưa khớp' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Mật khẩu phải lớn hơn 6 kí tự' });
  
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email đã tồn tại' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'Đăng kí thành công bạn có thể đăng nhập ngay'
                );
               res.redirect('/users/login');
             
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/product',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
 
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Đăng xuất thành công');
  res.redirect('/users/login');
});

module.exports = router;
