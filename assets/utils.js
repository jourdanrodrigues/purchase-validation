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

/**
 * Perform a delay promise based
 * @param {int} seconds - Seconds to sleep
 * @return {Promise}
 */
function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000 /* In milliseconds */));
}

module.exports = {
  pop: pop,
  deepCopy: deepCopy
};
