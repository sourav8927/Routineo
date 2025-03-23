const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  admissionTestScore: { type: Number, default: null },
  highSchoolPercentage: { type: Number, default: null },
  city: { type: String, required: true },
  admissionStatus: { type: String, enum: ["Accepted", "Rejected", "Pending"], default: "Pending" },
});

module.exports = mongoose.model("Student", studentSchema);
