import express from 'express'
import userControllers from '../controllers/userControllers.js';
import { AuthorizeAdmin, isAuthenticated } from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router()

//! register New User
router.route('/register').post(singleUpload,userControllers.register)
//! Login User
router.route('/login').post(userControllers.login);

//! logout
router.route('/logout').get(userControllers.logout);

//! get My Profile
router.route('/me').get(isAuthenticated,userControllers.getMyProfile)

//! Delete My Profile
router.route('/me').delete(isAuthenticated,userControllers.deleteMyProfile)

//! Change The Password
router.route('/changepassword').put(isAuthenticated,userControllers.changePassword)

//! Profile updated 
router.route('/updaateprofile').put(isAuthenticated,userControllers.updateProfile)

//! Update Profile Picture
router.route('/updateprofilepicture').put(isAuthenticated,singleUpload,userControllers.updateProfilePicture)

//! Forgot Password 
router.route('/forgetpassword').post(userControllers.forgetPassword)

//! Reset Password
router.route('/resetpassword/:token').put(userControllers.resetPassword)

//! AddToPlayList
router.route('/addtoplaylist').post(isAuthenticated,userControllers.addToPlayList)

//! Remove from Playlist
router.route('/removefromplaylist').delete(isAuthenticated,userControllers.removeFromPlayList);


//!Admin routes
router.route("/admin/users").get(isAuthenticated,AuthorizeAdmin,userControllers.getAllUsers)

router.route("/admin/user/:id").put(isAuthenticated,AuthorizeAdmin,userControllers.updateUserRole).delete(isAuthenticated,AuthorizeAdmin,userControllers.deleteThaUser)




export default router