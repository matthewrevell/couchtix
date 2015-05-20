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
  for (var i = 0; i < ticketIndex.length; i++) {
    ticketIndex[i] = "t::" + ticketIndex[i];
    console.log("ticketIndex[i]: " + ticketIndex[i]);
  }
    cb.getMulti(ticketIndex, function (err, response) {
      if (err) throw err;
      var details = [];
      for (var ticket in response) {
        details.push(response[ticket]["value"]);
      } 
      for (var i in details) {
        console.log(details[i]);
      }
      callback(null, details);
    });
}

