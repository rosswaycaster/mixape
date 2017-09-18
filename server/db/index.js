const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//Set up default mongoose connection
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useMongoClient: true });

//Get the default connection
const db = mongoose.connection;

db.once('open', function() {
  console.log('Connected to MongoDB');
});

db.on('error', function() {
  console.log("Error connected to MongoDB");
});

module.exports = db;
