import connectionPool from '../connection/connection-pool.js';
import Utilities from '../utilities/utilities.js';
import { DatabaseQueryError } from '../errors/database-errors.js';
class BasicModel {
    static async findBy(columns, // Column names to select in the SQL query
    tableName, // Name of the table to retrieve data from
    filters, // Object with filters where keys are column names and values are filter values
    logicalOperators = [] // Array of logical operators used between conditions in the WHERE clause
    ) {
        // Ensure all elements in the `columns` array are strings
        if (!columns.every(col => typeof col === 'string')) {
            throw new TypeError('All column names must be strings.');
        }
        // Convert `filters` object to an array of [key, value] pairs
        const filterEntries = Object.entries(filters);
        // Ensure at least one filter is provided
        if (filterEntries.length < 1) {
            throw new RangeError('At least one filter is required.');
        }
        // Ensure the number of logical operators is valid
        if (filterEntries.length - 1 !== logicalOperators.length) {
            throw new RangeError('The number of logical operators must be one less than the number of filters.');
        }
        // Ensure `tableName` is a non-empty string
        if (!tableName || typeof tableName !== 'string') {
            throw new TypeError('Table name must be a non-empty string.');
        }
        // Initialize SQL query and arguments
        let query = `SELECT ${columns.join(', ')} FROM ${tableName} WHERE`;
        let queryParams = [];
        // Build the WHERE clause of the query
        filterEntries.forEach((filter, index, array) => {
            const [column, value] = filter;
            // Ensure column and value are strings
            if (typeof column !== 'string' || typeof value !== 'string') {
                throw new TypeError('Filter column names and values must be strings.');
            }
            // Add condition to the query
            query += ` ${column} = ?`;
            queryParams.push(value);
            // Add logical operator if not the last condition
            if (index < array.length - 1) {
                const operator = logicalOperators[index];
                if (typeof operator !== 'string') {
                    throw new TypeError('Logical operators must be strings.');
                }
                query += ` ${operator}`;
            }
        });
        // Execute the query and return results
        const results = await connectionPool.executeQuery(query, queryParams);
        return results;
    }
    static async insert(tableName, // Name of the table to insert data into
    values, // Array of values to insert into the table
    columns = [] // Array of column names (optional)
    ) {
        // Initialize the SQL query string
        let query;
        if (columns.length > 0) {
            // Create the query with specified columns
            query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES `;
        }
        else {
            // Create the query without specified columns
            query = `INSERT INTO ${tableName} VALUES `;
        }
        // Create the placeholder string for values
        const placeholders = new Array(values.length).fill('?').join(', ');
        query += `(${placeholders})`;
        // Execute the query with provided values
        try {
            await connectionPool.executeQuery(query, values);
        }
        catch (error) {
            // Handle and rethrow the error with a custom message
            Utilities.throwCatchedError(DatabaseQueryError, 'Failed to execute insert query.', error);
        }
    }
}
export default BasicModel;
