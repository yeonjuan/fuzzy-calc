import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Features from "./pages/Features";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Features />
  </StrictMode>
);
