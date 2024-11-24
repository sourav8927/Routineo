import React, { useState } from "react";

const FullRoutine = () => {
  // Static class routine data across semesters
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
        sl: 2,
        type: "Basic Science Course",
        code: "BSC-PH 152, 155",
        title: "Physics Laboratory",
        hours: { lecture: 0, tutorial: 0, practical: 3 },
        credits: 1.5,
        marks: 100,
      },
      {
        sl: 3,
        type: "Basic Science Course",
        code: "BSC-M 101, 102 ",
        title: "Mathematics -I",
        hours: { lecture: 3, tutorial: 1, practical: 0 },
        credits: 4,
        marks: 100,
      },
      {
        sl: 4,
        type: "Engineering Science Courses",
        code: "ESC-EE 101",
        title: "Basic Electrical Engineering",
        hours: { lecture: 3, tutorial: 1, practical: 0 },
        credits: 4,
        marks: 100,
      },
      {
        sl: 5,
        type: "Engineering Science Courses",
        code: "ESC-EE 151",
        title: "Basic Electrical Engineering Laboratory",
        hours: { lecture: 0, tutorial: 0, practical: 2 },
        credits: 1,
        marks: 100,
      },
      {
        sl: 6,
        type: "Engineering Science Courses",
        code: "ESC-ME 102",
        title: "Engineering Graphics & Design ",
        hours: { lecture: 1, tutorial: 0, practical: 0 },
        credits: 1,
        marks: 100,
      },
      {
        sl: 7,
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
        sl: 2,
        type: "Basic Science Courses",
        code: "BSC-CH 252",
        title: "Chemistry-I Laboratory",
        hours: { lecture: 0, tutorial: 0, practical: 3 },
        credits: 1.5,
        marks: 100,
      },
      {
        sl: 3,
        type: "Basic Science Courses",
        code: "BSC-M 201,202",
        title: "Mathematics -II",
        hours: { lecture: 3, tutorial: 1, practical: 0 },
        credits: 4,
        marks: 100,
      },
      {
        sl: 4,
        type: "Engineering Science Courses",
        code: "ESC-CSE 201",
        title: "Programming for Problem Solving ",
        hours: { lecture: 3, tutorial: 0, practical: 0 },
        credits: 3,
        marks: 100,
      },
      {
        sl: 5,
        type: "Engineering Science Courses",
        code: "ESC-CSE 251",
        title: "Programming for Problem Solving Laboratory",
        hours: { lecture: 0, tutorial: 0, practical: 4 },
        credits: 2,
        marks: 100,
      },
      {
        sl: 6,
        type: "Engineering Science Courses",
        code: "ESC-ME 201",
        title: "Workshop/Manufacturing Theory",
        hours: { lecture: 1, tutorial: 0, practical: 0 },
        credits: 1,
        marks: 100,
      },
      {
        sl: 7,
        type: "Engineering Science Courses",
        code: "ESC-ME 251",
        title: "Workshop/Manufacturing Practices",
        hours: { lecture: 0, tutorial: 0, practical: 4 },
        credits: 2,
        marks: 100,
      },
      {
        sl: 8,
        type: "Humanities and Social Sciences including Management courses",
        code: "HSM-HU 201",
        title: "English",
        hours: { lecture: 2, tutorial: 0, practical: 0 },
        credits: 2,
        marks: 100,
      },
      {
        sl: 9,
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
            sl: 2,
            type: "Engineering Science Course",
            code: "ESC-EC 351",
            title: "Analog Electronic Circuits Laboratory",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 3,
            type: "Professional Core Course",
            code: "PCC-IT 301",
            title: "Data structure & Algorithms",
            hours: { lecture: 3, tutorial: 0, practical: 0 },
            credits: 3,
            marks: 100,
          },
          {
            sl: 4,
            type: "Professional Core Course",
            code: "PCC-IT 351",
            title: "Data structure & Algorithms Laboratory ",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 5,
            type: "Engineering Science Course",
            code: "ESC-CSE 302",
            title: "Digital Logic",
            hours: { lecture: 3, tutorial: 0, practical: 0 },
            credits: 3,
            marks: 100,
          },
          {
            sl: 6,
            type: "Engineering Science Course",
            code: "ESC-CSE 352",
            title: "Digital Logic Laboratory",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 7,
            type: "Professional Core Course",
            code: "PCC-IT 302",
            title: "IT Workshop (Sci Lab/MATLAB) Theory",
            hours: { lecture: 1, tutorial: 0, practical: 0 },
            credits: 1,
            marks: 100,
          },
          {
            sl: 8,
            type: "Professional Core Course",
            code: "PCC-IT 352",
            title: "IT Workshop (Sci Lab/MATLAB) Laboratory",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 9,
            type: "Basic Science Course",
            code: "BSC-M 302",
            title: "Differential Calculus",
            hours: { lecture: 2, tutorial: 0, practical: 0 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 10,
            type: "Basic Science Course",
            code: "BSC-BS 301",
            title: "Engineering Biology",
            hours: { lecture: 2, tutorial: 1, practical: 0 },
            credits: 3,
            marks: 100,
          },
          {
            sl: 11  ,
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
            sl: 3,
            type: "Professional Core Course",
            code: "PCC-IT 452",
            title: "Computer Organization & Architecture Laboratory ",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 4,
            type: "Professional Core Course",
            code: "PCC-IT 403",
            title: "Operating Systems",
            hours: { lecture: 3, tutorial: 0, practical: 0 },
            credits: 3,
            marks: 100,
          },
          {
            sl: 5,
            type: "Professional Core Course",
            code: "PCC-IT 453",
            title: "Operating Systems Laboratory",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 6,
            type: "Professional Core Course",
            code: "PCC-IT 404",
            title: "Design & Analysis of Algorithms ",
            hours: { lecture: 3, tutorial: 0, practical: 0 },
            credits: 3,
            marks: 100,
          },
          {
            sl: 7,
            type: "Professional Core Course",
            code: "PCC-IT 454",
            title: "Design & Analysis of Algorithms Laboratory",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 8,
            type: "Humanities & Social Sciences including Management Courses ",
            code: "HSM-HU 401",
            title: "Economics & Accountancy ",
            hours: { lecture: 2, tutorial: 2, practical: 0 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 9,
            type: "Humanities & Social Sciences including Management Courses",
            code: "HSM-HU 481",
            title: "Business Communication ",
            hours: { lecture: 0, tutorial: 0, practical: 2 },
            credits: 0,
            marks: 100,
          },
          {
            sl: 10,
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
            sl: 3,
            type: "Professional Core Course",
            code: "PCC-IT 551",
            title: "Database Management Systems Laboratory",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 4,
            type: "Professional Core Course",
            code: "PCC-IT 502",
            title: "Formal Language & Automata Theory",
            hours: { lecture: 3, tutorial: 0, practical: 0 },
            credits: 3,
            marks: 100,
          },
          {
            sl: 5,
            type: "Professional Core Course",
            code: "PCC-IT 503",
            title: "Object Oriented Programming",
            hours: { lecture: 2, tutorial: 0, practical: 0 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 6,
            type: "Professional Core Course",
            code: "PCC-IT 553",
            title: "Object Oriented Programming Laboratory",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 7,
            type: "Professional Core Course",
            code: "PEC-IT I",
            title: "Professional Elective –I",
            hours: { lecture: 3, tutorial: 0, practical: 0 },
            credits: 3,
            marks: 100,
          },
          {
            sl: 8,
            type: "Mandatory Course",
            code: "MC-HU 501",
            title: "Constitution of India",
            hours: { lecture: 3, tutorial: 0, practical: 0 },
            credits: 0,
            marks: 100,
          },
          {
            sl: 9,
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
            sl: 2,
            type: "Professional Core Course",
            code: "PCC-IT 651",
            title: "Software Engineering Laboratory",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 3,
            type: "Professional Core Course",
            code: "PCC-IT 602",
            title: "Computer Networks",
            hours: { lecture: 3, tutorial: 0, practical: 0 },
            credits: 3,
            marks: 100,
          },
          {
            sl: 4,
            type: "Professional Core Course",
            code: "PCC-IT 652",
            title: "Computer Networks Laboratory",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 5,
            type: "Professional Core Course",
            code: "PCC-IT 653",
            title: "Programming with Python",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 6,
            type: "Professional Core Course",
            code: "PEC-IT II",
            title: "",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 7,
            type: "Professional Core Course",
            code: "",
            title: "",
            hours: { lecture: 1, tutorial: 0, practical: 0 },
            credits: 1,
            marks: 100,
          },
          {
            sl: 8,
            type: "",
            code: "",
            title: "",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 9,
            type: "",
            code: "",
            title: "",
            hours: { lecture: 2, tutorial: 0, practical: 0 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 10,
            type: "",
            code: "",
            title: "",
            hours: { lecture: 2, tutorial: 1, practical: 0 },
            credits: 3,
            marks: 100,
          },
    ],

    VII: [
        {
            sl: 1,
            type: "",
            code: "",
            title: "",
            hours: { lecture: 3, tutorial: 0, practical: 0 },
            credits: 3,
            marks: 100,
          },
          {
            sl: 2,
            type: "",
            code: "",
            title: "",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 3,
            type: "",
            code: "",
            title: "",
            hours: { lecture: 3, tutorial: 0, practical: 0 },
            credits: 3,
            marks: 100,
          },
          {
            sl: 4,
            type: "",
            code: "",
            title: "",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 5,
            type: "",
            code: "",
            title: "",
            hours: { lecture: 3, tutorial: 0, practical: 0 },
            credits: 3,
            marks: 100,
          },
          {
            sl: 6,
            type: "",
            code: "",
            title: "",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
    ],

    VIII: [
        {
            sl: 1,
            type: "",
            code: "",
            title: "",
            hours: { lecture: 3, tutorial: 0, practical: 0 },
            credits: 3,
            marks: 100,
          },
          {
            sl: 2,
            type: "",
            code: "",
            title: "",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
          {
            sl: 3,
            type: "",
            code: "",
            title: "",
            hours: { lecture: 3, tutorial: 0, practical: 0 },
            credits: 3,
            marks: 100,
          },
          {
            sl: 4,
            type: "",
            code: "",
            title: "",
            hours: { lecture: 0, tutorial: 0, practical: 4 },
            credits: 2,
            marks: 100,
          },
    ],
  };

  const [selectedSemester, setSelectedSemester] = useState("V"); // Default semester

  const handleSearchChange = (e) => {
    setSelectedSemester(e.target.value); // Update the selected semester
  };

  const classes = allClasses[selectedSemester] || []; // Display classes for selected semester

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">
        SEMESTER SYLLABUS
      </h1>
      <h2 className="text-xl text-center text-gray-700 mb-6">
        Semester: {selectedSemester}
      </h2>

      {/* Animated Search Bar */}
      <div className="flex justify-center mb-6">
        <select
          value={selectedSemester}
          onChange={handleSearchChange}
          className="border-2 border-blue-600 rounded-md px-4 py-2 text-blue-600 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow-md"
        >
          {Object.keys(allClasses).map((semester, index) => (
            <option key={index} value={semester}>
              Semester {semester}
            </option>
          ))}
        </select>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2 text-left">Sl. No</th>
              <th className="border border-gray-300 p-2 text-left">
                Type of Course
              </th>
              <th className="border border-gray-300 p-2 text-left">Code</th>
              <th className="border border-gray-300 p-2 text-left">
                Course Title
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Hours Per Week (L-T-P)
              </th>
              <th className="border border-gray-300 p-2 text-left">Credits</th>
              <th className="border border-gray-300 p-2 text-left">Marks</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem, index) => (
              <tr
                key={index}
                className={`hover:bg-blue-50 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="border border-gray-300 p-2">{classItem.sl}</td>
                <td className="border border-gray-300 p-2">{classItem.type}</td>
                <td className="border border-gray-300 p-2">{classItem.code}</td>
                <td className="border border-gray-300 p-2">{classItem.title}</td>
                <td className="border border-gray-300 p-2">
                  {classItem.hours.lecture}-{classItem.hours.tutorial}-
                  {classItem.hours.practical}
                </td>
                <td className="border border-gray-300 p-2">
                  {classItem.credits}
                </td>
                <td className="border border-gray-300 p-2">
                  {classItem.marks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          <strong>Total Semesters:</strong> {Object.keys(allClasses).length}
        </p>
        <p className="text-gray-600">
          Select a semester to view its routine.
        </p>
      </div>
    </div>
  );
};

export default FullRoutine;
