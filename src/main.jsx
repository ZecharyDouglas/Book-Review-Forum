import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Navbar from "./Navbar.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className=" bg-stone-400">
      <Navbar />
      <App />
    </div>
  </React.StrictMode>
);
