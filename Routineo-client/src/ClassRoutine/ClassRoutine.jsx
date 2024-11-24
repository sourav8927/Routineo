import React from "react";

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Class Schedule</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 bg-white shadow-lg rounded-lg">
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
                {days.map((_, dayIdx) => (
                  <td
                    key={dayIdx}
                    className="border border-gray-300 p-4 hover:bg-purple-100 transition-all duration-200"
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassRoutine;
