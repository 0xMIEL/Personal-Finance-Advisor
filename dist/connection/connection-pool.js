import mysql from 'mysql2/promise';
import Utilities from '../utilities/utilities.js';
import connectionPoolConfig from './connection-pool-config.js';
import { DatabaseConnectionError, } from '../errors/database-errors.js';
// Manages and maintains a pool of MySQL database connections.
class ConnectionPool {
    connectionPool;
    // Initializes the connection pool with the given configuration.
    constructor(config) {
        this.connectionPool = mysql.createPool(config);
    }
    // Returns the MySQL connection pool instance.
    getPool() {
        return this.connectionPool;
    }
    // Retrieves a connection from the pool with retry logic.
    // Retries up to 10 times with a 500ms delay between attempts if a connection fails.
    async getConnection() {
        const maxRetries = 10;
        let retries = maxRetries;
        while (retries > 0) {
            try {
                return await this.connectionPool.getConnection();
            }
            catch (error) {
                if (retries === 1) {
                    throw new DatabaseConnectionError('Failed to get a connection after multiple retries.');
                }
                retries--;
                await Utilities.sleep(500); // Wait before retrying
            }
        }
        throw new DatabaseConnectionError('Unexpected error occurred while getting a connection.');
    }
    // Executes a SQL query using a connection from the pool and returns the results.
    // Releases the connection back to the pool after execution.
    async executeQuery(query, args // Array of arguments for the SQL query
    ) {
        const connection = await this.getConnection();
        try {
            const [results] = await connection.execute(query, args);
            return results;
        }
        catch (error) {
            // throw new DatabaseQueryError(
            // 	'An error occurred while executing the query.'
            // )
            throw error;
        }
        finally {
            connection.release(); // Release the connection back to the pool
        }
    }
    // Closes all connections in the pool and releases resources.
    async close() {
        try {
            await this.connectionPool.end();
        }
        catch (error) {
            throw new DatabaseConnectionError(`Failed to close the connection pool.`);
        }
    }
}
// Create an instance of ConnectionPool with the imported configuration.
const connectionPool = new ConnectionPool(connectionPoolConfig);
export default connectionPool;
