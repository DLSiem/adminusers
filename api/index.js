import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/UserRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("Error: ", err);
  });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is the home page!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
