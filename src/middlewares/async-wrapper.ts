import express from 'express'

// Interface extending Express Response to include optional user details
export interface ResponseWithUser extends express.Response {
	user?: {
		userId: number
		username: string
	}
}

// Type definition for a generic handler function
type HandlerFunctionType = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => Promise<void> | void

// Type definition for an authenticated handler function
type AuthHandlerFunctionType = (
	req: express.Request,
	res: ResponseWithUser,
	next: express.NextFunction
) => Promise<void> | void

// Wraps a handler function in a try-catch block to handle errors asynchronously
const asyncWrapper = (cb: HandlerFunctionType): express.RequestHandler => {
	return async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		try {
			await cb(req, res, next)
		} catch (err) {
			next(err) // Pass any caught errors to the next middleware
		}
	}
}

// Wraps an authenticated handler function in a try-catch block to handle errors asynchronously
const authAsyncWrapper = (
	cb: AuthHandlerFunctionType
): express.RequestHandler => {
	return async (
		req: express.Request,
		res: ResponseWithUser,
		next: express.NextFunction
	) => {
		try {
			await cb(req, res, next)
		} catch (err) {
			next(err) // Pass any caught errors to the next middleware
		}
	}
}

// Export the wrapper functions for use in route handlers
export { asyncWrapper, authAsyncWrapper }
