import { describe, it, expect } from 'vitest'
import LoanCalculator from '../loan-calculator.js'

describe('LoanCalculator', () => {
	it('should calculate loan terms correctly', () => {
		const salary = 5000
		const apr = 5
		const loanTerm = 24

		const result = LoanCalculator.calculateLoan(salary, apr, loanTerm)

		const expectedPaymentAmount = salary * 0.3
		const monthlyApr = apr / 100 / 12
		const loanAmount =
			(expectedPaymentAmount * (1 - Math.pow(1 + monthlyApr, -loanTerm))) /
			monthlyApr
		const totalLoanCost = expectedPaymentAmount * loanTerm
		const totalInterest = totalLoanCost - loanAmount

		expect(result.paymentAmount).toBeCloseTo(expectedPaymentAmount, 2)
		expect(result.loanAmount).toBeCloseTo(loanAmount, 2)
		expect(result.totalLoanCost).toBeCloseTo(totalLoanCost, 2)
		expect(result.totalInterest).toBeCloseTo(totalInterest, 2)
	})
})
