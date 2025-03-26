import React, { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import mammoth from "mammoth";

// Dropdown constants and helper functions
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const BRANCHES = ["CSE", "ECE", "ME", "EE", "IT"];
const SEMESTERS = Array.from(
  { length: 8 },
  (_, i) => `${i + 1}${getSuffix(i + 1)} Semester`
);

function getSuffix(num) {
  if (num === 1) return "st";
  if (num === 2) return "nd";
  if (num === 3) return "rd";
  return "th";
}

// Stub object simulating FullRoutine data lookup.
// In your actual implementation, import or load your FullRoutine data.
const allClasses = {
  "BSC-PH102": { title: "Physics" },
  "BSC-M101": { title: "Mathematics - I" },
  "ESC-EE101": { title: "Basic Electrical Engineering" },
  // ... add more class codes as needed.
};

const verifyClassCode = (code) => {
  if (!code) return "";
  // If the code exists in the FullRoutine data, return its title; otherwise, return the code itself.
  return allClasses[code] ? allClasses[code].title : code;
};

const ClassRoutine = () => {
  // Dropdown state for routine filters
  const [year, setYear] = useState("1st Year");
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState("1st Semester");

  // Compute filtered semesters based on selected year
  const yearIndex = YEARS.indexOf(year);
  const filteredSemesters = SEMESTERS.slice(yearIndex * 2, yearIndex * 2 + 2);

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    const newYearIndex = YEARS.indexOf(selectedYear);
    const newSemester = SEMESTERS.slice(newYearIndex * 2, newYearIndex * 2 + 2)[0];
    setSemester(newSemester);
  };

  // ---------------- Routine Management Code ----------------
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = [
    "07:30 - 08:30",
    "08:30 - 09:30",
    "09:30 - 10:30",
    "10:30 - 11:30",
    "11:30 - 12:30",
    "12:30 - 13:30",
    "13:30 - 14:30",
    "14:30 - 15:30",
    "15:30 - 16:30",
  ];

  // Routine state: an object where each day key maps to an array of time slots.
  const [routine, setRoutine] = useState(
    days.reduce((acc, day) => {
      acc[day] = times.map(() => ({
        subject: "",
        // For now, "students" remains unused in routine display.
        students: [],
        status: "active",
      }));
      return acc;
    }, {})
  );

  const [selectedClass, setSelectedClass] = useState(null);

  const handleEditClass = (dayIdx, timeIdx) => {
    const selected = routine[days[dayIdx]][timeIdx];
    setSelectedClass({ dayIdx, timeIdx, ...selected });
  };

  const handleSaveClass = () => {
    const { dayIdx, timeIdx, subject, students } = selectedClass;
    const updatedRoutine = { ...routine };
    updatedRoutine[days[dayIdx]][timeIdx] = {
      subject,
      students,
      status: "active",
    };
    setRoutine(updatedRoutine);
    setSelectedClass(null);
  };

  const handleCancelClass = (dayIdx, timeIdx) => {
    const updatedRoutine = { ...routine };
    updatedRoutine[days[dayIdx]][timeIdx].status = "canceled";
    setRoutine(updatedRoutine);
  };

  const handleChange = (field, value) => {
    setSelectedClass({ ...selectedClass, [field]: value });
  };

  // ---------------- File Handling for Routine ----------------
  const fetchInputRef = useRef(null);
  const uploadInputRef = useRef(null);

  // This function will parse file data and update the routine state.
  // The file is assumed to have columns: Time, Monday, Tuesday, Wednesday, Thursday, Friday.
  const handleFetchFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();

    const processData = (data) => {
      // data is an array of objects with keys matching the header row.
      // Create a copy of the current routine state.
      const updatedRoutine = { ...routine };
      data.forEach((row) => {
        // Assume row["Time"] exactly matches one of our time slots.
        const timeSlot = row["Time"];
        const timeIdx = times.indexOf(timeSlot);
        if (timeIdx === -1) {
          console.warn(`Time slot ${timeSlot} not found in table.`);
          return;
        }
        // For each day, update the subject using verified class code.
        days.forEach((day) => {
          const code = row[day];
          const subjectTitle = verifyClassCode(code);
          updatedRoutine[day][timeIdx].subject = subjectTitle;
        });
      });
      setRoutine(updatedRoutine);
    };

    if (ext === "csv") {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          console.log("Fetched CSV Data:", results.data);
          processData(results.data);
        },
      });
    } else if (ext === "xlsx" || ext === "xls") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        // Convert sheet to JSON using header row.
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log("Fetched Excel Data:", jsonData);
        // Convert array-of-arrays into objects assuming first row is header.
        const [header, ...rows] = jsonData;
        const dataObjects = rows.map((row) => {
          const obj = {};
          header.forEach((key, idx) => {
            obj[key] = row[idx];
          });
          return obj;
        });
        processData(dataObjects);
      };
      reader.readAsArrayBuffer(file);
    } else if (ext === "docx") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        mammoth
          .extractRawText({ arrayBuffer })
          .then((result) => {
            // For a Word file, assume rows are separated by newlines and columns by tabs.
            const lines = result.value.split("\n").filter((line) => line.trim() !== "");
            if (lines.length < 2) {
              console.error("Insufficient data in Word file");
              return;
            }
            const header = lines[0].split("\t");
            const dataObjects = lines.slice(1).map((line) => {
              const values = line.split("\t");
              const obj = {};
              header.forEach((key, idx) => {
                obj[key] = values[idx];
              });
              return obj;
            });
            console.log("Fetched Word Data:", dataObjects);
            processData(dataObjects);
          })
          .catch((err) => console.error("Error parsing Word file:", err));
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.error("Unsupported file type for fetching routine");
    }
  };

  const handleUploadFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    console.log("File selected for upload:", file);
    // TODO: Create a FormData object and send the file to your API endpoint.
  };

  const fetchClassRoutine = () => {
    if (fetchInputRef.current) {
      fetchInputRef.current.click();
    }
  };

  const uploadRoutine = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.click();
    }
  };

  const submitRoutine = () => {
    console.log("Submitting routine...");
    // TODO: Implement your submission logic here (e.g., send the routine state to your backend)
  };

  // ---------------- Auto Updating Date and Time ----------------
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      {/* Hidden file inputs for fetch and upload */}
      <input
        type="file"
        accept=".csv, .xlsx, .xls, .docx"
        ref={fetchInputRef}
        style={{ display: "none" }}
        onChange={handleFetchFile}
      />
      <input
        type="file"
        accept=".csv, .xlsx, .xls, .docx"
        ref={uploadInputRef}
        style={{ display: "none" }}
        onChange={handleUploadFile}
      />

      {/* Navbar/Header with grey background */}
      <div className="bg-gray-600 text-white p-4 rounded-lg mb-6 w-full max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">Class Routine Management</h1>
          {/* Dropdown Menus in the top right */}
          <div className="flex gap-4">
            <select
              className="px-3 py-2 text-gray-800 rounded-md"
              value={year}
              onChange={handleYearChange}
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <select
              className="px-3 py-2 text-gray-800 rounded-md"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              {BRANCHES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <select
              className="px-3 py-2 text-gray-800 rounded-md"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              {filteredSemesters.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Title and auto-updating date/time below the navbar */}
      <div className="w-full max-w-6xl mb-6 text-center">
        <h2 className="text-xl font-bold text-gray-800">
          {year} | {branch} | {semester}
        </h2>
        <p className="text-gray-600">
          {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
        </p>
      </div>

      {/* Buttons below the title */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={fetchClassRoutine}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Fetch Class Routine
        </button>
        <button
          onClick={uploadRoutine}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Upload Routine
        </button>
        <button
          onClick={submitRoutine}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Submit Routine
        </button>
      </div>

      {/* Table with header: Time, Monday, Tuesday, Wednesday, Thursday, Friday */}
      <div className="overflow-x-auto w-full max-w-6xl">
        <table className="table-auto border-collapse border border-gray-600 shadow-lg rounded-lg w-full">
          <thead>
            <tr>
              <th className="border border-gray-600 p-4 bg-gray-700 text-white">Time</th>
              {days.map((day) => (
                <th key={day} className="border border-gray-600 p-4 bg-gray-700 text-white">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, timeIdx) => (
              <tr key={timeIdx}>
                <td className="border border-gray-600 p-4 text-gray-800">{time}</td>
                {days.map((_, dayIdx) => {
                  const cellData = routine[days[dayIdx]][timeIdx];
                  return (
                    <td
                      key={dayIdx}
                      className={`border border-gray-600 p-4 hover:bg-gray-100 transition-all duration-200 ${
                        cellData.status === "canceled" ? "bg-red-200" : ""
                      }`}
                    >
                      <div className="text-sm">
                        <p className="font-bold text-gray-800">
                          {cellData.subject || "No Class"}
                        </p>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {selectedClass && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-4/5 md:w-1/3">
            <h2 className="text-lg font-bold mb-4 text-white">Edit Class</h2>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Subject:
              <input
                type="text"
                value={selectedClass.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                className="block w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Students (comma-separated):
              <input
                type="text"
                value={selectedClass.students.join(", ")}
                onChange={(e) =>
                  handleChange(
                    "students",
                    e.target.value.split(",").map((s) => s.trim())
                  )
                }
                className="block w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
              />
            </label>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setSelectedClass(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveClass}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassRoutine;
 