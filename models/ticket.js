// Private

var keyPrefix = "t::";
var ticketIndexDoc = keyPrefix + "index";

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
  console.log(ticketIndex);
  for (var ticket in ticketIndex) {
    console.log("INSIDE THE LOOP HERE!")
    console.log(ticketIndex[ticket]);
    cb.get("t::"+ticketIndex[ticket], function (err, response) {
      if (err) throw err;
      console.log("TICKET: " + JSON.stringify(response));
      callback(null, response); // here even just iterating over a list of documents to get means we have to deal with several callbacks in one go
    });
  }
}

//#  this.cb = cb;
//#module.exports.loadTickets = function(cb, callback) {
//#  cb.get(ticketIndex, function(err, response) {
//#    if (err) throw err;
//#    callback(null, response.value);
//#  });
//#}






function Ticket(name, code, description, quantity, live, startDate, endDate) {
  this.name = name;
  this.code = code;
  this.quantity = quantity;
  this.admin = admin;
};