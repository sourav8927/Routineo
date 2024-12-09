import React from "react";

const Help = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Help & Support</h1>
        <p className="text-gray-600 text-center mb-6">
          Need assistance? We're here to help!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* FAQ Section */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-lg font-semibold text-gray-800">FAQs</h2>
            <p className="text-gray-600 mt-2">Find answers to common questions.</p>
            <button className="mt-4 text-blue-600 hover:underline">
              Explore FAQs
            </button>
          </div>
          {/* Support Contact */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-lg font-semibold text-gray-800">Contact Support</h2>
            <p className="text-gray-600 mt-2">Need personalized help? Contact us!</p>
            <p className="text-gray-600 mt-1">Email: support@example.com</p>
            <p className="text-gray-600">Phone: +91 98765 43210</p>
          </div>
          {/* Resources */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-lg font-semibold text-gray-800">Resources</h2>
            <p className="text-gray-600 mt-2">
              Access helpful guides and documentation.
            </p>
            <button className="mt-4 text-blue-600 hover:underline">
              View Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
