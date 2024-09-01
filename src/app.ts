import express from 'express'
import connectionPool from './connection/connection-pool.js'
import userRouter from './routes/user-router.js'
import offerRouter from './routes/offer-router.js'
import currencyRouter from './routes/currency-router.js'
import errorHandler from './middlewares/error-handler.js'

async function cleanup() {
	console.log('Cleaning up before exit...')
	await connectionPool.close()
	process.exit()
}

process.on('SIGINT', async () => {
	console.log('SIGINT signal received: closing HTTP server')
	await cleanup()
})

process.on('SIGTERM', async () => {
	console.log('SIGTERM signal received: closing HTTP server')
	await cleanup()
})

const start = () => {
	const app = express()

	app.use(express.json())
	app.use(express.urlencoded({ extended: false }))

	app.use('/users', userRouter)
	app.use('/offers', offerRouter)
	app.use('/currencies', currencyRouter)

	app.use(errorHandler)

	app.listen(5500)
}

start()
