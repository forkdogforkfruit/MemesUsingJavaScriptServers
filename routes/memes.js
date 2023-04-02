var express = require('express');
var router = express.Router();
// const { resolve } = require('path');


var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var fs = require('fs');
var path = require('path');

var https = require('https');
const { response } = require('express');
const { default: axios } = require('axios');




router.get('/', function (req, res, next) {
  axios.get('http://localhost:3000/api/memes').then((response) => {
    // console.log('API response', response.data)
    res.render('memes', { 'memesList': response.data })
  })
  
});




module.exports = router;




