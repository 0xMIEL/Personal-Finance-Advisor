// Import the CustomError base class
import CustomError from './custom-error.js'

// Error class for missing values
class MissingValueError extends CustomError {
	constructor(propertyName: string) {
		super(`The '${propertyName}' is required.`)
		this.name = 'MissingValueError' // Set the error name
		this.statusCode = 400 // HTTP status code for Bad Request
	}
}

// Error class for missing values
class MissingValuesError extends CustomError {
	constructor(message: string) {
		super(message)
		this.name = 'MissingValuesError' // Set the error name
		this.statusCode = 400 // HTTP status code for Bad Request
	}
}

// Error class for invalid property types
class InvalidTypeError extends CustomError {
	constructor(propertyName: string, expectedType: string) {
		super(`The '${propertyName}' should be a type of ${expectedType}.`)
		this.name = 'InvalidTypeError' // Set the error name
		this.statusCode = 400 // HTTP status code for Bad Request
	}
}

// Error class for invalid property values
class InvalidValueError extends CustomError {
	constructor(propertyName: string, message: string) {
		super(`The value of '${propertyName}' should be a ${message}.`)
		this.name = 'InvalidValueError' // Set the error name
		this.statusCode = 400 // HTTP status code for Bad Request
	}
}

// Error class for general validation failures
class ValidationError extends CustomError {
	constructor(propertyName: string) {
		super(`The '${propertyName}' does not meet the criteria.`)
		this.name = 'ValidationError' // Set the error name
		this.statusCode = 400 // HTTP status code for Bad Request
	}
}

// Error class for invalid credentials
class InvalidCredentialsError extends CustomError {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidCredentialsError' // Set the error name
		this.statusCode = 401 // HTTP status code for Unauthorized
	}
}

// Error class for resource not found
class NotFoundError extends CustomError {
	constructor(message: string) {
		super(message)
		this.name = 'NotFoundError' // Set the error name
		this.statusCode = 404 // HTTP status code for Not Found
	}
}

// Error class for resources that already exist
class AlreadyExistsError extends CustomError {
	constructor(message: string) {
		super(message)
		this.name = 'AlreadyExistsError' // Set the error name
		this.statusCode = 409 // HTTP status code for Conflict
	}
}

// Error class for issues with the authorization header
class AuthorizationHeaderError extends CustomError {
	constructor(message: string) {
		super(message)
		this.name = 'AuthorizationHeaderError' // Set the error name
		this.statusCode = 401 // HTTP status code for Unauthorized
	}
}

// Error class for invalid tokens
class InvalidTokenError extends CustomError {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidTokenError' // Set the error name
		this.statusCode = 401 // HTTP status code for Unauthorized
	}
}

// Error class for expired tokens
class TokenExpiredError extends CustomError {
	constructor(message: string) {
		super(message)
		this.name = 'TokenExpiredError' // Set the error name
		this.statusCode = 401 // HTTP status code for Unauthorized
	}
}

// Error class for deleted resources
class DeletedResourceError extends CustomError {
	constructor(message: string = 'Resource has been deleted') {
		super(message)
		this.name = 'DeletedResourceError' // Set the error name
		this.statusCode = 410 // HTTP status code for Gone
	}
}

// Export all custom error classes
export {
	MissingValueError,
	MissingValuesError,
	InvalidTypeError,
	InvalidValueError,
	ValidationError,
	InvalidCredentialsError,
	NotFoundError,
	AlreadyExistsError,
	AuthorizationHeaderError,
	InvalidTokenError,
	TokenExpiredError,
	DeletedResourceError,
}
