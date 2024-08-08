import express from 'express'
import QueryAPi from ''

const start = () => {
	try {
		const app = express()

		app.use(express.json())

		app.post('/api/v1/register', async (req, res) => {
			const { username, password } = req.body
			const result = await UserModel.exist(
				['*'],
				[['username', '=', `'${username}'`]]
			)
			console.log(result)
			res.send('Register page!')
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
