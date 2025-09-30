import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("MongoDB connected successfully!")
    }
    catch (error: any) {
        console.error("Error connecting DB", error)
    }
}
