var express = require('express');
var router = express.Router();
// const { resolve } = require('path');
const axios = require('axios');

/* router.get('/', function (req, res, next) {}); */

router.get('/', (req, res) => {
    console.log("Sign in in Navbar clicked")
    res.send("You clicked on  Sign In")
    
     })

module.exports = router;