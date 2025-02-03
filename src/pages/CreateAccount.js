import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./CreateAccount.css";

const CreateAccount = () => {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
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

  const handleCreateAccount = async () => {
    try {
      const dwellTime = getAverageDwellTime(); 
      await api.post("/create-account", { useremail, password, securityQuestion, securityAnswer });
      await api.post("/update-lsm", { useremail, dwellTime });
      alert("Account created successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error creating account");
    }
  };

  return (
    <div className="create-account-container">
      <div className="create-account-box">
        <h2>Create Account</h2>
        <input
          className="create-account-input"
          type="text"
          placeholder="Useremail"
          value={useremail}
          onChange={(e) => setUseremail(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
        <input
          className="create-account-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
        <select
          className="create-account-select"
          value={securityQuestion}
          onChange={(e) => setSecurityQuestion(e.target.value)}
        >
          <option value="">Select a Security Question</option>
          <option value="What is your pet's name?">
            What is your pet's name?
          </option>
          <option value="What is your mother's maiden name?">
            What is your mother's maiden name?
          </option>
          <option value="What is your favorite color?">
            What is your favorite color?
          </option>
          <option value="What city were you born in?">
            What city were you born in?
          </option>
        </select>
        <input
          className="create-account-input"
          type="text"
          placeholder="Answer"
          value={securityAnswer}
          onChange={(e) => setSecurityAnswer(e.target.value)}
        />
        <button className="create-account-button" onClick={handleCreateAccount}>
          Create Account
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
