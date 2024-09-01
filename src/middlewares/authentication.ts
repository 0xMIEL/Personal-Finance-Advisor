import UserModel from '../models/user-model.js'
import UserTokenManager from '../utilities/user-token-manager.js'
import { authAsyncWrapper } from './async-wrapper.js'
import {
	AuthorizationHeaderError,
	InvalidTokenError,
	TokenExpiredError,
} from '../errors/default-errors.js'

// Middleware function to handle authentication
const authentication = authAsyncWrapper(async (req, res, next) => {
	// Extract the Authorization header from the request
	const authHeader = req.headers.authorization

	// Check if the Authorization header is present and correctly formatted
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new AuthorizationHeaderError(
			'Authorization header missing or malformed.'
		)
	}

	// Extract the token from the Authorization header
	const token = authHeader.split(' ')[1]

	let decodedToken
	try {
		// Verify and decode the token using UserTokenManager
		decodedToken = UserTokenManager.verifyToken(token)
	} catch (error) {
		throw new InvalidTokenError('Invalid token.')
	}

	// Extract user information and expiration time from the decoded token
	const { userId, username, expiresIn } = decodedToken

	// Verify that the user exists and the token is valid for this user
	const user = await UserModel.getUserByUsername(username)
	if (!user || user.user_id !== userId) {
		throw new InvalidTokenError(
			'Your token is invalid. The user might no longer exist.'
		)
	}

	// Check if the token has expired
	if (Date.now() > expiresIn) {
		throw new TokenExpiredError('Token has expired.')
	}

	// Attach user information to the response object for further use
	res.user = {
		userId,
		username,
	}

	// Proceed to the next middleware or route handler
	next()
})

export default authentication
