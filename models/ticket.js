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
  for (var i = 0; i < ticketIndex.length; i++) {
    ticketIndex[i] = "t::" + ticketIndex[i];
  }
  cb.getMulti(ticketIndex, function (err, response) {
      if (err) throw err;
      console.log("TICKET: " + JSON.stringify(response));
      callback(null, response);
    });
}