import mongoose from "mongoose";

export const ConnectDatabase = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connecting to ${connection.host}`);
  } catch (error) {
    console.log(`Error connecting to ${connection}`)
  }
};
