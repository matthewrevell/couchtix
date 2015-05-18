//Require the Couchbase SDK, connect to the cluster and our bucket
var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://127.0.0.1');
var cb = cluster.openBucket('default');

// Basic set-up for our Express app, using the Jade templating engine
var express = require('express');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// And bodyParser to handle our form input
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });


// Define our User class
var User = function (name, email) {
  this.name = name;
  this.email = email;
};

User.prototype.save = function() {
  console.log("This is where we'd save the user!");
};


// Define our basic routes

// The home page lists the tickets available and lets us obtain one
app.get('/', function(req, res) {
  // Check if this is the first time app is run
  cb.get('config', function(err, response) {
    // error code 13 tells us there's no document with that key
    if (err.code === 13) {
      console.log("First time running. Let's redirect to set up the config.");
      res.redirect('/first-run');
    }
  });
});

app.get('/first-run', function(req, res) {
  // The first time the app is run we want to gather some basic config and admin-user info
  res.render('first-run');
});

app.post('/first-run', urlEncodedParser, function(req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  } else {
    adminUser = new User(req.body.name, req.body.email);
    adminUser.save();
    console.log(adminUser.email);
    res.render('first-run-confirm', adminUser);

  }
});


app.listen(3000, function() {
  console.log('Ticketyboo listening on port 3000');
});
