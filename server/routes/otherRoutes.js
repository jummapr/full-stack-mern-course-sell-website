import express from 'express'
import { AuthorizeAdmin, isAuthenticated } from '../middlewares/auth.js'
import otherControllers from '../controllers/otherControllers.js'

const router = express.Router()


//! contact form
router.route('/contact').post(otherControllers.contact)

//! Request Form
router.route('/courserequest').post(otherControllers.courseRequest)

//! Get Admin Dashboard States
 router.route("/admin/stats").get(isAuthenticated,AuthorizeAdmin,otherControllers.getDashboardState)

export default router