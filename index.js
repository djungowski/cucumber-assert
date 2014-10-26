var assert = require('assert');

var cucumberAssert = function() {

};

cucumberAssert.prototype.callActualEqualAssert = function(method, actual, expected, callback, message) {
	try {
		assert[method](actual, expected, message);
		callback();
	} catch(e) {
		callback.fail(e.message);
	}
};

cucumberAssert.prototype.equal = function(actual, expected, callback, message) {
	this.callActualEqualAssert('equal', actual, expected, callback, message);
};

cucumberAssert.prototype.notEqual = function(actual, expected, callback, message) {
	this.callActualEqualAssert('notEqual', actual, expected, callback, message);
};

cucumberAssert.prototype.deepEqual = function(actual, expected, callback, message) {
	this.callActualEqualAssert('deepEqual', actual, expected, callback, message);
};

cucumberAssert.prototype.notDeepEqual = function(actual, expected, callback, message) {
	this.callActualEqualAssert('notDeepEqual', actual, expected, callback, message);
};

cucumberAssert.prototype.strictEqual = function(actual, expected, callback, message) {
	this.callActualEqualAssert('strictEqual', actual, expected, callback, message);
};

cucumberAssert.prototype.notStrictEqual = function(actual, expected, callback, message) {
	this.callActualEqualAssert('notStrictEqual', actual, expected, callback, message);
};

cucumberAssert.prototype.throws = function(block, callback, error, message) {
	try {
		assert.throws(block, error, message);
		callback();
	} catch(e) {
		// For some reason with assert.throws, etc. the exception does not use the message provided
		message = message || e.message;
		callback.fail(message);
	}
};

cucumberAssert.prototype.doesNotThrow = function(block, callback, message) {
	try {
		assert.doesNotThrow(block, message);
		callback();
	} catch(e) {
		// For some reason with assert.throws, etc. the exception does not use the message provided
//		message = message || e.message;
		callback.fail(message);
	}
};

module.exports = new cucumberAssert();