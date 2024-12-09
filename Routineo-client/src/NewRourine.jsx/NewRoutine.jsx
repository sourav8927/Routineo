import React, { useState } from "react";

const NewRoutine = ({ onAddRoutine }) => {
  const [formData, setFormData] = useState({
    sl: "",
    type: "",
    code: "",
    title: "",
    hours: { lecture: 0, tutorial: 0, practical: 0 },
    credits: "",
    marks: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Nested hours object handling
    if (name === "lecture" || name === "tutorial" || name === "practical") {
      setFormData({
        ...formData,
        hours: { ...formData.hours, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check
    if (!formData.sl || !formData.code || !formData.title || !formData.type) {
      alert("Please fill in all the required fields!");
      return;
    }

    // Send the form data to the parent component
    onAddRoutine({
      ...formData,
      hours: {
        lecture: parseInt(formData.hours.lecture) || 0,
        tutorial: parseInt(formData.hours.tutorial) || 0,
        practical: parseInt(formData.hours.practical) || 0,
      },
      credits: parseInt(formData.credits) || 0,
      marks: formData.marks,
    });

    // Reset the form
    setFormData({
      sl: "",
      type: "",
      code: "",
      title: "",
      hours: { lecture: 0, tutorial: 0, practical: 0 },
      credits: "",
      marks: "",
    });
  };

  return (
    <div className="p-4  min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-400">
        Add New Semester Routine
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-lg"
      >
        {/* Sl. No */}
        <div className="mb-4">
          <label className="block text-gray-700">Sl. No:</label>
          <input
            type="text"
            name="sl"
            value={formData.sl}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="block text-gray-700">Type of Course:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Code */}
        <div className="mb-4">
          <label className="block text-gray-700">Code:</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700">Course Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Hours */}
        <div className="mb-4 grid grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700">Lecture (L):</label>
            <input
              type="number"
              name="lecture"
              value={formData.hours.lecture}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Tutorial (T):</label>
            <input
              type="number"
              name="tutorial"
              value={formData.hours.tutorial}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Practical (P):</label>
            <input
              type="number"
              name="practical"
              value={formData.hours.practical}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Credits */}
        <div className="mb-4">
          <label className="block text-gray-700">Credits:</label>
          <input
            type="number"
            name="credits"
            value={formData.credits}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Marks */}
        <div className="mb-4">
          <label className="block text-gray-700">Marks:</label>
          <input
            type="text"
            name="marks"
            value={formData.marks}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500 transition"
        >
          Add Routine
        </button>
      </form>
    </div>
  );
};

export default NewRoutine;
