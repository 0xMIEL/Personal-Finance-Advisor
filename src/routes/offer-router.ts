import express from 'express'
import authentication from '../middlewares/authentication.js'
import {
	createOffer,
	updateOffer,
	getOffer,
	getAllOffers,
	deleteOffer,
} from '../controllers/offer-controller.js'

const router = express.Router()

// Route to create a new offer
// Requires authentication middleware to ensure the user is logged in
router.post('/', authentication, createOffer)

router.put('/:offerId', authentication, updateOffer)

// Route to get all offers for the authenticated user
// Requires authentication middleware to ensure the user is logged in
router.get('/', authentication, getAllOffers)

// Route to get a specific offer by ID
// Requires authentication middleware to ensure the user is logged in
router.get('/:offerId', authentication, getOffer)

// Route to delete a specific offer by ID
// Requires authentication middleware to ensure the user is logged in
router.delete('/:offerId', authentication, deleteOffer)

// Export the router for use in other parts of the application
export default router
