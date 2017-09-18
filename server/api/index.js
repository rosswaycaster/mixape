const router = require('express').Router();
const userRoutes = require('./user');
const playlistRoutes = require('./playlist');

router.use('/user', userRoutes);
router.use('/playlist', playlistRoutes);

module.exports = router;
