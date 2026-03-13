import mongoose from "mongoose";
import { config } from "dotenv";

config();

const MONGO_URI = process.env.MONGO_URI as string;

const connectDB = async (): Promise<void> => {
    try {
        if (!MONGO_URI) {
            console.error("MongoDB URI is missing....❗");
            process.exit(1);
        }

        await mongoose.connect(MONGO_URI);

        console.log("MongoDB Connected Successfully....🟢");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;