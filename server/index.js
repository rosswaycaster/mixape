const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
require('dotenv').config({path:path.join(__dirname, '../.env')});
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const api = require('./api');
const db = require('./db');


app.use(session({
  secret: 'M1x@p3!',
  store: new MongoStore({ mongooseConnection: db }),
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/build')));

//Attach socket.io to the request
app.use(function(req,res,next){
  req.io = io;
  next();
})

//API Routes
app.use('/api', api);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
if (!process.env.DEV) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const port = process.env.PORT || 3001;
server.listen(port);

console.log(`Server listening on ${port}`);
