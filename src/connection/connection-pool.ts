import mysql from 'mysql2/promise'
import Utilities from '../utilities/utilities.js'
import { ConnectionPoolConfig } from './interfaces/connection-pool-config.interface.js'
import connectionPoolConfig from './connection-pool-config.js'
import DatabaseConnectionError from '../errors/DatabaseConnectionError.js'

// ConnectionPool class for managing MySQL database connections
class ConnectionPool {
	private connectionPool: mysql.Pool

	constructor(config: ConnectionPoolConfig) {
		this.connectionPool = mysql.createPool(config)
	}

	// Method to get the pool instance
	getPool(): mysql.Pool {
		return this.connectionPool
	}

	// Method to get a connection from the pool with retry logic
	async getConnection(): Promise<mysql.PoolConnection> {
		const maxRetries = 10
		let retries = maxRetries

		while (retries > 0) {
			try {
				return await this.connectionPool.getConnection()
			} catch (error) {
				if (retries === 0) {
					throw new DatabaseConnectionError(
						'Failed to get a connection after multiple retries.'
					)
				}
				retries--
				await Utilities.sleep(500) // Wait before retrying
			}
		}

		throw new DatabaseConnectionError(
			'Unexpected error occurred while getting a connection.'
		)
	}

	// Method to close the connection pool
	async close(): Promise<void> {
		try {
			await this.connectionPool.end()
		} catch (error) {
			throw new DatabaseConnectionError('Failed to close the connection pool.')
		}
	}
}

// Create an instance of ConnectionPool using the imported poolConfig
const connectionPool = new ConnectionPool(connectionPoolConfig)

// Export the instance of ConnectionPool for use in other modules
export default connectionPool
