var express = require('express');
var app = express();

// Define some simple routes

app.get('/', function(req, res){
  res.send('Ticketyboo');
})


app.listen(3000, function() {
  console.log('Ticketyboo listening on port 3000');
})
