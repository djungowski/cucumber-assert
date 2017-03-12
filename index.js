var assert = require('assert');

class CucumberAssert {
	/**
	 * Call an actual "equals" assertion of the assert lib of node
	 * See http://nodejs.org/api/assert.html for details
	 *
	 * @param method		The method to be called
	 * @param actual		The actual value
	 * @param expected		The expected value
	 * @param [message]		The error message (optional)
	 */
	callActualEqualAssert(method, actual, expected, message) {
		return new Promise((resolve, reject) => {
			try {
				assert[method](actual, expected, message);
				resolve();
			} catch(e) {
				reject(new Error(e.message));
			}
		});
	}

	/**
	 * Wrapper for http://nodejs.org/api/assert.html#assert_assert_equal_actual_expected_message
	 *
	 * @param actual		The actual value
	 * @param expected		The expected value
	 * @param [message]		The error message (optional)
	 */
	equal(actual, expected, message) {
		return this.callActualEqualAssert('equal', actual, expected, message);
	}

	/**
	 * Wrapper for http://nodejs.org/api/assert.html#assert_assert_notequal_actual_expected_message
	 *
	 * @param actual		The actual value
	 * @param expected		The expected value
	 * @param [message]		The error message (optional)
	 */
	notEqual(actual, expected, message) {
		this.callActualEqualAssert('notEqual', actual, expected, message);
	}

	/**
	 * Wrapper for http://nodejs.org/api/assert.html#assert_assert_deepequal_actual_expected_message
	 *
	 * @param actual		The actual value
	 * @param expected		The expected value
	 * @param [message]		The error message (optional)
	 */
	deepEqual(actual, expected, message) {
		this.callActualEqualAssert('deepEqual', actual, expected, message);
	}

	/**
	 * Wrapper for http://nodejs.org/api/assert.html#assert_assert_notdeepequal_actual_expected_message
	 *
	 * @param actual		The actual value
	 * @param expected		The expected value
	 * @param [message]		The error message (optional)
	 */
	notDeepEqual(actual, expected, message) {
		this.callActualEqualAssert('notDeepEqual', actual, expected, message);
	}

	/**
	 * Wrapper for http://nodejs.org/api/assert.html#assert_assert_strictequal_actual_expected_message
	 *
	 * @param actual		The actual value
	 * @param expected		The expected value
	 * @param [message]		The error message (optional)
	 */
	strictEqual(actual, expected, message) {
		this.callActualEqualAssert('strictEqual', actual, expected, message);
	}

	/**
	 * Wrapper for http://nodejs.org/api/assert.html#assert_assert_notstrictequal_actual_expected_message
	 *
	 * @param actual		The actual value
	 * @param expected		The expected value
	 * @param [message]		The error message (optional)
	 */
	notStrictEqual(actual, expected, message) {
		this.callActualEqualAssert('notStrictEqual', actual, expected, message);
	}

	/**
	 * Wrapper for http://nodejs.org/api/assert.html#assert_assert_throws_block_error_message
	 *
	 * @param block			The function to be executed
	 * @param [error]		The expected error (optional)
	 * @param [message]		The error message (optional)
	 */
	throws(block, error, message) {
		return new Promise((resolve, reject) => {
			try {
				assert.throws(block, error, message);
				resolve();
			} catch(e) {
				// For some reason with assert.throws, etc. the exception does not use the message provided
				message = message || e.message;
				reject(new Error(message));
			}
		});
	}

	/**
	 * Wrapper for http://nodejs.org/api/assert.html#assert_assert_doesnotthrow_block_message
	 *
	 * @param block			The function to be executed
	 * @param [message]		The error message (optional)
	 */
	doesNotThrow(block, message) {
		return new Promise((resolve, reject) => {
			try {
				assert.doesNotThrow(block, message);
				resolve();
			} catch(e) {
				// For some reason with assert.doesNotThrow the exception message is undefined. Use a custom one
				// if no message is provided
				message = message || 'Caught exception where there was supposed to be none.';
				reject(new Error(message));
			}
		});
	}

	/**
	 * Wrapper for http://nodejs.org/api/assert.html#assert_assert_iferror_value
	 *
	 * @param value			The value to be tested
	 * @param [message]		The error message (optional)
	 */
	ifError(value, message) {
		return new Promise((resolve, reject) => {
			try {
				assert.ifError(value);
				resolve();
			} catch(e) {
				message = message || 'Expected value to be false, true provided.';
				reject(new Error(message));
			}
		});
	}
}

module.exports = new CucumberAssert();