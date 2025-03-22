require('dotenv').config();
const express=require("express");
const app=express();
const cors=require("cors");
const authRouter=require("./router/auth-router");

app.use(cors());
app.use(express.json());

//mongodb connection
const connectDb=require("./utils/db");
//routes
app.use("/api/auth",authRouter);

const PORT=5000;

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on ${PORT}`);
    });
});