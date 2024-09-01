// Import necessary modules and utilities
import { asyncWrapper, authAsyncWrapper } from '../middlewares/async-wrapper.js'
import UserModel from '../models/user-model.js'
import PasswordManager from '../utilities/password-manager.js'
import UserTokenManager from '../utilities/user-token-manager.js'
import Validator from '../utilities/validator.js'
import {
	MissingValueError,
	InvalidCredentialsError,
	NotFoundError,
	AlreadyExistsError,
	DeletedResourceError,
} from '../errors/default-errors.js'
import type { User } from '../models/user-model.js'


// Handler for user registration
const registerUser = asyncWrapper(async (req, res) => {
	// Destructure username and password from the request body
	const { username, password } = req.body as Record<string, string>

	// Validate username and password
	Validator.validateUsername(username)
	Validator.validatePassword(password)

	// Normalize the username to lowercase for consistency
	const normalizedUsername = username.toLowerCase()

	// Hash the password
	const hashedPassword = await PasswordManager.hashPassword(password)

	// Check if the user already exists in the database
	const existingUser = await UserModel.getUserByUsername(normalizedUsername)
	if (existingUser) {
		throw new AlreadyExistsError(
			`User named '${normalizedUsername}' already exists.`
		)
	}

	// Create a new user in the database
	await UserModel.createUser(normalizedUsername, hashedPassword)

	// Retrieve the newly created user
	const newUser = (await UserModel.getUserByUsername(
		normalizedUsername
	)) as User

	// Generate a JWT token for authentication
	const token = UserTokenManager.generateToken(newUser)

	// Send a success response with the user data and token
	res.status(200).json({
		message: `User named '${normalizedUsername}' registered successfully.`,
		user: newUser,
		token,
	})
})

// Handler for user login
const loginUser = asyncWrapper(async (req, res) => {
	// Destructure username and password from the request body
	const { username, password } = req.body as Record<string, string>

	// Validate the provided username and password
	Validator.validateUsername(username)
	Validator.validatePassword(password)

	// Normalize the username to lowercase for consistency in storage and comparison
	const normalizedUsername = username.toLowerCase()

	// Retrieve the user record from the database using the normalized username
	const user = await UserModel.getUserByUsername(normalizedUsername)
	if (!user) {
		throw new NotFoundError(`The user named '${username}' was not found.`)
	}

	// Compare the provided password with the stored hashed password
	const isValidPassword = await PasswordManager.comparePasswords(
		password,
		user.hash as string
	)
	if (!isValidPassword) {
		throw new InvalidCredentialsError('Invalid password.')
	}

	// Generate a JWT token for the authenticated user
	const token = UserTokenManager.generateToken(user)

	// Send a success response with the generated token
	res.status(200).json({
		message: 'User logged in successfully.',
		token,
	})
})

// Handler for deleting a user account
const deleteAccount = authAsyncWrapper(async (req, res) => {
	// Ensure the user is authenticated
	if (!res.user) throw new MissingValueError('user')

	// Extract and normalize the username from the request body
	const username = (req.body.username as string)?.toLowerCase()
	if (!username) throw new MissingValueError('username')

	// Check if the authenticated user is trying to delete their own account
	if (res.user.username !== username) {
		throw new InvalidCredentialsError('Invalid username.')
	}

	// Delete the user account from the database
	const result = await UserModel.deleteUser(res.user.userId)
	if (result.affectedRows === 0) {
		throw new DeletedResourceError(
			`Your account named '${res.user.username}' has already been deleted.`
		)
	}

	// Send a success response confirming the account deletion
	res.status(200).json({
		message: `Account named '${res.user.username}' successfully deleted.`,
	})
})

// Export the handlers
export { registerUser, loginUser, deleteAccount }
