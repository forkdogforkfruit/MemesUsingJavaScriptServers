var express = require('express');
var router = express.Router();
// const { resolve } = require('path');
const axios = require('axios');


var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var fs = require('fs');
var path = require('path');

var request = require('request');
var https = require('https');
const { response } = require('express');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;



const url = "https://api.imgflip.com/get_memes"
function download(url, filename, callback) {
  request.head(url, function (err, res, body) {
    request(url).pipe(fs.createWriteStream(path.resolve(__dirname, '../data/memesOverview/' + filename))).on('close', callback);
  });
}

//BM New API endpoint to use for the data from the soccer API
/* router.get('/', function (req, res, next) {});
 */

// Come back to this soon. 
     router.get('/', function(req, res, next) {
        let data = fs.readFileSync(path.resolve(__dirname, "../data/memesOverview.json"));
        res.render('memes', { memes: JSON.parse(data)});
        
      });
  /*     router.get('/', function(req, res, next) {
        let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/memesOverview.json"));
        let data = req.body
        res.render('memes', { memes: JSON.parse(data)});
        
      }); */
      
       router.post('/', jsonParser, function(req, res, next) {
          let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/memesOverview.json"));
          let memesArray = JSON.parse(rawdata);
          if(memesArray.filter(x => x.name === req.body.name).length == 0) {
            download(req.body.url, req.body.name, function(){
              console.log('done');
            });
            const newArray = memesArray.concat([req.body])
            fs.writeFileSync(path.resolve(__dirname, "../data/memesOverview.json"), JSON.stringify(newArray));
          }
          res.end();
          next()
        });

         
/*
     function fetchData() {
        fetch("https://api.imgflip.com/get_memes").then(response => {
          if(!response.ok) {
            console.log(response);
            throw Error ('Error');
          }
           console.log(response)
       return response.json();
       
        }).then(data => {
           console.log(data.data); 
    const html = data.data/* .map(id => {
            return `<p>ID: {user.iD}<\p>`
          })   
          console.log(html)     
          document.querySelector('#memesId').insertAdjacentHTML('afterbegin', '<p>Hello</p>')
        }).catch(error => {
          (console.log(error))
        });
     }
     fetchData(); 
        /*
       
        router.delete('/', jsonParser, function(req, res, next) {
          let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/memesOverview.json"));
          let memessArray = JSON.parse(rawdata);
          const newArray = memessArray.filter(x => x.name !== req.body.name)
          if(newArray.length !== memessArray.length) {
            fs.unlink(path.resolve(__dirname, '../data/memesOverview/'+ req.body.name), () => {
              console.log(req.body.name + " deleted!");
            });
            fs.writeFileSync(path.resolve(__dirname, "../data/memesOverview.json"), JSON.stringify(newArray));
          }
          res.end();
        }); */
      
       /*  router.delete('/', jsonParser, ensureLoggedIn, function(req, res, next) {
          
        })
      */
module.exports = router;



/* A trial at getting data from the API. Creates an infinite loop
const url = "https://api.imgflip.com/get_memes";

request = https.get(url, res => {
  let download  = fs.createWriteStream("./data/memesOverview.json");
  console.log("Response started!");
  res.pipe(download);
  res.on("end", () => {
    console.log("Response finished")
  
  })
}) */
