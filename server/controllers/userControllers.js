import { catchAsyncErrorHandler } from "../middlewares/catchAsyncError.js";
import User from "../models/User.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail.js";
import {Course} from '../models/Course.js'
import cloudinary from 'cloudinary'
import getDataUri from "../utils/dataUri.js";
import { Stats } from "../models/Stats.js";

class UserControllers {
  //! user Register Logic
  register = catchAsyncErrorHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    const file = req.file;
    

    if (!name || !email || !password || !file) {
      return next(new ErrorHandler("all fields must be required", 400));
    }

    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("user is already Exists", 409));
    }

    // upload the file on the cloudnary


    const fileUri = getDataUri(file);
    //  console.log(fileUri)

    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    // if the user not exists then create a new user

    user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    sendToken(res, user, "User Registration SuccessFully", 201);
    // console.log(res)
  });

  //! user login logic
  login = catchAsyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    // const file = req.file;

    if (!email || !password) {
      return next(new ErrorHandler("all fields must be required", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("incorrect email or password", 401));
    }
    // console.log(user.password);
    // if(!user.password)
    // console.log(user);

    // const isMatch = user.comparePassword(password);
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return next(new ErrorHandler("incorrect email or password", 401));
    }
    sendToken(res, user, `Welcome Back ${user.name}`, 200);
   
  });

  //! user logout logic
  logout = catchAsyncErrorHandler(async (req, res, next) => {
    res
      .status(200)
      .cookie("token", null, {
        expires:new Date(Date.now()) ,
        httpOnly: true, 
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "logout successfully",
      });
  });
  //! Get My Profile Logic
  getMyProfile = catchAsyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user,
    });
  });

  //! Change the password

  changePassword = catchAsyncErrorHandler(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return next(new ErrorHandler("all fields must be required", 400));
    }

    const user = await User.findById(req.user._id).select("+password");

    // const passwordCompare =  await bcrypt.compare(password,user.password)
    // if (!passwordCompare) {
    //   return next(new ErrorHandler("incorrect old password", 401));
    // }
    const isMatch = user.comparePassword(oldPassword);
    if (!isMatch) {
      return next(new ErrorHandler("Incorrect old password", 400));
    }
    console.log(user);
    user.password = newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  });

  //! Update Profile

  updateProfile = catchAsyncErrorHandler(async (req, res, next) => {
    const { name, email } = req.body;
    const user = await User.findById(req.user._id).select("+password");

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Update successfully",
    });
  });

  //! Update User Profile Picture
  updateProfilePicture = catchAsyncErrorHandler(async (req, res, next) => {
    //! Cloudnary : TODO
    const file = req.file;

    const user = await User.findById(req.user._id);


    const fileUri = getDataUri(file);
    //  console.log(fileUri)

    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    user.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Profile Picture updated successfully" });
  });

  //! Forget the Password
  forgetPassword = catchAsyncErrorHandler(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("no user found in this email address", 400));
    }

    const resetToken = await user.getResetToken();

    const url = `${process.env.FRONTEND_URI}/resetpassword/${resetToken}`;

    const message = `Click on The Link To Reset Your Password.  ${url}. if  you want to not reset your password then ignorer it`;

    //! Send Token Vie Email
    await sendEmail(user.email, "JummaCourse - Reset Password", message);

    res
      .status(200)
      .json({
        success: true,
        message: `Reset Token has Been To ${user.email}`,
      });
  });

  //! Reset the Password
  resetPassword = catchAsyncErrorHandler(async (req, res, next) => {

    const {token} = req.params;

    
    res
      .status(200)
      .json({
        success: true,
        message: `Reset Token has Been To`,
        token
      });
  });

  //! Add To Play List
  addToPlayList = catchAsyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    const course = await Course.findById(req.body.id);

    if(!course) return next(new ErrorHandler("Invalid Course Id",404));

    const itemExist = user.playlist.find((item) => {
      if(item.course.toString() ===  course._id.toString()) return true
    } )

    if(itemExist) return next(new ErrorHandler("item already exists",409));


    user.playlist.push({
      course: course._id,
      poster: course.poster.url,
    });

    await user.save();

    res
      .status(200)
      .json({
        success: true,
        message: 'Added To Playlist ',
      });

  });

  removeFromPlayList = catchAsyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    const course = await Course.findById(req.query.id);

    if(!course) return next(new ErrorHandler("Invalid Course Id",404));

    const newPlaylist = user.playlist.filter(item => {
      if(item.course.toString() !== course._id.toString()) return item;
    }
    )

    user.playlist = newPlaylist;

    await user.save();

    res
      .status(200)
      .json({
        success: true,
        message: 'Removed from playlist',
      });
  });


  //*Admin Controllers

  getAllUsers = catchAsyncErrorHandler(async (req, res, next) => {
    const users = await User.find({});

    res.status(200).json({
      success: true,
      users , 
    })
  });

  //! Change The Role 

  updateUserRole = catchAsyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) return next(new ErrorHandler("User not found",404));

    if(user.role === "admin") user.role = "user"; 
    else  user.role = "user"

    await user.save();

    res.status(200).json({success:true,
    message: "user Role updated successfully"})

  
  });

  //! Delete the user

  deleteThaUser = catchAsyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) return next(new ErrorHandler("User not found",404));

   await cloudinary.v2.uploader.destroy(user.avatar.public_id);

   // cancel subscription

   await user.remove();



    await user.save();

    res.status(200).json({success:true,
    message: "user Deleted successfully"})

  
  });

  //! Delete my profile

  deleteMyProfile = catchAsyncErrorHandler(async (req, res, next) => {

    const user = await User.findById(req.user._id);


   await cloudinary.v2.uploader.destroy(user.avatar.public_id);

   // cancel subscription

   await user.remove();

    res.status(200).cookie("token",null, {
      expires: new Date(Date.now())
     
    }).json({success:true,
    message: "user Deleted successfully"})

  
  });
}

User.watch().on('change', async() => {
  const stats = await Stats.find({}).sort({createdAt: "desc"}).limit(1);

  const subscription = await User.find({"subscription.status": "active" });

  stats[0].users = await User.countDocuments()
  stats[0].subscription = subscription.length;
  stats[0].createdAt = new Date(Date.now());

  await stats[0].save(); 

})

export default new UserControllers();
