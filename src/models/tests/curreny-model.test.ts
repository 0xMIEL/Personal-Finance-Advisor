import mysql from 'mysql2/promise'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CurrencyModel from '../currency-model.js'
import connectionPool from '../../connection/connection-pool.js'

interface MockRowDataPacket extends mysql.RowDataPacket {
	currency_symbol: string
	apr: number
}

describe('CurrencyModel', () => {
	beforeEach(() => {

		vi.restoreAllMocks()
	})

	describe('getAllPossibleCurrencies', () => {
		it('should return all possible currencies', async () => {
			vi.spyOn(connectionPool, 'executeQuery').mockResolvedValue([
				{ currency_symbol: 'USD', apr: 1.5 } as MockRowDataPacket,
				{ currency_symbol: 'EUR', apr: 2.0 } as MockRowDataPacket,
			])

			const result = await CurrencyModel.getAllPossibleCurrencies()

			expect(result).toEqual([
				{ currency_symbol: 'USD', apr: 1.5 },
				{ currency_symbol: 'EUR', apr: 2.0 },
			])
		})
	})

	describe('getCurrency', () => {
		it('should return a specific currency by symbol', async () => {
			vi.spyOn(connectionPool, 'executeQuery').mockResolvedValue([
				{ currency_symbol: 'EUR', apr: 2.0 } as MockRowDataPacket,
			])

			const result = await CurrencyModel.getCurrency('EUR')

			expect(result).toEqual({ currency_symbol: 'EUR', apr: 2.0 })
		})
	})
})
