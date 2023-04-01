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


// function download(url, filename, callback) {
//   request.head(url, function (err, res, body) {
//     request(url).pipe(fs.createWriteStream(path.resolve(__dirname, '../data/memesOverview/' + filename))).on('close', callback);
//   });
// }


//BM New API endpoint to use for the data from the soccer API
router.get('/', function (req, res, next) {
  axios.get('http://localhost:3000/api/memes').then((response) => {
    // console.log('API response', response.data)
    res.render('memes', { 'memesList': response.data })
  })
  
});


// Come back to this soon. 
    //  router.get('/', function(req, res, next) {
    //     let data = fs.readFileSync(path.resolve(__dirname, "../data/memesOverview.json"));
    //     res.render('memes', { memes: JSON.parse(data)});
        
    //   });
  /*     router.get('/', function(req, res, next) {
        let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/memesOverview.json"));
        let data = req.body
        res.render('memes', { memes: JSON.parse(data)});
        
      }); */
      
      //  router.post('/', jsonParser, function(req, res, next) {
      //     let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/memesOverview.json"));
      //     let memesArray = JSON.parse(rawdata);
      //     // if(memesArray.filter(x => x.name === req.body.name).length == 0) {
      //     //   download(req.body.url, req.body.name, function(){
      //     //     console.log('done');
      //     //   });
      //     //   const newArray = memesArray.concat([req.body])
      //     //   fs.writeFileSync(path.resolve(__dirname, "../data/memesOverview.json"), JSON.stringify(newArray));
      //     // }
      //     res.end();
      //     next()
      //   });

         

module.exports = router;




