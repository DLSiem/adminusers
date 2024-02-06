import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/UserRoutes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("Error: ", err);
  });

const app = express();

app.get("/", (req, res) => {
  res.send("This is the home page!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/users", userRoutes);
