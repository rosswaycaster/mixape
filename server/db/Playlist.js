const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const playlistSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  createdOn: { type: Date, default: Date.now }
});

// the schema is useless so far
// we need to create a model using it
const Playlist = mongoose.model('Playlist', playlistSchema);

// make this available to our users in our Node applications
module.exports = Playlist;
