import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
);
