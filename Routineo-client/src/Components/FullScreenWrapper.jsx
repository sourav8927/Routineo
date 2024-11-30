import React, { useEffect } from "react";

const FullScreenWrapper = ({ children }) => {
  useEffect(() => {
    const elem = document.documentElement; // Target the root HTML element
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-100">
      {children}
    </div>
  );
};

export default FullScreenWrapper;
