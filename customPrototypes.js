module.exports = () => {
  Date.prototype.toSimpleDateTime = function () {
    return this.toISOString().slice(0, -5);
  };
};
