import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import meRoute from "./src/routes/me.js";
import authRoute from "./src/routes/auth.js";

dotenv.config();

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected !!!");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected !!!");
});

app.use(cookieParser());
app.use((req, res, next) => {
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/auth", authRoute);
app.use("/api/me", meRoute);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something Went Wrong!";
  return res.status(500).json({
    success: false,
    status: errorStatus,
    Message: errorMessage,
    stack: error.stack,
  });
});

app.listen(process.env.PORT, () => {
  connect();
  console.log(`Listening on port ${process.env.PORT} !!!`);
});
