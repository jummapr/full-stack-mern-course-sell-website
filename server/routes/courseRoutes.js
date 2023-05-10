import express from "express";
import coursesControllers from "../controllers/coursesControllers.js";
import { AuthorizeAdmin, AuthorizeSubscribe, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//! Get All Courses Without Lectures
router.route("/courses").get(coursesControllers.getAllCourses);

//! create a new Courses only if it's admin then create a new Course
router
  .route("/createcourse")
  .post(
    isAuthenticated,
    AuthorizeAdmin,
    singleUpload,
    coursesControllers.createCourse
  );

//! Add Lectures, Delete Course, Get Course Details
router
  .route("/course/:id")
  .get(isAuthenticated, AuthorizeSubscribe,coursesControllers.getAllCourseLecture)
  .delete(isAuthenticated, AuthorizeAdmin, coursesControllers.deleteCourse);

  router.route("/course/:id").post( isAuthenticated,
    AuthorizeAdmin,
    singleUpload,
    coursesControllers.AddLecture)

//! Delete Lecture
router
  .route("/lecture")
  .delete(isAuthenticated, AuthorizeAdmin, coursesControllers.deleteLecture);

export default router;
