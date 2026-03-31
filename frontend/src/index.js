import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";
import { AuthProvider } from "@/context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const observer = window.ResizeObserver;

window.ResizeObserver = class extends observer {
  constructor(callback) {
    super((entries, obs) => {
      try {
        callback(entries, obs);
      } catch (err) {
        // ignora
      }
    });
  }
};

window.addEventListener("error", (event) => {
  if (
    event.message &&
    event.message.includes("ResizeObserver loop")
  ) {
    event.stopImmediatePropagation();
  }
});

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);