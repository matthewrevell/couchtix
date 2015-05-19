//Load the app config and initalise config variables
var config = require('config');
var cbLocation = 'couchbase://' + config.get('Database.couchbaseLocation');
var cbBucket = config.get('Database.bucket');

//Require the Couchbase SDK, connect to the cluster and our bucket
var couchbase = require('couchbase');
var cluster = new couchbase.Cluster(cbLocation);
var cb = cluster.openBucket(cbBucket);


// Basic set-up for our Express app, using the Jade templating engine
var express = require('express');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// And bodyParser to handle our form input
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });

// Load our models
var event = require('./models/event.js');
var tickets = require('./models/ticket.js');

// Define our basic routes

// The home page lists the tickets available and lets us obtain one
app.get('/', function(req, res) {
  // Load the event details
  event.load(cb, function getTicketIndex(err, eventDetail) {
    tickets.loadIndex(cb, function(err, ticketIndex) {
      tickets.loadEach(cb, ticketIndex, function(err, ticketDetails) {
        res.render('index', { eventDetails: eventDetail, ticketList: ticketIndex, ticketDetails: ticketDetails });
      });
    });
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
    adminUser = new User(req.body.name, req.body.email, cb);
    console.log('adminUser: ' + adminUser);
    adminUser.save();
    console.log(adminUser.email);
    res.render('first-run-confirm', adminUser);

  }
});


app.listen(3000, function() {
  console.log('Ticketyboo listening on port 3000');
});
