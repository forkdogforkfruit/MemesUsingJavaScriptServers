var express = require('express');

var router = express.Router();

var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const fs = require("fs")
const path = require("path")

passport.use(new LocalStrategy(
    function verify(username, password, callback) {
      const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json'), { encoding: 'utf8' }))
      
      const user = users.find(u => u.username === username && u.password === password)
      if(user) {
        console.log('Logged in')
        callback(null, user)
      } else {
        console.log('Wrong password/login')
        callback(null, false, { message: 'Incorrect username or password.' })
      }
    })
  );
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

  router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
  router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });


router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;