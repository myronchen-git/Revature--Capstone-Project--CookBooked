const CookBookedError = require("./CookBookedError");

class ArgumentError extends CookBookedError {
  constructor(message) {
    super(message);
    this.name = "ArgumentError";
    this.statusCode = 400;
  }
}

module.exports = ArgumentError;
