// Private

var keyPrefix = "u::";

// Public
module.exports = User;

//Constructor
function User(id, name, email, cb, admin) {
  this.cb = cb;
  this.id = keyPrefix + id;
  this.name = name;
  this.email = email; 
  this.admin = admin;
};

//Methods
User.prototype.load = function(id) {
  this.id = keyPrefix + id;
  console.log("Attempting to load " + this.id);
  cb.get(this.id, function(err, response) {
    if (err && err.code === 13) {
      return false;
    }
    else {
      console.log(response);
    }; 
  });
};

User.prototype.save = function() {
  // For now we'll use the user's email address as the document key.
  // We'll use an upsert because we'll call this only where we definitely want
  // to save the user profile.
  console.log("Attempting to save");
  if (this.validate()) { 
    this.cb.upsert(this.email, {name: this.name}, function(err, res) {
      if (err) {
        console.log('Failed to save the user: ', err);
        return err;
      } else {
        console.log("Saved user to " + this.email);
      }
    });
  } else {
    return false;
  }
};

User.prototype.validate = function () {
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