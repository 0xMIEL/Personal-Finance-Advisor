import connectionPool from '../db/db-connection.js'

class UserModel {
	static #table = 'users'

	static async exist(fields, conditions) {
		const connection = await connectionPool.getConnection()
		conditions = conditions.map(condition => condition.join(' '))
		conditions = conditions.join(' OR ')
		const query =
			`SELECT ${fields.join(', ')} FROM ${this.#table} WHERE ` +
			conditions
		const [result] = await connection.execute(query)
		connection.release()
		return result
	}

	static createUser() {}

	static updateUser() {}

	// static deleteUser() {}
}

export default UserModel
