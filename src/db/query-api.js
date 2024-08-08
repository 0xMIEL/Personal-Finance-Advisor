import connectionPool from './db-connection.js'

class QueryApi {
	static #pool = connectionPool
	static #table

	static #parser(value) {
		if (typeof value === 'string') {
			return `'${value}'`
		}

		if (typeof value === 'number') {
			return value
		}

		throw new TypeError('Bad type of value')
	}

	static async findBy(fields, conditions) {
		const connection = await this.#pool.getConnection()
		fields = fields.join(', ')
		conditions = conditions.map(condition => condition.join(' '))
		conditions = conditions.join(' ')
		const [result] = connection.execute(
			`SELECT ${fields} FROM ${this.#table}`
		)
		connection.release()
		return result
	}
}

export default QueryApi
