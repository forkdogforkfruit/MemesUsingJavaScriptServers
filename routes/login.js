var express = require('express');

var passport = require('passport');
var LocalStrategy = require('passport-local');

var router = express.Router();
const fs = require("fs")
const path = require("path")


router.get('/login', function(req, res, next) {
  res.render('login');
});

 passport.use(new LocalStrategy(
    function verify(username, password, callback) {
      const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json'), { encoding: 'utf8' }))
      
      const user = users.find(u => u.username === username && u.password === password)
      if(user) {
        callback(null, user, { message: 'Logged in' })
      } else {
        callback(null, false, { message: 'Incorrect username or password.' })
      }
    })
  );

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  
  passport.serializeUser(function(user, callback) {
    process.nextTick(function() {
      callback(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, callback) {
    process.nextTick(function() {
      return callback(null, user);
    });
  });

  //can't seem to get this to work. 
  router.post('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
  

  

module.exports = router;