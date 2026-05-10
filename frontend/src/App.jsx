import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Annotation from "./components/Annotation";
import LandingPage from "./components/Landingpage";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
import AINotesGenerator from "./components/AINotesGenerator";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/annotations" element={<Annotation />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/ai" element={<AINotesGenerator />} />
      </Routes>
    </BrowserRouter>
  );
}