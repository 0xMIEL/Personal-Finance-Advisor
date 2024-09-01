// Import necessary modules
import mysql from 'mysql2/promise'
import connectionPool from '../connection/connection-pool.js'

// Define the type for offer terms
export type OfferTerms = [
	salary: number,
	currencySymbol: string,
	loanTerm: number,
	loanAmount: number,
	totalInterest: number,
	totalLoanCost: number,
	paymentAmount: number
]

// Define the interface for the Offer object
interface Offer {
	offer_id: number
	currency_symbol: string
	loan_term: number
	salary: number
	loan_amount: number
	total_interest: number
	total_loan_cost: number
	payment_amount: number
	created_at: string
	user_id: number
}

class OfferModel {
	// Table name in the database
	private static readonly TABLE_NAME = 'offers'

	// Retrieves an offer by its ID
	static async getOfferByID(offerId: number): Promise<Offer | null> {
		const query = `SELECT * FROM ${this.TABLE_NAME} WHERE offer_id = ?`
		const parameters = [offerId]

		// Execute the query and return the first result
		const result = (await connectionPool.executeQuery(
			query,
			parameters
		)) as Offer[]

		if (result.length === 0) return null

		return result[0]
	}

	// Retrieves all offers associated with a specific user ID
	static async getAllUserOffers(userId: number): Promise<Offer[] | null> {
		let query = `SELECT * FROM ${this.TABLE_NAME}`
		query += ` INNER JOIN currencies ON ${this.TABLE_NAME}.currency_symbol = currencies.currency_symbol`
		query += ` WHERE ${this.TABLE_NAME}.user_id = ?`

		const parameters = [userId]
		const result = (await connectionPool.executeQuery(
			query,
			parameters
		)) as Offer[]

		if (result.length === 0) return null

		// Return the result as an array of Offer objects
		return result as Offer[]
	}

	// Retrieves a specific offer by user ID and offer ID
	static async getUserOffer(
		userId: number,
		offerId: number
	): Promise<Offer | null> {
		let query = `SELECT * FROM ${this.TABLE_NAME}`
		query += ` INNER JOIN currencies ON ${this.TABLE_NAME}.currency_symbol = currencies.currency_symbol`
		query += ` WHERE ${this.TABLE_NAME}.user_id = ? AND ${this.TABLE_NAME}.offer_id = ?`

		const parameters = [userId, offerId]
		const result = (await connectionPool.executeQuery(
			query,
			parameters
		)) as Offer[]

		// If no offer is found, return null
		if (result.length === 0) {
			return null
		}

		// Return the first result
		return result[0]
	}

	// Creates a new offer with the given terms and user ID
	static async createOffer(
		userId: number,
		offerTerms: OfferTerms
	): Promise<mysql.ResultSetHeader> {
		let query = `INSERT INTO ${this.TABLE_NAME}`
		query += ` (salary, currency_symbol, loan_term, loan_amount, total_interest, total_loan_cost, payment_amount, user_id)`
		query += ` VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

		const parameters = [...offerTerms, userId]

		// Execute the query to insert the new offer
		const result = await connectionPool.executeQuery(query, parameters)
		return result as mysql.ResultSetHeader
	}

	static async updateOffer(
		offerId: number,
		offerTerms: OfferTerms
	): Promise<mysql.ResultSetHeader> {
		let query = `UPDATE ${this.TABLE_NAME} `
		query += `SET salary = ?, currency_symbol = ?, loan_term = ?, loan_amount = ?, total_interest = ?, total_loan_cost = ?, payment_amount = ? `
		query += `WHERE offer_id = ?`

		const parameters = [...offerTerms, offerId]

		const result = await connectionPool.executeQuery(query, parameters)

		return result as mysql.ResultSetHeader
	}

	// Deletes a specific offer by user ID and offer ID
	static async deleteOffer(
		userId: number,
		offerId: number
	): Promise<mysql.ResultSetHeader> {
		const query = `DELETE FROM ${this.TABLE_NAME} WHERE user_id = ? AND offer_id = ?`
		const parameters = [userId, offerId]

		// Execute the query to delete the offer
		const result = await connectionPool.executeQuery(query, parameters)
		return result as mysql.ResultSetHeader
	}
}

export default OfferModel
