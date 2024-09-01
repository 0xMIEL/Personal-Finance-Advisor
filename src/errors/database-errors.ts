// Import the CustomError base class
import CustomError from './custom-error.js'

// Error class for handling database connection errors
class DatabaseConnectionError extends CustomError {
	constructor(message: string) {
		super(message)
		this.name = 'DatabaseConnectionError' // Set the error name
		this.statusCode = 503 // HTTP status code for Service Unavailable
	}
}

// Error class for handling database query errors
class DatabaseQueryError extends CustomError {
	constructor(message: string) {
		super(message)
		this.name = 'DatabaseQueryError' // Set the error name
		this.statusCode = 500 // HTTP status code for Internal Server Error
	}
}

// Export the custom error classes
export { DatabaseConnectionError, DatabaseQueryError }
