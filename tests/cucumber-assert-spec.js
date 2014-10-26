var cucumberAssert = require('../index.js');
var assert = require('assert');

describe('cucumber-assert tests', function() {
	describe('#equal', function() {
		it('calls the actual assert with all the params', function () {
			spyOn(assert, 'equal');

			var actual = 'someRandomString';
			var expected = 'someRandomString';
			var message = 'Some failure message';

			cucumberAssert.equal(actual, expected, message);
			expect(assert.equal).toHaveBeenCalledWith(actual, expected, message);
		});
	});
});