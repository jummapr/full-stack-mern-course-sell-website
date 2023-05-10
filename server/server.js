import app from "./app.js";
import { ConnectDatabase } from "./config/database.js";
import cloudinary from 'cloudinary'
import RazorPay from 'razorpay'
import nodeCron from 'node-cron'
import { Stats } from "./models/Stats.js";

ConnectDatabase();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export const instance = new RazorPay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRETE
});

nodeCron.schedule("0 0 0 1 * *",async() => {
  try {
    await Stats.create({})
  } catch (error) {
      console.log(error)
  } 
});



app.listen(process.env.PORT, () => {
  console.log(`server is working on Port ${process.env.PORT}`);
});

