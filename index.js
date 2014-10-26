var assert = require('assert');

var cucumberAssert = function() {

};

cucumberAssert.prototype.equal = function(actual, expected, message) {
	assert.equal(actual, expected, message);
};

module.exports = new cucumberAssert();