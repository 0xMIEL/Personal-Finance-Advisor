import express from 'express'
import UserModel from './models/user-model'

const start = () => {
	try {
		const app = express()

		app.use(express.json())

		app.post('/api/v1/register', async (req, res) => {
			const result = await UserModel.findUser('kacper')
		})

		const PORT = process.env.PORT || 5500
		app.listen(PORT, () => {
			console.log(`server is running on port ${PORT}...`)
		})
	} catch (error) {
		console.log('Error: ', error)
	}
}

start()
