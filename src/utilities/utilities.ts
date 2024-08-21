type ErrorConstructorType = new (message?: string) => Error

class Utilities {
	static sleep(time: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, time))
	}

	static throwCatchedError(
		errorType: ErrorConstructorType,
		customMessage: string,
		error: unknown
	) {
		if (error instanceof Error) {
			throw new errorType(
				`${customMessage}.\n Original message: ${error.message}`
			)
		}

		throw new Error('An unknown error occurred.')
	}
}

export default Utilities
