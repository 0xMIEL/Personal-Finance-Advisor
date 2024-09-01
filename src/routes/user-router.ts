// Import necessary modules and controllers
import express from 'express'
import authentication from '../middlewares/authentication.js'
import {
	registerUser,
	loginUser,
	deleteAccount,
} from '../controllers/user-controller.js'

// Create a new router instance
const router = express.Router()

// Route to handle user registration
router.post('/register', registerUser)

// Route to handle user login
router.post('/login', loginUser)

// Route to handle account deletion (requires authentication)
router.delete('/deleteAccount', authentication, deleteAccount)

// Export the router as the default export
export default router
