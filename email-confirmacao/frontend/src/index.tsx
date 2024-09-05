// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Renderiza o componente principal da aplicação na div com id "root"
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
