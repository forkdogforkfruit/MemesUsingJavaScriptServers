var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")
var passport = require('passport')
var LocalStrategy = require('passport-local');
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session)

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

passport.use(new LocalStrategy(function verify(username, password, cb) {
  let usersArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/users.json")));
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
}));

router.post('/password', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
  }));

  router.get('/', function(req, res, next) {
    if(!req.user) {
      res.render('login', {user: null});
    }
    else {
      res.render('login', {user: req.user});
    }
  });

  router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });
  
/*   router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
  }));
  router.use(passport.authenticate('session')); */
  
  
  
  
  

module.exports = router

//This was the offered text. Above I have copy and pasted from example during lesson 
/* var express = require('express');
var router = express.Router();
// const { resolve } = require('path');
const axios = require('axios');

/* router.get('/', function (req, res, next) {}); 

router.get('/', (req, res) => {
    console.log("Sign in in Navbar clicked")
    res.send("You clicked on  Sign In")
    
     })

module.exports = router; */