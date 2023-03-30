// go to https://www.youtube.com/watch?v=SccSCuHhOw0 Advanced routing section

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
