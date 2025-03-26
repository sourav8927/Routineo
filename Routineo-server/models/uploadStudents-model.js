const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  serialNo: { type: Number },
  registrationNo: { type: String, required: true, unique: true },
  roll: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true }, // Store year
  semester: { type: String, required: true }, // Store semester
  uploadedAt: { type: Date, default: Date.now }, // Timestamp for uploads
});

module.exports = mongoose.model("Student", studentSchema);
