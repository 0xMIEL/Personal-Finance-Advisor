import express from 'express'
import authentication from '../middlewares/authentication.js'
import { getAllCurrencies } from '../controllers/currency-controller.js'

const router = express.Router()

// Route to get all available currencies
// This route is protected by the authentication middleware
router.get('/', authentication, getAllCurrencies)

export default router
