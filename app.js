//Load the app config and initalise config variables
var config = require('config');
var cbLocation = 'couchbase://' + config.get('Database.couchbaseLocation');
var cbBucket = config.get('Database.bucket');

//Require the Couchbase SDK, connect to the cluster and our bucket
var couchbase = require('couchbase');
var cluster = new couchbase.Cluster(cbLocation);
var cb = cluster.openBucket(cbBucket);
var ViewQuery = couchbase.ViewQuery;

// Basic set-up for our Express app, using the Jade templating engine
var express = require('express');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Load third-party libs
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
require('express-helpers')(app);

// Load our models
var event = require('./models/event.js');
var tickets = require('./models/ticket.js');
var user = require('./models/user.js');

// Define our basic routes

// The home page lists the tickets available and lets us obtain one
app.get('/', function(req, res) {
  // Load the event details
  event.load(cb, function getTicketIndex(err, eventDetail) {
    tickets.loadIndex(cb, function(err, ticketIndex) {
      tickets.loadEach(cb, ticketIndex, function(err, ticketDetails) {
        user.load(cb, "matthewrevell", function(err, userDoc) {
          res.render('index', { eventDetails: eventDetail, ticketList: ticketIndex, ticketDetails: ticketDetails, userDoc: userDoc });
        });
      });
    });
  });
});

app.get('/:ticket', function(req, res) {
  event.load(cb, function getTicketIndex(err, eventDetail) {
    tickets.loadOne(cb, ViewQuery, req.params.ticket, function(err, ticketDetails) {
        user.load(cb, "matthewrevell", function(err, userDoc) {
          res.render('ticket-page', { eventDetails: eventDetail, ticketDetails: ticketDetails, userDoc: userDoc });
        });
      });
    });
});


app.listen(3000, function() {
  console.log('Couchtix listening on port 3000');
});
