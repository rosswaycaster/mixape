const router = require('express').Router();
const axios = require('axios');


//Get Playlist
router.get('/', (req, res) => {
  axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      q: req.query.query,
      key: process.env.YOUTUBE_API,
      part: 'snippet',
      maxResults: 10,
      type: 'video',
      videoEmbeddable: 'true'
    }
  })
  .then(results => {
    var videos = results.data.items.filter((video) => {
      return video.id.videoId;
    });
    res.send(videos)
  })
  .catch(err => {
    res.status(404).send({err: 'Error with YouTube'});
  })
});

module.exports = router;
