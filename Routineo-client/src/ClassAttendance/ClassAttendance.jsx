import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { FaUpload } from "react-icons/fa";
import { FaPrint } from "react-icons/fa";
import { AiFillFileText } from "react-icons/ai";

// Constants for AttendanceSheet
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const SEMESTERS = Array.from(
  { length: 8 },
  (_, i) => `${i + 1}${getSuffix(i + 1)} Semester`
);

// Helper functions for AttendanceSheet
function getSuffix(num) {
  if (num === 1) return "st";
  if (num === 2) return "nd";
  if (num === 3) return "rd";
  return "th";
}

function getRomanNumeral(num) {
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  return romanNumerals[num - 1];
}

// Given a semester string like "1st Semester", extract the numeric part and return its Roman numeral
function getRomanFromSemester(semesterStr) {
  const num = parseInt(semesterStr);
  return getRomanNumeral(num);
}

// FullRoutine Data from FullRoutine.jsx
const allClasses = {
  I: [
    {
      sl: 1,
      type: "Basic Science Course",
      code: "BSC-PH 102, 105",
      title: "Physics",
      hours: { lecture: 3, tutorial: 1, practical: 0 },
      credits: 4,
      marks: 100,
    },
    {
      sl: 1.1,
      type: "Basic Science Course",
      code: "BSC-PH 152, 155",
      title: "Physics Laboratory",
      hours: { lecture: 0, tutorial: 0, practical: 3 },
      credits: 1.5,
      marks: 100,
    },
    {
      sl: 2,
      type: "Basic Science Course",
      code: "BSC-M 101, 102 ",
      title: "Mathematics -I",
      hours: { lecture: 3, tutorial: 1, practical: 0 },
      credits: 4,
      marks: 100,
    },
    {
      sl: 3,
      type: "Engineering Science Courses",
      code: "ESC-EE 101",
      title: "Basic Electrical Engineering",
      hours: { lecture: 3, tutorial: 1, practical: 0 },
      credits: 4,
      marks: 100,
    },
    {
      sl: 3.1,
      type: "Engineering Science Courses",
      code: "ESC-EE 151",
      title: "Basic Electrical Engineering Laboratory",
      hours: { lecture: 0, tutorial: 0, practical: 2 },
      credits: 1,
      marks: 100,
    },
    {
      sl: 4,
      type: "Engineering Science Courses",
      code: "ESC-ME 102",
      title: "Engineering Graphics & Design ",
      hours: { lecture: 1, tutorial: 0, practical: 0 },
      credits: 1,
      marks: 100,
    },
    {
      sl: 4.1,
      type: "Engineering Science Courses",
      code: "ESC-ME 152",
      title: "Engineering Graphics & Design Laboratory ",
      hours: { lecture: 0, tutorial: 0, practical: 4 },
      credits: 2,
      marks: 100,
    },
  ],
  II: [
    {
      sl: 1,
      type: "Basic Science Courses",
      code: "BSC-CH 202",
      title: "Chemistry-I",
      hours: { lecture: 3, tutorial: 1, practical: 0 },
      credits: 4,
      marks: 100,
    },
    {
      sl: 1.1,
      type: "Basic Science Courses",
      code: "BSC-CH 252",
      title: "Chemistry-I Laboratory",
      hours: { lecture: 0, tutorial: 0, practical: 3 },
      credits: 1.5,
      marks: 100,
    },
    {
      sl: 2,
      type: "Basic Science Courses",
      code: "BSC-M 201,202",
      title: "Mathematics -II",
      hours: { lecture: 3, tutorial: 1, practical: 0 },
      credits: 4,
      marks: 100,
    },
    {
      sl: 3,
      type: "Engineering Science Courses",
      code: "ESC-CSE 201",
      title: "Programming for Problem Solving ",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 3.1,
      type: "Engineering Science Courses",
      code: "ESC-CSE 251",
      title: "Programming for Problem Solving Laboratory",
      hours: { lecture: 0, tutorial: 0, practical: 4 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 4,
      type: "Engineering Science Courses",
      code: "ESC-ME 201",
      title: "Workshop/Manufacturing Theory",
      hours: { lecture: 1, tutorial: 0, practical: 0 },
      credits: 1,
      marks: 100,
    },
    {
      sl: 4.1,
      type: "Engineering Science Courses",
      code: "ESC-ME 251",
      title: "Workshop/Manufacturing Practices",
      hours: { lecture: 0, tutorial: 0, practical: 4 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 5,
      type: "Humanities and Social Sciences including Management courses",
      code: "HSM-HU 201",
      title: "English",
      hours: { lecture: 2, tutorial: 0, practical: 0 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 6,
      type: "Humanities and Social Sciences including Management courses",
      code: "HSM-HU 251",
      title: "Language Laboratory",
      hours: { lecture: 0, tutorial: 0, practical: 2 },
      credits: 1,
      marks: 100,
    },
  ],
  III: [
    {
      sl: 1,
      type: "Engineering Science Course",
      code: "ESC-EC 301 ",
      title: "Analog Electronic Circuits",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 1.1,
      type: "Engineering Science Course",
      code: "ESC-EC 351",
      title: "Analog Electronic Circuits Laboratory",
      hours: { lecture: 0, tutorial: 0, practical: 4 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 2,
      type: "Professional Core Course",
      code: "PCC-IT 301",
      title: "Data structure & Algorithms",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 2.3,
      type: "Professional Core Course",
      code: "PCC-IT 351",
      title: "Data structure & Algorithms Laboratory ",
      hours: { lecture: 0, tutorial: 0, practical: 4 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 3,
      type: "Engineering Science Course",
      code: "ESC-CSE 302",
      title: "Digital Logic",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 3.1,
      type: "Engineering Science Course",
      code: "ESC-CSE 352",
      title: "Digital Logic Laboratory",
      hours: { lecture: 0, tutorial: 0, practical: 4 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 4,
      type: "Professional Core Course",
      code: "PCC-IT 302",
      title: "IT Workshop (Sci Lab/MATLAB) Theory",
      hours: { lecture: 1, tutorial: 0, practical: 0 },
      credits: 1,
      marks: 100,
    },
    {
      sl: 4.1,
      type: "Professional Core Course",
      code: "PCC-IT 352",
      title: "IT Workshop (Sci Lab/MATLAB) Laboratory",
      hours: { lecture: 0, tutorial: 0, practical: 4 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 5,
      type: "Basic Science Course",
      code: "BSC-M 302",
      title: "Differential Calculus",
      hours: { lecture: 2, tutorial: 0, practical: 0 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 6,
      type: "Basic Science Course",
      code: "BSC-BS 301",
      title: "Engineering Biology",
      hours: { lecture: 2, tutorial: 1, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 7,
      type: "Humanities and Social Sciences including Management courses ",
      code: "HSM-HU 381",
      title: "Linguistics & Oral Communication",
      hours: { lecture: 0, tutorial: 0, practical: 2 },
      credits: 0,
      marks: 100,
    },
  ],
  IV: [
    {
      sl: 1,
      type: "Professional Core Course",
      code: "PCC-IT 401",
      title: "Discrete Mathematics",
      hours: { lecture: 3, tutorial: 1, practical: 0 },
      credits: 4,
      marks: 100,
    },
    {
      sl: 2,
      type: "Professional Core Course",
      code: "PCC-IT 402",
      title: "Computer Organization & Architecture",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 2.1,
      type: "Professional Core Course",
      code: "PCC-IT 452",
      title: "Computer Organization & Architecture Laboratory ",
      hours: { lecture: 0, tutorial: 0, practical: 4 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 3,
      type: "Professional Core Course",
      code: "PCC-IT 403",
      title: "Operating Systems",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 3.1,
      type: "Professional Core Course",
      code: "PCC-IT 453",
      title: "Operating Systems Laboratory",
      hours: { lecture: 0, tutorial: 0, practical: 4 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 4,
      type: "Professional Core Course",
      code: "PCC-IT 404",
      title: "Design & Analysis of Algorithms ",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 4.1,
      type: "Professional Core Course",
      code: "PCC-IT 454",
      title: "Design & Analysis of Algorithms Laboratory",
      hours: { lecture: 0, tutorial: 0, practical: 4 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 5,
      type: "Humanities & Social Sciences including Management Courses ",
      code: "HSM-HU 401",
      title: "Economics & Accountancy ",
      hours: { lecture: 2, tutorial: 2, practical: 0 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 6,
      type: "Humanities & Social Sciences including Management Courses",
      code: "HSM-HU 481",
      title: "Business Communication ",
      hours: { lecture: 0, tutorial: 0, practical: 2 },
      credits: 0,
      marks: 100,
    },
    {
      sl: 7,
      type: "Mandatory Course ",
      code: "MC-HU 402",
      title: "Environmental Science",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 0,
      marks: 100,
    },
  ],
  V: [
    {
      sl: 1,
      type: "Engineering Science",
      code: "ESC-EC 501",
      title: "Signals & Systems",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 2,
      type: "Professional Core Course",
      code: "PCC-IT 501",
      title: "Database Management Systems",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 2.1,
      type: "Professional Core Course",
      code: "PCC-IT 551",
      title: "Database Management Systems Laboratory",
      hours: { lecture: 0, tutorial: 0, practical: 4 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 3,
      type: "Professional Core Course",
      code: "PCC-IT 502",
      title: "Formal Language & Automata Theory",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 4,
      type: "Professional Core Course",
      code: "PCC-IT 503",
      title: "Object Oriented Programming",
      hours: { lecture: 2, tutorial: 0, practical: 0 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 4.1,
      type: "Professional Core Course",
      code: "PCC-IT 553",
      title: "Object Oriented Programming Laboratory",
      hours: { lecture: 0, tutorial: 0, practical: 4 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 5,
      type: "Professional Core Course",
      code: "PEC-IT I",
      title: "Professional Elective –I",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 6,
      type: "Mandatory Course",
      code: "MC-HU 501",
      title: "Constitution of India",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 0,
      marks: 100,
    },
    {
      sl: 7,
      type: "Humanities and Social Sciences including Management courses ",
      code: "HSM-HU 581",
      title: "Grooming & Personality Development",
      hours: { lecture: 0, tutorial: 0, practical: 2 },
      credits: 1,
      marks: 100,
    },
  ],
  VI: [
    {
      sl: 1,
      type: "Professional Core Course",
      code: "PCC-IT 601",
      title: "Software Engineering",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 1.2,
      type: "Professional Core Course",
      code: "PCC-IT 651",
      title: "Software Engineering Laboratory",
      hours: { lecture: 0, tutorial: 0, practical: 4 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 2,
      type: "Professional Core Course",
      code: "PCC-IT 602",
      title: "Computer Networks",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 2.1,
      type: "Professional Core Course",
      code: "PCC-IT 652",
      title: "Computer Networks Laboratory",
      hours: { lecture: 0, tutorial: 0, practical: 4 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 3,
      type: "Professional Core Course",
      code: "PCC-IT 653",
      title: "Programming with Python",
      hours: { lecture: 0, tutorial: 0, practical: 4 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 4,
      type: "Professional Core Course",
      code: "PEC-IT II",
      title: "Professional Elective -II",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 5,
      type: "Professional Core Course",
      code: "PEC-IT III",
      title: "Professional Elective -III",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 6,
      type: "Open  Elective Course",
      code: "OEC-X 621",
      title: "Open Elective-I",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 7,
      type: "Humanities and Social Sciences including Management courses",
      code: "HSM-HU 681",
      title: "Group Discussion & Personal Interview",
      hours: { lecture: 0, tutorial: 0, practical: 2 },
      credits: 1,
      marks: 100,
    },
    {
      sl: 8,
      type: "Project",
      code: "PROJ-IT 691",
      title: "Project – I",
      hours: { lecture: 0, tutorial: 0, practical: 6 },
      credits: 3,
      marks: 100,
    },
  ],
  VII: [
    {
      sl: 1,
      type: "Professional Elective Course",
      code: "PEC-IT IV",
      title: "Professional Elective –IV",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 2,
      type: "Professional Elective Course ",
      code: "PEC-IT V",
      title: "Professional Elective –V ",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 3,
      type: "Open Elective Course",
      code: "OEC-X 721",
      title: "Open Elective-II",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 4,
      type: "Humanities & Social Sciences Including Management Courses ",
      code: "HSM-HU 702",
      title: "Values and Ethics",
      hours: { lecture: 2, tutorial: 0, practical: 0 },
      credits: 2,
      marks: 100,
    },
    {
      sl: 5,
      type: " Project",
      code: "PROJ-IT 791",
      title: "Project-II",
      hours: { lecture: 0, tutorial: 0, practical: 12 },
      credits: 6,
      marks: 100,
    },
    {
      sl: 6,
      type: " Project",
      code: "PROJ-INT 791",
      title: "INTERNSHIP",
      hours: { lecture: 0, tutorial: 0, practical: 4 },
      credits: 2,
      marks: 100,
    },
  ],
  VIII: [
    {
      sl: 1,
      type: "Professional Elective Course",
      code: "PEC-IT VI",
      title: "Professional Elective –VI",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 2,
      type: "Professional Elective –VI",
      code: "OEC-X  821",
      title: "Open Elective-III",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 3,
      type: "Professional Elective –VI",
      code: "OEC-X  822 ",
      title: "Open Elective-IV",
      hours: { lecture: 3, tutorial: 0, practical: 0 },
      credits: 3,
      marks: 100,
    },
    {
      sl: 4,
      type: "Project",
      code: "PROJ-IT 891",
      title: "Project-III",
      hours: { lecture: 0, tutorial: 0, practical: 12 },
      credits: 6,
      marks: 100,
    },
  ],
};

function ClassAttendance() {
  // State management
  const [students, setStudents] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("1st Year");
  const [branch, setBranch] = useState("CSE");
  // Set initial semester based on first year (first two semesters)
  const [semester, setSemester] = useState("1st Semester");
  const [isLoading, setIsLoading] = useState(false);
  const [currentDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [availableSubjects, setAvailableSubjects] = useState([]);

  // Compute filtered semesters based on selected year
  const yearIndex = YEARS.indexOf(year);
  const filteredSemesters = SEMESTERS.slice(yearIndex * 2, yearIndex * 2 + 2);

  // When year changes, update semester to the first option in the filtered list.
  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    const newYearIndex = YEARS.indexOf(selectedYear);
    const newSemester = SEMESTERS.slice(newYearIndex * 2, newYearIndex * 2 + 2)[0];
    setSemester(newSemester);
  };

  // Update availableSubjects whenever semester changes
  useEffect(() => {
    const roman = getRomanFromSemester(semester);
    // Update availableSubjects with the courses from the selected semester
    setAvailableSubjects(allClasses[roman] || []);
    // Optionally reset the selected subject if needed:
    setSubject("");
  }, [semester]);

  // Fetch students from database
  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/students?branch=${branch}&year=${year}&semester=${semester}`
      );
      if (!response.ok) throw new Error("Failed to fetch students");

      const data = await response.json();
      setStudents(
        data.students.map((student) => ({
          ...student,
          isPresent: false,
        }))
      );
    } catch (error) {
      setMessage("Error fetching students data");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle attendance toggle
  const toggleAttendance = (rollNo) => {
    setStudents(
      students.map((student) =>
        student.rollNo === rollNo
          ? { ...student, isPresent: !student.isPresent }
          : student
      )
    );
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("date", currentDate);
      formData.append("subject", subject);
      formData.append("year", year);
      formData.append("branch", branch);
      formData.append("semester", semester);

      const response = await fetch("/api/attendance/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      setMessage("Data uploaded successfully!");
      setFile(null);
    } catch (error) {
      setMessage("Failed to upload data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle printing
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 print:bg-white print:py-0">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-xl print:shadow-none">
        {/* Header */}
        <div className="bg-green-600 text-white p-4 rounded-lg mb-6 print:bg-white print:text-black print:border print:border-green-600">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold">Class Attendance</h1>
            <div className="flex flex-wrap gap-3">
              <select
                className="px-3 py-2 text-gray-700 bg-white rounded-md"
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
                className="px-3 py-2 text-gray-700 bg-white rounded-md"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                {["CSE", "ECE", "ME", "EE", "IT"].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <select
                className="px-3 py-2 text-gray-700 bg-white rounded-md"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                {filteredSemesters.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <select
                className="px-3 py-2 text-gray-700 bg-white rounded-md"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                {availableSubjects.map((sub) => (
                  <option key={sub.code} value={sub.code}>
                    {sub.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Printable Content */}
        <div id="printable-content" className="mt-6">
          <h2 className="text-xl font-bold text-center">
            {year} {branch} {semester} Class Attendance
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Date: {format(new Date(currentDate), "MMMM dd, yyyy")}
          </p>
        </div>

        {/* Message display */}
        {message && (
          <div
            className={`p-4 mb-6 rounded-lg ${
              message.includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Attendance Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-100">
                <th className="border px-4 py-2 text-left">
                  Registration No.
                </th>
                <th className="border px-4 py-2 text-left">Roll No.</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-center">Present</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="border px-4 py-8 text-center text-gray-500"
                  >
                    {isLoading
                      ? "Loading students..."
                      : 'No students to display. Select filters and click "Fetch Students" to load data.'}
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.rollNo} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">
                      {student.registrationNo}
                    </td>
                    <td className="border px-4 py-2">{student.rollNo}</td>
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={student.isPresent}
                        onChange={() => toggleAttendance(student.rollNo)}
                        className="h-5 w-5 text-green-600 rounded"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 print:hidden">
          <button
            onClick={fetchStudents}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            disabled={isLoading}
          >
            <AiFillFileText size={20} />
            {isLoading ? "Loading..." : "Fetch Students"}
          </button>
          <div className="relative">
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <FaUpload size={20} />
              Upload List
            </button>
          </div>
          <button
            onClick={handleFileUpload}
            disabled={isLoading || !file}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          >
            <AiFillFileText size={20} />
            Submit
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <FaPrint size={20} />
            Print
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClassAttendance;
