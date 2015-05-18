// Private

var keyPrefix = "e::";
var eventKey = keyPrefix + "event";

var eventDetails = {
	"name":  "",
	"url": "",
	"description": "",
	"live": false,
	"eventDate": "",
	"onSale": "",
	"offSale": "",
	"type": "event"
}


// Public

module.exports.load = function (cb, callback) {
	this.cb = cb;
	cb.get(eventKey, function(err, response) {
		if (err) throw err;
		callback(null, response.value);
	});
}

