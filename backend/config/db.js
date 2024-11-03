import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO)
      console.log("Database is Running");
  } catch (error) {
    console.log(`error:${error}`);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

export default connectDb;
