import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import Home from "./pages/Home";

function App() {
  const { state, signIn, signOut } = useAuthContext();

  return (
    <Router>
      <div className="App">
        {state.isAuthenticated ? (
          <div>
            <ul>
              <li>{state.username}</li>
            </ul>
            <button onClick={() => signOut()}>Logout</button>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
        ) : (
          <div>
            <button onClick={() => signIn()}>Login</button>            
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
