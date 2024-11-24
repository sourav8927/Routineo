import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const { data } = await axios.get('http://localhost:5000/api/schedule');
      setSchedule(data);
    };
    fetchSchedule();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-6">Class Schedule</h1>
      <div className="grid gap-4 md:grid-cols-5 grid-cols-1">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
          <div
            key={day}
            className="bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-xl font-semibold text-center">{day}</h2>
            <div className="mt-4">
              {schedule
                .find((item) => item.day === day)?.timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="p-2 bg-blue-100 rounded-md mb-2 shadow-md"
                  >
                    <p>{slot.time}</p>
                    <p className="text-gray-700 text-sm">{slot.subject || 'No Class'}</p>
                  </div>
                )) || (
                <p className="text-gray-500 text-center">No Data Available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
