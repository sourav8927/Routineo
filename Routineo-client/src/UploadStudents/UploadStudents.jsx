import React, { useState } from "react";
//import { Upload, FileText, Printer } from "lucide-react"; // Import icons
import { FaUpload } from "react-icons/fa";
import { FaPrint } from "react-icons/fa";
import { AiFillFileText } from "react-icons/ai";

const UploadStudents = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [message, setMessage] = useState("");
  const [year, setYear] = useState("1st Year");
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState("1st Semester");
  const [uploadDate, setUploadDate] = useState(new Date().toLocaleDateString());

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleExtract = async () => {
    if (!file) {
      setMessage("Please select a file!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/students/extract", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        const cleanedData = data.students.map((student, index) => ({
          id: index + 1,
          name: student.name || "N/A",
          age: student.age || "N/A",
          gender: student.gender || "N/A",
          testScore: student.admissionTestScore ?? "N/A",
          highSchoolPercentage: student.highSchoolPercentage ?? "N/A",
          city: student.city || "N/A",
          admissionStatus: student.admissionStatus || "Pending",
        }));

        setPreviewData(cleanedData);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Extraction error:", error);
      setMessage("Error extracting data.");
    }
  };

  const handleUpload = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/students/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ students: previewData }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Error uploading data.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-100 py-10 w-7xl h-full mx-auto ">
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Sticky Navbar */}
      <div className="sticky top-0 bg-teal-600 text-white py-3 px-6 flex flex-wrap justify-between items-center shadow-md z-50">
        <h2 className="text-lg font-semibold">Upload Student Data</h2>
        <div className="flex space-x-4">
          <select
            className="p-2 text-black rounded-md"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>

          <select
            className="p-2 text-black rounded-md"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option>CSE</option>
            <option>ECE</option>
            <option>ME</option>
            <option>EE</option>
            <option>IT</option>
          </select>

          <select
            className="p-2 text-black rounded-md"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option>1st Semester</option>
            <option>2nd Semester</option>
            <option>3rd Semester</option>
            <option>4th Semester</option>
            <option>5th Semester</option>
            <option>6th Semester</option>
            <option>7th Semester</option>
            <option>8th Semester</option>
          </select>
        </div>
      </div>

      {/* Upload Controls */}
      <div className="mt-6">
        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-md"
        />

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleExtract}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md border border-gray-300 hover:bg-blue-700 transition"
          >
            <AiFillFileText />
            Extract Data
          </button>
          <button
            onClick={handleUpload}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md border border-gray-300 hover:bg-green-700 transition"
          >
            <FaUpload />
            Upload Data
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md border border-gray-300 hover:bg-gray-700 transition"
          >
            <FaPrint />
            Print Data
          </button>
        </div>
      </div>

      {message && <p className="mt-4 text-red-500">{message}</p>}

      {/* Display Uploaded Data */}
      {previewData.length > 0 && (
        <div id="printable-content" className="mt-6">
          <h2 className="text-xl font-bold text-center">
            {year} {branch} {semester} Student List
          </h2>
          <p className="text-center text-sm text-gray-600 mb-4">Upload Date: {uploadDate}</p>

          <table className="w-full border border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Age</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Test Score</th>
                <th className="p-2 border">High School %</th>
                <th className="p-2 border">City</th>
                <th className="p-2 border">Admission Status</th>
              </tr>
            </thead>
            <tbody>
              {previewData.map((student) => (
                <tr key={student.id} className="border-t">
                  <td className="p-2 border">{student.id}</td>
                  <td className="p-2 border">{student.name}</td>
                  <td className="p-2 border">{student.age}</td>
                  <td className="p-2 border">{student.gender}</td>
                  <td className="p-2 border">{student.testScore}</td>
                  <td className="p-2 border">{student.highSchoolPercentage}</td>
                  <td className="p-2 border">{student.city}</td>
                  <td className="p-2 border">{student.admissionStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default UploadStudents;
