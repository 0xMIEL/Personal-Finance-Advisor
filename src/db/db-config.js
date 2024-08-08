// Import environment variables
const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD } = process.env

// Database pool configuration
const poolConfig = {
	host: DB_HOST || 'localhost', // Database host
	user: DB_USER || 'user', // Database user
	password: DB_PASSWORD || 'password', // Database password
	database: DB_DATABASE || 'test', // Database name
	waitForConnections: true, // Whether to wait for connections
	connectionLimit: 10, // Maximum number of connections
	maxIdle: 10, // Maximum number of idle connections
	idleTimeout: 60000, // Time in milliseconds before idle connections are closed
	queueLimit: 0, // Maximum number of queued requests
	enableKeepAlive: true, // Enable TCP keep-alive
	keepAliveInitialDelay: 0, // Initial delay for keep-alive
}

// Export the configuration
export { poolConfig }
