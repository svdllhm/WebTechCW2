import mongoose from "mongoose";
import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const db = process.env.DB;

const start = async () => {
  try {
    await mongoose.connect(db);
    console.log("Connected to MongoDB!");
    app.listen(port, () => {
      console.log("Running on port 3000");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process on failure
  }
};
start();
