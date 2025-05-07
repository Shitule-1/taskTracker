import mongoose from 'mongoose';
const URL="mongodb://127.0.0.1:27017/taskTracker";

const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("DB connected successfully");
    } catch (error) {
        console.log("Error connecting to DB:", error.message);
    }
};

export default connectDB;