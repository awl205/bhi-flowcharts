import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css';
import logo from '../pages/assets/BHI Logo_Full_Grey.png';

const Navbar = () => {
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
                    <NavLink to="/4" className="nav-link" activeClassName="active">
                        Equip4
                    </NavLink>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
