// Private

var keyPrix = "t::";

// Public

module.exports = Ticket;

function Ticket(name, code, description, quantity, live, startDate, endDate) {
  this.name = name;
  this.code = code;
  this.quantity = quantity;
  this.admin = admin;
};