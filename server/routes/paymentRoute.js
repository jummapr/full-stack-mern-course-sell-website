import express from 'express'
import { AuthorizeAdmin, AuthorizeSubscribe, isAuthenticated } from '../middlewares/auth.js'
import paymentController from '../controllers/paymentController.js'

const router = express.Router()


//! Buy Subscription
router.route("/subscribe").get(isAuthenticated,paymentController.buySubscription)

//! Payment Verification
router.route("/paymentverifiction").post(isAuthenticated,paymentController.paymentVerifiction)

//! get RazorPay Key
router.route("/razorpaykey").get(paymentController.getRazorPayKey)

//! Cancel Subscription
router.route("/subscribe/cancel").delete(isAuthenticated, AuthorizeSubscribe,paymentController.cancelSubscription)

export default router