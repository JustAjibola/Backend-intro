import express from "express";

//  routes import
import userRouter from "./routes/user.route.js";

const app = express(); // Create an Express application

app.use(express.json()); // Middleware to parse JSON request bodies

// routes declaration
app.use("/api/v1/users", userRouter);

// example route: http://localhost:8000/api/v1/users/register

export default app;