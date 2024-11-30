import { motion } from "framer-motion";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function StudentNavbar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleMenuClick = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-primary text-white py-4 bg-[#017f7e]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          {/* Sidebar Toggle */}
          <div className="flex items-center gap-4">
            <IoMenu
              className="text-4xl cursor-pointer"
              onClick={handleMenuClick}
            />
            <h1 className="text-3xl font-bold">Student Panel</h1>
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
            <ul className="py-4">
              <Link to="/help">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Help
                </li>
              </Link>
            </ul>
          </motion.div>
        </div>
      )}
    </>
  );
}
