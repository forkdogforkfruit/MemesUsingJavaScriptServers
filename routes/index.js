var express = require('express');
var router = express.Router();
var util = require('util')


/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log('Index get: ', util.inspect(req));
  res.render('index', { 'user': req.user });
});

module.exports = router;
