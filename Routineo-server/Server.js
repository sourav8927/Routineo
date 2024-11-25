// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const PORT = 5000;

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/collegeApp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Schema and Model
// const RoutineSchema = new mongoose.Schema({
//   day: String,
//   subjects: [String],
//   timings: [String],
// });
// const AttendanceSchema = new mongoose.Schema({
//   studentId: String,
//   present: Number,
//   total: Number,
// });

// const Routine = mongoose.model('Routine', RoutineSchema);
// const Attendance = mongoose.model('Attendance', AttendanceSchema);

// app.use(express.json());

// // Routes
// app.get('/api/routines', async (req, res) => {
//   const routines = await Routine.find({});
//   res.json(routines);
// });

// app.get('/api/attendance/:id', async (req, res) => {
//   const attendance = await Attendance.findOne({ studentId: req.params.id });
//   res.json(attendance);
// });

// // Start Server
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

require('dotenv').config();
const express= require("express");
const cors=require("cors");
const app=express();
// const {createServer}=require('node:http');
const authRouter = require("./router/auth-router");
const contactRouter=require("./router/contact-router");
const serviceRouter= require("./router/service-router");
const adminRouter=require("./router/admin-router");

//mongodb connection
const connectDb= require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');

app.use(cors());
app.use(express.json());
//routes
app.use("/api/auth",authRouter);
app.use("/api/form",contactRouter);
app.use("/api/services",serviceRouter);
app.use("/api/admin",adminRouter);
//calling error middleware
app.use(errorMiddleware);


const PORT=5000;
const hostname='127.0.0.2';

connectDb().then(()=>{
    app.listen(PORT,hostname,()=>{
        console.log(`Server is running at http://${hostname}:${PORT}/`);
    });

});