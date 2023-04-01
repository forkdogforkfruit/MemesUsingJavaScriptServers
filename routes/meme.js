var express = require('express');
var router = express.Router();


router.get('/index', (req, res, next) => {
    console.log("home in Navbar clicked")
    res.render('index')
    
     }) 
module.exports = router;
