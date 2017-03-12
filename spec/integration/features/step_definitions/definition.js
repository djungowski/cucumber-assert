var nodeAssert = require('assert');
var assert = require('../../../../index.js');

var errorMessageString = 'cucumber-assert error message';
var errorMessageError = new Error(errorMessageString);

module.exports = function () {
	var errorsEncountered;

	var createAssertErrorMessage = function(callback) {
		return function(error) {
			nodeAssert.deepEqual(error, errorMessageError);
			errorsEncountered++;
			callback();
		};
	};

	this.Before(function() {
		errorsEncountered = 0;
	});

	this.Given(/^I run the cucumber suits$/, function (callback) {
		callback();
	});

	this.When(/^I fail an assert$/, function (callback) {
		assert.equal(true, false, errorMessageString).catch(createAssertErrorMessage(callback));
	});

	this.When(/^I pass an assert$/, function (callback) {
		assert.equal(true, true, errorMessageString).then(callback, callback);
	});

	this.When(/^I fail a throws$/, function (callback) {
		assert.throws(function() {}, errorMessageString).catch(createAssertErrorMessage(callback));
	});

	this.When(/^I fail a doesNotThrow$/, function (callback) {
		assert.doesNotThrow(function() { throw('up'); }, errorMessageString).catch(createAssertErrorMessage(callback));
	});

	this.When(/^I fail a ifError$/, function (callback) {
		assert.ifError({}, errorMessageString).catch(createAssertErrorMessage(callback));
	});

	this.When(/^I pass multiple equals$/, function (callback) {
		const promises = [];
		promises.push(assert.equal(true, true, errorMessageString));
		promises.push(assert.equal(true, true, errorMessageString));
		promises.push(assert.equal(true, true, errorMessageString));
		assert.all(promises).then(callback);
	});

	this.When(/^I fail multiple equals$/, function (callback) {
		const promises = [];
		promises.push(assert.equal(true, true, errorMessageString));
		promises.push(assert.equal(true, true, errorMessageString));
		promises.push(assert.equal(true, false, errorMessageString));
		Promise.all(promises).catch(createAssertErrorMessage(callback));
	});

	this.Then(/^everything worked as expected$/, function (callback) {
		nodeAssert.equal(errorsEncountered, 5);
		callback();
	});
};