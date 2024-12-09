import React, { useState } from 'react';

const AttendanceSheet = () => {
  // State to manage student rows
  const [students, setStudents] = useState([{ id: 1, name: '', present: false }]);

  // Function to add a new row
  const addStudentRow = () => {
    const newStudent = { id: students.length + 1, name: '', present: false };
    setStudents([...students, newStudent]);
  };

  // Function to handle input changes
  const handleInputChange = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = value;
    setStudents(updatedStudents);
  };

  return (
    <div className='items-center justify-center'>
    <div className="font-sans bg-orange-50 p-6 rounded-lg w-4/5 mx-auto  shadow-lg  m-auto">
      <h1 className="text-2xl font-bold text-center text-orange-800 mb-6">
        Class Attendance
      </h1>
      {/* Date Input */}
      <div className="mb-4 flex items-center">
        <label htmlFor="date" className="mr-4 font-medium">
          Date:
        </label>
        <input
          type="date"
          id="date"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>
      {/* Subject/Topic Input */}
      <div className="mb-6 flex items-center">
        <label htmlFor="subject" className="mr-4 font-medium">
          Subject/Topic:
        </label>
        <input
          type="text"
          id="subject"
          placeholder="Enter subject or topic"
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>
      {/* Attendance Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-orange-200 text-orange-900">
            <th className="border border-gray-300 px-4 py-2 text-left">No.</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Present
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} className="hover:bg-orange-100">
              <td className="border border-gray-300 px-4 py-2 text-center">
                {student.id}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  placeholder="Student Name"
                  value={student.name}
                  onChange={(e) =>
                    handleInputChange(index, 'name', e.target.value)
                  }
                  className="w-full border-none focus:outline-none"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={student.present}
                  onChange={(e) =>
                    handleInputChange(index, 'present', e.target.checked)
                  }
                  className="w-5 h-5"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add Student Button */}
      <button
        onClick={addStudentRow}
        className="mt-4 bg-orange-500 text-white font-medium py-2 px-4 rounded hover:bg-orange-600 transition"
      >
        Add Student
      </button>
    </div>
    </div>
  );
};

export default AttendanceSheet;
