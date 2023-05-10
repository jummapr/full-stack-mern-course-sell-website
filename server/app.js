import express from "express";
import { config } from "dotenv";
import coursesRoutes from "./routes/courseRoutes.js";
import userRotes from "./routes/userRotes.js";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import paymentRoute from "./routes/paymentRoute.js";
import otherRoutes from "./routes/otherRoutes.js";
import cors from "cors";
config({
  path: "./config/config.env",
});
const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["https://ccourse-sell.vercel.app"],
  })
);
app.use(cookieParser());

// using middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//! Importing Routes
app.use("/api/v1", coursesRoutes);
app.use("/api/v1", userRotes);
app.use("/api/v1", paymentRoute);
app.use("/api/v1", otherRoutes);

export default app;

app.use(ErrorMiddleware);
