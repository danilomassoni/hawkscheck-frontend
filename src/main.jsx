import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./auth/AuthContext.jsx"; // ✅ Certifique-se do caminho correto

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ✅ Envolvendo o App */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
