import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css';
import logo from '../pages/assets/BHI Logo_Full_Grey.png';
import { useContext } from "react";
import { useLanguage } from "../LanguageContext";


const Navbar = () => {
    const { language, toggleLanguage } = useLanguage();
    return (
        <nav className="nav">
            <div className="nav-menu">
                <NavLink to="/" className="nav-link" activeClassName="active" exact>
                    <img
                        src={logo}
                        alt="Logo"
                        className="nav-logo"
                    />
                </NavLink>
                <div className="language-toggle-container">
                    <label className="switch">
                        <input
                        type="checkbox"
                        onChange={toggleLanguage}
                        checked={language === "fr"}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="nav-links">
                    <NavLink to="/" className="nav-link" activeClassName="active" exact>
                        Home
                    </NavLink>
                    <NavLink to="/oxygen-generator" className="nav-link" activeClassName="active">
                        Oxygen Generator
                    </NavLink>
                    <NavLink to="/booster-compressor" className="nav-link" activeClassName="active">
                        Booster Compressor
                    </NavLink>
                    <NavLink to="/air-dryer" className="nav-link" activeClassName="active">
                        Air Dryer
                    </NavLink>
                    {/* <NavLink to="/air-compressor" className="nav-link" activeClassName="active">
                        Air Compressor
                    </NavLink> */}
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
