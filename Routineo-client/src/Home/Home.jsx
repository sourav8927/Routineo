import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [routines, setRoutines] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [currentTime, setCurrentTime] = useState("");

  // Dummy data for today's schedule (replace with API or state logic)
  const todayClasses = [
    { time: "9:00 AM", subject: "Mathematics", teacher: "Mr. John" },
    { time: "11:00 AM", subject: "Physics", teacher: "Ms. Alice" },
    { time: "2:00 PM", subject: "Chemistry", teacher: "Dr. Smith" },
  ];

  // Update the timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(timeString);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-none min-h-screen relative">
      {/* Timer Section */}
      <motion.div
        className="relative pt-10 bg-center h-[300px] flex flex-col items-center justify-center text-center"
      >
        <motion.div
          className="bg-[#04c5c4] p-6 rounded-lg text-white w-full max-w-[90%] md:h-[250px] md:w-[800px] text-center flex flex-col items-center justify-center"
          style={{
            backgroundImage: "url('/images/herobackground.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-extrabold mb-4 text-center justify-center items-center pt-14"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {currentTime}
          </motion.h1>
          <h2 className="text-lg md:text-3xl font-bold" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Plan Your Week Ahead
          </h2>
          <p className="text-sm md:text-lg mt-2 pb-5" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Check your attendance and routine on the go!
          </p>
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Routine Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-primary">Today's Schedule</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {todayClasses.map((classItem, index) => (
              <motion.div
                key={index}
                className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg rounded-lg text-white flex flex-col items-start justify-between"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h4 className="text-lg md:text-xl font-bold mb-2">{classItem.subject}</h4>
                <p className="text-sm md:text-base font-medium">Time: {classItem.time}</p>
                <p className="text-sm md:text-base font-medium">Teacher: {classItem.teacher}</p>
              </motion.div>
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
          <h3 className="text-xl md:text-2xl font-bold text-primary">Attendance</h3>
          <div className="mt-4 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
            <p className="text-sm md:text-base">
              <span className="font-semibold">Present: </span>
              {attendance.present || 0} days
            </p>
            <p className="text-sm md:text-base">
              <span className="font-semibold">Total: </span>
              {attendance.total || 0} days
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      {/* <footer className="bg- text-white py-4">
        <div className="text-center">
          <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} UIT College App</p>
        </div>
      </footer> */}
    </div>
  );
}
