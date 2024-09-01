interface LoanTerms {
	loanAmount: number
	totalLoanCost: number
	totalInterest: number
	paymentAmount: number
}

class LoanCalculator {
	// Calculates loan terms based on salary, APR, and loan term
	static calculateLoan(
		salary: number,
		apr: number,
		loanTerm: number
	): LoanTerms {
		// Convert APR percentage to decimal
		apr = apr / 100

		// Calculate monthly APR
		const monthlyApr = apr / 12

		// Calculate the maximum payment amount as 30% of the salary
		const paymentAmount = salary * 0.3

		// Calculate the loan amount using the formula for loan amortization
		const loanAmount =
			(paymentAmount * (1 - Math.pow(1 + monthlyApr, -loanTerm))) / monthlyApr

		// Calculate the total cost of the loan
		const totalLoanCost = paymentAmount * loanTerm

		// Calculate the total interest paid over the life of the loan
		const totalInterest = totalLoanCost - loanAmount

		// Return the calculated loan terms
		return {
			loanAmount,
			totalLoanCost,
			totalInterest,
			paymentAmount,
		}
	}
}

export default LoanCalculator
