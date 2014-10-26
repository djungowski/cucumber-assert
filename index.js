var assert = require('assert');

var cucumberAssert = function() {

};

cucumberAssert.prototype.callActualAssert = function(method, actual, expected, callback, message) {
	try {
		assert[method](actual, expected, message);
		callback();
	} catch(e) {
		callback.fail(e.message);
	}
};

cucumberAssert.prototype.equal = function(actual, expected, callback, message) {
	this.callActualAssert('equal', actual, expected, callback, message);
};

cucumberAssert.prototype.notEqual = function(actual, expected, callback, message) {
	this.callActualAssert('notEqual', actual, expected, callback, message);
};

cucumberAssert.prototype.deepEqual = function(actual, expected, callback, message) {
	this.callActualAssert('deepEqual', actual, expected, callback, message);
};

module.exports = new cucumberAssert();