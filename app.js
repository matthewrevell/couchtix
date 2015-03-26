// Basic set-up for our Express app
var express = require('express');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


// Define some simple routes

app.get('/', function(req, res){
  res.render('index.jade', {title: 'Ticketyboo'});
});

app.get('/admin', function(req, res){

});


app.listen(3000, function() {
  console.log('Ticketyboo listening on port 3000');
});
