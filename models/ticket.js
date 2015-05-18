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