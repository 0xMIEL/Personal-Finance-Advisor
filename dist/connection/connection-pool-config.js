// Import environment variables
const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD } = process.env;
// Default values for configuration settings
const defaultConfig = {
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'personal_finance_advisor',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
};
// Database pool configuration
const connectionPoolConfig = {
    host: DB_HOST || defaultConfig.host,
    user: DB_USER || defaultConfig.user,
    password: DB_PASSWORD || defaultConfig.password,
    database: DB_DATABASE || defaultConfig.database,
    waitForConnections: defaultConfig.waitForConnections,
    connectionLimit: defaultConfig.connectionLimit,
    maxIdle: defaultConfig.maxIdle,
    idleTimeout: defaultConfig.idleTimeout,
    queueLimit: defaultConfig.queueLimit,
    enableKeepAlive: defaultConfig.enableKeepAlive,
    keepAliveInitialDelay: defaultConfig.keepAliveInitialDelay,
};
// Export the configuration object
export default connectionPoolConfig;
