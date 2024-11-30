import React, { useState } from "react";

const ClassRoutine = () => {
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

  // State to manage classes
  const [routine, setRoutine] = useState(
    days.reduce((acc, day) => {
      acc[day] = times.map(() => ({ subject: "", students: [], status: "active" }));
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
    updatedRoutine[days[dayIdx]][timeIdx] = { subject, students, status: "active" };
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Class Routine Management</h1>
      <div className="overflow-x-auto w-full">
        <table className="table-auto border-collapse border border-gray-300 bg-white shadow-lg rounded-lg w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-4 bg-gray-200 text-gray-800">Time</th>
              {days.map((day) => (
                <th
                  key={day}
                  className="border border-gray-300 p-4 bg-gradient-to-r from-orange-200 via-pink-200 to-purple-200 text-gray-800"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, timeIdx) => (
              <tr key={timeIdx}>
                <td className="border border-gray-300 p-4 text-gray-700">{time}</td>
                {days.map((_, dayIdx) => {
                  const classData = routine[days[dayIdx]][timeIdx];
                  return (
                    <td
                      key={dayIdx}
                      className={`border border-gray-300 p-4 hover:bg-purple-100 transition-all duration-200 ${
                        classData.status === "canceled" ? "bg-red-200" : ""
                      }`}
                    >
                      <div className="text-sm">
                        <p className="font-bold text-gray-700">
                          {classData.subject || "No Class"}
                        </p>
                        <p className="text-gray-600">{classData.students.length} Students</p>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button
                          className="text-blue-600 underline text-sm"
                          onClick={() => handleEditClass(dayIdx, timeIdx)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 underline text-sm"
                          onClick={() => handleCancelClass(dayIdx, timeIdx)}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedClass && (
        <div className="fixed top-0 left-0 w-full h-full  flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 md:w-1/3">
            <h2 className="text-lg font-bold mb-4">Edit Class</h2>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Subject:
              <input
                type="text"
                value={selectedClass.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Students (comma-separated):
              <input
                type="text"
                value={selectedClass.students.join(", ")}
                onChange={(e) =>
                  handleChange("students", e.target.value.split(",").map((s) => s.trim()))
                }
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setSelectedClass(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
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
