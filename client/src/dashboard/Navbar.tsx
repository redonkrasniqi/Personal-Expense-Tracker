import { useState } from "react";
import Profile from "./Profile";
import LogoNavbar from "./LogoNavbar";
import "./style/Navbar.css";

const Navbar = () => {
    return (
        <nav className="app-navbar" style={{ height: 'auto' }}>
            <LogoNavbar />
            <Profile />
        </nav>
    );
}

export default Navbar;
