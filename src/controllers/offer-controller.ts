// Import necessary modules and classes
import CurrencyModel, { CurrencyObject } from '../models/currency-model.js'
import LoanCalculator from '../services/loan-calculator.js'
import {
	InvalidTypeError,
	InvalidValueError,
	MissingValueError,
	MissingValuesError,
	NotFoundError,
} from '../errors/default-errors.js'
import { authAsyncWrapper } from '../middlewares/async-wrapper.js'
import OfferModel, { OfferTerms } from '../models/offer-model.js'

// Helper functions
const validatePositiveNumber = (
	value: number | null | undefined,
	fieldName: string
): void => {
	if (value === null || value === undefined)
		throw new MissingValueError(fieldName)
	if (typeof value !== 'number') throw new InvalidTypeError(fieldName, 'number')
	if (value <= 0) throw new InvalidValueError(fieldName, 'greater than 0')
}

const validateString = (
	value: string | null | undefined,
	fieldName: string
): void => {
	if (value === null || value === undefined)
		throw new MissingValueError(fieldName)
	if (typeof value !== 'string') throw new InvalidTypeError(fieldName, 'string')
}

const validateCurrency = async (
	currencySymbol: string
): Promise<CurrencyObject> => {
	const currency = await CurrencyModel.getCurrency(currencySymbol)
	if (!currency) {
		const possibleCurrencies = await CurrencyModel.getAllPossibleCurrencies()
		if (!possibleCurrencies)
			throw new NotFoundError('No available currencies found.')

		const currencies = possibleCurrencies
			.map(item => `${item.currency_symbol} (${item.apr}%)`)
			.join(', ')
		throw new InvalidValueError('currency_symbol', `one of ${currencies}`)
	}
	return currency
}

// Handler to create a new loan offer
const createOffer = authAsyncWrapper(async (req, res) => {
	const {
		salary,
		currency_symbol: currencySymbol,
		loan_term: loanTerm,
	} = req.body

	// Validate inputs
	validatePositiveNumber(salary, 'salary')
	validateString(currencySymbol, 'currency_symbol')
	const currency = await validateCurrency(currencySymbol)
	validatePositiveNumber(loanTerm, 'loan_term')

	// Calculate loan details
	const { loanAmount, totalLoanCost, totalInterest, paymentAmount } =
		LoanCalculator.calculateLoan(salary, currency.apr, Math.round(loanTerm))

	const offerTerms: OfferTerms = [
		salary,
		currencySymbol,
		loanTerm,
		loanAmount,
		totalInterest,
		totalLoanCost,
		paymentAmount,
	]

	if (!res.user) throw new MissingValueError('user')

	const { insertId } = await OfferModel.createOffer(res.user.userId, offerTerms)
	const offer = await OfferModel.getOfferByID(insertId)

	res.status(200).json({
		message: `The offer with id ${insertId} has been successfully created.`,
		offer,
	})
})

// Handler to update an existing loan offer
const updateOffer = authAsyncWrapper(async (req, res) => {
	let {
		salary,
		currency_symbol: currencySymbol,
		loan_term: loanTerm,
	} = req.body
	if (!res.user) throw new MissingValueError('user')

	const { userId } = res.user
	const { offerId } = req.params

	let offer = await OfferModel.getOfferByID(parseInt(offerId))
	const userOffers = await OfferModel.getAllUserOffers(userId)
	const userOffer = await OfferModel.getUserOffer(userId, parseInt(offerId))

	if (!userOffers) throw new NotFoundError(`You don't have any offers.`)

	const userOffersIds = userOffers.map(item => item.offer_id).join(', ')

	if (!offer)
		throw new NotFoundError(
			`Offer with id ${offerId} does not exist. You can update offers with id: ${userOffersIds}.`
		)
	if (!userOffer)
		throw new NotFoundError(
			`You don't have access to offer with id ${offerId}. You can update offers with id: ${userOffersIds}.`
		)

	if (!salary && !currencySymbol && !loanTerm)
		throw new MissingValuesError(
			`At least one value from 'salary', 'currency_symbol', 'loan_term' is required.`
		)

	if (salary) validatePositiveNumber(salary, 'salary')
	else salary = userOffer.salary

	let currency: CurrencyObject
	if (currencySymbol) {
		currency = await validateCurrency(currencySymbol)
	} else {
		currencySymbol = userOffer.currency_symbol
		currency = await validateCurrency(currencySymbol)
	}

	if (loanTerm) validatePositiveNumber(loanTerm, 'loan_term')
	else loanTerm = userOffer.loan_term

	const { loanAmount, totalLoanCost, totalInterest, paymentAmount } =
		LoanCalculator.calculateLoan(salary, currency.apr, Math.round(loanTerm))

	const offerTerms: OfferTerms = [
		salary,
		currencySymbol,
		loanTerm,
		loanAmount,
		totalInterest,
		totalLoanCost,
		paymentAmount,
	]

	if (!res.user) throw new MissingValueError('user')

	await OfferModel.updateOffer(parseInt(offerId), offerTerms)
	offer = await OfferModel.getOfferByID(parseInt(offerId))

	res.status(200).json({
		message: `The offer with id ${offerId} has been successfully updated.`,
		offer,
	})
})

// Handler to get a specific offer by ID
const getOffer = authAsyncWrapper(async (req, res) => {
	if (!res.user) throw new MissingValueError('user')

	const { userId } = res.user
	const { offerId } = req.params

	const offers = await OfferModel.getAllUserOffers(userId)
	if (!offers) throw new NotFoundError(`You don't have any offers.`)

	const userOffersIds = offers.map(item => item.offer_id).join(', ')

	let offer = await OfferModel.getOfferByID(parseInt(offerId))

	if (!offer)
		throw new NotFoundError(
			`The offer with id ${offerId} was not found. You can search offers with ids: ${userOffersIds}.`
		)

	offer = await OfferModel.getUserOffer(userId, parseInt(offerId))
	if (!offer)
		throw new NotFoundError(
			`You do not have access to the offer with id ${offerId}. You can search offers with ids: ${userOffersIds}.`
		)

	res.status(200).json({
		message: `Successfully found the offer with id ${offerId}.`,
		offer,
	})
})

// Handler to get all offers for the authenticated user
const getAllOffers = authAsyncWrapper(async (req, res) => {
	if (!res.user) throw new MissingValueError('user')

	const { userId } = res.user
	const offers = await OfferModel.getAllUserOffers(userId)

	if (!offers) throw new NotFoundError('You currently have no offers.')

	res.status(200).json({
		message: `Successfully found ${offers.length} of your offers.`,
		offers,
	})
})

// Handler to delete a specific offer by ID
const deleteOffer = authAsyncWrapper(async (req, res) => {
	if (!res.user) throw new MissingValueError('user')

	const { userId } = res.user
	const { offerId } = req.params

	const offers = await OfferModel.getAllUserOffers(userId)
	if (!offers) throw new NotFoundError(`You don't have any offers to remove.`)

	const userOffersIds = offers.map(item => item.offer_id).join(', ')

	const offer = await OfferModel.getOfferByID(parseInt(offerId))
	if (!offer)
		throw new NotFoundError(
			`No offer found with id ${offerId}. You can remove offers with id: ${userOffersIds}.`
		)

	const result = await OfferModel.deleteOffer(userId, parseInt(offerId))
	if (result.affectedRows === 0)
		throw new NotFoundError(
			`You do not have access to the offer with id ${offerId}. You can remove offers with id: ${userOffersIds}.`
		)

	res.status(200).json({
		message: `The offer with id ${offerId} was successfully removed.`,
	})
})

export { createOffer, updateOffer, getOffer, getAllOffers, deleteOffer }
