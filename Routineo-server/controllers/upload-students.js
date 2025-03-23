const xlsx = require("xlsx");
const Student = require("../models/uploadStudents-model");

// Helper function to convert "N/A" to null for numeric fields
const parseNumber = (value) => {
  return isNaN(value) || value === "N/A" || value === "" ? null : Number(value);
};

// Extract data from uploaded file
const extractData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // ✅ Map data to match the Student schema and properly handle numerical fields
    const students = sheetData.map((student) => ({
      name: student.Name || "N/A",
      age: parseNumber(student.Age), // Convert to number or null
      gender: student.Gender || "N/A",
      admissionTestScore: parseNumber(student["Admission Test Score"]),
      highSchoolPercentage: parseNumber(student["High School Percentage"]), // ✅ Fix here
      city: student.City || "N/A",
      admissionStatus: student["Admission Status"] || "Pending",
    }));

    return res.status(200).json({ students });
  } catch (error) {
    console.error("Error extracting data:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Store extracted data in MongoDB
const uploadData = async (req, res) => {
    try {
      const { students } = req.body;
  
      if (!students || students.length === 0) {
        return res.status(400).json({ message: "No student data to upload!" });
      }
  
      // Validate before inserting into MongoDB
      const cleanedStudents = students.map((student) => ({
        ...student,
        highSchoolPercentage: parseNumber(student.highSchoolPercentage), // Ensure it's number or null
      }));
  
      await Student.insertMany(cleanedStudents);
      return res.status(200).json({ message: "Data stored successfully!" });
    } catch (error) {
      console.error("Error storing data:", error);
      return res.status(500).json({ message: "Error saving data." });
    }
  };
  

module.exports = { extractData, uploadData };
