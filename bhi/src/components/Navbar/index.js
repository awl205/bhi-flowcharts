import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="nav">
            <div className="nav-menu">
                <NavLink
                    to="/"
                    className="nav-link"
                    activeClassName="active"
                    exact
                >
                    Home
                </NavLink>
                <NavLink
                    to="/oxygen-generator"
                    className="nav-link"
                    activeClassName="active"
                >
                    Oxygen Generator
                </NavLink>
                <NavLink
                    to="/2"
                    className="nav-link"
                    activeClassName="active"
                >
                    Equip2
                </NavLink>
                <NavLink
                    to="/3"
                    className="nav-link"
                    activeClassName="active"
                >
                    Equip3
                </NavLink>
                <NavLink
                    to="/4"
                    className="nav-link"
                    activeClassName="active"
                >
                    Equip4
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
