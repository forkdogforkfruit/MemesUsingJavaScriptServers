var express = require('express');

var router = express.Router();
const fs = require("fs")
/* const path = require("path")
 */
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('../db');

router.get('/login', function(req, res, next) {
  res.render('login');
});

passport.use(new LocalStrategy(
    function verify(username, password, callback) {
      db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
        if (err) { return callback(err); }
        if (!row) { return callback(null, false, { message: 'Incorrect username or password.' }); }
  
        crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
          if (err) { return callback(err); }
          if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
            return callback(null, false, { message: 'Incorrect username or password.' });
          }
          return callback(null, row);
        });
      });
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

/*   passport.use(new LocalStrategy(function verify(username, password, cb) {
    let usersArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, "/data/users.json")));
    let filteredArray = usersArray.filter(x => x.username = username);
    if (filteredArray.length > 0) {
      let usersData = filteredArray[0];
      if (usersData.password == password) {
        return cb(null, usersData);
      }
    }
    else {
      return cb(null, false);
    }
  })); */

  router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/memes',
    failureRedirect: '/login'
  }));
  
  router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

  router.get('/signup', function(req, res, next) {
    res.render('signup');
  });

  router.post('/signup', function(req, res, next) {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return next(err); }
      db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
        req.body.username,
        hashedPassword,
        salt
      ], function(err) {
        if (err) { return next(err); }
        var user = {
          id: this.lastID,
          username: req.body.username
        };
        req.login(user, function(err) {
          if (err) { return next(err); }
          res.redirect('/');
        });
      });
    });
  });
  

  

module.exports = router;