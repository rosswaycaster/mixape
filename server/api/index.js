const router = require('express').Router();
const userRoutes = require('./user');
const playlistRoutes = require('./playlist');
const searchRoutes = require('./search');

router.use('/user', userRoutes);
router.use('/playlist', playlistRoutes);
router.use('/search', searchRoutes);

module.exports = router;
