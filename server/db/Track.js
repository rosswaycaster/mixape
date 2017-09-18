const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const trackSchema = new Schema({
  url: { type: String, required: true},
  source: { type: String, required: true},
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  playlist: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Playlist' },
  createdOn: { type: Date, default: Date.now }
});

// the schema is useless so far
// we need to create a model using it
const Track = mongoose.model('Track', trackSchema);

// make this available to our users in our Node applications
module.exports = Track;
