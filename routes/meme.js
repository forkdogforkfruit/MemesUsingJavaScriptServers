var express = require('express');
var router = express.Router();
// const { resolve } = require('path');
const axios = require('axios');

router.get('/home', (req, res, next) => {
    console.log("home in Navbar clicked")
    res.send("You clicked on meme")
    
     })

   
module.exports = router;
