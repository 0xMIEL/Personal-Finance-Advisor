import connectionPool from '../databases/connections.js'

class UserModel {
	static async findUser(username) {
		let connection
		try {
			connection = await connectionPool.getConnection()
			const [results] = await connection.execute(
				'SELECT `user_id`, `username`, `created_at` FROM `users` WHERE `username` = ?',
				[username]
			)
			connection.release()
			return results
		} catch (error) {
			throw new Error()
		} finally {
			if (connection) connection.release()
		}
	}

	static async addUser(username, hash) {
		try {
			const connection = await connectionPool.getConnection()
			await connection.execute(
				'INSERT INTO `users`(`username`, `hash`) VALUES (?, ?)',
				[username, hash]
			)
			const [results] = await this.findUser(username)
			return results
		} catch (error) {
			throw new Error()
		} finally {
			if (connection) connection.release()
		}
	}

	static async updateUser(username, newValues) {
		newValues
	}

	static async deleteUser(username) {
		try {
			const connection = await connectionPool.getConnection()
			await connection.execute(
				'INSERT INTO `users`(`username`, `hash`) VALUES (?, ?)',
				[username, hash]
			)
			const [results] = await this.findUser(username)
			return results
		} catch (error) {
			throw new Error()
		} finally {
			if (connection) connection.release()
		}
	}
}

export default UserModel
