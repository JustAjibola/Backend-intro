import app from "./app.js";
import dotenv from "dotenv";
import connecttDB from "./config/database.js";

dotenv.config({
    path: "./.env"
});

const startServer = async () => {
    try {
        await connecttDB(); 

        app.on("error", (error) => {
            console.error(`Server error: ${error.message}`);
            throw error; // Rethrow the error to be caught by the outer catch block
        });

        app.listen(process.env.PORT|| 8000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });

    } catch (error) {
        console.error(`Failed to start the server: ${error.message}`);
        
    }

    console.log("Mongo URI loaded:", process.env.MONGODB_URI);
}
startServer();