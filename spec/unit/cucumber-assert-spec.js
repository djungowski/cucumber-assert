var cucumberAssert = require('../../index.js');
var assert = require('assert');

describe('cucumber-assert tests', function() {
	var cucumberCallback = function() {

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

			cucumberAssert.equal(actual, expected, message);
			expect(assert.equal).toHaveBeenCalledWith(actual, expected, message);
		});

		it('returns a promise', () => {
			const actual = cucumberAssert.equal(null, null, null);
			expect(actual).toEqual(jasmine.any(Promise));
		});

		it('resolves, when the assert succeeds', function(done) {
			const promise = cucumberAssert.equal('Heyyyyy, hermano.', 'Heyyyyy, hermano.', 'There are dozens of us! DOZENS!');
			promise.then((result) => {
				expect(result).toBe(true);
				done();
			})
		});

		describe('rejects with new Error when assert was not successful', function() {
			it('uses the exception message', function(done) {
				const promise = cucumberAssert.equal('Big Bear', 'Bob Loblaw Law Blog.');
				promise.catch((error) => {
					expect(error).toEqual(new Error('\'Big Bear\' == \'Bob Loblaw Law Blog.\''));
					done();
				});

			});

			it('uses the provided message', function(done) {
				const message = 'Heart attack never stopped old Big Bear.';
				const promise = cucumberAssert.equal('Big Bear', 'Bob Loblaw Law Blog.', message);
				promise.catch((error) => {
					expect(error).toEqual(new Error(message));
					done();
				});
			});
		});
	});

	describe('#notEqual', function() {
		it('calls the actual assert with all the params', function() {
			spyOn(assert, 'notEqual');
			var actual = 'No, it\'s the opposite.';
			var expected = 'Perhaps you remember Neuterfest?';
			var message = 'Moms are such a pain in the ass, huh?';
			cucumberAssert.notEqual(actual, expected, message);
			expect(assert.notEqual).toHaveBeenCalledWith(actual, expected, message);
		});
	});

	describe('#deepEqual', function() {
		it('calls the actual assert with all the params', function() {
			spyOn(assert, 'deepEqual');
			var actual = {"foo": "bar", "random": "object"};
			var expected = {"foo": "bar", "random": "object"};
			var message = 'Wow. You, sir, are a mouthful';
			cucumberAssert.deepEqual(actual, expected, message);
			expect(assert.deepEqual).toHaveBeenCalledWith(actual, expected, message);
		});
	});

	describe('#notDeepEqual', function() {
		it('calls the actual assert with all the params', function() {
			spyOn(assert, 'notDeepEqual');
			var actual = {"foo": "nope", "random": "Lungaharing"};
			var expected = {"foo": "bar", "random": "object"};
			var message = 'Are you going to make dancing illegal?';
			cucumberAssert.notDeepEqual(actual, expected, message);
			expect(assert.notDeepEqual).toHaveBeenCalledWith(actual, expected, message);
		});
	});

	describe('#strictEqual', function() {
		it('calls the actual assert with all the params', function() {
			spyOn(assert, 'strictEqual');
			var actual = function() { return 'But where did the lighter fluid come from?'};
			var expected = 'But where did the lighter fluid come from?';
			var message = 'Do the right thing here.';
			cucumberAssert.strictEqual(actual, expected, message);
			expect(assert.strictEqual).toHaveBeenCalledWith(actual, expected, message);
		});
	});

	describe('#notStrictEqual', function() {
		it('calls the actual assert with all the params', function() {
			spyOn(assert, 'notStrictEqual');
			var actual = new function() { return 'If I wanted something your thumb touched I\'d eat the inside of your ear. '};
			var expected = new function() { return 'If I wanted something your thumb touched I\'d eat the inside of your ear. '};
			var message = 'I\'ve always been deeply passionate about nature. ';
			cucumberAssert.notStrictEqual(actual, expected, message);
			expect(assert.notStrictEqual).toHaveBeenCalledWith(actual, expected, message);
		});
	});

	describe('Multiple operations', function() {
		var actual = 'I need a fake passport, preferably to France';
		var expected = 'There\'s always money in the banana stand!';
		var message = 'Heart attack never stopped old Big Bear.';

	    it('allows running multiple equal operations, using promises', function(done) {
	        spyOn(assert, 'equal');
			spyOn(assert, 'notEqual');
			spyOn(assert, 'notDeepEqual');
			spyOn(assert, 'strictEqual');
			spyOn(assert, 'notStrictEqual');
			spyOn(callbackSpy, 'callback');

			const promises = [];

			promises.push(cucumberAssert.equal(actual, expected, message));
			promises.push(cucumberAssert.notEqual(actual, expected, message));
			promises.push(cucumberAssert.notDeepEqual(actual, expected, message));
			promises.push(cucumberAssert.strictEqual(actual, expected, message));
			promises.push(cucumberAssert.notStrictEqual(actual, expected, message));

			Promise.all(promises).then(() => {
				expect(assert.equal).toHaveBeenCalledWith(actual, expected, message);
				expect(assert.notEqual).toHaveBeenCalledWith(actual, expected, message);
				expect(assert.notDeepEqual).toHaveBeenCalledWith(actual, expected, message);
				expect(assert.strictEqual).toHaveBeenCalledWith(actual, expected, message);
				expect(assert.notStrictEqual).toHaveBeenCalledWith(actual, expected, message);
				done();
			});
	    });
	});

	describe('#throws', function() {
		it('calls the actual assert with all the params', function() {
			spyOn(assert, 'throws');
			var block = function() { };
			var error = Error;
			var message = 'I\'m good and ready.';
			cucumberAssert.throws(block, error, message);
			expect(assert.throws).toHaveBeenCalledWith(block, error, message);
		});

		it('returns a promise', function() {
			var block = function() { throw new Error(); };
			var error = Error;
			var message = 'I\'m good and ready.';
			const actual = cucumberAssert.throws(block, error, message);
			expect(actual).toEqual(jasmine.any(Promise));
		});

		it('resolves when the assertion was successful', function(done) {
			var block = function() { throw new Error(); };
			var error = Error;
			var message = 'I\'m good and ready.';
			const promise = cucumberAssert.throws(block, error, message);
			promise.then((result) => {
				expect(result).toBe(true);
				done();
			});
		});

		describe('rejects with new Error when assert was not successful', function() {
			it('uses the message provided', function(done) {
				var block = function () {};
				var error = 'You could hump that hood.';
				var message = 'I see you\'ve wasted no time in filling my seat hole.';
				const promise = cucumberAssert.throws(block, error, message);
				promise.catch((error) => {
					expect(error).toEqual(new Error(message));
					done();
				});
			});

			it('uses the exception message if no message is provided', function(done) {
				var block = function () {};
				var error = 'You can always tell a Milford man.';
				const promise = cucumberAssert.throws(block, error);
				promise.catch((error) => {
					expect(error).toEqual(new Error('Missing expected exception. You can always tell a Milford man.'));
					done();
				});
			});
		});
	});

	describe('#doesNotThrow', function() {
		it('calls the actual assert with all the params', function () {
			spyOn(assert, 'doesNotThrow');
			var block = function () {};
			var message = 'Maybe it\'s not for us.';
			cucumberAssert.doesNotThrow(block, message);
			expect(assert.doesNotThrow).toHaveBeenCalledWith(block, message);
		});

		it('returns a promise', function() {
			var block = function () {};
			var message = 'Maybe it\'s not for us.';
			const actual = cucumberAssert.doesNotThrow(block, message);
			expect(actual).toEqual(jasmine.any(Promise));
		});

		it('resolves when the assertion was successful', function(done) {
			var block = function () {};
			var message = 'Maybe it\'s not for us.';
			const promise = cucumberAssert.doesNotThrow(block, message);
			promise.then((result) => {
				expect(result).toBe(true);
				done();
			});
		});

		describe('rejects with new Error when assertion was not successful', function() {
			it('uses the message provided', function(done) {
				var block = function() { throw('She\'s a contestant') };
				var message = 'Stack the chafing dishes outside by the mailbox.';
				const promise = cucumberAssert.doesNotThrow(block, message);
				promise.catch((error) => {
					expect(error).toEqual(new Error(message));
					done();
				});
			});

			it('uses a custom message if no message is provided', function(done) {
				var block = function() { throw('She\'s a contestant') };
				const promise = cucumberAssert.doesNotThrow(block);
				promise.catch((error) => {
					expect(error).toEqual(new Error('Caught exception where there was supposed to be none.'));
					done();
				});
			});
		});
	});

	describe('#ifError', function() {
		it('calls the actual assert with all the params', function() {
			spyOn(assert, 'ifError');
			var value = true;
			cucumberAssert.ifError(value);
			expect(assert.ifError).toHaveBeenCalledWith(value);
		});

		it('returns a promise', function() {
			var value = false;
			const actual = cucumberAssert.ifError(value);
			expect(actual).toEqual(jasmine.any(Promise));
		});

		it('resolves if there is no error', function(done) {
			const promise = cucumberAssert.ifError(false);
			promise.then((result) => {
				expect(result).toBe(true);
				done();
			});
		});

		describe('rejects with new Error when assertion was not successful', function() {
			it('uses the provided message', function(done) {
				var message = 'I may have committed some light treason.';
				const promise = cucumberAssert.ifError(true, message);
				promise.catch((error) => {
					expect(error).toEqual(new Error(message));
					done();
				});
			});

			it('uses a custom error message if no message is provided', function(done) {
				const promise = cucumberAssert.ifError(true);
				promise.catch((error) => {
					expect(error).toEqual(new Error('Expected value to be false, true provided.'));
					done();
				});
			});
		});
	});
});