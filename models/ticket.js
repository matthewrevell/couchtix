// Private

var keyPrefix = "t::";
var ticketIndexDoc = keyPrefix + "index";

var loadDetails = function(ticketObj) {
  console.log("NOW IN LOADDETAILS");
  var ticketDetails = [];
  console.log(JSON.stringify(ticketObj));
  for (var ticket in ticketObj) {
    ticketDetails.push(ticket['value']);
  }
  return ticketDetails;
}

ticketLink = function(ticket) {
	ticket = ticket.toLowerCase();
	ticket = ticket.replace(/ /g, "-");
	return(ticket);
}

// Public

module.exports.loadIndex = function(cb, callback) {
  this.cb = cb;
  cb.get(ticketIndexDoc, function(err, response) {
    if (err) throw err;
    console.log(response.value.index);
    callback(null, response.value.index);
  });
}

module.exports.loadEach = function(cb, ticketIndex, callback) {
  this.cb = cb;
  // Take the manual index of tickets and prepend the ticket 
  // key prefix to each
  for (var i = 0; i < ticketIndex.length; i++) {
    ticketIndex[i] = "t::" + ticketIndex[i];
    console.log("ticketIndex[i]: " + ticketIndex[i]);
  }
  // Pull an array of the ticket objects from CB
  // then pull out each individual document and push onto
  // an array, which we pass to the callback
    cb.getMulti(ticketIndex, function (err, response) {
      if (err) throw err;
      var details = [];
      for (var ticket in response) {
        var thisTicket = response[ticket]['value'];
        thisTicket['link'] = ticketLink(thisTicket['name']);
        details.push(thisTicket);
        console.log(JSON.stringify(thisTicket));
      } 
      for (var i in details) {
        console.log(details[i]);
      }
      callback(null, details);
    });
}

