import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Framework7 from "framework7";
import Framework7React from "framework7-react";

// ✅ Import only the components you use
import { App, View, Page, Navbar, Block, Button } from "framework7-react";

// ✅ Import only the styles you need (or global style from core)
import "framework7/css/bundle"; // <- optional: gives you all default styles
// or use individual ones like:
// import 'framework7/css/core';
// import 'framework7/css/components/navbar';
// import 'framework7/css/components/button';

import "./index.css";
import AppComponent from "./App.jsx";

// ✅ Register React plugin with Framework7 core
Framework7.use(Framework7React);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppComponent />
  </StrictMode>
);
