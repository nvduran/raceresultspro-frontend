import React, { useState } from "react";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import IRatingStats from "./components/iRatingStats";
import IncidentStats from "./components/IncidentStats/index.js";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/iratingstats" element={<IRatingStats />} />
        <Route path="/incidentstats" element={<IncidentStats />} />
      </Routes>
    </div>
  );
}

export default App;
