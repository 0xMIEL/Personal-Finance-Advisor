import express from 'express'
import helmet from 'helmet'
import connectionPool from './connection/connection-pool.js'
import userRouter from './routes/user-router.js'
import offerRouter from './routes/offer-router.js'
import currencyRouter from './routes/currency-router.js'
import errorHandler from './middlewares/error-handler.js'

// Define cleanup function
const cleanup = async () => {
	console.log('Cleaning up before exit...')
	await connectionPool.close()
	process.exit()
}

// Setup signal handlers
const setupSignalHandlers = () => {
	process.on('SIGINT', async () => {
		console.log('SIGINT signal received: closing HTTP server')
		await cleanup()
	})

	process.on('SIGTERM', async () => {
		console.log('SIGTERM signal received: closing HTTP server')
		await cleanup()
	})
}

// Start the server
const startServer = () => {
	const app = express()

	// Use security headers
	app.use(helmet())

	// Middleware setup
	app.use(express.json())
	app.use(express.urlencoded({ extended: false }))

	// Route handlers
	app.use('/users', userRouter)
	app.use('/offers', offerRouter)
	app.use('/currencies', currencyRouter)

	// Error handling
	app.use(errorHandler)

	// Start listening
	const port = process.env.PORT || 5500
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`)
	})
}

// Initialize the application
const initializeApp = () => {
	setupSignalHandlers()
	startServer()
}

initializeApp()
