import express from 'express'

const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
	res.send('error')
}

export default errorHandler
