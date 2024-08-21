import express from 'express'

type HandlerFunctionType = (
	req: express.Request,
	res: express.Response
) => any

const asyncWrapper = (cb: HandlerFunctionType) => {
	return async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		try {
			await cb(req, res)
		} catch (err) {
			next(err)
		}
	}
}

export default asyncWrapper
