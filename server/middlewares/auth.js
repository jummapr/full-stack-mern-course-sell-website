import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { catchAsyncErrorHandler } from "./catchAsyncError.js";

export const isAuthenticated = catchAsyncErrorHandler(
  async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return next(new ErrorHandler("Not Logged in", 401));

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode._id);

    next();
  }
);

export const AuthorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource`,
        403
      )
    );

    next()
};

export const AuthorizeSubscribe = (req, res, next) => {
  if (req.user.subscription.status !== "active" && req.user.role !== "admin") 
    return next(
      new ErrorHandler(
        `Only Subscribers can access this resource`,
        403
      )
    );

    next()
};
