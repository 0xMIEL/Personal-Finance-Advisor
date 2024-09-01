class Utilities {
	// Pauses execution for a specified amount of time (in milliseconds)
	static sleep(milliseconds: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, milliseconds))
	}
}

export default Utilities
