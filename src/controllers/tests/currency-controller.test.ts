import { describe, it, expect, beforeEach, vi } from 'vitest'
import supertest from 'supertest'
import express from 'express'
import { getAllCurrencies } from '../../controllers/currency-controller.js'
import CurrencyModel from '../../models/currency-model.js'
import errorHandler from '../../middlewares/error-handler.js'

type CurrencyObject = {
	currency_symbol: string
	apr: number
}

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/currencies', getAllCurrencies)
app.use(errorHandler)

vi.mock('../../models/currency-model.js')

const mockCurrencies: CurrencyObject[] = [
	{ currency_symbol: 'USD', apr: 1.5 },
	{ currency_symbol: 'EUR', apr: 0.5 },
]

describe('GET /currencies', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should return all currencies with their APRs', async () => {
		vi.spyOn(CurrencyModel, 'getAllPossibleCurrencies').mockResolvedValue(
			mockCurrencies
		)

		const response = await supertest(app).get('/currencies')

		expect(response.status).toBe(200)
		expect(response.body).toEqual({
			message: 'Found 2 available currencies.',
			currencies: {
				USD: '1.5 %',
				EUR: '0.5 %',
			},
		})
	})

	it('should handle case when no currencies are found', async () => {
		vi.spyOn(CurrencyModel, 'getAllPossibleCurrencies').mockResolvedValue(null)

		const response = await supertest(app).get('/currencies')

		expect(response.status).toBe(404)
		expect(response.body).toEqual({
			error: 'Not Found',
			message: 'NotFoundError: No available currencies found.',
		})
	})
})
