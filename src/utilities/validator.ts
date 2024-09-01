import {
	MissingValueError,
	InvalidTypeError,
	ValidationError,
} from '../errors/default-errors.js'

class Validator {
	// Pattern for validating usernames: must be 6-16 alphanumeric characters
	private static readonly USERNAME_REGEX = /^[0-9A-Za-z]{6,16}$/

	// Pattern for validating passwords: must be 8-32 characters, including at least one letter and one digit
	private static readonly PASSWORD_REGEX =
		/^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/

	// Validates the provided value against the given regex pattern
	// Throws an error if the value is missing, of the wrong type, or doesn't match the pattern
	private static validateWithRegex(
		regex: RegExp,
		fieldName: string, // Name of the field being validated (e.g., 'username', 'password')
		value: any,
		expectedType: string = 'string' // Expected data type of the value
	): boolean {
		if (value === undefined) {
			throw new MissingValueError(fieldName)
		}
		if (typeof value !== expectedType) {
			throw new InvalidTypeError(fieldName, expectedType)
		}
		if (!regex.test(value)) {
			throw new ValidationError(fieldName)
		}
		return true
	}

	// Validates a username using the USERNAME_REGEX pattern
	static validateUsername(username: any): boolean {
		return this.validateWithRegex(this.USERNAME_REGEX, 'username', username)
	}

	// Validates a password using the PASSWORD_REGEX pattern
	static validatePassword(password: any): boolean {
		return this.validateWithRegex(this.PASSWORD_REGEX, 'password', password)
	}
}

export default Validator
