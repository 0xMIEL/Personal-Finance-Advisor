import CurrencyModel from '../models/currency-model.js'
import { authAsyncWrapper } from '../middlewares/async-wrapper.js'
import { NotFoundError } from '../errors/default-errors.js'

const getAllCurrencies = authAsyncWrapper(async (req, res) => {
	// Retrieve all available currencies
	const currencies = await CurrencyModel.getAllPossibleCurrencies()

	// Check if any currencies were found
	if (!currencies) {
		throw new NotFoundError('No available currencies found.')
	}

	// Map currencies to an object where the key is the currency symbol and the value is its APR
	const currenciesObject = currencies.reduce((acc, item) => {
		acc[item.currency_symbol] = `${item.apr} %`
		return acc
	}, {} as Record<string, string>)

	// Return a response with the number of found currencies and their values
	res.json({
		message: `Found ${currencies.length} available currencies.`,
		currencies: currenciesObject,
	})
})

export { getAllCurrencies }
