var express = require('express');
var router = express.Router();
var axios = require('axios')

const memes_url = "https://api.imgflip.com/get_memes"

var memesList

router.get('/', (req, res) => {
    console.log("Called prefetchMemes")
    if(memesList === undefined) {
        axios.get(memes_url).then(
          function (response) {
            memesList = response.data.data.memes   
           /*  console.log('Response: ', memesList) */
          }
        ).catch(function (error) {
          // handle error
          console.log(error);
        })
    }
    res.send({'memes': memesList})
})


module.exports = router