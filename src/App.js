import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";

function App() {
  const { state, signIn, signOut } = useAuthContext();
  return (
    <div className="App">
      {
        state.isAuthenticated
          ? (
            <div>              
              <h1>Hello, {state.username}</h1>
              <button onClick={() => signOut()}>Logout</button>
            </div>
          ) : (
            <div>
              <button onClick={() => signIn()}>Login</button>
            </div>
          )
      }
    </div>
  );
}

export default App;
