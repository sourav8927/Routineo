import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleReCaptchaProvider, GoogleReCaptchaCheckbox } from '@google-recaptcha/react';
import GoogleCaptcha from "../Components/GoogleCaptcha";
import { AuthContext, useAuth } from "../store/Auth";
import { toast } from 'react-toastify';

export default function StudentLogin() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const {storeTokenInLs}=useAuth();
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Student Login Data:", loginData);

    try {
      const loginURL = "http://localhost:5000/api/auth/login";
      const response = await fetch(loginURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const res_data = await response.json();
        storeTokenInLs(res_data.token);
        console.log("Response data:", res_data);
        toast.success("Login successful!");
        // Navigate to the dashboard or home page
        navigate("/");
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while logging in.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Student Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={loginData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={loginData.password}
          onChange={handleChange}
          required
        />
          <GoogleCaptcha/>
        <button
          type="submit"
          className="w-full bg-[#017f7e] text-white p-2 rounded"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4">
        <a href="/forgotpassword" className="text-blue-500 hover:underline">
            Forgot password
        </a>
      </p>
      <p className="text-center mt-4">
        Don’t have an account?{" "}
        <a href="/register" className="text-blue-500 hover:underline">
          Register,
        </a>
      </p>
      <div>

      </div>
    </div>
  );
}
