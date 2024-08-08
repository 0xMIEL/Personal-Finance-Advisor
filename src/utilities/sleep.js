// Utility function to pause execution for a specified time
const sleep = async time => {
	await new Promise(resolve => setTimeout(resolve, time)) // Create a promise that resolves after a delay specified by `time`
}

// Export the sleep function for use in other modules
export default sleep
