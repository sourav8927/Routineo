import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from 'react-toastify';

export default function StudentRegistration() {
  const [formData, setFormData] = useState({
    username: "",
    roll: "",
    registrationNo: "",
    phone: "",
    email: "",
    password: "",
    currentyear: "",
    semester: "",
    department: "",
  });
 const {storeTokenInLs}=useAuth();
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Student Registration Data:", formData);
    try {
      const registerURL= "http://localhost:5000/api/auth/registration";
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
        toast.success("Registration successful!");
        storeTokenInLs(res_data.token);
        //alert("successful");
        navigate("/otpverification");
        toast.info("Please check your Email For a 6-digit OTP")
      } else {
        alert("not successful");
        toast.warning("Roll Should be ex:2021-3045 format"),
        toast.error(
         res_data.extraDetails ? res_data.extraDetails : res_data.message
        );

      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md  mx-auto mt-10 p-5 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Name"
          id="username"
          className="w-full mb-3 p-2 border rounded"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="roll"
          placeholder="University Roll"
          id="roll"
          className="w-full mb-3 p-2 border rounded"
          value={formData.roll}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="registrationNo"
          placeholder="University Registration Number"
          id="registrationNo"
          className="w-full mb-3 p-2 border rounded"
          value={formData.registrationNo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          id="phone"
          className="w-full mb-3 p-2 border rounded"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          className="w-full mb-3 p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          className="w-full mb-3 p-2 border rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="currentyear"
          placeholder="Current Year"
          id="currentyear"
          className="w-full mb-3 p-2 border rounded"
          value={formData.currentyear}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="semester"
          placeholder="Semester"
          id="semester"
          className="w-full mb-3 p-2 border rounded"
          value={formData.semester}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          id="department"
          className="w-full mb-3 p-2 border rounded"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <button type="submit" className="w-full bg-[#017f7e] text-white p-2 rounded">
          Register
        </button>
      </form>
      <p className="text-center mt-4">
        Already registered?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
