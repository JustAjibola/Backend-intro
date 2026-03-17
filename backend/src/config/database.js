import mongoose from "mongoose";

const connecttDB = async () => {
    try {
       const connectioInstance = await mongoose.connect
       (`${process.env.MONGODB_URI}`,)
        console.log(`\n MongoDB connected !!!
             ${connectioInstance.connection.host}`);

    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process with an error code

        
    }
}

export default connecttDB;