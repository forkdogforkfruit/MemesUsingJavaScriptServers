var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// making routes
/* router.get('/memes', (req, res) => {
  console.log("meme in Navbar clicked")
  res.send("You clicked on meme")
  
   }) */
  
router.get('/login', (req, res) => {
  console.log("Sign in in Navbar clicked")
  res.send("You clicked on sign in")

})

module.exports = router;
