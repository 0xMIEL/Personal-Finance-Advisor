import mysql from 'mysql2/promise';
import Utilities from '../utilities/utilities.js';
import connectionPoolConfig from './connection-pool-config.js'; // Import the database pool configuration
// ConnectionPool class for managing database connections
class ConnectionPool {
    connectionPool; // Private property to store the pool instance
    // Constructor to initialize the connection pool with a given configuration
    constructor(config) {
        try {
            this.connectionPool = mysql.createPool(config); // Create and assign the pool instance based on the provided configuration
        }
        catch (error) {
            throw new Error(); // Throw an error with a descriptive message if creation fails
        }
    }
    // Method to get the pool instance
    getPool() {
        return this.connectionPool; // Return the pool instance
    }
    // Method to get a connection from the pool with retry logic
    async getConnection() {
        let retries = 10; // Number of retries before giving up
        while (true) {
            try {
                return this.connectionPool.getConnection(); // Retrieve and return a connection from the pool
            }
            catch (error) {
                if (retries === 0) {
                    throw new Error(); // Throw an error with a descriptive message if retries are exhausted
                }
                retries -= 1; // Decrement the retry count
                await Utilities.sleep(500); // Wait for 500 milliseconds before retrying
            }
        }
    }
    // Method to close the connection pool
    close() {
        try {
            return this.connectionPool.end(); // Close all connections in the pool and return a promise
        }
        catch (error) {
            throw new Error(); // Throw an error with a descriptive message if closing fails
        }
    }
}
// Create an instance of ConnectionPool using the imported poolConfig
const connectionPool = new ConnectionPool(connectionPoolConfig);
// Export the instance of ConnectionPool for use in other modules
export default connectionPool;
