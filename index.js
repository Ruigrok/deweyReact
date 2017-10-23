// Include Server Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

var db = require('./client/models');

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 5001;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(morgan('dev'));

// Static directory
app.use(express.static('client/public'));
app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
// =============================================================
require('./api-routes/user-routes.js')(app);
require('./api-routes/library-routes.js')(app);
require('./api-routes/community-routes.js')(app);
require('./api-routes/discussion-routes.js')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
// -------------------------------------------------

// Listener
db.sequelize.sync({ force: true }).then(function () {

  app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
  });
});