import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email for password reset:", email);

    try {
      const forgotPasswordURL = "http://localhost:5000/api/auth/forgotPassword"; // Replace with your backend endpoint
      const response = await fetch(forgotPasswordURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Password reset link has been sent to your email.");
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
        setMessage("Failed to send the reset link. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while processing your request.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
      <p className="text-gray-600 text-center mb-4">
        Enter your registered email to receive a password reset link.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-[#017f7e] text-white p-2 rounded"
        >
          Send Reset Link
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center ${
            message.includes("sent") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
