import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import "./OTPPage.css";

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
    <div className="otp-container">
      <div className="otp-box">
        <h2 className="otp-title">Enter OTP</h2>
        <input
          className="otp-input"
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button className="otp-button" onClick={handleVerifyOTP}>
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OTPPage;
