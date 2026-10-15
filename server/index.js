import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import { DB_NAME } from "./config/constants.js";
import connectDB from "./config/database.js";

dotenv.config({
  path: "./.env"
});

const startServer = async () => {
  try{
    await connectDB();

    app.on("error", (err) => {
      console.error("Error starting the server:", err);
    });
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
  catch(error){
    console.log("Error starting the server:", error);
  }
}

startServer();