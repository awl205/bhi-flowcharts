import React from "react";
import './App.css';
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages";
import OxygenGenerator from "./pages/oxygen-generator";
import Equip2 from "./pages/2";
import Equip3 from "./pages/3";
import Equip4 from "./pages/4";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/oxygen-generator" element={<OxygenGenerator />} />
        <Route path="/2" element={<Equip2 />} />
        <Route path="/3" element={<Equip3 />} />
        <Route path="/4" element={<Equip4 />} />
      </Routes>
    </Router>
  );
}

export default App;
