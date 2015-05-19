// Private

var keyPrefix = "u::";

var validate = function () {
  console.log("Validating the user object");
  
  // Validate the name
  var nameRegex = /^[a-zA-Z ]*$/;
  if (this.name.length > 100 || nameRegex.test(this.name)) {
    console.log("NAME VALID!!!");
  } else {
    console.log("NAME NOT VALID!!!");
  }
  
  // Validate the email address
  var emailRegex = /.+@.+\..+/i;
  if (emailRegex.test(this.email)) {
    console.log("EMAIL VALID!!!");
  } else {
    console.log("EMAIL NOT VALID!!!");
  }
  
};

// Public

module.exports.load = function(cb, user, callback) {
  this.cb = cb;
  user = "u::" + user;
  console.log("Loading user: " + user);
  cb.get(user, function(err, response) {
    if (err) throw err;
    console.log(response.value);
    callback(null, response.value);
  });
}
