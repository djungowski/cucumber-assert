cucumber-assert
===============
An assertion library for cucumber.js

## Installation
~~~ bash
npm install cucumber-assert
~~~

## Example usage
```javascript
var assert = require('cucumber-assert');

module.exports = function() {

	this.Given(/^the field E-Mail is filled with "([^"]*)" befüllt$/, function (email, callback) {
		var fieldValue = this.getFieldValue('#password');
		assert.equal(fieldValue, email, callback, 'Expected E-Mail to be ' + email);
	});

}
```

## Available assertions
Generally cucumber-assert wraps the assertions available by default in node. For reference see http://nodejs.org/api/assert.html
The paramater "callback" is the callback provided by cucumber.js in step definitions and has to be passed always alongside the actual values and expectations.

#### equal(actual, expected, callback, [message])
#### notEqual(actual, expected, callback, [message])
#### deepEqual(actual, expected, callback, [message])
#### notDeepEqual(actual, expected, callback, [message])
#### strictEqual(actual, expected, callback, [message])
#### notStrictEqual(actual, expected, callback, [message])
#### throws(block, callback, [error], [message])
#### doesNotThrow(block, callback, [message])
#### ifError(value, callback, [message])
