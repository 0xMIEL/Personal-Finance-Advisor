import mysql from 'mysql2/promise'
import { poolConfig } from './db-config.js' // Import the database pool configuration
import sleep from '../utilities/sleep.js' // Import a utility function for delaying execution

// ConnectionPool class for managing database connections
class ConnectionPool {
	#pool // Private property to store the pool instance

	// Constructor to initialize the connection pool with a given configuration
	constructor(config) {
		try {
			this.#pool = mysql.createPool(config) // Create and assign the pool instance based on the provided configuration
		} catch (error) {
			throw new Error() // Throw an error with a descriptive message if creation fails
		}
	}

	// Method to get the pool instance
	getPool() {
		return this.#pool // Return the pool instance
	}

	// Method to get a connection from the pool with retry logic
	async getConnection() {
		let retries = 10 // Number of retries before giving up

		while (true) {
			try {
				return this.#pool.getConnection() // Retrieve and return a connection from the pool
			} catch (error) {
				if (retries === 0) {
					throw new Error() // Throw an error with a descriptive message if retries are exhausted
				}
				retries -= 1 // Decrement the retry count
				await sleep(500) // Wait for 500 milliseconds before retrying
			}
		}
	}

	// Method to close the connection pool
	close() {
		try {
			return this.#pool.end() // Close all connections in the pool and return a promise
		} catch (error) {
			throw new Error() // Throw an error with a descriptive message if closing fails
		}
	}
}

// Create an instance of ConnectionPool using the imported poolConfig
const connectionPool = new ConnectionPool(poolConfig)

// Export the instance of ConnectionPool for use in other modules
export default connectionPool
