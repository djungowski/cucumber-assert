var cucumberAssert = require('../index.js');
var assert = require('assert');

describe('cucumber-assert tests', function() {
	var cucumberCallback = function() {

	};

	cucumberCallback.fail = function() {

	};

	var callbackSpy = {
		callback: cucumberCallback
	};

	describe('#equal', function() {
		it('calls the actual assert with all the params', function () {
			spyOn(assert, 'equal');

			var actual = 'someRandomString';
			var expected = 'someRandomString';
			var message = 'Some failure message';

			cucumberAssert.equal(actual, expected, cucumberCallback, message);
			expect(assert.equal).toHaveBeenCalledWith(actual, expected, message);
		});

		it('calls the callback function', function() {
			spyOn(callbackSpy, 'callback');

			cucumberAssert.equal('Heyyyyy, hermano.', 'Heyyyyy, hermano.', callbackSpy.callback, 'There are dozens of us! DOZENS!');
			expect(callbackSpy.callback).toHaveBeenCalled();
		});

		describe('calls the fail callback when assert was not successful', function() {
			it ('uses the exception message', function() {
				spyOn(callbackSpy.callback, 'fail');
				cucumberAssert.equal('Big Bear', 'Bob Loblaw Law Blog.', callbackSpy.callback);
				expect(callbackSpy.callback.fail).toHaveBeenCalledWith('"Big Bear" == "Bob Loblaw Law Blog."');
			});

			it('uses the provided message', function() {
				spyOn(callbackSpy.callback, 'fail');
				var message = 'Heart attack never stopped old Big Bear.';
				cucumberAssert.equal('Big Bear', 'Bob Loblaw Law Blog.', callbackSpy.callback, message);
				expect(callbackSpy.callback.fail).toHaveBeenCalledWith(message);
			});
		});
	});

	describe('#notEqual', function() {
		it('calls the actual assert with all the params', function() {
			spyOn(assert, 'notEqual');
			var actual = 'No, it\'s the opposite.';
			var expected = 'Perhaps you remember Neuterfest?';
			var message = 'Moms are such a pain in the ass, huh?';
			cucumberAssert.notEqual(actual, expected, cucumberCallback, message);
			expect(assert.notEqual).toHaveBeenCalledWith(actual, expected, message);
		});
	});

	describe('#deepEqual', function() {
		it('calls the actual assert with all the params', function() {
			spyOn(assert, 'deepEqual');
			var actual = {"foo": "bar", "random": "object"};
			var expected = {"foo": "bar", "random": "object"};
			var message = 'Wow. You, sir, are a mouthfu';
			cucumberAssert.deepEqual(actual, expected, cucumberCallback, message);
			expect(assert.deepEqual).toHaveBeenCalledWith(actual, expected, message);
		});
	});
});