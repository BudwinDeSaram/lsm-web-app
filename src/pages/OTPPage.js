import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";

const OTPPage = () => {  
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { useremail, dwellTime } = location.state || {}; 

  const handleVerifyOTP = async () => {
    try {
      console.log(otp);
      const response = await api.post("/verify-otp", { otp });
      if (response.data.status === "success") {
        await api.post("/update-lsm", { useremail, dwellTime });
        navigate("/home");
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.log(otp);
      console.error(error);
      alert("Error verifying OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
        <input
          className="w-full p-2 border rounded mb-3"
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleVerifyOTP}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OTPPage;
