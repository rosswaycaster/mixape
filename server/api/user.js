const router = require('express').Router();
const User = require('../db/User');

const sanitizeUser = (user) => {
  return {
    name: user.name,
    username: user.username,
    _id: user._id
  }
}

//Signup
router.post('/signup', (req, res) => {
  var user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  });
  user.save(function(err) {
    if (err) {
      res.status(401).send({err: 'Username already exists.'});
    } else {
      req.session.username = user.username;
      req.session.password = user.password;
      req.session._id = user._id;
      res.send(sanitizeUser(user));
    }
  });
});

//Login
router.post('/login', (req, res) => {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (user){
      const hash = user.passwordCheck(req.body.password);
      if (hash){
        req.session.username = req.body.username;
        req.session.password = hash;
        req.session._id = user._id;
        res.send(sanitizeUser(user));
      } else {
        delete req.session.username;
        delete req.session.password;
        delete req.session._id;
        res.status(401).send({err: 'Incorrect Username/Password.'});
      }
    } else {
      res.status(401).send({err: 'Username does not exist.'});
    }
  });
});

router.get('/logout', (req, res) => {
  delete req.session.username;
  delete req.session.password;
  delete req.session._id;
  res.send();
});

router.get('/me', (req, res) => {
  if (req.session.username && req.session.password){
    User.findOne({
      username: req.session.username,
      password: req.session.password
    }, function(err, user) {
      if (err) console.log(err);
      if (user) {
        userObj = sanitizeUser(user);
        res.send(userObj)
      }
    });
  } else {
    res.status(401).send({err: 'Not logged in.'});
  }
});

module.exports = router;
