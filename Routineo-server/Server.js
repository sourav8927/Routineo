require('dotenv').config();
const express=require("express");
const app=express();
const cors=require("cors");
const authRouter=require("./router/auth-router");
const uploadStudentsRouter=require("./router/upload-students");
app.use(cors());
app.use(express.json());

//mongodb connection
const connectDb=require("./utils/db");
//routes
app.use("/api/auth",authRouter);
app.use("/api/students",uploadStudentsRouter); // Use the student routes

//port
const PORT=5000;

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on ${PORT}`);
    });
});