class CookBookedError extends Error {
  constructor(message) {
    super(message);
    this.name = "CookBookedError";
  }
}

module.exports = CookBookedError;
