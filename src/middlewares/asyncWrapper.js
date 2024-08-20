const asyncWrapper = cb => {
	return async (req, res, next) => {
		try {
			await cb(req, res)
		} catch (err) {
			next(err)
		}
	}
}

export default asyncWrapper
