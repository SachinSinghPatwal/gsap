import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import FrontPage from "./FrontPage.jsx";
import Parallax from "./Motion.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FrontPage />
  </StrictMode>
);
