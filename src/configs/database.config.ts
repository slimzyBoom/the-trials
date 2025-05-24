import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1)
    }
}

export default connectDB;