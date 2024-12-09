import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Contact Information</h1>
        <p className="text-gray-600 text-center mb-6">
          Reach out to us! We’d love to hear from you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Contact 1 */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-lg font-semibold text-gray-800">Sourav Karmakar</h2>
            <p className="text-gray-600 mt-2">Email: person1@example.com</p>
            <p className="text-gray-600">Phone: +91 12345 67890</p>
            <p className="text-gray-600 mt-1">Role: Project Manager, Designer, Developer, Frontend</p>
          </div>
          {/* Contact 2 */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-lg font-semibold text-gray-800">Suraia Midda</h2>
            <p className="text-gray-600 mt-2">Email: person2@example.com</p>
            <p className="text-gray-600">Phone: +91 98765 43210</p>
            <p className="text-gray-600 mt-1">Role: Developer, Frontend</p>
          </div>
          {/* Contact 3 */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-lg font-semibold text-gray-800">Srijon Sinha</h2>
            <p className="text-gray-600 mt-2">Email: person3@example.com</p>
            <p className="text-gray-600">Phone: +91 11223 44556</p>
            <p className="text-gray-600 mt-1">Role: Backend</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
