import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="nav">
            <div className="nav-menu">
                <NavLink to="/" className="nav-link" activeClassName="active" exact>
                    <img
                        src="https://www.guidestar.org/ViewEdoc.aspx?eDocId=11021317&approved=True"
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
