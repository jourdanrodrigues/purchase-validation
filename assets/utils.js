"use strict";

/**
 * Delete an attribute from a object and return its value
 * @param {Object} object
 * @param {String} attribute
 * @param defaultValue
 */
function pop(object, attribute, defaultValue) {
  let attributeValue = object[attribute];
  delete object[attribute];
  return attributeValue || defaultValue;
}

/**
 * Perform a deep copy of a given object
 * @param {Object} object
 * @return {Object}
 */
function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}

module.exports = {
  pop: pop,
  deepCopy: deepCopy
};
