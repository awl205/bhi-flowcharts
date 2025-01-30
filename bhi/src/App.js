import React from "react";
import './App.css';
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages";
import OxygenGenerator from "./pages/oxygen-generator";
import BoosterCompressor from "./pages/booster-compressor";
import AirDryer from "./pages/air-dryer";
import AirCompressor from "./pages/air-compressor";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/oxygen-generator" element={<OxygenGenerator/>} />
        <Route path="/booster-compressor" element={<BoosterCompressor/>} />
        <Route path="/air-dryer" element={<AirDryer />} />
        <Route path="/air-compressor" element={<AirCompressor />} />
      </Routes>
      <Footer/>
      <div>
        {/* ... */}
        <Analytics />
      </div>
    </Router>

  );
}

export default App;
