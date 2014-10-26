var assert = require('assert');

var cucumberAssert = function() {

};

cucumberAssert.prototype.equal = function(actual, expected, callback, message) {
	try {
		assert.equal(actual, expected, message);
		callback();
	} catch(e) {
		callback.fail();
	}
};

module.exports = new cucumberAssert();