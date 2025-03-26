import { motion } from "framer-motion";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../store/Auth";


export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [regDropdown, setRegDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const {isLoggedIn}=useAuth();
  let isStudent=false;
  const handleLoginClick = () => {
    if(!regDropdown){
      setShowDropdown(!showDropdown);
    }
  };
  const handleRegistrationClick = () => {
    if(!showDropdown){
      setRegDropdown(!regDropdown);
    }
  };

  const handleMenuClick = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
    
      {/* Header */}
      <header className=" text-white py-4 bg-[#00626d]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          {/* Sidebar Toggle */}
          <div className="flex items-center gap-4">
            <IoMenu
              className="text-4xl cursor-pointer"
              onClick={handleMenuClick}
            />
            <h1 className="text-3xl font-bold">Routineo</h1>
          </div>
          <div className="flex">

          {isLoggedIn ? <li><Link to="/logout">Logout</Link></li>:
          <>
          
          {/* Login Button with Dropdown */}
          <div className="relative">
            <button
              className="bg-accent py-2 px-4 rounded-lg"
              onClick={handleLoginClick}
            >
              Login
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-10">
                <ul className="py-2 text-center">
                 <Link  to="/studentlogin"> <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#04c5c4]">
                    Student
                  </li></Link>
                  <Link  to="/teacherlogin" ><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#04c5c4]">
                    Teacher
                  </li></Link>
                  <Link  to="/crlogin" ><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#04c5c4]">
                    CR
                  </li></Link>
                </ul>
              </div>
            )}
          </div>
          {/* Registration Button with Dropdown */}
          <div className="relative">
            <button
              className="bg-accent py-2 px-4 rounded-lg bg-green-700 "
              onClick={handleRegistrationClick}
            >
              Registration
            </button>
            {regDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-10">
                <ul className="py-2 text-center">
                 <Link  to="/studentregistration"> <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#04c5c4]">
                    Student
                  </li></Link>
                  <Link  to="/teacherregistration" ><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#04c5c4]">
                    Teacher
                  </li></Link>
                  <Link  to="/crregistration" ><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#04c5c4]">
                    CR
                  </li></Link>
                </ul>
              </div>
            )}
          </div>
          </>
          }
          </div>
        </div>
      </header>

      {/* Sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20">
          <motion.div
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center px-4 py-4 border-b">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                className="text-xl font-bold"
                onClick={handleMenuClick}
              >
                ×
              </button>
            </div>
            {isStudent? 
              <ul className="py-4">
              <Link to="/"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Home</li></Link>
              <Link to="/attendanesheet"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Attended classes</li></Link>
              <Link to="/fullroutine"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Semester Syllabus</li></Link>
              <Link to="/classroutine"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Class routine</li></Link>
              <Link to="/newroutine"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"></li></Link>
              <Link to="/facultymembers"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Faculty Members</li></Link>
              <Link to="/aboutus"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">About us</li></Link>
              <Link to="/contact"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Contact</li></Link>
              <Link to="/help"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Help</li></Link>
            </ul>:
            <ul className="py-4">
              <Link to="/"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Home</li></Link>
              <Link to="/uploadstudents"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Upload students</li></Link>
              <Link to="/classattendance"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Attendance Sheet</li></Link>
              <Link to="/fullroutine"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Semester Syllabus</li></Link>
              <Link to="/classroutine"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Class routine</li></Link>
              <Link to="/newroutine"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">New routine</li></Link>
              <Link to="/facultymembers"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Faculty Members</li></Link>
              <Link to="/aboutus"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">About us</li></Link>
              <Link to="/contact"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Contact</li></Link>
              <Link to="/help"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Help</li></Link>
            </ul>
            }
            
          </motion.div>
        </div>
      )}
    </>
  );
}
