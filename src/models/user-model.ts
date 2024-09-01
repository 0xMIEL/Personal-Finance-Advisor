// Import necessary modules and utilities
import mysql from 'mysql2/promise'
import connectionPool from '../connection/connection-pool.js'

export interface User {
	user_id?: number
	username?: string
	hash?: string
	created_at?: string
}

class UserModel {
	// Table name in the database
	private static readonly TABLE_NAME = 'users'

	// Retrieves a user based on their username
	static async getUserByUsername(username: string): Promise<User | null> {
		const query = `SELECT * FROM ${this.TABLE_NAME} WHERE username = ?`
		const parameters = [username] // Query parameters

		// Execute the query and wait for the result
		const result = (await connectionPool.executeQuery(
			query,
			parameters
		)) as User[]

		// If no user is found, return null
		if (result.length === 0) {
			return null
		}

		// Return the first found user
		return result[0]
	}

	// Creates a new user with the given username and hashed password
	static async createUser(username: string, hash: string): Promise<void> {
		const query = `INSERT INTO ${this.TABLE_NAME} (username, hash) VALUES (?, ?)`
		const parameters = [username, hash]

		// Execute the query to add the new user
		await connectionPool.executeQuery(query, parameters)
	}

	// Deletes a user based on their ID
	static async deleteUser(userId: number): Promise<mysql.ResultSetHeader> {
		const query = `DELETE FROM ${this.TABLE_NAME} WHERE user_id = ?`
		const parameters = [userId]

		// Execute the query to delete the user
		return (await connectionPool.executeQuery(
			query,
			parameters
		)) as mysql.ResultSetHeader
	}
}

export default UserModel
