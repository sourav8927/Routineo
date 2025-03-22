import React, { useState } from "react";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and confirmPassword
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const resetPasswordURL = `http://localhost:5000/api/auth/resetPassword/${token}`; // Replace with your backend endpoint
      const response = await fetch(resetPasswordURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        setMessage("Password reset successful!");
        alert("Password reset successful. You can now log in.");
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
        setMessage("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while resetting the password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
      <p className="text-gray-600 text-center mb-4">
        Enter your email and new password to reset your account.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full mb-4 p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter new password"
          className="w-full mb-4 p-2 border rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          className="w-full mb-4 p-2 border rounded"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-[#017f7e] text-white p-2 rounded"
        >
          Reset Password
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center ${
            message.includes("successful") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
