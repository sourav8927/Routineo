import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [routines, setRoutines] = useState([]);
  const [attendance, setAttendance] = useState({});

  return (
    <div className="bg-secondary min-h-screen bg-[#edffff] relative">
      

      {/* Hero Section */}
      <motion.div
        className="relative m-5 bg-center h-[300px] flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/images/banner.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-[#04c5c4] p-6 rounded-lg text-white lg:h-[200px] lg:w-[600px] text-center items-center justify-center">
          <h2 className="text-4xl font-bold">Plan Your Week Ahead</h2>
          <p className="text-lg mt-2">Check your attendance and routine on the go!</p>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Routine Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-primary">Your Routine</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {routines.map((routine, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow-lg rounded-lg border border-gray-200"
              >
                <h4 className="text-lg font-semibold">{routine.day}</h4>
                <ul className="mt-2">
                  {routine.subjects.map((subject, idx) => (
                    <li key={idx} className="text-sm text-gray-700">
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Attendance Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10"
        >
          <h3 className="text-2xl font-bold text-primary">Attendance</h3>
          <div className="mt-4 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
            <p>
              <span className="font-semibold">Present: </span>
              {attendance.present || 0} days
            </p>
            <p>
              <span className="font-semibold">Total: </span>
              {attendance.total || 0} days
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white py-4">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} UIT College App</p>
        </div>
      </footer>
    </div>
  );
}
