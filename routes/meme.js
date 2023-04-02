var express = require('express');
var router = express.Router();


router.get('/index', (req, res, next) => {
    console.log("home in Navbar clicked")
    res.render('index')
    
     }) 

     router.get('/', function(req, res) {
      
        res.render('meme')
    
      })


module.exports = router;
