// Private

var keyPrefix = "e::";
var eventKey = keyPrefix + "event";

var eventDetails = {
	"name":  "",
	"url": "",
	"description": ""
}


// Public

module.exports.load = function (cb, callback) {
	this.cb = cb;
	cb.get(eventKey, function(err, response) {
		if (err) {
			console.log("OMG! " + err)
			return false;
		} else {
			callback(response.value);
		}
	});
}

