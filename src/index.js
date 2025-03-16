import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // TailwindCSS or other styles
import { AuthProvider } from "@asgardeo/auth-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(  
    <React.StrictMode>
      <AuthProvider
        config={ {
            signInRedirectURL: "https://468223a9-7ed7-4f9e-bb6d-aa85cb7415a6.e1-us-east-azure.choreoapps.dev/",
            signOutRedirectURL: "https://468223a9-7ed7-4f9e-bb6d-aa85cb7415a6.e1-us-east-azure.choreoapps.dev/",
            clientID: "l1au16BXengfS533ifKcXtT27Yka",
            baseUrl: "https://api.asgardeo.io/t/budwin",
            scope: [ "openid","profile" ]
        } }
      >
        <App />
      </AuthProvider>
    </React.StrictMode>    
);
