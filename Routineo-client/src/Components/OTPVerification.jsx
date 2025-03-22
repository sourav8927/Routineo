import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OTPVerification() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [message, setMessage] = useState("");

  const navigate=useNavigate();
  // Handle input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Move to the next input field automatically
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  // Handle OTP submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);

    try {
      const verifyUrl = "http://localhost:5000/api/auth/verifyemail"; // Change as per your backend API
      const response = await fetch(verifyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({code:enteredOtp}),
      });

      if (response.ok) {
        setMessage("OTP Verified Successfully!");
        alert("Verification successful!");
        navigate("/");
      } else {
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while verifying the OTP.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
      <p className="text-gray-600 text-center mb-4">
        Please enter the 6-digit OTP sent to your registered email/phone.
      </p>
      <form onSubmit={handleSubmit} className="text-center">
        <div className="flex justify-center gap-2 mb-4">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              name="otp"
              maxLength="1"
              className="w-10 h-12 text-center text-xl border rounded-md"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()} // Select text on focus
              required
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-[#017f7e] text-white p-2 rounded"
        >
          Verify OTP
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center ${
            message.includes("success") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
      <p className="text-center mt-4">
        Didn’t receive the OTP?{" "}
        <button
          onClick={() => alert("OTP Resent!")}
          className="text-blue-500 hover:underline"
        >
          Resend OTP
        </button>
      </p>
    </div>
  );
}
