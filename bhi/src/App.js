import React from "react";
import './App.css';
import Navbar from "./components";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages";
import OxygenGenerator from "./pages/oxygen-generator";
import BoosterCompressor from "./pages/booster-compressor";
import AirDryer from "./pages/air-dryer";
import Equip4 from "./pages/4";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/oxygen-generator" element={<OxygenGenerator/>} />
        <Route path="/booster-compressor" element={<BoosterCompressor/>} />
        <Route path="/air-dryer" element={<AirDryer />} />
        <Route path="/4" element={<Equip4 />} />
      </Routes>
    </Router>
  );
}

export default App;
