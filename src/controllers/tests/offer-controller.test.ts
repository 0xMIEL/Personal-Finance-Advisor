import { ResponseWithUser } from './../../middlewares/async-wrapper.js'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import request from 'supertest'
import express from 'express'
import {
	createOffer,
	updateOffer,
	getOffer,
	getAllOffers,
	deleteOffer,
} from '../offer-controller.js'
import OfferModel from '../../models/offer-model.js'
import CurrencyModel from '../../models/currency-model.js'
import LoanCalculator from '../../services/loan-calculator.js'
import { Request, NextFunction } from 'express'
import errorHandler from '../../middlewares/error-handler.js'

vi.mock('../../models/offer-model.js')
vi.mock('../../models/currency-model.js')
vi.mock('../../services/loan-calculator.js')

// Create Express app and apply middleware
const app = express()
app.use(express.json())

// Mock Authentication Middleware
const mockAuthMiddleware = (
	req: Request,
	res: ResponseWithUser,
	next: NextFunction
) => {
	res.user = { userId: 1, username: 'john' }
	next()
}

// Register middleware and routes
app.use(mockAuthMiddleware)
app.post('/offers', createOffer)
app.put('/offers/:offerId', updateOffer)
app.get('/offers/:offerId', getOffer)
app.get('/offers', getAllOffers)
app.delete('/offers/:offerId', deleteOffer)
app.use(errorHandler)

describe('Offer Handlers', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should create a new offer', async () => {
		const mockCurrency = { currency_symbol: 'USD', apr: 5 }
		const mockOffer = { offer_id: 123 }

		CurrencyModel.getCurrency = vi.fn().mockResolvedValue(mockCurrency)
		CurrencyModel.getAllPossibleCurrencies = vi
			.fn()
			.mockResolvedValue([{ currency_symbol: 'USD', apr: 5 }])
		LoanCalculator.calculateLoan = vi.fn().mockReturnValue({
			loanAmount: 1000,
			totalLoanCost: 1200,
			totalInterest: 200,
			paymentAmount: 100,
		})
		OfferModel.createOffer = vi.fn().mockResolvedValue({ insertId: 123 })
		OfferModel.getOfferByID = vi.fn().mockResolvedValue(mockOffer)

		const response = await request(app).post('/offers').send({
			salary: 5000,
			currency_symbol: 'USD',
			loan_term: 12,
		})

		expect(response.status).toBe(200)
		expect(response.body.message).toBe(
			'The offer with id 123 has been successfully created.'
		)
		expect(response.body.offer).toEqual(mockOffer)
	})

	it('should update an existing offer', async () => {
		const mockCurrency = { currency_symbol: 'USD', apr: 5 }
		const mockOffer = {
			offer_id: 123,
			salary: 5000,
			currency_symbol: 'USD',
			loan_term: 12,
		}

		CurrencyModel.getCurrency = vi.fn().mockResolvedValue(mockCurrency)
		LoanCalculator.calculateLoan = vi.fn().mockReturnValue({
			loanAmount: 1000,
			totalLoanCost: 1200,
			totalInterest: 200,
			paymentAmount: 100,
		})
		OfferModel.getOfferByID = vi.fn().mockResolvedValue(mockOffer)
		OfferModel.getAllUserOffers = vi.fn().mockResolvedValue([mockOffer])
		OfferModel.getUserOffer = vi.fn().mockResolvedValue(mockOffer)

		OfferModel.updateOffer = vi.fn().mockResolvedValue({ affectedRows: 1 })

		const response = await request(app).put('/offers/123').send({
			salary: 6000,
			currency_symbol: 'USD',
			loan_term: 24,
		})

		expect(response.status).toBe(200)
		expect(response.body.message).toBe(
			'The offer with id 123 has been successfully updated.'
		)
		expect(response.body.offer).toEqual(mockOffer)
	})
})
