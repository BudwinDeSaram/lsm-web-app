import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Login.css";

const Login = () => {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [showSecurity, setShowSecurity] = useState(false);
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [keyPressStart, setKeyPressStart] = useState(null);
  const [keyPressCount, setKeyPressCount] = useState(0);
  const [totalDwellTime, setTotalDwellTime] = useState(0);
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    setKeyPressStart(Date.now()); 
  };

  const handleKeyUp = (e) => {
    if (keyPressStart) {
      const dwellTime = Date.now() - keyPressStart;
      setTotalDwellTime((prev) => prev + dwellTime); 
      setKeyPressCount((prev) => prev + 1); 
      setKeyPressStart(null); 
    }
  };
  
  const getAverageDwellTime = () => {
    if (keyPressCount === 0) return 0; 
    const avgDwellTime = totalDwellTime / keyPressCount; 
    return Math.round(avgDwellTime / 100) * 100;
  };

  const handleLogin = async () => {
    try {   
      const dwellTime = getAverageDwellTime();   
      const response = await api.post("/login", { useremail, password });
      console.log(response.data.status);
      if (response.data.status === "success") {
        const predict_response = await api.post("/predict", { useremail, dwellTime });
        if (predict_response.data.status === "success") {            
            navigate("/home");
        } else if (predict_response.data.status === "OTP sent") {
            navigate("/otp", { state: { useremail, dwellTime } })
        } else if (predict_response.data.status === "User blocked") {
            alert("User blocked. Please try later.");
        }
      } else if (response.data.status === "Security question") {
        setShowSecurity(true);
        setSecurityQuestion(response.data.securityQuestion);        
      } else if (response.data.status === "User blocked") {
        alert("User blocked. Please try later.");
      } else {
        alert("Invalid credentials. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error logging in");
    }
  };

  const handleVerifySecurity = async () => {
    try {
      const response = await api.post("/verify-securityquestion", {
        useremail,
        answer: securityAnswer,
      });
      if (response.data.status === "success") {
        navigate("/home");
      } else {
        alert("Incorrect security answer. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error verifying security question");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          className="login-input"
          type="text"
          placeholder="Useremail"
          value={useremail}
          onChange={(e) => setUseremail(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
        {!showSecurity ? (
          <div>
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
            <p className="create-account-link" onClick={() => navigate("/create-account")}>
              Don't have an account? Create one
            </p>
          </div>
        ) : (
          <>
            <p className="security-question">{securityQuestion}</p>
            <input
              className="security-answer-input"
              type="text"
              placeholder="Answer"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
            />
            <button className="verify-button" onClick={handleVerifySecurity}>
              Verify Security Answer
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
