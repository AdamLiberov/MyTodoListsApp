const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const User = require('../models/user');
const passport = require('passport');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('home', { title: 'Express' });
});
router.get('/register', (req, res, next) => {
  res.render("register");
});
router.post('/register', middleware.asyncErrorHandler(async (req, res, next) => {
  console.log('1');
  const newUser = {
    username: req.body.username,
    image: req.body.image,
    token: 1221
  }
  console.log("2");
  await User.register(new User(newUser), req.body.password);
  passport.authenticate('local', 
      { 
         successRedirect: '/lists',
         failureRedirect: '/register' 
      })(req, res, next)
}));
router.get('/login', (req, res, next) => {
  res.render('login');
});
router.post('/login', passport.authenticate('local', {successRedirect: '/lists', failureRedirect: 'back'}));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});
module.exports = router;
