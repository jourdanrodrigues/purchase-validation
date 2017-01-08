module.exports = () => {
  Date.prototype.toSimpleDateTimeString = function () {
    return this.toISOString().slice(0, -5);
  };
};
