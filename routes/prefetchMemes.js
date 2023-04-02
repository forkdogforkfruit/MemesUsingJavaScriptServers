var express = require('express');
var router = express.Router();
var axios = require('axios')

const memes_url = "https://api.imgflip.com/get_memes"

var memesList
function prefetchMemes() {
  return axios.get(memes_url).then(
    function (response) {
      memesList = response.data.data.memes
      return memesList
    }
  ).catch(function (error) {
    // handle error
    console.log(error);
  })
}

router.get('/memes', (req, res) => {
    console.log("Called prefetchMemes")
    if(memesList === undefined) {
        prefetchMemes().then((result) => {
          res.send({'memes': result})
        })
    } else {
      res.send({'memes': memesList})
    }
})

router.get('/memes/:id', (req, res) => {
  console.log("Called prefetchMemes with id ", req.params.id)
  if(memesList === undefined) {
    prefetchMemes().then((result) => {
      res.send({'meme': result.find( elem => elem.id === req.params.id)})
    })
} else {
  res.send({'meme': memesList.find( elem => elem.id === req.params.id)})
}
  }
)

module.exports = router