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

module.exports = {
    pop: pop
};