// Import necessary modules
import connectionPool from '../connection/connection-pool.js'

// Define the interface for currency objects
export interface CurrencyObject {
	currency_symbol: string
	apr: number
}

class CurrencyModel {
	// Table name in the database
	private static readonly TABLE_NAME = 'currencies'

	// Retrieves all possible currency symbols from the database
	static async getAllPossibleCurrencies(): Promise<CurrencyObject[] | null> {
		const query = `SELECT * FROM ${this.TABLE_NAME}`

		// Execute the query to get all currency objects
		const result = (await connectionPool.executeQuery(
			query,
			[]
		)) as CurrencyObject[]

		if (result.length === 0) return null

		// Return currency objects from the result
		return result
	}

	// Retrieves a specific currency object by its symbol
	static async getCurrency(
		currencySymbol: string
	): Promise<CurrencyObject | null> {
		const query = `SELECT * FROM ${this.TABLE_NAME} WHERE currency_symbol = ?`
		const parameters = [currencySymbol]

		// Execute the query to get the currency object
		const result = (await connectionPool.executeQuery(
			query,
			parameters
		)) as CurrencyObject[]

		// Return null if no currency object is found
		if (result.length === 0) {
			return null
		}

		// Return the first found currency object
		return result[0]
	}
}

export default CurrencyModel
