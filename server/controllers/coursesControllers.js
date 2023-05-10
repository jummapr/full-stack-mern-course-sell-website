import { catchAsyncErrorHandler } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";
import { Stats } from "../models/Stats.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";

class CoursesControllers {
  getAllCourses = catchAsyncErrorHandler(async (req, res, next) => {

    const keyword = req.query.keyword || "";
    const category = req.query.category || "";

    const courses = await Course.find({
      title : {
        $regex :  keyword,
        $options: "i"
      },
      category: {
        $regex :  category,
        $options: "i"
      }
    }).select("-lectures");
    res.status(200).json({
      success: true,
      courses,
    });
  });

  createCourse = catchAsyncErrorHandler(async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const file = req.file;

    // console.log(file)
    const fileUri = getDataUri(file);
    //  console.log(fileUri)

    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    Course.create({
      title,
      description,
      category,
      createdBy,
      poster: {
        public_id: myCloud.public_id,
        url: myCloud.url,
      },
    });

    res.status(201).json({
      success: true,
      message: "course created successfully. you can add lecture now.",
    });
  });

  //! Get All Courses
  getAllCourseLecture = catchAsyncErrorHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

    if (!course) return next(new ErrorHandler("Course not found", 404));

    course.views += 1;

    await course.save();

    res.status(200).json({
      success: true,
      lectures: course.lectures,
    });
  });

  //! Add Lectures
  AddLecture = catchAsyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;


    const course = await Course.findById(id);

    if (!course) return next(new ErrorHandler("Course not found", 404));

    //Upload File here

    const file = req.file;

    if(!title || !description || !file) return next(new ErrorHandler("All Fields are required",400))
    // console.log(file)
    const fileUri = getDataUri(file);
    //  console.log(fileUri)

    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content,{
      resource_type: 'video',
    });

    course.lectures.push({
      title,
      description,
      video: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    course.numOfVideos = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      Message: "Lecture Added in Course ",
    });
  });

  //! Delete the Lecture

  deleteCourse = catchAsyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;


    const course = await Course.findById(id);


    if (!course) return next(new ErrorHandler("Course not found", 404));

    await cloudinary.v2.uploader.destroy(course.poster.public_id);


    for (let i = 0; i < course.lectures.length.length; i++) {
      const singleLecture = course.lectures.length[i];

      await cloudinary.v2.uploader.destroy(singleLecture.video.public_id,{
        resource_type: "video",
      });
      
    }

    await course.remove()

    res.status(200).json({
      success: true,
      message: "Course Deleted successfully"
    })
  });

  //! Delete The Lecture 
  deleteLecture = catchAsyncErrorHandler(async (req, res, next) => {
    const { courseId,lectureId } = req.query;


    const course = await Course.findById(courseId);

    if (!course) return next(new ErrorHandler("Course not found", 404));

    const lecture = course.lectures = course.lectures.find((item) => {
      if( item._id.toString() === lectureId.toString()) return item
    });

    await cloudinary.v2.uploader.destroy(lecture.video.public_id,{
      resource_type: "video",
    });

    course.lectures = course.lectures.filter((item) => {
      if( item._id.toString() !== lectureId.toString()) return item
    });

    course.numOfVideos = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture Deleted successfully"
    })
  });
}

Course.watch().on('change', async() => {
  const stats = await Stats.find({}).sort({createdAt: "desc"}).limit(1);

  const courses = await Course.find();

 let totalViews = 0;

  for (let i = 0; i < courses.length; i++) {
    totalViews += courses[i].views
    
  }

  stats[0].views = totalViews;

  stats[0].createdAt = new Date(Date.now());

  await stats[0].save(); 


})

export default new CoursesControllers();
