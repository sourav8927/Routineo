const xlsx = require("xlsx");
const Student = require("../models/uploadStudents-model");

// Helper function to clean registration number
const cleanRegistrationNo = (regNo) => {
  if (!regNo) return null;
  return regNo.replace(/\sof\s\d{4}-\d{2}/g, "").trim(); // Removes "of 2021-22"
};

// Extract data from uploaded file
const extractData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const { year, semester } = req.body; // Get year & semester from frontend

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Map data to match the Student schema
    const students = sheetData.map((student, index) => ({
      serialNo: index + 1,
      registrationNo: cleanRegistrationNo(student["Registration Number"]),
      roll: student["Roll Number"]?.trim() || null,
      name: student["Student Name"]?.trim() || "Unknown",
      branch: student["Branch"]?.trim() || "Unknown",
      year, // Assign selected year
      semester, // Assign selected semester
      uploadedAt: new Date(),
    })).filter(student => student.registrationNo && student.roll);

    return res.status(200).json({ students });
  } catch (error) {
    console.error("Error extracting data:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// Store extracted data in MongoDB
const uploadData = async (req, res) => {
  try {
    console.log("📥 Received Data:", JSON.stringify(req.body, null, 2));

    const { students, year, semester } = req.body;

    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ message: "No student data provided!" });
    }

    // Ensure all students get the correct year & semester before inserting
    const formattedStudents = students.map(student => ({
      ...student,
      year,
      semester,
      uploadedAt: new Date(),
    }));

    // Prevent duplicate entries using upsert
    const bulkOps = formattedStudents.map((student) => ({
      updateOne: {
        filter: { registrationNo: student.registrationNo, roll: student.roll },
        update: { $set: student },
        upsert: true,
      },
    }));

    await Student.bulkWrite(bulkOps);
    console.log("✅ Data successfully stored/updated in MongoDB!");
    return res.status(200).json({ message: "Data stored successfully!" });

  } catch (error) {
    console.error("❌ Error storing data:", error);
    return res.status(500).json({ message: "Server error: Unable to save data." });
  }
};


module.exports = { extractData, uploadData };
