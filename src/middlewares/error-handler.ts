import http from 'http'
import express from 'express'
import CustomError from '../errors/custom-error.js'
import {
	DatabaseConnectionError,
	DatabaseQueryError,
} from '../errors/database-errors.js'

// Middleware to handle errors in Express applications
const errorHandler: express.ErrorRequestHandler = (
	err: CustomError,
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	// Default error response structure
	const defaultResponse = {
		error: http.STATUS_CODES[err.statusCode] || 'Unknown Error',
	}

	// Log the error if it is related to database issues
	if (
		err instanceof DatabaseConnectionError ||
		err instanceof DatabaseQueryError
	) {
		console.error(err) // Log error details for debugging
		return res.status(err.statusCode).json(defaultResponse)
	}

	// For other errors, include the error name and message in the response
	return res.status(err.statusCode).json({
		...defaultResponse,
		message: `${err.name}: ${err.message}`,
	})
}

export default errorHandler
