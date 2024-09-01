// Custom error class for handling application-specific errors
class CustomError extends Error {
	statusCode: number

	// Initializes the CustomError with a message and a default status code
	constructor(message: string) {
		super(message)
		this.name = 'CustomError' // Set the name property for the error type
		this.statusCode = 0 // Default status code
	}
}

export default CustomError
