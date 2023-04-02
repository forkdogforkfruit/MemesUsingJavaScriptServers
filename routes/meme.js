var express = require('express');
var axios = require('axios');
var router = express.Router();


router.get('/:id', (req, res, next) => {
    console.log("Meme id", req.params.id)
    axios.get('http://localhost:3000/api/memes/'+req.params.id).then((response) => {
    // console.log('API response', response.data)
    res.render('meme', { 'meme': response.data })
  })
}
)

     


module.exports = router;
