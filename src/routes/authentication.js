const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

// SIGNUP
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

// SINGIN
router.get('/signin', (req, res) => {
  res.render('signin.ejs');
});

router.post('/signin', (req, res, next) => {
  
  
  passport.authenticate('local.signin', {

    
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
   
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.get('/profile', isLoggedIn, (req, res) => {

   if ( req.user.campus == "xalapa") { 

  res.render('profile.ejs');
   }else if(req.user.campus == "xico"){
     res.render('profilexico.ejs');
  
  }else if(req.user.campus == "rinconada"){
    res.render('profilerinconada.ejs');
 
 }
});



router.get('/profileXICO', isLoggedIn, (req, res) => {
  res.render('profilexico.ejs');
});

module.exports = router;
