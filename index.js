var assert = require('assert');

var cucumberAssert = function() {

};

cucumberAssert.prototype.equal = function(actual, expected, callback, message) {
	try {
		assert.equal(actual, expected, message);
		callback();
	} catch(e) {
		callback.fail(e.message);
	}
};

cucumberAssert.prototype.notEqual = function(actual, expected, callback, message) {
	try {
		assert.notEqual(actual, expected, message);
		callback();
	} catch(e) {
		callback.fail(e.message);
	}
};

module.exports = new cucumberAssert();