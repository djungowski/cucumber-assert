cucumber-assert
===============
[![Build Status](https://travis-ci.org/djungowski/cucumber-assert.svg?branch=master)](https://travis-ci.org/djungowski/cucumber-assert)

An assertion library for [cucumber.js](https://github.com/cucumber/cucumber-js). It allows assertions in cucumber.js without extra-long stacktraces when an assertion fails.

## Installation
```bash
npm install cucumber-assert
```

## Note
As of Version 2.0, cucumber-assert uses Promises. If you need the old version without Promises, install Version 1.0.4:
```bash
npm install cucumber-assert@1.0.4
```

## Example usage
```javascript
var assert = require('cucumber-assert');

module.exports = function() {

	this.Given(/^the field E-Mail is filled with "([^"]*)"/, function (email, callback) {
		var fieldValue = this.getFieldValue('#password');
		assert.equal(fieldValue, email, 'Expected E-Mail to be ' + email).then(callback, callback);
	});

}
```

## Multiple operations
If you need multiple assertions in one step, you can simply wait to resolve all the Promises. Since `Promise.all()` will resolve with an array of the results, `Promise.all(...).then(callback)` would result in a broken test, since calling the callback with a parameter tells cucumber, that something went wrong. You can either use `Promise.all(...).then(() => callback())` or the provided `.all()` Method:

```javascript
var assert = require('cucumber-assert');

module.exports = function() {

	this.Given(/^the form is filled out"/, function (callback) {
		var password = this.getFieldValue('#password');
		var name = this.getFieldValue('#name');
		var tosCheck = this.getFieldValue('#tos');
		
        var promises = [];
		promises.push(assert.notEqual(password, '', 'Expected E-Mail to not be empty'));
		promises.push(assert.notEqual(tosCheck, '', 'Expected Name not to be empty'));
		promises.push(assert.equal(tosCheck, 'checked', 'Expected TOS to be checked'));
        assert.all(promises).then(callback, callback);
	});

}
```
instead of
```javascript
		Promise.all(promises).then(() => callback(), () => callback());
```

## Available assertions
Generally cucumber-assert wraps the assertions available by default in node. For reference see http://nodejs.org/api/assert.html

The parameter "callback" is the callback provided by cucumber.js in step definitions and has to be passed always alongside the actual values and expectations.

#### equal(actual, expected, callback, [message])
```javascript
assert.equal(password, '', 'Expected E-Mail to be empty').then(callback);
```

#### notEqual(actual, expected, [message])
```javascript
assert.notEqual(password, '', 'Expected E-Mail not to be empty').then(callback);
```

#### deepEqual(actual, expected, [message])
```javascript
assert.deepEqual(nestedObject, expectedNestedObject).then(callback);
```

#### notDeepEqual(actual, expected, [message])
```javascript
assert.notDeepEqual(nestedObject, notExpectedNestedObject).then(callback);
```

#### strictEqual(actual, expected, [message])
```javascript
assert.strictEqual(1, 1).then(callback);
```

#### notStrictEqual(actual, expected, [message])
```javascript
assert.notStrictEqual(1, "1").then(callback);
```

#### throws(block, [error], [message])
```javascript
assert.throws(someFunctionThatThrows).then(callback);
```

#### doesNotThrow(block, [message])
```javascript
assert.doesNotThrow(someFunctionThatDoesNotThrow).then(callback);
```

#### ifError(value, [message])
```javascript
assert.ifError(failsIfThisIsTrue).then(callback);
```

## Changelog
[See here](CHANGELOG.md)
