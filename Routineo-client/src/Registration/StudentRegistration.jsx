import React, { useState } from "react";

export default function StudentRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    universityRoll: "",
    universityRegNumber: "",
    phone: "",
    email: "",
    password: "",
    currentYear: "",
    semester: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Registration Data:", formData);
  };

  return (
    <div className="max-w-md  mx-auto mt-10 p-5 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="universityRoll"
          placeholder="University Roll"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="universityRegNumber"
          placeholder="University Registration Number"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="currentYear"
          placeholder="Current Year"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="semester"
          placeholder="Semester"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />
        <button type="submit" className="w-full bg-[#017f7e] text-white p-2 rounded">
          Register
        </button>
      </form>
      <p className="text-center mt-4">
        Already registered?{" "}
        <a href="/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}
