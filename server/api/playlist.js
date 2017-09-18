const router = require('express').Router();
const Playlist = require('../db/Playlist');
const Track = require('../db/Track');

//Create Playlist
router.post('/:slug', (req, res) => {
  if (req.session._id) {
    new Playlist({
      slug: req.params.slug,
      owner: req.session._id
    }).save(function(err, playlist) {
      if (err) {
        res.status(401).send({err: 'Playlist "'+req.params.slug+'" already exists.'});
      } else {
        res.send(playlist);
      }
    });
  } else {
    res.status(401).send({err: 'Must be logged in.'})
  }
});

//Get Playlist
router.get('/:slug', (req, res) => {
  Playlist.findOne({
    slug: req.params.slug
  })
  .populate({path: 'owner', select: '-password'})
  .exec(function(err, playlist) {
    if (err) console.log(err);
    if (playlist) {
      Track.find({})
      .where({
        playlist: playlist._id
      })
      .populate({path:'owner', select: '-password'})
      .exec(function(err, tracks){
        if (err) console.log(err)
        res.send({playlist, tracks})
      })
    }
  });
});

//Add Track To Playlist
router.post('/:slug/track', (req, res) => {
  if (req.session._id) {
    Playlist.findOne({
      slug: req.params.slug
    })
    .exec(function(err, playlist) {
      if (err) console.log(err);
      if (playlist) {
        new Track({
          url: req.body.url,
          source: req.body.source,
          owner: req.session._id,
          playlist: playlist._id
        }).save(function(err, track) {
          if (err) {
            res.status(401).send({err: err});
          } else {
            res.send(track);
          }
        });
      }
    });
  } else {
    res.status(401).send({err: 'Must be logged in.'})
  }
});

//Delete Track From Playlist
router.delete('/:slug/track', (req, res) => {
  if (req.session._id) {
    Playlist.findOne({
      slug: req.params.slug
    })
    .populate({path: 'owner', select: '_id'})
    .exec(function(err, playlist) {
      if (err) console.log(err);
      if (playlist && playlist.owner._id == req.session._id) {
        Track.findById(req.body._id).remove(function(err) {
          if (err) {
            res.status(401).send({err: err});
          } else {
            res.send('Successfully Deleted Track.');
          }
        });
      } else {
        res.status(401).send({err: 'Only playlist owner can delete tracks.'})
      }
    });
  } else {
    res.status(401).send({err: 'Must be logged in.'})
  }
});

module.exports = router;
