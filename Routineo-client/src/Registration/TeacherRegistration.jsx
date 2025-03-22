import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function TeacherRegistration() {
  const [formData, setFormData] = useState({
    username: "",
    teacherId: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const navigate= useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Teacher Registration Data:", formData);
    try {
      const registerURL= "http://localhost:5000/api/auth/teacherRegistration";
      const response= await fetch(registerURL,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send corrected User object
      });
      const res_data = await response.json();
      console.log("response data", res_data);
      if (response.ok) {
        //toast.success("Registration successful!");
        //storeTokenInLs(res_data.token);
        alert("successful");
        navigate("/");
      } else {
        //toast.error(
        //  res_data.extraDetails ? res_data.extraDetails : res_data.message
        //);
        alert("not successful");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md  mx-auto mt-10 p-5 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Teacher Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="teacherId"
          placeholder="Teacher ID"
          className="w-full mb-3 p-2 border rounded"
          value={formData.teacherId}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={formData.password}
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
