import { describe, it, expect } from 'vitest'
import request from 'supertest'
import express from 'express'
import errorHandler from '../../middlewares/error-handler.js'
import CustomError from '../../errors/custom-error.js'
import {
	DatabaseConnectionError,
	DatabaseQueryError,
} from '../../errors/database-errors.js'

class MockCustomError extends CustomError {
	constructor(public statusCode: number, message: string) {
		super(message)
		this.name = 'MockCustomError'
	}
}

class MockDatabaseConnectionError extends DatabaseConnectionError {
	constructor(message: string) {
		super(message)
		this.statusCode = 500
	}
}

class MockDatabaseQueryError extends DatabaseQueryError {
	constructor(message: string) {
		super(message)
		this.statusCode = 400
	}
}

const app = express()

app.get('/error', (req, res, next) => {
	next(new MockCustomError(400, 'This is a custom error'))
})

app.get('/db-error', (req, res, next) => {
	next(new MockDatabaseConnectionError('Database connection failed'))
})

app.get('/db-query-error', (req, res, next) => {
	next(new MockDatabaseQueryError('Database query failed'))
})

app.use(errorHandler)

describe('Error Handler Middleware', () => {
	it('should handle custom errors correctly', async () => {
		const response = await request(app).get('/error')

		expect(response.status).toBe(400)
		expect(response.body).toEqual({
			error: 'Bad Request',
			message: 'MockCustomError: This is a custom error',
		})
	})

	it('should handle database connection errors correctly', async () => {
		const response = await request(app).get('/db-error')

		expect(response.status).toBe(500)
		expect(response.body).toEqual({
			error: 'Internal Server Error',
		})
	})

	it('should handle database query errors correctly', async () => {
		const response = await request(app).get('/db-query-error')

		expect(response.status).toBe(400)
		expect(response.body).toEqual({
			error: 'Bad Request',
		})
	})
})
