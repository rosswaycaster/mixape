const router = require('express').Router();
const Playlist = require('../db/Playlist');
const Track = require('../db/Track');

const Moniker = require('moniker');
const names = Moniker.generator([Moniker.verb, Moniker.adjective, Moniker.noun]);

router.get('/name', (req, res) => {
  function tryName(){
    const name = names.choose();
    if (name.length < 18){
      Playlist.findOne({slug: name})
      .exec(function(err, playlist) {
        if (playlist === null) {
          res.send({name});
        } else {
          tryName();
        }
      });
    } else {
      tryName();
    }
  }

  tryName();

});

/* Create Playlist
POST {
  slug: name of playlist
}
*/
router.post('/', (req, res) => {
  if (req.session._id) {
    new Playlist({
      slug: req.body.slug,
      owner: req.session._id
    }).save(function(err, playlist) {
      if (err) {
        res.status(401).send({err: 'Playlist "'+req.body.slug+'" already exists.'});
      } else {
        res.send(playlist);
      }
    });
  } else {
    res.status(401).send({err: 'Please login to create a Playlist.'})
  }
});

//Get Playlist
router.get('/', (req, res) => {
  Playlist.findOne({
    slug: req.query.slug
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
    } else {
      res.status(404).send({err:'Playlist does not exist.'});
    }
  });
});

//Add Track To Playlist
router.post('/track', (req, res) => {
  if (req.session._id) {
    Playlist.findById(req.body.playlist)
    .exec(function(err, playlist) {
      if (err) console.log(err);
      if (playlist) {
        new Track({
          data: req.body.data,
          source: req.body.source,
          owner: req.session._id,
          playlist: playlist._id
        }).save(function(err, track) {
          if (err) {
            res.status(401).send({err: err});
          } else {
            req.io.emit(playlist.slug, {
              refresh: true
            });
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
router.delete('/track', (req, res) => {
  if (req.session._id) {
    Playlist.findById(req.query.playlist)
    .populate({path: 'owner', select: '_id'})
    .exec(function(err, playlist) {
      if (err) console.log(err);
      if (playlist && playlist.owner._id == req.session._id) {
        Track.remove({_id: req.query._id},function(err) {
          if (err) {
            res.status(401).send({err: err});
          } else {
            req.io.emit(playlist.slug, {
              refresh: true
            });
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
