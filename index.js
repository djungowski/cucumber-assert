var assert = require('assert');

var cucumberAssert = function() {

};

cucumberAssert.prototype.equal = function(actual, expected, callback, message) {
	assert.equal(actual, expected, message);
	callback();
};

module.exports = new cucumberAssert();