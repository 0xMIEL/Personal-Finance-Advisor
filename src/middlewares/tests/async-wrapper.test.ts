import { describe, it, expect, vi } from 'vitest'
import express from 'express'
import request from 'supertest'
import {
	asyncWrapper,
	authAsyncWrapper,
	ResponseWithUser,
} from '../async-wrapper.js'

const app = express()

app.get(
	'/async-success',
	asyncWrapper(async (req, res) => {
		res.status(200).json({ message: 'Success' })
	})
)

app.get(
	'/async-error',
	asyncWrapper(async () => {
		throw new Error('Test async error')
	})
)

const mockAuthMiddleware = (
	req: express.Request,
	res: ResponseWithUser,
	next: express.NextFunction
) => {
	res.user = { userId: 1, username: 'john' }
	next()
}

app.get(
	'/auth-success',
	mockAuthMiddleware,
	authAsyncWrapper(async (req, res) => {
		res.status(200).json({ message: `Hello, ${res.user?.username}` })
	})
)

app.get(
	'/auth-error',
	mockAuthMiddleware,
	authAsyncWrapper(async () => {
		throw new Error('Test auth error')
	})
)

describe('asyncWrapper and authAsyncWrapper', () => {
	it('should handle successful async operations in asyncWrapper', async () => {
		const response = await request(app).get('/async-success')

		expect(response.status).toBe(200)
		expect(response.body).toEqual({ message: 'Success' })
	})

	it('should catch errors in asyncWrapper and pass them to the next middleware', async () => {
		const errorMiddleware = vi.fn((err, req, res, next) => {
			res.status(500).json({ message: err.message })
		})

		app.use(errorMiddleware)

		const response = await request(app).get('/async-error')

		expect(response.status).toBe(500)
		expect(response.body).toEqual({ message: 'Test async error' })
	})

	it('should handle successful operations in authAsyncWrapper', async () => {
		const response = await request(app).get('/auth-success')

		expect(response.status).toBe(200)
		expect(response.body).toEqual({ message: 'Hello, john' })
	})

	it('should catch errors in authAsyncWrapper and pass them to the next middleware', async () => {
		const errorMiddleware = vi.fn((err, req, res, next) => {
			res.status(500).json({ message: err.message })
		})

		app.use(errorMiddleware)

		const response = await request(app).get('/auth-error')

		expect(response.status).toBe(500)
		expect(response.body).toEqual({ message: 'Test auth error' })
	})
})
