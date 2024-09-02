import mysql from 'mysql2/promise'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import OfferModel, { OfferTerms } from '../offer-model.js'
import connectionPool from '../../connection/connection-pool.js'

interface MockRowDataPacket extends mysql.RowDataPacket {
	offer_id?: number
	currency_symbol?: string
	loan_term?: number
	salary?: number
	loan_amount?: number
	total_interest?: number
	total_loan_cost?: number
	payment_amount?: number
	created_at?: string
	user_id?: number
}

describe('OfferModel', () => {
	beforeEach(() => {
		vi.restoreAllMocks()
	})

	describe('getOfferByID', () => {
		it('should return an offer by ID', async () => {
			vi.spyOn(connectionPool, 'executeQuery').mockResolvedValue([
				{
					offer_id: 1,
					currency_symbol: 'USD',
					loan_term: 12,
					salary: 5000,
					loan_amount: 10000,
					total_interest: 500,
					total_loan_cost: 10500,
					payment_amount: 875,
					created_at: '2024-01-01',
					user_id: 123,
				} as MockRowDataPacket,
			])

			const result = await OfferModel.getOfferByID(1)

			expect(result).toEqual({
				offer_id: 1,
				currency_symbol: 'USD',
				loan_term: 12,
				salary: 5000,
				loan_amount: 10000,
				total_interest: 500,
				total_loan_cost: 10500,
				payment_amount: 875,
				created_at: '2024-01-01',
				user_id: 123,
			})
		})

		it('should return null if no offer is found', async () => {
			vi.spyOn(connectionPool, 'executeQuery').mockResolvedValue([])

			const result = await OfferModel.getOfferByID(1)

			expect(result).toBeNull()
		})
	})

	describe('getAllUserOffers', () => {
		it('should return all offers for a user', async () => {
			vi.spyOn(connectionPool, 'executeQuery').mockResolvedValue([
				{
					offer_id: 1,
					currency_symbol: 'USD',
					loan_term: 12,
					salary: 5000,
					loan_amount: 10000,
					total_interest: 500,
					total_loan_cost: 10500,
					payment_amount: 875,
					created_at: '2024-01-01',
					user_id: 123,
				} as MockRowDataPacket,
				{
					offer_id: 2,
					currency_symbol: 'EUR',
					loan_term: 24,
					salary: 6000,
					loan_amount: 15000,
					total_interest: 1000,
					total_loan_cost: 16000,
					payment_amount: 1333,
					created_at: '2024-02-01',
					user_id: 123,
				} as MockRowDataPacket,
			])

			const result = await OfferModel.getAllUserOffers(123)

			expect(result).toEqual([
				{
					offer_id: 1,
					currency_symbol: 'USD',
					loan_term: 12,
					salary: 5000,
					loan_amount: 10000,
					total_interest: 500,
					total_loan_cost: 10500,
					payment_amount: 875,
					created_at: '2024-01-01',
					user_id: 123,
				},
				{
					offer_id: 2,
					currency_symbol: 'EUR',
					loan_term: 24,
					salary: 6000,
					loan_amount: 15000,
					total_interest: 1000,
					total_loan_cost: 16000,
					payment_amount: 1333,
					created_at: '2024-02-01',
					user_id: 123,
				},
			])
		})

		it('should return null if no offers are found', async () => {
			vi.spyOn(connectionPool, 'executeQuery').mockResolvedValue([])

			const result = await OfferModel.getAllUserOffers(123)

			expect(result).toBeNull()
		})
	})

	describe('getUserOffer', () => {
		it('should return a specific offer by user ID and offer ID', async () => {
			vi.spyOn(connectionPool, 'executeQuery').mockResolvedValue([
				{
					offer_id: 1,
					currency_symbol: 'USD',
					loan_term: 12,
					salary: 5000,
					loan_amount: 10000,
					total_interest: 500,
					total_loan_cost: 10500,
					payment_amount: 875,
					created_at: '2024-01-01',
					user_id: 123,
				} as MockRowDataPacket,
			])

			const result = await OfferModel.getUserOffer(123, 1)

			expect(result).toEqual({
				offer_id: 1,
				currency_symbol: 'USD',
				loan_term: 12,
				salary: 5000,
				loan_amount: 10000,
				total_interest: 500,
				total_loan_cost: 10500,
				payment_amount: 875,
				created_at: '2024-01-01',
				user_id: 123,
			})
		})

		it('should return null if no offer is found', async () => {
			vi.spyOn(connectionPool, 'executeQuery').mockResolvedValue([])

			const result = await OfferModel.getUserOffer(123, 1)

			expect(result).toBeNull()
		})
	})

	describe('createOffer', () => {
		it('should create a new offer and return result header', async () => {
			vi.spyOn(connectionPool, 'executeQuery').mockResolvedValue({
				affectedRows: 1,
				insertId: 1,
				fieldCount: 0,
				changedRows: 0,
				warningCount: 0,
				info: '',
				serverStatus: 2,
				warningStatus: 0,
			} as mysql.ResultSetHeader)

			const offerTerms: OfferTerms = [5000, 'USD', 12, 10000, 500, 10500, 875]
			const result = await OfferModel.createOffer(123, offerTerms)

			expect(result).toEqual({
				affectedRows: 1,
				insertId: 1,
				fieldCount: 0,
				changedRows: 0,
				warningCount: 0,
				info: '',
				serverStatus: 2,
				warningStatus: 0,
			})
		})
	})

	describe('updateOffer', () => {
		it('should update an existing offer and return result header', async () => {
			vi.spyOn(connectionPool, 'executeQuery').mockResolvedValue({
				affectedRows: 1,
				insertId: 1,
				fieldCount: 0,
				changedRows: 1,
				warningCount: 0,
				info: '',
				serverStatus: 2,
				warningStatus: 0,
			} as mysql.ResultSetHeader)

			const offerTerms: OfferTerms = [5000, 'USD', 12, 10000, 500, 10500, 875]
			const result = await OfferModel.updateOffer(1, offerTerms)

			expect(result).toEqual({
				affectedRows: 1,
				insertId: 1,
				fieldCount: 0,
				changedRows: 1,
				warningCount: 0,
				info: '',
				serverStatus: 2,
				warningStatus: 0,
			})
		})
	})

	describe('deleteOffer', () => {
		it('should delete an offer and return result header', async () => {
			vi.spyOn(connectionPool, 'executeQuery').mockResolvedValue({
				affectedRows: 1,
				insertId: 1,
				fieldCount: 0,
				changedRows: 0,
				warningCount: 0,
				info: '',
				serverStatus: 2,
				warningStatus: 0,
			} as mysql.ResultSetHeader)

			const result = await OfferModel.deleteOffer(123, 1)

			expect(result).toEqual({
				affectedRows: 1,
				insertId: 1,
				fieldCount: 0,
				changedRows: 0,
				warningCount: 0,
				info: '',
				serverStatus: 2,
				warningStatus: 0,
			})
		})
	})
})
