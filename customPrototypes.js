module.exports = () => {
  Date.prototype.toSimpleDateTimeString = function () {
    return this.toISOString().slice(0, -5);
  };
  String.prototype.toRecognize = function () {
    return this.split(" ").join("").toLowerCase()
  }
};
