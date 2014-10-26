cucumber-assert
===============
An assertion library for cucumber.js

## Installation
~~~ bash
npm install cucumber-assert
~~~

## Example usage
```
var assert = require('cucumber-assert');

module.exports = function() {

	this.Given(/^the field E-Mail is filled with "([^"]*)" befüllt$/, function (email, callback) {
		var fieldValue = this.getFieldValue('#password');
		assert.equal(fieldValue, email, callback, 'Expected E-Mail to be ' + email);
	});

}
´´´